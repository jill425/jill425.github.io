// winwin 試玩的簡化規則。招式數值、傷害公式與對手回應方式取自 winwin 的
// assets/moves.json 與 lib/domain/battle.dart；台詞取自 defensive_house 台詞庫的一小部分。

export type Interest = "urgency" | "cherish";
export type Band = "calm" | "guarded" | "hostile";
export type Outcome = "" | "won" | "pyrrhic" | "enraged" | "lost" | "stalemate";

export type Move = {
    id: string;
    power: number;
    feel: number;
    resist: number;
    disclose: number;
    minDisclosure: number;
    interest?: Interest;
};

export type BattleState = {
    opponentHp: number;
    playerHp: number;
    feeling: number;
    resistance: number;
    disclosure: number;
    turn: number;
    history: string[];
    revealed: Interest[];
    outcome: Outcome;
};

export type TurnResult = {
    state: BattleState;
    damage: number;
    weak: boolean;
    repeated: boolean;
    revealed?: Interest;
    reply?: { text: string; hit: number };
};

// interest：卡片台詞裡說中對方在意的事（依情境關鍵字：交屋／趕＝急著換屋，用心／照顧＝希望房子被珍惜）
export const MOVES: Move[] = [
    { id: "ask_open", power: 12, feel: 6, resist: -3, disclose: 8, minDisclosure: 0 },
    { id: "reflect", power: 14, feel: 8, resist: -6, disclose: 4, minDisclosure: 0, interest: "urgency" },
    { id: "affirm", power: 12, feel: 10, resist: -4, disclose: 0, minDisclosure: 0, interest: "cherish" },
    { id: "concede", power: 22, feel: 6, resist: -5, disclose: 0, minDisclosure: 0, interest: "urgency" },
    { id: "link_interest", power: 35, feel: 5, resist: -8, disclose: 0, minDisclosure: 30, interest: "urgency" },
    { id: "share_limit", power: 28, feel: 2, resist: 2, disclose: 0, minDisclosure: 0 },
    { id: "authority", power: 38, feel: -2, resist: 6, disclose: 0, minDisclosure: 0 },
    { id: "scarcity", power: 40, feel: -4, resist: 10, disclose: 0, minDisclosure: 0 },
    { id: "disparage", power: 45, feel: -10, resist: 12, disclose: 0, minDisclosure: 0 },
    { id: "pressure", power: 65, feel: -15, resist: 20, disclose: 0, minDisclosure: 0 },
];

const LINES = {
    reject: {
        calm: [["這個我可能沒辦法接受，不過我們還可以談。", 30], ["抱歉，這樣我還是有點為難。", 34]],
        guarded: [["這樣我不太能接受。", 36], ["你這樣講，我反而更想守住原本的價格。", 42]],
        hostile: [["你這樣逼我，我什麼都不想談了。", 50], ["別再用這種語氣跟我說話。", 56]],
    },
    probe: [["你想表達的是什麼？我還沒聽出重點。", 22], ["嗯……這樣說我還不確定。", 25]],
    concede: [["你這麼說，我覺得有道理。也許我可以再想想。", 0], ["嗯，這點你說得對，我可以考慮。", 0]],
} as const;

const ATTACK: Record<Band, number> = { calm: 1, guarded: 0.85, hostile: 0.6 };
const COUNTER: Record<Band, number> = { calm: 0.8, guarded: 1, hostile: 1.5 };
const DAMAGE_SCALE = 0.5;
const REPEAT_DECAY = 0.6;
const REPEAT_FLOOR = 0.3;
const WEAK_SCALE = 0.4;
const SOFTEN_DAMAGE = 8;
const SOFTEN_BELOW_HP = 45;
const INTEREST_FEELING = 3;
const INTEREST_DISCLOSURE = 10;
export const TURN_LIMIT = 10;
export const WIN_FEELING = 30;
export const WINNER_FEELING = 70;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function band(resistance: number): Band {
    if (resistance < 40) return "calm";
    return resistance < 70 ? "guarded" : "hostile";
}

export function newBattle(): BattleState {
    return { opponentHp: 100, playerHp: 100, feeling: 40, resistance: 50, disclosure: 0, turn: 0, history: [], revealed: [], outcome: "" };
}

function pickLine(lines: readonly (readonly [string, number])[], random: () => number) {
    return lines[Math.floor(random() * lines.length)];
}

export function playMove(state: BattleState, move: Move, random: () => number = Math.random): TurnResult {
    const before = band(state.resistance);
    const streak = state.history.filter((id) => id === move.id).length;
    const decay = Math.max(REPEAT_FLOOR, REPEAT_DECAY ** streak);
    const weak = move.minDisclosure > 0 && state.disclosure < move.minDisclosure;
    const scale = weak ? decay * WEAK_SCALE : decay;
    const damage = Math.round(move.power * scale * ATTACK[before] * DAMAGE_SCALE);
    const revealed = move.interest && !state.revealed.includes(move.interest) ? move.interest : undefined;
    const feelDelta = (move.feel > 0 ? Math.round(move.feel * decay) : move.feel) + (revealed ? INTEREST_FEELING : 0);

    const next: BattleState = {
        ...state,
        turn: state.turn + 1,
        opponentHp: clamp(state.opponentHp - damage, 0, 100),
        feeling: clamp(state.feeling + feelDelta, -100, 100),
        resistance: clamp(state.resistance + Math.round(move.resist * scale), 0, 100),
        disclosure: clamp(state.disclosure + Math.round(move.disclose * scale) + (revealed ? INTEREST_DISCLOSURE : 0), 0, 100),
        history: [...state.history, move.id],
        revealed: revealed ? [...state.revealed, revealed] : state.revealed,
    };

    if (next.feeling < 0) return { state: { ...next, outcome: "enraged" }, damage, weak, repeated: streak > 0, revealed };
    if (next.opponentHp <= 0) {
        const outcome = next.feeling >= WIN_FEELING ? "won" : "pyrrhic";
        return { state: { ...next, outcome }, damage, weak, repeated: streak > 0, revealed };
    }

    // 同 battle.dart 的 _decideIntent：打得夠重就鬆口或試探，抗拒高才拒絕，其餘試探
    const after = band(next.resistance);
    const [text, power] =
        damage >= SOFTEN_DAMAGE
            ? pickLine(next.opponentHp < SOFTEN_BELOW_HP ? LINES.concede : LINES.probe, random)
            : next.resistance >= 70
              ? pickLine(LINES.reject[after], random)
              : pickLine(LINES.probe, random);
    const hit = Math.round(power * COUNTER[after] * DAMAGE_SCALE);
    const playerHp = clamp(next.playerHp - hit, 0, 100);
    const outcome: Outcome = playerHp <= 0 ? "lost" : next.turn >= TURN_LIMIT ? "stalemate" : "";
    return { state: { ...next, playerHp, outcome }, damage, weak, repeated: streak > 0, revealed, reply: { text, hit } };
}
