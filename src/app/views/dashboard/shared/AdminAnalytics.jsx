import {
  Box,
  Card,
  Grid,
  styled,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import axiosInstance from "axios.js";
import { People, School, Class, TrendingUp } from "@mui/icons-material";

const Container = styled(Box)(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const StatCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "20px",
  gap: "20px",
  height: "100%",
}));

const IconBox = styled(Box)(({ theme, color }) => ({
  width: "50px",
  height: "50px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color + "20",
  color: color,
}));

const AdminAnalytics = () => {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("api/Analytics/overview");
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  const attendanceOption = {
    tooltip: { trigger: "axis" },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "category",
      data: data?.attendanceTrends?.map((t) =>
        new Date(t.date).toLocaleDateString()
      ),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Present Rate",
        type: "line",
        smooth: true,
        data: data?.attendanceTrends?.map((t) =>
          Math.round((t.presentCount / t.totalCount) * 100)
        ),
        color: theme.palette.primary.main,
      },
    ],
  };

  const stats = [
    {
      label: "Total Students",
      value: data?.stats?.totalStudents,
      icon: <People />,
      color: "#1976d2",
    },
    {
      label: "Total Teachers",
      value: data?.stats?.totalTeachers,
      icon: <School />,
      color: "#2e7d32",
    },
    {
      label: "Total Classes",
      value: data?.stats?.totalClasses,
      icon: <Class />,
      color: "#ed6c02",
    },
    {
      label: "Avg Score",
      value: data?.performanceOverview?.avgScore + "%",
      icon: <TrendingUp />,
      color: "#9c27b0",
    },
  ];

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        School Insights
      </Typography>

      <Grid container spacing={3} mb={4}>
        {stats?.map((stat, i) => (
          <Grid item lg={3} md={6} sm={12} xs={12} key={i}>
            <StatCard>
              <IconBox color={stat.color}>{stat.icon}</IconBox>
              <Box>
                <Typography color="textSecondary" variant="subtitle2">
                  {stat.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
              </Box>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Attendance Trends
            </Typography>
            <ReactECharts
              option={attendanceOption}
              style={{ height: "350px" }}
            />
          </Card>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Card sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Key Metrics
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Academic Excellence
              </Typography>
              <Typography variant="body1">
                Average performance has increased by 15% this month.
              </Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                System Health
              </Typography>
              <Typography variant="body1">
                All server nodes are operational. High user activity detected.
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminAnalytics;
