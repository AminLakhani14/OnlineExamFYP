import {
  Box,
  Button,
  Card,
  Grid,
  styled,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "axios.js";

const Container = styled(Box)(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  padding: "32px",
}));

const TenantSettings = () => {
  const [settings, setSettings] = useState({
    primaryColor: "#1976d2",
    secondaryColor: "#9c27b0",
    logoPath: "",
    passingPercentage: 40,
    gradingSystem: "Absolute",
    enableGamification: true,
    enableAIQuizzes: true,
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axiosInstance.get("api/Tenant/settings");
      if (res.data) setSettings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      await axiosInstance.post("api/Tenant/settings", settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        School Configuration
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <StyledCard>
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Branding & Theme
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Primary Color"
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) =>
                    setSettings({ ...settings, primaryColor: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Secondary Color"
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) =>
                    setSettings({ ...settings, secondaryColor: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Logo URL"
                  value={settings.logoPath}
                  onChange={(e) =>
                    setSettings({ ...settings, logoPath: e.target.value })
                  }
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" fontWeight="bold" mb={3}>
              Academic Rules
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Passing Percentage"
                  type="number"
                  value={settings.passingPercentage}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      passingPercentage: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Grading System</InputLabel>
                  <Select
                    value={settings.gradingSystem}
                    label="Grading System"
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        gradingSystem: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Absolute">Absolute (Standard)</MenuItem>
                    <MenuItem value="Relative">Relative (Curved)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" fontWeight="bold" mb={3}>
              Feature Management
            </Typography>
            <Box display="flex" flexDirection="column">
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableGamification}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        enableGamification: e.target.checked,
                      })
                    }
                  />
                }
                label="Enable Gamification (XP, Badges, Leaderboards)"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableAIQuizzes}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        enableAIQuizzes: e.target.checked,
                      })
                    }
                  />
                }
                label="Enable AI-Powered Quiz Generation"
              />
            </Box>

            <Box mt={4}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </Box>
          </StyledCard>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Tenant Info
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Configure your school's unique branding and rules here. These
              settings apply globally to all your teachers and students.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TenantSettings;
