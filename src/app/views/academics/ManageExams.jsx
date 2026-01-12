import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import axios from "../../../axios";

const ManageExams = () => {
  const [exams, setExams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]); // Question Bank
  const [open, setOpen] = useState(false);
  const [newExam, setNewExam] = useState({
    Title: "",
    Description: "",
    DurationMinutes: 60,
    StartTime: "",
    EndTime: "",
    ClassId: "",
    SubjectId: "",
    ExamType: "MCQ", // MCQ or Subjective
  });
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const fetchExams = useCallback(async () => {
    try {
      const res = await axios.get("/api/Exams");
      setExams(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchClasses = useCallback(async () => {
    try {
      const res = await axios.get("/api/Classes");
      setClasses(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchSubjects = useCallback(async (classId) => {
    try {
      const res = await axios.get(`/api/Subjects?classId=${classId}`);
      setSubjects(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchQuestions = useCallback(async (type) => {
    try {
      const endpoint = type === "MCQ" ? "/api/MCQs" : "/api/QuestionAnswer";
      const res = await axios.get(endpoint);
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchExams();
    fetchClasses();
  }, [fetchExams, fetchClasses]);

  const handleClassChange = (e) => {
    const classId = e.target.value;
    setNewExam({ ...newExam, ClassId: classId, SubjectId: "" });
    fetchSubjects(classId);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setNewExam({ ...newExam, ExamType: type });
    fetchQuestions(type);
    setSelectedQuestions([]);
  };

  const toggleQuestion = (id) => {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    try {
      const examData = {
        ...newExam,
        Questions: selectedQuestions.map((id) =>
          newExam.ExamType === "MCQ" ? { MCQId: id } : { QAId: id }
        ),
      };
      await axios.post("/api/Exams", examData);
      setOpen(false);
      fetchExams();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Manage Exams</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Create New Exam
        </Button>
      </Box>

      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>StartTime</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.title}</TableCell>
                <TableCell>{exam.class?.name}</TableCell>
                <TableCell>{exam.subject?.name}</TableCell>
                <TableCell>
                  {new Date(exam.startTime).toLocaleString()}
                </TableCell>
                <TableCell>{exam.durationMinutes} mins</TableCell>
                <TableCell>{exam.examType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Create New Exam</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Exam Title"
                fullWidth
                value={newExam.Title}
                onChange={(e) =>
                  setNewExam({ ...newExam, Title: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  value={newExam.ClassId}
                  label="Class"
                  onChange={handleClassChange}
                >
                  {classes.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Subject</InputLabel>
                <Select
                  value={newExam.SubjectId}
                  label="Subject"
                  onChange={(e) =>
                    setNewExam({ ...newExam, SubjectId: e.target.value })
                  }
                >
                  {subjects.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Start Time"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setNewExam({ ...newExam, StartTime: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="End Time"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setNewExam({ ...newExam, EndTime: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Duration (Minutes)"
                type="number"
                fullWidth
                value={newExam.DurationMinutes}
                onChange={(e) =>
                  setNewExam({ ...newExam, DurationMinutes: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Exam Type</InputLabel>
                <Select
                  value={newExam.ExamType}
                  label="Exam Type"
                  onChange={handleTypeChange}
                >
                  <MenuItem value="MCQ">MCQ</MenuItem>
                  <MenuItem value="Subjective">Subjective</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" mb={1}>
                Select Questions from Bank
              </Typography>
              <Box
                sx={{
                  maxHeight: 300,
                  overflow: "auto",
                  border: "1px solid #ddd",
                  p: 1,
                }}
              >
                {questions.map((q) => (
                  <FormControlLabel
                    key={q.id}
                    control={
                      <Checkbox
                        checked={selectedQuestions.includes(q.id)}
                        onChange={() => toggleQuestion(q.id)}
                      />
                    }
                    label={q.question}
                    sx={{ width: "100%", ml: 0 }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create Exam
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageExams;
