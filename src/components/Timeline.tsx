"use client";

import { useState } from "react";
import { experience, type TimelineEntry } from "@/data/experience";
import { useLanguage } from "@/i18n/LanguageContext";

const VISIBLE_POINTS = 3;

const TIMELINE_CONTENT = {
    en: { title: "Experience", more: (n: number) => `Show ${n} more ↓` },
    zh: { title: "經歷", more: (n: number) => `再看 ${n} 條 ↓` },
};

function Job({ entry, isCurrent, moreLabel }: { entry: TimelineEntry; isCurrent: boolean; moreLabel: (n: number) => string }) {
    const [expanded, setExpanded] = useState(false);
    const hidden = entry.description.length - VISIBLE_POINTS;
    const points = expanded ? entry.description : entry.description.slice(0, VISIBLE_POINTS);

    return (
        <article className={isCurrent ? "job now" : "job"}>
            <div className="when">{entry.period}</div>
            <div>
                <h2>{entry.title}</h2>
                <div className="org">{entry.organization}</div>
                <ul>
                    {points.map((point) => (
                        <li key={point}>{point}</li>
                    ))}
                </ul>
                {!expanded && hidden > 0 && (
                    <button type="button" className="more" onClick={() => setExpanded(true)}>
                        {moreLabel(hidden)}
                    </button>
                )}
                {entry.tags && (
                    <div className="tech">
                        {entry.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}

export function Timeline() {
    const { language } = useLanguage();
    const content = TIMELINE_CONTENT[language];

    return (
        <main className="block page">
            <div className="wrap">
                <p className="eyebrow">~/git log</p>
                <h1>{content.title}</h1>
                <div>
                    {experience[language].map((entry, index) => (
                        <Job key={`${entry.period}-${entry.title}`} entry={entry} isCurrent={index === 0} moreLabel={content.more} />
                    ))}
                </div>
            </div>
        </main>
    );
}
