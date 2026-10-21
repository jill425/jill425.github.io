"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { type BattleState, type TurnResult, band, MOVES, newBattle, playMove, TURN_LIMIT, WINNER_FEELING } from "@/lib/winwin";

const WINWIN_CONTENT = {
    en: {
        scenario: "Scenario: buying a home. Mrs. Lin asks NT$18M; your budget tops out at NT$16.5M.",
        start: "Pick a move card to start. Gentle moves hit softly but raise the feeling; pressure hits hard and the feeling drops.",
        meters: { opponent: "Her resolve", player: "Your resolve", feeling: "Feeling" },
        turn: (n: number) => `Turn ${n}/${TURN_LIMIT}`,
        mood: { calm: "calm", guarded: "guarded", hostile: "hostile" },
        moodLabel: "She is",
        moves: {
            ask_open: "Open question", reflect: "Reflect back", affirm: "Affirm", concede: "Give and take", link_interest: "Link interests",
            share_limit: "Share your limit", authority: "Cite market data", scarcity: "Deadline", disparage: "Criticize the house", pressure: "Push to close",
        } as Record<string, string>,
        played: (move: string, damage: number) => `You played "${move}" → her resolve −${damage}`,
        weak: " (you don't know what she cares about yet, so it lands softly)",
        repeated: " (same move again, it weakens)",
        revealed: { urgency: "✓ You named it: she needs to move soon, her kid is changing schools", cherish: "✓ You named it: she wants the home to be cared for" },
        reply: (text: string, hit: number) => `Mrs. Lin: “${text}”${hit ? ` (your resolve −${hit})` : ""}`,
        endings: { won: "You persuaded Mrs. Lin.", pyrrhic: "A hollow win: she agreed, but she's not happy about it.", enraged: "The feeling dropped below 0. She walked out.", lost: "Your resolve ran out first. You lost this one.", stalemate: "Out of turns. Nobody was persuaded." },
        winner: " And she feels like the winner. Full marks!",
        again: "Play again",
    },
    zh: {
        scenario: "情境：買房殺價。林太太開價 1800 萬，你的預算上限 1650 萬。",
        start: "選一張招式卡開始。溫和的招式扣得少但會加感受；施壓扣得多，感受也會掉。",
        meters: { opponent: "林太太的堅持", player: "我的堅持", feeling: "感受" },
        turn: (n: number) => `第 ${n}／${TURN_LIMIT} 回合`,
        mood: { calm: "平靜", guarded: "戒備", hostile: "有敵意" },
        moodLabel: "對方",
        moves: {
            ask_open: "開放式提問", reflect: "反映傾聽", affirm: "肯定尊重", concede: "互惠讓步", link_interest: "連結利益",
            share_limit: "說出限制", authority: "權威行情", scarcity: "稀缺截止", disparage: "嫌棄屋況", pressure: "施壓逼單",
        } as Record<string, string>,
        played: (move: string, damage: number) => `你出「${move}」→ 林太太的堅持 −${damage}`,
        weak: "（還沒摸清她在意什麼，效果打折）",
        repeated: "（重複同一招，效果遞減）",
        revealed: { urgency: "✓ 說中了：她急著換屋，孩子要轉學", cherish: "✓ 說中了：她希望房子被珍惜" },
        reply: (text: string, hit: number) => `林太太：「${text}」${hit ? `（你的堅持 −${hit}）` : ""}`,
        endings: { won: "你說服了林太太。", pyrrhic: "慘勝：說服了她，但她心裡不太舒服。", enraged: "感受跌破 0，林太太生氣離場。", lost: "你的堅持先歸零，這場輸了。", stalemate: "回合用盡，雙方都沒被說服。" },
        winner: " 而且她覺得自己是贏家，滿分！",
        again: "再玩一次",
    },
};

function Meter({ label, value, min = 0 }: { label: string; value: number; min?: number }) {
    const percent = Math.max(0, ((value - min) / (100 - min)) * 100);
    return (
        <div className="ww-m">
            <span>{label}</span>
            <div className="ww-track">
                <div className="ww-fill" style={{ width: `${percent}%` }} />
            </div>
            <b>{value}</b>
        </div>
    );
}

export function WinwinDemo() {
    const { language } = useLanguage();
    const content = WINWIN_CONTENT[language];
    const [battle, setBattle] = useState<BattleState>(newBattle);
    const [lastTurn, setLastTurn] = useState<TurnResult | null>(null);

    function restart() {
        setBattle(newBattle());
        setLastTurn(null);
    }

    const outcome = battle.outcome;
    const isWinner = outcome === "won" && battle.feeling >= WINNER_FEELING;

    return (
        <div className="ww">
            <div className="ww-meta">{content.scenario}</div>
            <div>
                <Meter label={content.meters.opponent} value={battle.opponentHp} />
                <Meter label={content.meters.player} value={battle.playerHp} />
                <Meter label={content.meters.feeling} value={battle.feeling} min={-100} />
                <div className="ww-meta">
                    {content.turn(battle.turn)} · {content.moodLabel} {content.mood[band(battle.resistance)]}
                </div>
            </div>
            <div className="ww-log" aria-live="polite">
                {lastTurn ? (
                    <>
                        <div className="hot">
                            {content.played(content.moves[lastTurn.state.history.at(-1) ?? ""], lastTurn.damage)}
                            {lastTurn.weak ? content.weak : lastTurn.repeated ? content.repeated : ""}
                        </div>
                        {lastTurn.revealed && <div className="hot">{content.revealed[lastTurn.revealed]}</div>}
                        {lastTurn.reply && <div>{content.reply(lastTurn.reply.text, lastTurn.reply.hit)}</div>}
                    </>
                ) : (
                    content.start
                )}
            </div>
            <div className="ww-hand">
                {outcome ? (
                    <>
                        <span className={outcome === "won" ? "end" : "end bad"}>
                            {content.endings[outcome]}
                            {isWinner ? content.winner : ""}
                        </span>
                        <button type="button" className="ww-card" onClick={restart}>
                            {content.again}
                        </button>
                    </>
                ) : (
                    MOVES.map((move) => (
                        <button
                            type="button"
                            className="ww-card"
                            key={move.id}
                            onClick={() => {
                                const result = playMove(battle, move);
                                setBattle(result.state);
                                setLastTurn(result);
                            }}
                        >
                            {content.moves[move.id]}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}
