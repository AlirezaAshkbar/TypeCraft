"use client"
import { Container, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function GameLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Container sx={{ py: 4 }}>
      {/* Go Back Button */}
      <Box sx={{ mb: 3, textAlign: "left" }}>
        <Button variant="outlined" color="primary" onClick={() => router.push("/")} size="small">
          ← Go Back
        </Button>
      </Box>

      {/* Page content */}
      <Box>{children}</Box>
    </Container>
  );
}
