"use client";

import { useState, useMemo, createContext, useContext, useEffect, useRef } from "react";
import { CssBaseline, Container, Box, IconButton } from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { LightMode, DarkMode } from "@mui/icons-material";

const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const useColorMode = () => useContext(ColorModeContext);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light"); // Default to light
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load theme mode from localStorage on client-side only
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode === "dark" || savedMode === "light") {
      setMode(savedMode);
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const newMode = prev === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", newMode); // Save to localStorage
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  // Particle animation logic (client-side only)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to cover the window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      content: string;
      size: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const possibleIcons = ["⌨", "⚡", "✓", "⏱"];
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // Generate deterministic seed for consistent particles
    const seed = 42; // Fixed seed for consistency
    let seedValue = seed;

    // Simple seeded random number generator
    const seededRandom = () => {
      seedValue = (seedValue * 9301 + 49297) % 233280;
      return seedValue / 233280;
    };

    // Generate particles
    const createParticle = (): Particle => {
      const isIcon = seededRandom() < 0.3;
      const content = isIcon
        ? possibleIcons[Math.floor(seededRandom() * possibleIcons.length)]
        : possibleChars[Math.floor(seededRandom() * possibleChars.length)];
      return {
        x: seededRandom() * canvas.width,
        y: seededRandom() * canvas.height,
        vx: (seededRandom() - 0.5) * 2,
        vy: (seededRandom() - 0.5) * 2,
        content,
        size: isIcon ? 30 : 24,
        opacity: 0.2 + seededRandom() * 0.1,
      };
    };

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.font = `${particle.size}px monospace`;
        ctx.fillStyle = mode === "light" ? `rgba(0, 0, 0, ${particle.opacity})` : `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fillText(particle.content, particle.x, particle.y);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [mode]);

  return (
    <html lang="en">
      <body>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ position: "relative", minHeight: "100vh" }}>
              <canvas
                ref={canvasRef}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: -1,
                  pointerEvents: "none",
                }}
                suppressHydrationWarning // Suppress warning for canvas
              />
              <Container maxWidth="md">
                <Box
                  sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    py: 4,
                    fontFamily: "monospace",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      mb: 3,
                    }}
                  >
                    <ThemeToggle />
                  </Box>
                  {children}
                </Box>
              </Container>
            </Box>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </body>
    </html>
  );
}

function ThemeToggle() {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}