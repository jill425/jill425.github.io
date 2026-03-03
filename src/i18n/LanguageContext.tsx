"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "zh";

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Load preference from localStorage or default to English
        const savedLanguage = localStorage.getItem("app-language") as Language;
        if (savedLanguage === "en" || savedLanguage === "zh") {
            setLanguageState(savedLanguage);
        } else {
            // Check browser language
            const browserLang = navigator.language;
            if (browserLang.toLowerCase().includes("zh")) {
                setLanguageState("zh");
            }
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("app-language", lang);
    };

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "zh" : "en");
    };

    // To prevent hydration mismatch, we don't render children until mounted if we rely on browser APIs.
    // However, for this simple portfolio, rendering default 'en' during SSR is fine, 
    // it will switch on the client automatically.

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
            <div data-lang={isMounted ? language : "en"}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
