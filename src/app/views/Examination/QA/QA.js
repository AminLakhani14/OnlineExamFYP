import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import HeadBreadCrumb from "app/components/BreadCrumb/HeadBreadCrumb";
import axios from "axios";
import { useEffect } from "react";

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
      <HeadBreadCrumb text1={"Dashboard"} text2={"Question/Answer"} url={"/"} />

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
              <label className="align-items-center mt-2 d-flex px-2">
                marks:
              </label>
              <TextField
                fullWidth
                size="small"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
            </div>
          </div>
          <TextField
            className="mt-2"
            fullWidth
            size="small"
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
              size="small"
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
            <div className="d-flex mt-1">
              <TextField
                fullWidth
                size="small"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
              <TextField
                className="ms-3"
                fullWidth
                size="small"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
              <TextField
                fullWidth
                size="small"
                className="ms-3"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
              <TextField
                fullWidth
                size="small"
                className="ms-3"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
              <TextField
                fullWidth
                size="small"
                className="ms-3"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between footerBtn">
        <Button
          variant="outlined"
          className=""
          sx={{
            width: 200,
          }}
          startIcon={<SendIcon />}
        >
          Add Question
        </Button>
        <Button
          variant="outlined"
          className=""
          sx={{
            width: 200,
            color: "red",
          }}
          startIcon={<DeleteIcon />}
        >
          Clear
        </Button>
      </div>
    </>
  );
};
export default QA;
