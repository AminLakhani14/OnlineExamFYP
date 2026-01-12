import {
  Box,
  Card,
  Grid,
  LinearProgress,
  styled,
  Typography,
  Tooltip,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../axios";
import {
  LocalFireDepartment,
  WorkspacePremium,
  Stars,
  School,
} from "@mui/icons-material";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: "24px",
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-20%",
    right: "-10%",
    width: "200px",
    height: "200px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
    zIndex: 0,
  },
}));

const StatIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "48px",
  height: "48px",
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.2)",
  marginRight: "16px",
  zIndex: 1,
}));

const BadgeAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  marginRight: 8,
  border: "2px solid rgba(255, 255, 255, 0.3)",
  background: "rgba(255, 255, 255, 0.1)",
}));

const GamificationStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axiosInstance.get("api/Gamification/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch gamification stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Seed badges if none exist (one-time dev helper)
    axiosInstance.post("api/Gamification/seed-badges").catch(() => {});
  }, []);

  if (loading || !stats) return null;

  const xpProgress = (stats.xp % 1000) / 10;

  return (
    <Box mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <StyledCard>
            <Box display="flex" alignItems="center" mb={2} zIndex={1}>
              <StatIcon>
                <Stars fontSize="large" />
              </StatIcon>
              <Box>
                <Typography variant="h5" fontWeight="700">
                  Level {stats.level}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {stats.xp} Total XP
                </Typography>
              </Box>
            </Box>

            <Box zIndex={1} mb={1}>
              <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography variant="caption">
                  Progress to Level {stats.level + 1}
                </Typography>
                <Typography variant="caption">
                  {stats.xp % 1000} / 1000 XP
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={xpProgress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#fff" },
                }}
              />
            </Box>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card
            sx={{ p: 2, height: "100%", display: "flex", alignItems: "center" }}
          >
            <Box display="flex" alignItems="center" width="100%">
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 152, 0, 0.1)",
                  color: "#ff9800",
                  mr: 2,
                }}
              >
                <LocalFireDepartment fontSize="large" />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {stats.currentStreak}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Day Streak
                </Typography>
              </Box>
              <Box ml="auto" textAlign="right">
                <Typography
                  variant="caption"
                  display="block"
                  color="textSecondary"
                >
                  Longest
                </Typography>
                <Typography variant="body1" fontWeight="600">
                  {stats.longestStreak}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <WorkspacePremium color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="600">
                Badges Collected ({stats.badgesCount})
              </Typography>
            </Box>
            <Box display="flex" flexWrap="wrap">
              {stats.badges.length > 0 ? (
                stats.badges.map((b, i) => (
                  <Tooltip key={i} title={`${b.name}: ${b.description}`}>
                    <Box textAlign="center" mr={2} mb={1}>
                      <BadgeAvatar>
                        {b.icon === "star" && <Stars />}
                        {b.icon === "school" && <School />}
                        {b.icon === "local_fire_department" && (
                          <LocalFireDepartment />
                        )}
                        {b.icon === "workspace_premium" && <WorkspacePremium />}
                        {![
                          "star",
                          "school",
                          "local_fire_department",
                          "workspace_premium",
                        ].includes(b.icon) && <WorkspacePremium />}
                      </BadgeAvatar>
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{ mt: 0.5 }}
                      >
                        {b.name}
                      </Typography>
                    </Box>
                  </Tooltip>
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontStyle: "italic" }}
                >
                  Complete activities to earn your first badge!
                </Typography>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GamificationStats;
