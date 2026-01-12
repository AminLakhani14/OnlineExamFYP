import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Box,
  CircularProgress,
  Button,
  Avatar,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import axios from "axios.js";
import useAuth from "app/hooks/useAuth";

const AITutor = () => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFeedback = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/AIEvaluation/student-performance-feedback/${user.id}`
      );
      setFeedback(res.data.feedback);
    } catch (err) {
      console.error(err);
      setFeedback("Failed to get AI feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  return (
    <Card sx={{ p: 3, mb: 3, position: "relative", overflow: "visible" }}>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Avatar sx={{ bgcolor: "secondary.main", width: 56, height: 56 }}>
          <SmartToyIcon sx={{ fontSize: 32 }} />
        </Avatar>
        <Box>
          <Typography variant="h6">AI Personal Tutor</Typography>
          <Typography variant="body2" color="textSecondary">
            Insights based on your performance
          </Typography>
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Typography
          variant="body1"
          sx={{
            fontStyle: "italic",
            color: "#555",
            borderLeft: "4px solid #ddd",
            pl: 2,
          }}
        >
          "{feedback}"
        </Typography>
      )}

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          size="small"
          color="secondary"
          onClick={fetchFeedback}
          disabled={loading}
        >
          Refresh Insights
        </Button>
      </Box>
    </Card>
  );
};

export default AITutor;
