import { Box, Card, Grid, styled, Typography, Button } from "@mui/material";
import { VideogameAsset, Psychology } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "32px",
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  height: "100%",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[8],
  },
}));

const IconBox = styled(Box)(({ theme, bgcolor }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "16px",
  backgroundColor: bgcolor || theme.palette.primary.light,
  color: "#fff",
}));

const Games = () => {
  const navigate = useNavigate();

  const gameList = [
    {
      name: "Snake Challenge",
      description: "Classic snake game to improve focus and reaction time.",
      icon: <VideogameAsset sx={{ fontSize: 40 }} />,
      color: "#4caf50",
      path: "/games/snake",
    },
    {
      name: "Memory Match",
      description: "Train your brain by matching pairs of educational symbols.",
      icon: <Psychology sx={{ fontSize: 40 }} />,
      color: "#2196f3",
      path: "/games/memory",
    },
    {
      name: "Maze Runner",
      description:
        "Navigate through the obstacles and collect knowledge points.",
      icon: <VideogameAsset sx={{ fontSize: 40 }} />,
      color: "#ff9800",
      path: "/games/maze",
    },
  ];

  return (
    <Box m="30px">
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Educational Games
        </Typography>
        <Typography color="textSecondary">
          Take a break and sharpen your mind!
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {gameList.map((game, index) => (
          <Grid item lg={4} md={6} sm={12} xs={12} key={index}>
            <StyledCard onClick={() => !game.disabled && navigate(game.path)}>
              <IconBox bgcolor={game.color}>{game.icon}</IconBox>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {game.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={3}>
                {game.description}
              </Typography>
              {game.disabled ? (
                <Button variant="outlined" disabled>
                  Coming Soon
                </Button>
              ) : (
                <Button variant="contained" color="primary">
                  Play Now
                </Button>
              )}
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Games;
