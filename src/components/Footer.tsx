export function Footer() {
    return (
        <footer
            style={{
                textAlign: "center",
                padding: "2rem 1.5rem",
                color: "var(--color-text-muted)",
                fontSize: "0.875rem",
                borderTop: "1px solid var(--color-border)",
                marginTop: "4rem",
            }}
        >
            <p>
                · © {new Date().getFullYear()} Jill
            </p>
        </footer>
    );
}
