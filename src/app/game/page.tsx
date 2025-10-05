"use client";

import { useState, useEffect } from "react";
import { Container, Typography, Button, Box, Card } from "@mui/material";
import TypingBox from "@/components/TypingBox";
import Image from "next/image";
import { motion } from "framer-motion";

const levels = [
  {
    id: 1,
    title: "Forest Encounter",
    time: 70,
    villain: "/villain1.png",
    script: `The tree monster stands tall in the forest.
Its branches reach out like hands ready to grab.
It moves slowly, but its roots are deadly.`,
  },
  {
    id: 2,
    title: "Desert Ambush",
    time: 60,
    villain: "/villain2.png",
    script: `The sand monster rises from the desert dunes.
Its body flows and shifts, hiding sharp edges.
Travelers fear its sudden attacks under the sun.`,
  },
  {
    id: 3,
    title: "Castle Guardian",
    time: 50,
    villain: "/villain3.png",
    script: `A mighty dragon guards the king's castle.
Its fiery breath and sharp claws deter intruders.
Anyone who tries to reach the king must face it.`,
  },
  {
    id: 4,
    title: "Elite Soldier Showdown",
    time: 40,
    villain: "/villain4.png",
    script: `The king's best soldier challenges all who dare.
Skilled and relentless, he is the final defense
before you can confront the villain king.`,
  },
  {
    id: 5,
    title: "Villain King Showdown",
    time: 30,
    villain: "/villain5.png",
    script: `The villain king rules the land with cruelty.
His armies strike fear into every village.
He hoards treasures while making life unbearable for the people.`,
  },
];

// Available player characters
const playerChars = [
  { id: 1, img: "/shovalie1.png", name: "Knight 1" },
  { id: 2, img: "/shovalie2.png", name: "Knight 2" },
  { id: 3, img: "/shovalie3.png", name: "Knight 3" },
];

