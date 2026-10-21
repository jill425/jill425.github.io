import Link from "next/link";

export function BlogHeader({ backHref, backLabel }: { backHref: string; backLabel: string }) {
    return (
        <header
            style={{
                borderBottom: "1px solid var(--color-border)",
                padding: "1rem 1.5rem",
                position: "sticky",
                top: 0,
                background: "rgba(248,250,255,0.9)",
                backdropFilter: "blur(12px)",
                zIndex: 50,
            }}
        >
            <div
                style={{
                    maxWidth: "48rem",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Link
                    href="/"
                    style={{
                        fontWeight: 800,
                        fontSize: "1.1rem",
                        textDecoration: "none",
                        background:
                            "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    Jill.dev
                </Link>
                <Link
                    href={backHref}
                    style={{
                        fontSize: "0.875rem",
                        color: "var(--color-primary)",
                        textDecoration: "none",
                        fontWeight: 600,
                    }}
                >
                    {backLabel}
                </Link>
            </div>
        </header>
    );
}
