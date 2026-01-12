import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  Avatar,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../axios";
import { EmojiEvents, TrendingUp } from "@mui/icons-material";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const RankAvatar = styled(Avatar)(({ theme, rank }) => ({
  backgroundColor:
    rank === 1
      ? "#ffd700"
      : rank === 2
      ? "#c0c0c0"
      : rank === 3
      ? "#cd7f32"
      : theme.palette.primary.main,
  width: rank <= 3 ? 40 : 32,
  height: rank <= 3 ? 40 : 32,
  fontSize: rank <= 3 ? "1.2rem" : "1rem",
  fontWeight: "bold",
  marginRight: "12px",
}));

const Leaderboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("api/Gamification/leaderboard")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) return null;

  return (
    <Card sx={{ px: 3, py: 2, mb: 3 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <EmojiEvents color="warning" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="600">
            Top Students
          </Typography>
        </Box>
        <Chip
          icon={<TrendingUp />}
          label={`Your Rank: #${data.currentUserRank}`}
          color="primary"
          variant="outlined"
          size="small"
        />
      </Box>

      <TableContainer>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left">Rank</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Level</TableCell>
              <TableCell align="right">XP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.topUsers.map((user, index) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <RankAvatar rank={index + 1}>{index + 1}</RankAvatar>
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    variant="body2"
                    fontWeight={index < 3 ? "bold" : "normal"}
                  >
                    {user.userName}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={`Lv. ${user.level}`}
                    size="small"
                    color="secondary"
                    variant="soft"
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="bold">
                    {user.xp} XP
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </Card>
  );
};

export default Leaderboard;
