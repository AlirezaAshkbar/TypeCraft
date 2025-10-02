"use client";

import { Box, Card, CardContent, Typography, Divider, Stack, Button } from "@mui/material";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import TimerIcon from "@mui/icons-material/Timer";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TypingBox from "@/components/TypingBox";
import Results from "@/components/Results";

export default function PracticePage() {
  const [wpm, setWpm] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60); // Start at 60 seconds
  const [timerActive, setTimerActive] = useState(false);
  const router = useRouter();

  // Timer effect
  useEffect(() => {
    let interval: number;
    if (timerActive) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const handleStartTyping = () => {
    if (!timerActive) {
      setTimerActive(true);
      setTimeLeft(60); // Reset to 60 seconds
      setWpm(null); // Reset results
      setAccuracy(null);
    }
  };

  const handleFinish = (calculatedWpm: number, calculatedAccuracy: number) => {
    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
    setTimerActive(false); // Stop timer
    setTimeLeft(0); // Ensure timer is at 0
  };

  const handleRestart = () => {
    setWpm(null);
    setAccuracy(null);
    setTimeLeft(60); // Reset timer
    setTimerActive(false);
  };

  return (
    <>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => router.back()}
                sx={{ textTransform: "none" }}
                >
                Go Back
              </Button>
    <Box
      sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          px: 2,
          py: 4,
        }}
        >
        
      <Card
        sx={{
            maxWidth: 900,
            width: "100%",
            borderRadius: 3,
            p: { xs: 2, md: 3 },
            boxShadow: 8,
        }}
        >
        <CardContent>
          {/* Header */}
          <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={1}>
            <KeyboardIcon fontSize="large" />
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
              >
              TypeCraft - Typing Practice
            </Typography>
            <EmojiEmotionsIcon fontSize="large" color="secondary" />
          </Box>

          <Divider sx={{ my: 2, borderColor: "grey.700" }} />

          {/* Timer and Go Back Button */}
          {wpm === null || accuracy === null ? (
              <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              mb={2}
              >
              <Box display="flex" alignItems="center" gap={1}>
                <TimerIcon color="action" />
                <Typography justifySelf={"center"} variant="h6">Time Left: {timeLeft}s</Typography>
              </Box>
            </Stack>
          ) : (
              <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              mb={2}
              >
              <Box /> {/* Placeholder to maintain layout */}
            </Stack>
          )}

          {/* TypingBox or Results */}
          {wpm === null || accuracy === null ? (
              <TypingBox
              onStart={handleStartTyping}
              onFinish={handleFinish}
              stopTyping={timeLeft <= 0}
              />
            ) : (
                <Box textAlign="center">
              <Results wpm={wpm} accuracy={accuracy} onRestart={handleRestart} />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
          </>
  );
}