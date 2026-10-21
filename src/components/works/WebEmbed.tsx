"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export type Device = "desktop" | "mobile";

const EMBED_CONTENT = {
    en: { hint: "Click to use the real site right here.", load: (host: string) => `Load ${host}` },
    zh: { hint: "按一下，在這裡直接操作真的網站。", load: (host: string) => `載入 ${host}` },
};

// 嵌入真的網站。按了才載入，避免一打開作品頁就同時跑好幾個網站
export function WebEmbed({ url, host, title, device }: { url: string; host: string; title: string; device: Device }) {
    const { language } = useLanguage();
    const content = EMBED_CONTENT[language];
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="embed">
            <div className={device === "mobile" ? "embed-frame mobile" : "embed-frame"}>
                {loaded ? (
                    <iframe
                        src={url}
                        title={title}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    />
                ) : (
                    <div className="embed-gate">
                        <b>{host}</b>
                        <span>{content.hint}</span>
                        <button type="button" className="btn" onClick={() => setLoaded(true)}>
                            {content.load(host)}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
