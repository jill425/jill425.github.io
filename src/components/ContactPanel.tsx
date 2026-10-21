"use client";

import { useRef, useState } from "react";
import { joinEmail, socialLinks } from "@/data/links";
import { useLanguage } from "@/i18n/LanguageContext";

const CONTACT_CONTENT = {
    en: {
        title: "Contact",
        sub: "Whether you want to collaborate, ask a question, or just say hi, my inbox is open.",
        placeholder: "Click to show my email",
        show: "Show email",
        copy: "Copy",
        copied: "Copied",
        selected: "Selected, please copy",
    },
    zh: {
        title: "聯絡我",
        sub: "合作、提問，或只是想打聲招呼都歡迎。",
        placeholder: "按「顯示信箱」",
        show: "顯示信箱",
        copy: "複製",
        copied: "已複製",
        selected: "已選取，請手動複製",
    },
};

type MailState = "hidden" | "shown" | "copied" | "selected";

export function ContactPanel() {
    const { language } = useLanguage();
    const content = CONTACT_CONTENT[language];
    const [state, setState] = useState<MailState>("hidden");
    const mailRef = useRef<HTMLSpanElement>(null);
    const emailLink = socialLinks.find((link) => link.email);
    const otherLinks = socialLinks.filter((link) => link.href);
    // 信箱拆兩段存，按了才組起來，原始碼裡不出現完整地址
    const address = emailLink?.email ? joinEmail(emailLink.email) : "";

    async function handleMailButton() {
        if (state === "hidden") {
            setState("shown");
            return;
        }
        try {
            await navigator.clipboard.writeText(address);
            setState("copied");
        } catch {
            if (mailRef.current) {
                const range = document.createRange();
                range.selectNodeContents(mailRef.current);
                const selection = window.getSelection();
                selection?.removeAllRanges();
                selection?.addRange(range);
            }
            setState("selected");
        }
    }

    const buttonLabel = { hidden: content.show, shown: content.copy, copied: content.copied, selected: content.selected }[state];

    return (
        <main className="block page">
            <div className="wrap">
                <p className="eyebrow">~/contact</p>
                <h1>{content.title}</h1>
                <p className="sub">{content.sub}</p>
                <div className="contact">
                    <span className="mail" ref={mailRef}>
                        {state === "hidden" ? content.placeholder : address}
                    </span>
                    {address && (
                        <button type="button" className="btn" onClick={handleMailButton}>
                            {buttonLabel}
                        </button>
                    )}
                    {otherLinks.map((link) => (
                        <a className="btn" key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.label} ↗
                        </a>
                    ))}
                </div>
            </div>
        </main>
    );
}
