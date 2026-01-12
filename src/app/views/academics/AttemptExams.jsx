import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "../../../axios";
import { useNavigate } from "react-router-dom";

const AttemptExams = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  const fetchExams = useCallback(async () => {
    try {
      // For now, let's assume we fetch all exams available for the student's class
      // The backend will filter by school/class via Global Query Filter
      const res = await axios.get("/api/Exams");
      setExams(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  const handleStartExam = (exam) => {
    const now = new Date();
    const start = new Date(exam.startTime);
    const end = new Date(exam.endTime);

    if (now < start) {
      alert("This exam has not started yet.");
      return;
    }
    if (now > end) {
      alert("This exam has already ended.");
      return;
    }

    // Navigate to respective attempt pages (existing ones or new structured one)
    if (exam.examType === "MCQ") {
      navigate("/AttemptExam/AttemptMCQs", { state: { examId: exam.id } });
    } else {
      navigate("/AttemptExam/AttemptQA", { state: { examId: exam.id } });
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb={3}>
        Active Exams
      </Typography>

      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.title}</TableCell>
                <TableCell>{exam.subject?.name}</TableCell>
                <TableCell>
                  {new Date(exam.startTime).toLocaleString()}
                </TableCell>
                <TableCell>{exam.durationMinutes} mins</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStartExam(exam)}
                  >
                    Start Exam
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
};

export default AttemptExams;
