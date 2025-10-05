"use client";

import { Box } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import words from "@/data/words.json";

type Props = {
  onFinish: (wpm: number, accuracy: number) => void;
  onStart?: () => void;
  stopTyping?: boolean;
  text?: string;
  onType?: (correct: boolean) => void;
};

export default function TypingBox({
  onFinish,
  onStart,
  stopTyping,
  text: propText,
  onType,
}: Props) {
  const [text, setText] = useState<string[]>([]);
  const [typed, setTyped] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [wrongKeystrokes, setWrongKeystrokes] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize text
  useEffect(() => {
    if (propText) {
      setText(propText.split(""));
    } else {
      const minWords = 20;
      const maxWords = 40;
      const randomCount =
        Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;

      const shuffled = [...words]
        .sort(() => Math.random() - 0.5)
        .slice(0, randomCount);

      setText(shuffled.join(" ").split(""));
    }
  }, [propText]);

  const fullText = text.join("");

  const handleKeyDown = (e: KeyboardEvent) => {
    if (stopTyping) return;

    if (!startTime && e.key.length === 1) {
      setStartTime(Date.now());
      if (onStart) onStart();
    }

    if (e.key === "Backspace") {
      if (typed.length > 0) {
        setTyped((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => prev - 1);
      }
      return;
    }

    if (e.key.length === 1 && currentIndex < fullText.length) {
      const expectedChar = fullText[currentIndex];

      setTotalKeystrokes((prev) => prev + 1);
      if (e.key !== expectedChar) setWrongKeystrokes((prev) => prev + 1);

      // 🔥 Trigger animation callback
      if (onType) onType(e.key === expectedChar);

      setTyped((prev) => [...prev, e.key]);
      setCurrentIndex((prev) => prev + 1);

      if (currentIndex + 1 === fullText.length) {
        finishTyping();
      }
    }
  };

  useEffect(() => {
    if (stopTyping && startTime) {
      finishTyping();
    }
  }, [stopTyping]);

  const finishTyping = () => {
    const timeTaken = startTime ? (Date.now() - startTime) / 60000 : 1 / 60;
    const wordsTyped = typed
      .join("")
      .split(" ")
      .filter((word) => word.length > 0).length;

    const wpm = Math.round(wordsTyped / timeTaken);

    const accuracy =
      totalKeystrokes === 0
        ? 100
        : ((totalKeystrokes - wrongKeystrokes) / totalKeystrokes) * 100;

    onFinish(wpm, Math.round(accuracy));
  };

  useEffect(() => {
    containerRef.current?.focus();
  }, [text]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [startTime, currentIndex, stopTyping, fullText]);

  return (
    <Box
      ref={containerRef}
      tabIndex={0}
      sx={{
        fontFamily: "monospace",
        fontSize: "1.5rem",
        lineHeight: "2.2rem",
        maxWidth: "800px",
        userSelect: "none",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        mt: 4,
        outline: "none",
      }}
      onClick={() => containerRef.current?.focus()}
    >
      {fullText.split("").map((char, idx) => {
        let style: React.CSSProperties = { opacity: 0.6 };
        if (typed[idx]) {
          style =
            typed[idx] === char
              ? { color: "lime", opacity: 1 }
              : { color: "red", opacity: 1 };
        }

        const isCursor = idx === currentIndex && !stopTyping;

        return (
          <span
            key={idx}
            style={{
              ...style,
              whiteSpace: "pre-wrap",
              wordBreak: "normal",

              transition: "color 0.1s, opacity 0.1s",
              borderBottom: isCursor ? "4px solid red" : "none",
            }}
          >
            {char === " " ? "\u00A0" : char /* 👈 spaces visible */}
          </span>
        );
      })}
      {currentIndex === fullText.length && !stopTyping && (
        <span style={{ borderBottom: "2px solid orange" }}>|</span>
      )}
    </Box>
  );
}
