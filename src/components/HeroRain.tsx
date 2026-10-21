"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0123456789";
const FONT_SIZE = 16;
const FALL_SPEED = 0.45;

// 琥珀色數位雨，只畫在 Hero 背景；系統要求減少動態效果時只畫一張靜止畫面
export function HeroRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let columns: number[] = [];
        let frameId = 0;

        const resize = () => {
            const box = canvas.parentElement?.getBoundingClientRect();
            if (!box) return;
            canvas.width = box.width;
            canvas.height = box.height;
            columns = Array.from({ length: Math.ceil(canvas.width / FONT_SIZE) }, () => (Math.random() * -canvas.height) / FONT_SIZE);
        };

        const draw = () => {
            ctx.fillStyle = "rgba(11, 8, 5, 0.16)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${FONT_SIZE}px "VT323", monospace`;
            columns.forEach((y, i) => {
                ctx.fillStyle = Math.random() < 0.05 ? "#ffe3a3" : "#c98a10";
                ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], i * FONT_SIZE, y * FONT_SIZE);
                columns[i] = y * FONT_SIZE > canvas.height && Math.random() > 0.975 ? 0 : y + FALL_SPEED;
            });
        };

        const loop = () => {
            draw();
            frameId = requestAnimationFrame(loop);
        };

        resize();
        window.addEventListener("resize", resize);
        if (reduceMotion) {
            for (let i = 0; i < 80; i++) draw();
        } else {
            loop();
        }
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="rain" aria-hidden="true" />;
}