export default function Game() {
  const [level, setLevel] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [levelWin, setLevelWin] = useState(false);
  const [key, setKey] = useState(0);
  const [playerResult, setPlayerResult] = useState<{
    wpm: number;
    accuracy: number;
  } | null>(null);

  const [selectedChar, setSelectedChar] = useState(playerChars[0]);
  const [showStory, setShowStory] = useState(true);

  const startGame = () => {
    if (!selectedChar) return;
    setLevel(1);
    setTimeLeft(levels[0].time);
    setStarted(false);
    setGameOver(false);
    setVictory(false);
    setLevelWin(false);
    setPlayerResult(null);
    setKey((k) => k + 1);
  };

  const handleStartTyping = () => setStarted(true);

  const handleFinishTyping = (wpm: number, accuracy: number) => {
    setPlayerResult({ wpm, accuracy });

    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }

    // ✅ Win condition: min 30 WPM and 75% accuracy
    if (wpm >= 30 && accuracy >= 75) {
      if (level < levels.length) setLevelWin(true);
      else setVictory(true);
    } else {
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (!started || gameOver || victory || levelWin) return;
    if (timeLeft <= 0 && !playerResult) setGameOver(true);

    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [started, timeLeft, gameOver, victory, levelWin, playerResult]);

  const nextLevel = () => {
    const next = level + 1;
    if (next <= levels.length) {
      setLevel(next);
      setTimeLeft(levels[next - 1].time);
      setStarted(false);
      setLevelWin(false);
      setPlayerResult(null);
      setKey((k) => k + 1);
    }
  };

  // ---------- SCREENS WITH ANIMATIONS ----------
  if (level === 0) {
    if (showStory) {
      return (
        <Container sx={{ py: 4, textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h4" gutterBottom>
              ⚔️ Typing Knight
            </Typography>

            <Card
              sx={{
                p: 3,
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? "#f0f0f0"
                    : "background.paper",
                boxShadow: 3,
                borderRadius: 2,
                maxWidth: 600,
                margin: "0 auto",
                textAlign: "left",
              }}
            >
              <Typography variant="h6" gutterBottom textAlign="center">
                🏰 Story
              </Typography>
              <Typography textAlign="center" sx={{ mb: 1 }}>
                You are a brave knight ⚔️ on a quest to defeat the villain king
                who makes life unbearable for the people.
              </Typography>
              <Typography textAlign="center" sx={{ mb: 1 }}>
                Along the way, you will face deadly monsters and soldiers
                protecting the king.
              </Typography>
              <Typography textAlign="center" sx={{ mb: 1 }}>
                Sharpen your typing skills ⌨️ to defeat them, unlock your
                abilities, and bring peace to the land.
              </Typography>
              <Typography textAlign="center" sx={{ mb: 1 }}>
                Travel through forests, deserts, and fortresses, facing tougher
                enemies and discovering hidden treasures.
              </Typography>
              <Typography textAlign="center">
                Only the fastest and most accurate typists will prevail 🏆 and
                claim victory over the villain king!
              </Typography>
            </Card>

            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => setShowStory(false)}
            >
              Next
            </Button>
          </motion.div>
        </Container>
      );
    }

    // Character selection screen
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          ⚔️ Choose Your Knight
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, my: 3 }}>
          {playerChars.map((char) => (
            <motion.div
              key={char.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Box
                sx={{
                  border:
                    selectedChar?.id === char.id
                      ? "3px solid green"
                      : "2px solid gray",
                  borderRadius: 2,
                  p: 1,
                  cursor: "pointer",
                  boxShadow:
                    selectedChar?.id === char.id
                      ? "0 0 15px green"
                      : "0 0 5px rgba(0,0,0,0.1)",
                }}
                onClick={() => setSelectedChar(char)}
              >
                <Image
                  src={char.img}
                  alt={char.name}
                  width={120}
                  height={120}
                />
                <Typography sx={{ mt: 1 }}>{char.name}</Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
        <Button
          variant="contained"
          onClick={startGame}
          disabled={!selectedChar}
        >
          Start Game
        </Button>
      </Container>
    );
  }

  // Victory screen
  if (victory) {
    const isFinalVictory = level === levels.length;

    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {isFinalVictory ? (
            <>
              <Typography variant="h4" sx={{ color: "goldenrod", mb: 2 }}>
                👑 Ultimate Victory!
              </Typography>
              <Image
                src="/king_defeated.png"
                alt="King Defeated"
                width={500}
                height={300}
                style={{ margin: "0 auto" }}
              />
              <Card
                sx={{
                  p: 3,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? "#fff4e6"
                      : "background.paper",
                  boxShadow: 3,
                  borderRadius: 2,
                  maxWidth: 600,
                  margin: "20px auto",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ mb: 1, fontWeight: "bold" }}>
                  You have defeated the villain king! 🏰
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Peace has returned to the city. The people celebrate your
                  bravery and honor your courage.
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Streets are lively again, laughter echoes through the town,
                  and the once fearful villagers can smile freely.
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  Great job, brave knight! Your skill and courage have changed
                  the fate of the kingdom forever. 🌟
                </Typography>
              </Card>
              <Button sx={{ mt: 3 }} onClick={startGame} variant="contained">
                Play Again
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h4" sx={{ color: "green" }}>
                🏆 Victory!
              </Typography>
              <Typography>You defeated all villains!</Typography>
              {playerResult && (
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ color: "green", fontWeight: "bold" }}>
                    ✅ WPM: {playerResult.wpm} | Accuracy:{" "}
                    {playerResult.accuracy}%
                  </Typography>
                </Box>
              )}
              <Button sx={{ mt: 3 }} onClick={startGame} variant="contained">
                Play Again
              </Button>
            </>
          )}
        </motion.div>
      </Container>
    );
  }

  // Game Over screen
  if (gameOver) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <motion.div
          initial={{ x: -10 }}
          animate={{ x: [0, -10, 10, -10, 10, 0] }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h4" sx={{ color: "red" }}>
            💀 Game Over
          </Typography>
          <Typography>You failed to defeat the villain...</Typography>
          {playerResult && (
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: "red", fontWeight: "bold" }}>
                ❌ WPM: {playerResult.wpm} | Accuracy: {playerResult.accuracy}%
              </Typography>
            </Box>
          )}
          <Button sx={{ mt: 3 }} onClick={startGame} variant="contained">
            Try Again
          </Button>
        </motion.div>
      </Container>
    );
  }

  // Level win screen
  if (levelWin) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h4" sx={{ color: "green" }}>
            🎉 You Win Level {level}!
          </Typography>
          {playerResult && (
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: "green", fontWeight: "bold" }}>
                ✅ WPM: {playerResult.wpm} | Accuracy: {playerResult.accuracy}%
              </Typography>
            </Box>
          )}
          <Button sx={{ mt: 3 }} onClick={nextLevel} variant="contained">
            Next Level
          </Button>
        </motion.div>
      </Container>
    );
  }

  // Main battle scene
  const currentLevel = levels[level - 1];

  return (
    <Container sx={{ py: 4, textAlign: "center" }}>
      <motion.div
        key={level}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <motion.div
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={selectedChar.img}
                alt="Knight"
                width={120}
                height={120}
              />
              <Typography
                sx={{ fontSize: "0.9rem", mt: 1, fontWeight: "bold" }}
              >
                🛡️ You
              </Typography>
            </motion.div>
          </Box>

          <motion.div
            animate={{ rotate: [0, -20, 20, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Typography variant="h2">⚔️</Typography>
          </motion.div>

          <Box sx={{ textAlign: "center" }}>
            <motion.div
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={currentLevel.villain}
                alt={`${currentLevel.title}`}
                width={200}
                height={200}
              />
              <Typography
                sx={{ fontSize: "0.9rem", mt: 1, fontWeight: "bold" }}
              >
                {currentLevel.title}
              </Typography>
            </motion.div>
          </Box>
        </Box>

        <Card
          sx={{
            p: 2,
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? "#d2d1d1ff" : "background.paper",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
            Level {currentLevel.id} – Time Left: {timeLeft}s
          </Typography>
          <TypingBox
            key={key}
            text={currentLevel.script}
            onStart={handleStartTyping}
            onFinish={handleFinishTyping}
            stopTyping={timeLeft <= 0}
          />
        </Card>
      </motion.div>
    </Container>
  );
}
