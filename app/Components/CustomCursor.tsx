'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsHidden(false);
            // Add a little rotation based on movement
            setAngle((e.clientX + e.clientY) % 360);
        };

        const onMouseEnter = () => setIsHidden(false);
        const onMouseLeave = () => setIsHidden(true);

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON'
            );
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseenter', onMouseEnter);
        window.addEventListener('mouseleave', onMouseLeave);
        window.addEventListener('mouseover', onMouseOver);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseenter', onMouseEnter);
            window.removeEventListener('mouseleave', onMouseLeave);
            window.removeEventListener('mouseover', onMouseOver);
        };
    }, []);

    if (isHidden) return null;

    return (
        <>
            {/* Funny Food Emoji Cursor */}
            <div
                className="pointer-events-none fixed z-[9999] flex items-center justify-center text-3xl transition-transform duration-150 ease-out select-none"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) rotate(${angle}deg) scale(${isPointer ? 1.5 : 1})`,
                }}
            >
                {isPointer ? '😋' : '🍕'}
            </div>

            {/* Trailing "Smoke" or "Vibe" dots */}
            <div
                className="pointer-events-none fixed z-[9998] h-12 w-12 rounded-full border-2 border-dashed border-[#CF0738] opacity-20 transition-all duration-500 ease-out"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                }}
            />

            <style jsx global>{`
                html, body, a, button {
                    cursor: none !important;
                }
            `}</style>
        </>
    );
}
