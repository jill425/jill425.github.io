"use client";

import { Fragment, useState } from "react";
import { type Work, works } from "@/data/works";
import { useLanguage } from "@/i18n/LanguageContext";
import { AppCard } from "@/components/works/AppCard";
import { RedteamReport } from "@/components/works/RedteamReport";
import { type Device, WebEmbed } from "@/components/works/WebEmbed";
import { WinwinDemo } from "@/components/works/WinwinDemo";

const SHOWCASE_CONTENT = {
    en: {
        title: "Work",
        sub: "Pick a project and use it on the screen. Projects with a website embed the real site.",
        groups: { live: "Shipped", lab: "Lab" },
        listLabel: "Projects",
        devices: { desktop: "Desktop", mobile: "Mobile" },
        open: (host: string) => `Open ${host} in a new tab ↗`,
    },
    zh: {
        title: "作品",
        sub: "選一個作品，右邊的螢幕直接看、直接玩。有網頁版的會嵌入真的網站。",
        groups: { live: "已上線", lab: "實驗室" },
        listLabel: "作品清單",
        devices: { desktop: "桌機", mobile: "手機" },
        open: (host: string) => `在新分頁開啟 ${host} ↗`,
    },
};

function Screen({ work, device }: { work: Work; device: Device }) {
    if (work.kind === "web" && work.url && work.host) {
        // key 讓切換作品時重新回到「按一下載入」的狀態
        return <WebEmbed key={work.id} url={work.url} host={work.host} title={work.title} device={device} />;
    }
    if (work.kind === "app") return <AppCard work={work} />;
    if (work.demo === "winwin") return <WinwinDemo />;
    if (work.demo === "redteam") return <RedteamReport />;
    return null;
}

export function Showcase() {
    const { language } = useLanguage();
    const content = SHOWCASE_CONTENT[language];
    const list = works[language];
    const [selectedId, setSelectedId] = useState(list[0].id);
    const [device, setDevice] = useState<Device>("desktop");
    const work = list.find((w) => w.id === selectedId) ?? list[0];

    return (
        <main className="block page">
            <div className="wrap">
                <p className="eyebrow">~/projects</p>
                <h1>{content.title}</h1>
                <p className="sub">{content.sub}</p>
                <div className="showcase">
                    <div className="picker" role="tablist" aria-label={content.listLabel}>
                        {list.map((w, index) => (
                            <Fragment key={w.id}>
                                {w.group !== list[index - 1]?.group && <div className="picker-group">{content.groups[w.group]}</div>}
                                <button
                                    type="button"
                                    role="tab"
                                    className="pick"
                                    aria-selected={w.id === work.id}
                                    onClick={() => setSelectedId(w.id)}
                                >
                                    <strong>
                                        <span>{w.title}</span>
                                        <span className={w.badge === "PROTO" ? "badge proto" : "badge"}>{w.badge}</span>
                                    </strong>
                                    <span>{w.line}</span>
                                </button>
                            </Fragment>
                        ))}
                    </div>

                    <div className="viewer">
                        <div className="viewer-bar">
                            <span className="viewer-title">~/{work.id}</span>
                            {work.kind === "web" && (
                                <div className="modes">
                                    {(["desktop", "mobile"] as const).map((d) => (
                                        <button type="button" key={d} aria-pressed={device === d} onClick={() => setDevice(d)}>
                                            {content.devices[d]}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="screen" aria-live="polite">
                            <Screen work={work} device={device} />
                        </div>
                        <div className="viewer-info">
                            <h2>{work.title}</h2>
                            <p>{work.description}</p>
                            <div className="tech">
                                {work.tech.map((t) => (
                                    <span key={t}>{t}</span>
                                ))}
                            </div>
                            {work.url && work.host && (
                                <a href={work.url} target="_blank" rel="noopener noreferrer">
                                    {content.open(work.host)}
                                </a>
                            )}
                            {work.note && <p className="note">{work.note}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
