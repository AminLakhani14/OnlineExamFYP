import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Radio,
  RadioGroup,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "../../../axios";
import useAuth from "app/hooks/useAuth";

const Attendance = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState({});
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchClasses();
  }, []);

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

  const fetchStudents = async (classId) => {
    setLoading(true);
    try {
      const res = await axios.get("/api/Registration/Get-Register");
      // Filter students by classId
      const filtered = res.data.filter(
        (s) => s.classId === classId && s.type === "Student"
      );
      setStudents(filtered);

      // Initialize attendance data
      const initialData = {};
      filtered.forEach((s) => {
        initialData[s.id] = "Present";
      });
      setAttendanceData(initialData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClassChange = (e) => {
    const classId = e.target.value;
    setSelectedClass(classId);
    setSelectedSubject("");
    setStudents([]);
    fetchSubjects(classId);
    fetchStudents(classId);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async () => {
    const records = Object.keys(attendanceData).map((studentId) => ({
      StudentId: parseInt(studentId),
      ClassId: selectedClass,
      SubjectId: selectedSubject || null,
      Date: new Date().toISOString(),
      Status: attendanceData[studentId],
      SchoolId: user.schoolId,
    }));

    try {
      await axios.post("/api/Attendance/bulk", records);
      setNotification({
        open: true,
        message: "Attendance marked successfully!",
        severity: "success",
      });
    } catch (err) {
      setNotification({
        open: true,
        message: "Failed to mark attendance",
        severity: "error",
      });
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb={3}>
        Mark Attendance
      </Typography>

      <Card sx={{ p: 3, mb: 3 }}>
        <Box display="flex" gap={2}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Select Class</InputLabel>
            <Select
              value={selectedClass}
              label="Select Class"
              onChange={handleClassChange}
            >
              {classes.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name} - {c.section}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Select Subject (Optional)</InputLabel>
            <Select
              value={selectedSubject}
              label="Select Subject (Optional)"
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <MenuItem value="">General Attendance</MenuItem>
              {subjects.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Card>

      {loading ? (
        <CircularProgress />
      ) : students.length > 0 ? (
        <Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.userName}</TableCell>
                  <TableCell>
                    <RadioGroup
                      row
                      value={attendanceData[student.id]}
                      onChange={(e) =>
                        handleAttendanceChange(student.id, e.target.value)
                      }
                    >
                      <FormControlLabel
                        value="Present"
                        control={<Radio color="success" />}
                        label="Present"
                      />
                      <FormControlLabel
                        value="Absent"
                        control={<Radio color="error" />}
                        label="Absent"
                      />
                      <FormControlLabel
                        value="Late"
                        control={<Radio color="warning" />}
                        label="Late"
                      />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box p={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Attendance
            </Button>
          </Box>
        </Card>
      ) : (
        selectedClass && (
          <Typography>No students found in this class.</Typography>
        )
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Attendance;
