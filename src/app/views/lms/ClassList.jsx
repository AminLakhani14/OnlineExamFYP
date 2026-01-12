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

const ClassList = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [schools, setSchools] = useState([]);
  const [open, setOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    name: "",
    section: "",
    schoolId: user.schoolId || "",
  });

  const fetchClasses = React.useCallback(async () => {
    try {
      const url =
        user.role === "SA"
          ? "/api/Classes"
          : `/api/Classes?schoolId=${user.schoolId}`;
      const res = await axios.get(url);
      setClasses(res.data);
    } catch (e) {
      console.error(e);
    }
  }, [user.role, user.schoolId]);

  const fetchSchools = React.useCallback(async () => {
    try {
      const res = await axios.get("/api/Schools");
      setSchools(res.data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
    if (user.role === "SA") {
      fetchSchools();
    }
  }, [fetchClasses, fetchSchools, user.role]);

  const handleAddClass = async () => {
    try {
      await axios.post("/api/Classes", newClass);
      setOpen(false);
      setNewClass({ name: "", section: "", schoolId: user.schoolId || "" });
      fetchClasses();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/Classes/${id}`);
      fetchClasses();
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
            { name: "Classes" },
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
          Add New Class
        </Button>

        <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: 3 }}>Class Name</TableCell>
                <TableCell sx={{ px: 0 }}>Section</TableCell>
                {user.role === "SA" && (
                  <TableCell sx={{ px: 0 }}>School</TableCell>
                )}
                <TableCell sx={{ px: 0 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ px: 3 }}>{item.name}</TableCell>
                  <TableCell sx={{ px: 0 }}>{item.section}</TableCell>
                  {user.role === "SA" && (
                    <TableCell sx={{ px: 0 }}>{item.schoolId}</TableCell>
                  )}
                  <TableCell sx={{ px: 0 }}>
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <Icon color="error">delete</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </Card>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Class</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Class Name (e.g. Grade 10)"
            type="text"
            fullWidth
            value={newClass.name}
            onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Section"
            type="text"
            fullWidth
            value={newClass.section}
            onChange={(e) =>
              setNewClass({ ...newClass, section: e.target.value })
            }
          />
          {user.role === "SA" && (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>School</InputLabel>
              <Select
                value={newClass.schoolId}
                label="School"
                onChange={(e) =>
                  setNewClass({ ...newClass, schoolId: e.target.value })
                }
              >
                {schools.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddClass} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClassList;
