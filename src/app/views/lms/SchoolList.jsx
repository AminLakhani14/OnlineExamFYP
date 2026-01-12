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
} from "@mui/material";
import axios from "axios.js";
import Breadcrumb from "app/components/Breadcrumb";

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

const SchoolList = () => {
  const [schools, setSchools] = useState([]);
  const [open, setOpen] = useState(false);
  const [newSchool, setNewSchool] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const res = await axios.get("/api/Schools");
      setSchools(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddSchool = async () => {
    try {
      await axios.post("/api/Schools", newSchool);
      setOpen(false);
      setNewSchool({ name: "", address: "", city: "", country: "" });
      fetchSchools();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/Schools/${id}`);
      fetchSchools();
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
            { name: "Schools" },
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
          Add New School
        </Button>

        <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: 3 }}>Name</TableCell>
                <TableCell sx={{ px: 0 }}>City</TableCell>
                <TableCell sx={{ px: 0 }}>Country</TableCell>
                <TableCell sx={{ px: 0 }}>Status</TableCell>
                <TableCell sx={{ px: 0 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schools.map((school) => (
                <TableRow key={school.id}>
                  <TableCell sx={{ px: 3 }}>{school.name}</TableCell>
                  <TableCell sx={{ px: 0 }}>{school.city}</TableCell>
                  <TableCell sx={{ px: 0 }}>{school.country}</TableCell>
                  <TableCell sx={{ px: 0 }}>
                    {school.isActive ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell sx={{ px: 0 }}>
                    <IconButton onClick={() => handleDelete(school.id)}>
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
        <DialogTitle>Add New School</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="School Name"
            type="text"
            fullWidth
            value={newSchool.name}
            onChange={(e) =>
              setNewSchool({ ...newSchool, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            value={newSchool.address}
            onChange={(e) =>
              setNewSchool({ ...newSchool, address: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="City"
            type="text"
            fullWidth
            value={newSchool.city}
            onChange={(e) =>
              setNewSchool({ ...newSchool, city: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Country"
            type="text"
            fullWidth
            value={newSchool.country}
            onChange={(e) =>
              setNewSchool({ ...newSchool, country: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddSchool} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SchoolList;
