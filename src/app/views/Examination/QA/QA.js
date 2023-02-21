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
import { useEffect, useState } from "react";

const INITIAL_STATE = {
  course: "",
  question: "",
  answer: "",
  marks: "",
  keyword1: "",
  keyword2: "",
  keyword3: "",
  keyword4: "",
  keyword5: "",
};
const QA = () => {
  const [post, setpost] = useState();
  const [formData, setformData] = useState({ ...INITIAL_STATE });

  function reset(prevState) {
    prevState.preventDefault();
    setformData({
      course: "",
      question: "",
      answer: "",
      marks: "",
      keyword1: "",
      keyword2: "",
      keyword3: "",
      keyword4: "",
      keyword5: "",
    });
  }

  const getpost = () => {
    debugger;

    axios
      .post(`https://localhost:7040/api/Question`, formData)
      .then((res) => {
        debugger;
        if (res.status === 200) {
          setpost(res.data);
          console.log("hello world", res.data);
        } else {
          console.log("something went wrong");
        }
      })
      .catch((err) => {
        debugger;
        console.error(err);
      });
  };

  const names = [
    "Programming Fundamentals",
    "OOP",
    "Artifical Intelligence",
    "Software Engineering",
    "BlockChain",
    "Parallel and Distributive Programming",
  ];

  const handleChange = (e) => {
    try {
      let name = e.target.name;
      let value = e.target.value;
      setformData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } catch (error) {}
  };

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
              name="course"
              onChange={handleChange}
              value={formData.course}
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
                className="mt-2 w-50"
                fullWidth
                size="small"
                name="marks"
                onChange={handleChange}
                value={formData.marks}
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
            name="question"
            onChange={handleChange}
            value={formData.question}
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
              name="answer"
              onChange={handleChange}
              value={formData.answer}
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
                name="keyword1"
                onChange={handleChange}
                value={formData.keyword1}
                size="small"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
              <TextField
                className="ms-3"
                fullWidth
                name="keyword2"
                value={formData.keyword2}
                onChange={handleChange}
                size="small"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
              <TextField
                fullWidth
                size="small"
                name="keyword3"
                value={formData.keyword3}
                onChange={handleChange}
                className="ms-3"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
              <TextField
                fullWidth
                name="keyword4"
                value={formData.keyword4}
                onChange={handleChange}
                size="small"
                className="ms-3"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
              <TextField
                fullWidth
                name="keyword5"
                value={formData.keyword5}
                onChange={handleChange}
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
            color: "red",
          }}
          startIcon={<DeleteIcon />}
          onClick={reset}
        >
          Clear
        </Button>

        <Button
          variant="outlined"
          className=""
          sx={{
            width: 200,
          }}
          onClick={getpost}
          startIcon={<SendIcon />}
        >
          Add Question
        </Button>
      </div>
    </>
  );
};
export default QA;
