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
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "../../../axios";
import useAuth from "app/hooks/useAuth";

const Assignments = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    Title: "",
    Description: "",
    DueDate: "",
    MaxMarks: 10,
    ClassId: "",
    SubjectId: "",
    FilePath: "",
  });
  const [submissionFile, setSubmissionFile] = useState("");

  const isTeacher =
    user.role === "Teacher" || user.role === "Admin" || user.role === "SA";

  const fetchAssignments = useCallback(async () => {
    try {
      const res = await axios.get("/api/Assignments");
      setAssignments(res.data);
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

  useEffect(() => {
    fetchAssignments();
    fetchClasses();
  }, [fetchAssignments, fetchClasses]);

  const handleClassChange = (e) => {
    const classId = e.target.value;
    setNewAssignment({ ...newAssignment, ClassId: classId, SubjectId: "" });
    fetchSubjects(classId);
  };

  const handleCreateAssignment = async () => {
    try {
      await axios.post("/api/Assignments", newAssignment);
      setOpen(false);
      fetchAssignments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmission = async () => {
    try {
      await axios.post("/api/Assignments/submit", {
        AssignmentId: selectedAssignment.id,
        FilePath: submissionFile,
      });
      setSubmitOpen(false);
      alert("Assignment submitted successfully!");
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
        <Typography variant="h4">Assignments</Typography>
        {isTeacher && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            New Assignment
          </Button>
        )}
      </Box>

      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Max Marks</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((a) => (
              <TableRow key={a.id}>
                <TableCell>{a.title}</TableCell>
                <TableCell>{a.subject?.name}</TableCell>
                <TableCell>
                  {new Date(a.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{a.maxMarks}</TableCell>
                <TableCell>
                  <IconButton href={a.filePath} target="_blank">
                    <DownloadIcon color="primary" />
                  </IconButton>
                  {!isTeacher && (
                    <Button
                      startIcon={<CloudUploadIcon />}
                      color="secondary"
                      onClick={() => {
                        setSelectedAssignment(a);
                        setSubmitOpen(true);
                      }}
                    >
                      Submit
                    </Button>
                  )}
                  {isTeacher && (
                    <IconButton
                      onClick={() =>
                        alert(
                          "Submissions view coming in Phase 5 AI Evaluation!"
                        )
                      }
                    >
                      <VisibilityIcon color="action" />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Teacher: Create Assignment */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create New Assignment</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Title"
              fullWidth
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, Title: e.target.value })
              }
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              onChange={(e) =>
                setNewAssignment({
                  ...newAssignment,
                  Description: e.target.value,
                })
              }
            />
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select
                value={newAssignment.ClassId}
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
            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select
                value={newAssignment.SubjectId}
                label="Subject"
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    SubjectId: e.target.value,
                  })
                }
              >
                {subjects.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Due Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, DueDate: e.target.value })
              }
            />
            <TextField
              label="Max Marks"
              type="number"
              fullWidth
              value={newAssignment.MaxMarks}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, MaxMarks: e.target.value })
              }
            />
            <TextField
              label="Instruction File URL"
              fullWidth
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, FilePath: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateAssignment}
          >
            Post Assignment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Student: Submit Assignment */}
      <Dialog open={submitOpen} onClose={() => setSubmitOpen(false)}>
        <DialogTitle>Submit Work: {selectedAssignment?.title}</DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <TextField
              label="Your Work URL / File Path"
              fullWidth
              value={submissionFile}
              onChange={(e) => setSubmissionFile(e.target.value)}
              helperText="For now, provide a link to your work."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubmitOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmission}
          >
            Submit Now
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Assignments;
