import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios.js";
import Breadcrumb from "app/components/Breadcrumb";
import useAuth from "app/hooks/useAuth";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const SubjectList = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({
    name: "",
    classId: "",
    schoolId: user.schoolId,
  });

  const fetchSubjects = React.useCallback(async () => {
    try {
      const res = await axios.get(`/api/Subjects?schoolId=${user.schoolId}`);
      setSubjects(res.data);
    } catch (e) {
      console.error(e);
    }
  }, [user.schoolId]);

  const fetchClasses = React.useCallback(async () => {
    try {
      const res = await axios.get(`/api/Classes?schoolId=${user.schoolId}`);
      setClasses(res.data);
    } catch (e) {
      console.error(e);
    }
  }, [user.schoolId]);

  const fetchTeachers = React.useCallback(async () => {
    try {
      const res = await axios.get("/api/Registration");
      const filtered = res.data.filter(
        (u) => u.type === "Teacher" && u.schoolId === user.schoolId
      );
      setTeachers(filtered);
    } catch (e) {
      console.error(e);
    }
  }, [user.schoolId]);

  useEffect(() => {
    fetchSubjects();
    fetchClasses();
    fetchTeachers();
  }, [fetchSubjects, fetchClasses, fetchTeachers]);

  const handleAddSubject = async () => {
    try {
      await axios.post("/api/Subjects", newSubject);
      setOpen(false);
      fetchSubjects();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAssignTeacher = async (subjectId, teacherId) => {
    try {
      await axios.put(`/api/Subjects/${subjectId}/assign-teacher`, teacherId, {
        headers: { "Content-Type": "application/json" },
      });
      fetchSubjects();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Administration", path: "/" },
            { name: "Subjects" },
          ]}
        />
      </Box>

      <Box width="100%" overflow="auto">
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => setOpen(true)}
        >
          Add New Subject
        </Button>

        <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: 3 }}>Subject Name</TableCell>
                <TableCell sx={{ px: 0 }}>Class</TableCell>
                <TableCell sx={{ px: 0 }}>Assigned Teacher</TableCell>
                <TableCell sx={{ px: 0 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((item) => {
                const className =
                  classes.find((c) => c.id === item.classId)?.name || "N/A";
                return (
                  <TableRow key={item.id}>
                    <TableCell sx={{ px: 3 }}>{item.name}</TableCell>
                    <TableCell sx={{ px: 0 }}>{className}</TableCell>
                    <TableCell sx={{ px: 0 }}>
                      <FormControl fullWidth size="small">
                        <Select
                          value={item.teacherId || ""}
                          onChange={(e) =>
                            handleAssignTeacher(item.id, e.target.value)
                          }
                        >
                          <MenuItem value="">Unassigned</MenuItem>
                          {teachers.map((t) => (
                            <MenuItem key={t.id} value={t.id}>
                              {t.userName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell sx={{ px: 0 }}>
                      <IconButton>
                        <Icon color="error">delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </StyledTable>
        </Card>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Subject</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Subject Name"
            type="text"
            fullWidth
            value={newSubject.name}
            onChange={(e) =>
              setNewSubject({ ...newSubject, name: e.target.value })
            }
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Class</InputLabel>
            <Select
              value={newSubject.classId}
              label="Class"
              onChange={(e) =>
                setNewSubject({ ...newSubject, classId: e.target.value })
              }
            >
              {classes.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name} - {c.section}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddSubject} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SubjectList;
