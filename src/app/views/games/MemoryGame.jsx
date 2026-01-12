import { Box, Button, Card, Grid, styled, Typography } from "@mui/material";
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

const CardInner = styled(Box)(({ theme, flipped, matched }) => ({
  width: "100%",
  height: "100px",
  position: "relative",
  transformStyle: "preserve-3d",
  transition: "transform 0.6s",
  transform: flipped || matched ? "rotateY(180deg)" : "rotateY(0deg)",
  cursor: "pointer",
}));

const CardFace = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  fontSize: "2rem",
  boxShadow: theme.shadows[2],
}));

const CardBack = styled(CardFace)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
}));

const CardFront = styled(CardFace)(({ theme }) => ({
  backgroundColor: "#fff",
  transform: "rotateY(180deg)",
}));

const SYMBOLS = ["📚", "🧪", "📐", "🌍", "🎨", "💻", "🧠", "🎓"];

const MemoryGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...SYMBOLS, ...SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameOver(false);
  };

  const handleCardClick = (id) => {
    if (
      flipped.length === 2 ||
      flipped.includes(id) ||
      matched.includes(id) ||
      gameOver
    )
      return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].symbol === cards[second].symbol) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          endGame();
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const endGame = async () => {
    setGameOver(true);
    // Award XP based on speed/moves
    const xp = Math.max(10, 100 - moves);
    try {
      await axiosInstance.post("api/Gamification/award-xp", {
        amount: xp,
        reason: "Memory Match Mastery",
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

      <Card
        sx={{ p: 4, width: "100%", maxWidth: "600px", textAlign: "center" }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Memory Match
        </Typography>
        <Typography variant="h6" mb={3}>
          Moves: {moves}
        </Typography>

        <Grid container spacing={2}>
          {cards.map((card, index) => (
            <Grid item xs={3} key={card.id}>
              <Box onClick={() => handleCardClick(index)}>
                <CardInner
                  flipped={flipped.includes(index)}
                  matched={matched.includes(index)}
                >
                  <CardBack>?</CardBack>
                  <CardFront>{card.symbol}</CardFront>
                </CardInner>
              </Box>
            </Grid>
          ))}
        </Grid>

        {gameOver && (
          <Box mt={4}>
            <Typography variant="h5" color="success.main" gutterBottom>
              Excellent Memory!
            </Typography>
            <Typography variant="body1" mb={2}>
              You finished in {moves} moves.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={initializeGame}
            >
              Play Again
            </Button>
          </Box>
        )}
      </Card>
    </GameContainer>
  );
};

export default MemoryGame;
