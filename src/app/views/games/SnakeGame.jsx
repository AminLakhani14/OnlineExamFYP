import { Box, Button, Card, styled, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
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

const Canvas = styled("canvas")({
  border: "5px solid #273c41",
  borderRadius: "8px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
  backgroundColor: "#000",
});

const UIOverlay = styled(Box)({
  marginTop: "20px",
  textAlign: "center",
});

const GRID_SIZE = 20;
const CANVAS_SIZE = 400;

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [highScore, setHighScore] = useState(0);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = {
        x: newSnake[0].x + direction.x,
        y: newSnake[0].y + direction.y,
      };

      // Wall collision
      if (
        head.x < 0 ||
        head.x >= CANVAS_SIZE / GRID_SIZE ||
        head.y < 0 ||
        head.y >= CANVAS_SIZE / GRID_SIZE
      ) {
        endGame();
        return;
      }

      // Self collision
      if (
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        endGame();
        return;
      }

      newSnake.unshift(head);

      // Food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const gameLoop = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop);
  }, [snake, direction, food, gameOver]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw snake
    ctx.fillStyle = "#4caf50";
    snake.forEach((segment, i) => {
      ctx.fillStyle = i === 0 ? "#81c784" : "#4caf50";
      ctx.fillRect(
        segment.x * GRID_SIZE,
        segment.y * GRID_SIZE,
        GRID_SIZE - 2,
        GRID_SIZE - 2
      );
    });

    // Draw food
    ctx.fillStyle = "#f44336";
    ctx.fillRect(
      food.x * GRID_SIZE,
      food.y * GRID_SIZE,
      GRID_SIZE - 2,
      GRID_SIZE - 2
    );
  }, [snake, food]);

  const generateFood = () => {
    setFood({
      x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
      y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
    });
  };

  const endGame = async () => {
    setGameOver(true);
    if (score > highScore) {
      setHighScore(score);
      // Award XP for high score
      try {
        await axiosInstance.post("api/Gamification/award-xp", {
          amount: Math.floor(score / 2),
          reason: "Snake High Score",
        });
      } catch (err) {
        console.error("Failed to award XP", err);
      }
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

      <Card
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "fit-content",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Snake Challenge
        </Typography>
        <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
          <Typography variant="h6">Score: {score}</Typography>
          <Typography variant="h6">Best: {highScore}</Typography>
        </Box>

        <Canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} />

        <UIOverlay>
          {gameOver ? (
            <Box>
              <Typography variant="h5" color="error" gutterBottom>
                Game Over!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={resetGame}
              >
                Start Game
              </Button>
              <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
                Tip: Earn XP based on your score!
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1">Use Arrow Keys to Move</Typography>
          )}
        </UIOverlay>
      </Card>
    </GameContainer>
  );
};

export default SnakeGame;
