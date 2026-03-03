export type SocialLink = {
    label: string;
    href: string;
    icon: "github" | "email";
};

export const socialLinks: SocialLink[] = [
    {
        label: "GitHub",
        href: "https://github.com/jill425",
        icon: "github",
    },
    {
        label: "Email",
        href: "mailto:jill.chen2017@email.com",
        icon: "email",
    },
];
