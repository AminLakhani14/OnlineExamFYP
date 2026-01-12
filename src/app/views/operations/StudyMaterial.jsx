import React, { useState, useEffect } from "react";
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
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import axios from "../../../axios";
import useAuth from "app/hooks/useAuth";

const StudyMaterialView = () => {
  const { user } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiContent, setAiContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState([]);
  const [newMaterial, setNewMaterial] = useState({
    Title: "",
    Description: "",
    FilePath: "",
    FileType: "PDF",
    ClassId: "",
    SubjectId: "",
  });

  const isTeacher =
    user.role === "Teacher" || user.role === "Admin" || user.role === "SA";

  useEffect(() => {
    fetchMaterials();
    fetchClasses();
  }, []);

  const handleGenerateAIQuiz = async () => {
    setIsGenerating(true);
    try {
      const res = await axios.post(
        "/api/AIEvaluation/generate-quiz",
        JSON.stringify(aiContent),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // The backend returns a list of strings, where the first string is the JSON array
      const questions = JSON.parse(res.data[0]);
      setGeneratedQuiz(questions);
    } catch (err) {
      console.error(err);
      alert("Failed to generate quiz. Ensure Gemini API Key is set.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveQuiz = async () => {
    try {
      for (const q of generatedQuiz) {
        await axios.post("/api/MCQs", {
          course: "AI Generated",
          question: q.question,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
          correctAnswer: q.correctAnswer,
          marks: "2",
          schoolId: user.schoolId,
        });
      }
      alert("AI Quiz saved to Question Bank!");
      setAiOpen(false);
      setGeneratedQuiz([]);
      setAiContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMaterials = async () => {
    try {
      const res = await axios.get("/api/StudyMaterial");
      setMaterials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await axios.get("/api/Classes");
      setClasses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubjects = async (classId) => {
    try {
      const res = await axios.get(`/api/Subjects?classId=${classId}`);
      setSubjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClassChange = (e) => {
    const classId = e.target.value;
    setNewMaterial({ ...newMaterial, ClassId: classId, SubjectId: "" });
    fetchSubjects(classId);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/StudyMaterial", {
        ...newMaterial,
        SchoolId: user.schoolId,
      });
      setOpen(false);
      fetchMaterials();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/StudyMaterial/${id}`);
      fetchMaterials();
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
        <Typography variant="h4">Study Materials</Typography>
        {isTeacher && (
          <Box>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<AutoFixHighIcon />}
              onClick={() => setAiOpen(true)}
              sx={{ mr: 2 }}
            >
              AI Quiz Generator
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Add Material
            </Button>
          </Box>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Upload Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materials.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>{m.title}</TableCell>
                    <TableCell>{m.fileType}</TableCell>
                    <TableCell>{m.subjectId}</TableCell>
                    <TableCell>
                      {new Date(m.uploadDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        href={m.filePath}
                        target="_blank"
                      >
                        <DownloadIcon />
                      </IconButton>
                      {isTeacher && (
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(m.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Study Material</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Title"
              fullWidth
              value={newMaterial.Title}
              onChange={(e) =>
                setNewMaterial({ ...newMaterial, Title: e.target.value })
              }
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={newMaterial.Description}
              onChange={(e) =>
                setNewMaterial({ ...newMaterial, Description: e.target.value })
              }
            />
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select
                value={newMaterial.ClassId}
                label="Class"
                onChange={handleClassChange}
              >
                {classes.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name} - {c.section}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select
                value={newMaterial.SubjectId}
                label="Subject"
                onChange={(e) =>
                  setNewMaterial({ ...newMaterial, SubjectId: e.target.value })
                }
              >
                {subjects.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>File Type</InputLabel>
              <Select
                value={newMaterial.FileType}
                label="File Type"
                onChange={(e) =>
                  setNewMaterial({ ...newMaterial, FileType: e.target.value })
                }
              >
                <MenuItem value="PDF">PDF</MenuItem>
                <MenuItem value="PPT">PowerPoint</MenuItem>
                <MenuItem value="Video">Video Link</MenuItem>
                <MenuItem value="Notes">Notes / Document</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="File URL / Path"
              fullWidth
              value={newMaterial.FilePath}
              onChange={(e) =>
                setNewMaterial({ ...newMaterial, FilePath: e.target.value })
              }
              helperText="For now, provide a URL or server path."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>AI Quiz Generator</DialogTitle>
        <DialogContent>
          <Typography variant="body2" mb={2}>
            Paste the lecture content or study notes below. AI will generate 5
            MCQs for you.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            placeholder="Paste your content here..."
            value={aiContent}
            onChange={(e) => setAiContent(e.target.value)}
          />
          {isGenerating && (
            <Typography mt={2}>
              AI is generating your quiz, please wait...
            </Typography>
          )}
          {generatedQuiz.length > 0 && (
            <Box mt={3}>
              <Typography variant="h6">Generated Questions:</Typography>
              {generatedQuiz.map((q, i) => (
                <Box key={i} mt={2} p={2} border="1px solid #eee">
                  <Typography fontWeight="bold">
                    Q{i + 1}: {q.question}
                  </Typography>
                  <Typography variant="body2">
                    A: {q.optionA} | B: {q.optionB} | C: {q.optionC} | D:{" "}
                    {q.optionD}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    Correct: {q.correctAnswer}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAiOpen(false)}>Close</Button>
          {!generatedQuiz.length ? (
            <Button
              variant="contained"
              color="secondary"
              disabled={!aiContent || isGenerating}
              onClick={handleGenerateAIQuiz}
            >
              Generate Quiz
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveQuiz}
            >
              Save to Question Bank
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudyMaterialView;
