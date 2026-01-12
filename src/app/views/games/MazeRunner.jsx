import { Box, Button, Card, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axiosInstance from "axios.js";

const GameContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
}));

const MazeGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(10, 40px)",
  gap: "2px",
  backgroundColor: "#273c41",
  padding: "5px",
  borderRadius: "8px",
}));

const Cell = styled(Box)(({ type }) => ({
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.5rem",
  borderRadius: "4px",
  backgroundColor: type === "wall" ? "#1a2a2e" : "#fff",
  transition: "all 0.2s",
}));

const MazeRunner = () => {
  const navigate = useNavigate();
  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const [dots, setDots] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const maze = [
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  ];

  useEffect(() => {
    // Initial dots
    const newDots = [];
    maze.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 0 && !(x === 0 && y === 0)) {
          newDots.push(`${x}-${y}`);
        }
      });
    });
    setDots(newDots);
  }, []);

  const movePlayer = (dx, dy) => {
    if (gameOver) return;
    const newX = player.x + dx;
    const newY = player.y + dy;

    if (
      newX >= 0 &&
      newX < 10 &&
      newY >= 0 &&
      newY < 10 &&
      maze[newY][newX] === 0
    ) {
      setPlayer({ x: newX, y: newY });
      const pos = `${newX}-${newY}`;
      if (dots.includes(pos)) {
        setDots((prev) => prev.filter((d) => d !== pos));
        setScore((s) => s + 5);
      }
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowUp") movePlayer(0, -1);
      if (e.key === "ArrowDown") movePlayer(0, 1);
      if (e.key === "ArrowLeft") movePlayer(-1, 0);
      if (e.key === "ArrowRight") movePlayer(1, 0);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [player, dots, gameOver]);

  useEffect(() => {
    if (dots.length === 0 && !gameOver && score > 0) {
      endGame();
    }
  }, [dots]);

  const endGame = async () => {
    setGameOver(true);
    try {
      await axiosInstance.post("api/Gamification/award-xp", {
        amount: score,
        reason: "Maze Master Bonus",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <GameContainer>
      <Box alignSelf="flex-start" mb={2}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/games")}
        >
          Back to Games
        </Button>
      </Box>

      <Card sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Maze Runner
        </Typography>
        <Typography variant="h6" mb={2}>
          Score: {score}
        </Typography>

        <MazeGrid>
          {maze.map((row, y) =>
            row.map((cell, x) => (
              <Cell key={`${x}-${y}`} type={cell === 1 ? "wall" : "path"}>
                {player.x === x && player.y === y && "👤"}
                {cell === 0 && dots.includes(`${x}-${y}`) && "⏺️"}
              </Cell>
            ))
          )}
        </MazeGrid>

        <Box mt={3}>
          {gameOver ? (
            <Box>
              <Typography variant="h5" color="success.main">
                Maze Completed!
              </Typography>
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                onClick={() => window.location.reload()}
              >
                Play Again
              </Button>
            </Box>
          ) : (
            <Typography color="textSecondary">
              Use arrow keys to collect all dots!
            </Typography>
          )}
        </Box>
      </Card>
    </GameContainer>
  );
};

export default MazeRunner;
