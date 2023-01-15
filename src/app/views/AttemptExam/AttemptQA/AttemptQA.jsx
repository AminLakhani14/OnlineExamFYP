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
import HeadBreadCrumb from "app/components/BreadCrumb/HeadBreadCrumb";

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
      <HeadBreadCrumb text1={"Dashboard"} text2={"Question/Answer"} url={"/"} />
      <div className="row m-2">
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <h3 id="QuestionText" className="mt-2">
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
          <h6 className="mt-1">
            Who is the current Prime Minister of Pakistan?Which Party did he
            belongs to?
          </h6>
          <div>
            <h3 id="AnswerText" className="mt-5">
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
        </div>
      </div>
      <div className="d-flex justify-content-between footerBtn">
            <Button
              variant="outlined"
              sx={{
                width: 200,
                color: "red",
              }}
              endIcon={<NavigateNextIcon />}
            >
              Next Question
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: 200,
              }}
              endIcon={<SaveIcon />}
            >
              Save Answer
            </Button>
          </div>
    </>
  );
};
export default AttemptQA;
