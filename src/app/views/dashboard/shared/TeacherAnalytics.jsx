import {
  Box,
  Card,
  Grid,
  styled,
  Typography,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import axiosInstance from "axios.js";

const Container = styled(Box)(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const TeacherAnalytics = () => {
  const theme = useTheme();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [performance, setPerformance] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) fetchPerformance(selectedClass);
  }, [selectedClass]);

  const fetchClasses = async () => {
    try {
      const res = await axiosInstance.get("admin/classes/Get-Classes");
      setClasses(res.data);
      if (res.data.length > 0) setSelectedClass(res.data[0].id);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPerformance = async (classId) => {
    try {
      const res = await axiosInstance.get(`api/Analytics/class/${classId}`);
      setPerformance(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const chartOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    xAxis: {
      type: "category",
      data: performance?.subjectPerformance.map((s) => s.subject) || [],
    },
    yAxis: { type: "value", max: 100 },
    series: [
      {
        data: performance?.subjectPerformance.map((s) => s.averageScore) || [],
        type: "bar",
        color: theme.palette.secondary.main,
      },
    ],
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Class Performance
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Class</InputLabel>
          <Select
            value={selectedClass}
            label="Select Class"
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classes.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.className}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {performance && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Subject-wise Average Scores
              </Typography>
              <ReactECharts option={chartOption} style={{ height: "400px" }} />
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default TeacherAnalytics;
