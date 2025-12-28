import { Card, Grid, styled, useTheme } from "@mui/material";
import { Fragment } from "react";
import DoughnutChart from "./shared/Doughnut";
import StatCards from "./shared/StatCards";
import TopSellingTable from "./shared/TopSellingTable";
import UpgradeCard from "./shared/UpgradeCard";
import AITutor from "./shared/AITutor";
import GamificationStats from "./shared/GamificationStats";
import Leaderboard from "./shared/Leaderboard";
import AdminAnalytics from "./shared/AdminAnalytics";
import TeacherAnalytics from "./shared/TeacherAnalytics";
import useAuth from "app/hooks/useAuth";

const Analytics = () => {
  const ContentBox = styled("div")(({ theme }) => ({
    margin: "30px",
    paddingBottom: "40px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
  }));

  const Title = styled("span")(() => ({
    fontSize: "1rem",
    fontWeight: "500",
    marginRight: ".5rem",
    textTransform: "capitalize",
  }));

  const SubTitle = styled("span")(({ theme }) => ({
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  }));

  const { palette } = useTheme();
  const { user } = useAuth();

  return (
    <Fragment className="dashboard">
      <ContentBox className="analytics">
        {/* Analytics for Admin/SA */}
        {(user.role === "SA" || user.role === "Admin") && <AdminAnalytics />}

        {/* Analytics for Teachers */}
        {user.role === "Teacher" && <TeacherAnalytics />}

        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <UpgradeCard />
            <GamificationStats />
            <AITutor />
            <TopSellingTable />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>CGPA Records</Title>
              <SubTitle>Last 4 years</SubTitle>

              <DoughnutChart
                height="340px"
                color={[
                  palette.primary.dark,
                  palette.primary.main,
                  palette.primary.light,
                ]}
              />
            </Card>

            <Leaderboard />
            <StatCards />
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
