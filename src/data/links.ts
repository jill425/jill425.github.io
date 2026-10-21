// 電子郵件地址拆成兩段存放，頁面原始碼裡不出現完整地址，點擊時才組起來，避免被爬蟲收集
export type EmailParts = {
    user: string;
    domain: string;
};

export type SocialLink = {
    label: string;
    href?: string;
    icon: "github" | "email";
    email?: EmailParts;
};

export function joinEmail({ user, domain }: EmailParts): string {
    return `${user}@${domain}`;
}

export const socialLinks: SocialLink[] = [
    {
        label: "GitHub",
        href: "https://github.com/jill425",
        icon: "github",
    },
    {
        label: "Email",
        icon: "email",
        email: { user: "jill.chen2017", domain: "email.com" },
    },
];
