import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  FormControl,
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

const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);

  const fetchUsers = React.useCallback(async () => {
    try {
      const res = await axios.get("/api/Registration");
      // Filter by school if not SA
      const filtered =
        user.role === "SA"
          ? res.data
          : res.data.filter((u) => u.schoolId === user.schoolId);
      setUsers(filtered);
    } catch (e) {
      console.error(e);
    }
  }, [user.role, user.schoolId]);

  const fetchClasses = React.useCallback(async () => {
    try {
      const res = await axios.get(`/api/Classes?schoolId=${user.schoolId}`);
      setClasses(res.data);
    } catch (e) {
      console.error(e);
    }
  }, [user.schoolId]);

  useEffect(() => {
    fetchUsers();
    fetchClasses();
  }, [fetchUsers, fetchClasses]);

  const handleAssignClass = async (userId, classId) => {
    try {
      // We need a specific endpoint to update user class, or just use general Update
      // For now let's assume Registration controller has a way to update
      const targetUser = users.find((u) => u.id === userId);
      const updatedUser = { ...targetUser, classId };
      await axios.put(`/api/Registration/${userId}`, updatedUser);
      fetchUsers();
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
            { name: "User Management" },
          ]}
        />
      </Box>

      <Box width="100%" overflow="auto">
        <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: 3 }}>Username</TableCell>
                <TableCell sx={{ px: 0 }}>Role</TableCell>
                <TableCell sx={{ px: 0 }}>Class (Students Only)</TableCell>
                <TableCell sx={{ px: 0 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ px: 3 }}>{item.userName}</TableCell>
                  <TableCell sx={{ px: 0 }}>{item.type}</TableCell>
                  <TableCell sx={{ px: 0 }}>
                    {item.type === "Student" ? (
                      <FormControl fullWidth size="small">
                        <Select
                          value={item.classId || ""}
                          onChange={(e) =>
                            handleAssignClass(item.id, e.target.value)
                          }
                        >
                          <MenuItem value="">No Class</MenuItem>
                          {classes.map((c) => (
                            <MenuItem key={c.id} value={c.id}>
                              {c.name} - {c.section}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell sx={{ px: 0 }}>
                    <IconButton>
                      <Icon color="error">delete</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </Card>
      </Box>
    </Container>
  );
};

export default UserManagement;
