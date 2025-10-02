"use client";

import { Box, Button, Typography, Card,  Stack } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReplayIcon from "@mui/icons-material/Replay";

type Props = {
  wpm: number;
  accuracy: number;
  onRestart: () => void;
};

export default function Results({ wpm, accuracy, onRestart }: Props) {
  return (
    <>
    
        <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
          Results
        </Typography>

        <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={2} my={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <SpeedIcon color="primary" />
            <Typography variant="h6">WPM: {wpm}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <CheckCircleIcon color="success" />
            <Typography variant="h6">Accuracy: {accuracy.toFixed(1)}%</Typography>
          </Box>
        </Stack>

        <Box textAlign="center" mt={2}>
          <Button
            onClick={onRestart}
            variant="contained"
            startIcon={<ReplayIcon />}
            sx={{ fontWeight: "bold" }}
          >
            Try Again
          </Button>
        </Box>
</>    
);
}
