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
import SaveIcon from "@mui/icons-material/Save";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const AttemptQA = () => {
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
      <div className="row m-0">
        <div className="d-flex justify-content-between mt-4">
          <h3 id="QuestionText" className="m-0 mt-2">
            Question1:{" "}
          </h3>
          <div className="align-items-center d-flex justify-content-end w-auto">
            <label className="align-items-center mt-2 d-flex px-2">
              marks:
            </label>
            <TextField
              className="mt-2 w-50"
              fullWidth
              disabled
              size="small"
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
              }}
            />
          </div>
        </div>
      </div>
      <div className="row m-0">
        <div className="col-12">
          <h6>
            Who is the current Prime Minister of Pakistan?Which Party did he
            belongs to?
          </h6>
        </div>
      </div>

      <br />

      <div className="row m-0">
        <div className="col-3">
          <h3 id="AnswerText">Answer:</h3>
        </div>
      </div>

      <div className="row m-0">
        <div className="col-12">
          <TextField
            fullWidth
            sx={{
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
            }}
          />
        </div>
      </div>

      <br />

      <br />
      <br />
      <br />
      <div className="row m-0">
        <div className="col-12">
          {/* <Button variant="contained">Add Question</Button> */}
          <Button
            variant="outlined"
            className="float-end"
            sx={{
              width: 300,
              color: "red",
            }}
            endIcon={<NavigateNextIcon />}
          >
            Next Question
          </Button>

          <Button
            variant="outlined"
            className="float-start"
            sx={{
              width: 300,
            }}
            endIcon={<SaveIcon />}
          >
            Save Answer
          </Button>
        </div>
      </div>
    </>
  );
};
export default AttemptQA;
