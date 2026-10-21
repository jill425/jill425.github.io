import type { Work } from "@/data/works";

// 還沒有 App 截圖：手機外框裡放名稱、一句話與上架平台。有截圖後換成截圖輪播
export function AppCard({ work }: { work: Work }) {
    return (
        <div className="phone">
            <div className="phone-notch" />
            <div className="phone-body">
                {work.icon && <pre className="phone-icon">{work.icon.join("\n")}</pre>}
                <strong>{work.title}</strong>
                <span>{work.line}</span>
            </div>
            <div className="phone-platforms">
                {work.platforms?.map((platform) => (
                    <span key={platform}>{platform}</span>
                ))}
            </div>
        </div>
    );
}
