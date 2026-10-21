"use client";

import { useLanguage } from "@/i18n/LanguageContext";

// 範例報告摘要。資料來自 redteam 內建示範靶機弱點版的掃描結果（docs/examples/sample-report.md）
const SEVERITIES = [
    { level: "Critical", count: 2 },
    { level: "High", count: 7 },
    { level: "Medium", count: 2 },
    { level: "Low", count: 0 },
];
const MAX_COUNT = 7;

const REPORT_CONTENT = {
    en: {
        title: "API vulnerability scan (sample)",
        meta: "Demo target (vulnerable build) · 17 checks · 11 findings",
        top: "Fix first",
        findings: [
            ["F-01", "Broken object-level authorization (transfer)"],
            ["F-02", "Mass assignment: users can change their own balance"],
            ["F-07", "Revoked tokens are still accepted"],
        ],
        fixed: "Same scan against the fixed target: all checks pass",
    },
    zh: {
        title: "API 弱點掃描報告（範例）",
        meta: "示範靶機（弱點版）· 17 項檢查 · 11 個問題",
        top: "最優先處理",
        findings: [
            ["F-01", "轉帳的物件層級授權缺失"],
            ["F-02", "可自行修改餘額（mass assignment）"],
            ["F-07", "已撤銷的 token 仍被接受"],
        ],
        fixed: "修好版靶機再跑一次：全部通過",
    },
};

export function RedteamReport() {
    const { language } = useLanguage();
    const content = REPORT_CONTENT[language];

    return (
        <div className="report">
            <div className="title">{content.title}</div>
            <div className="ww-meta">{content.meta}</div>
            {SEVERITIES.map(({ level, count }) => (
                <div className={level === "Critical" ? "sev-row crit" : "sev-row"} key={level}>
                    <span>{level}</span>
                    <div className="sev-track">
                        <div className="sev-fill" style={{ width: `${(count / MAX_COUNT) * 100}%` }} />
                    </div>
                    <b>{count}</b>
                </div>
            ))}
            <div className="ww-meta">{content.top}</div>
            {content.findings.map(([id, text]) => (
                <div className="finding" key={id}>
                    <span className="id">{id}</span>
                    <span>{text}</span>
                </div>
            ))}
            <div className="ok">{content.fixed}</div>
        </div>
    );
}
