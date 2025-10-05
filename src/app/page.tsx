"use client";

import { Button, Container, Typography, Stack, Box, Chip } from "@mui/material";
import Link from "next/link";
import CodeIcon from "@mui/icons-material/Code";
import ExtensionIcon from "@mui/icons-material/Extension";
import { motion } from "framer-motion";

export default function Home() {
  const technologies = [
    { name: "Next.js", icon: <CodeIcon fontSize="small" /> },
    { name: "MUI (Material UI)", icon: <ExtensionIcon fontSize="small" /> },
    { name: "Framer Motion", icon: <CodeIcon fontSize="small" /> }, // اضافه شده
  ];

  return (
    <Container sx={{ textAlign: "center", py: { xs: 4, md: 6 } }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", mb: { xs: 1.5, md: 2.5 }, fontSize: { xs: "1.8rem", md: "2.5rem" } }}
        >
          🚀 Welcome to TypeCraft
        </Typography>
      </motion.div>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ mb: { xs: 2.5, md: 3.5 }, color: "text.secondary", fontSize: { xs: "0.95rem", md: "1.2rem" } }}
      >
        Enhance your typing skills while having fun! TypeCraft combines exciting typing games with smooth graphics to make learning enjoyable and effective.
      </Typography>

      {/* Summary Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <Box
          sx={{
            maxWidth: { xs: "100%", sm: 550, md: 700 },
            margin: "0 auto",
            backgroundColor: "background.paper",
            p: { xs: 2, md: 3 },
            borderRadius: 2,
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
            mb: { xs: 3, md: 4 },
          }}
        >
          <Typography variant="body2" sx={{ mb: 1.5, fontSize: { xs: "0.85rem", md: "0.95rem" } }}>
            TypeCraft is a university project created by <strong>Alireza Ashkbar</strong>. 
            It features beautiful graphics, engaging challenges, and interactive typing games to help improve your typing speed and accuracy.
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.5, fontSize: { xs: "0.85rem", md: "0.95rem" } }}>
            Whether you are practicing or competing in a typing adventure, this app is designed to make learning enjoyable and effective. Sharpen your skills and enjoy the journey!
          </Typography>

          {/* Technologies Used */}
          <Typography variant="subtitle1" sx={{ mb: 1, mt: 2.5, fontSize: { xs: "0.95rem", md: "1.1rem" } }}>
            🛠 Technologies Used
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Chip
                  icon={tech.icon}
                  label={tech.name}
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 1, fontWeight: "bold", fontSize: { xs: "0.7rem", md: "0.85rem" } }}
                />
              </motion.div>
            ))}
          </Stack>

          {/* CSR Note */}
          <Typography variant="caption" sx={{ mt: 1.5, fontStyle: "italic", color: "text.secondary" }}>
            ⚡ This is a <strong>Client-Side Rendered (CSR) app</strong>.
          </Typography>
        </Box>
      </motion.div>

      {/* Call to Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            component={Link}
            href="/practice"
            variant="contained"
            sx={{
              px: { xs: 4, md: 5 },
              py: 1.2,
              fontWeight: "bold",
              borderRadius: "50px",
              background: "linear-gradient(45deg, #f60202ff, #e33e3eff)",
              color: "#fff",
              boxShadow: "0 5px 16px rgba(255, 0, 0, 0.35)",
              transition: "all 0.3s ease",
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                transform: "translateY(-3px) scale(1.03)",
                boxShadow: "0 6px 18px rgba(255, 0, 0, 0.4)",
              },
            }}
          >
            Start Practice
          </Button>

          <Button
            component={Link}
            href="/game"
            variant="outlined"
            sx={{
              px: { xs: 4, md: 5 },
              py: 1.2,
              fontWeight: "bold",
              borderRadius: "50px",
              borderWidth: 2,
              borderColor: "#42a5f5",
              color: "#42a5f5",
              boxShadow: "0 3px 12px rgba(66,165,245,0.25)",
              transition: "all 0.3s ease",
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                transform: "translateY(-3px) scale(1.03)",
                boxShadow: "0 6px 18px rgba(66,165,245,0.4)",
                backgroundColor: "rgba(66,165,245,0.08)",
              },
            }}
          >
            Play Game
          </Button>
        </Stack>
      </motion.div>
    </Container>
  );
}
