import {
  Breadcrumbs,
  Button,
  FormControl,
  Input,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

const QA = () => {
  const names = [
    "Programming Fundamentals",
    "OOP",
    "Artifical Intelligence",
    "Software Engineering",
    "BlockChain",
    "Parallel and Distributive Programming",
  ];

  return (
    <>
      <div className="row m-0 mt-3">
        <div className="mb-2 m-1">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/"
              className="d-flex align-items-center"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              <p className="m-0">DashBoard</p>
            </Link>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              Question/Answer
            </Typography>
          </Breadcrumbs>
        </div>
        <hr />
      </div>

      <div className="row m-2">
        <div className="col-12">
          <FormControl className="mt-4" sx={{ minWidth: 400 }} size="small">
            <InputLabel id="demo-select-small">Subject</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label="Subject"
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="d-flex justify-content-between mt-4">
            <h3 id="QuestionText" className="m-0">
              Question1:{" "}
            </h3>
            <div className="align-items-center d-flex justify-content-end w-auto">
              <label className="align-items-center d-flex px-2">marks:</label>
              <input type={Text} className="h-75 w-50"></input>
            </div>
          </div>
          <TextField
            className="mt-2"
            fullWidth
            sx={{
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
            }}
          />
          <div className="mt-4">
            <h3 id="AnswerText" className="m-0">
              Answer:
            </h3>
            <TextField
              fullWidth
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
              }}
            />
          </div>
          <div className="mt-4">
            <h3 id="AnswerText" className="m-0">
              Key Words:
            </h3>
            <div className="d-flex">
              <TextField
                fullWidth
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
              <TextField
                className="ms-3"
                fullWidth
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
              <TextField
                fullWidth
                className="ms-3"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
              <TextField
                fullWidth
                className="ms-3"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
              <TextField
                fullWidth
                className="ms-3"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between mt-5 my-5">
            <Button
              variant="outlined"
              className=""
              sx={{
                width: 300,
              }}
              startIcon={<SendIcon />}
            >
              Add Question
            </Button>
            <Button
              variant="outlined"
              className=""
              sx={{
                width: 300,
                color: "red",
              }}
              startIcon={<DeleteIcon />}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default QA;
