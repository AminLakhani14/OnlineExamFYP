import { Box, Button, TextField, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HeadBreadCrumb from "app/components/BreadCrumb/HeadBreadCrumb";
import { Modal } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../../../axios";
import DialogBox from "app/components/DialogBox/DialogBox";
import { useNavigate } from "react-router-dom";

const AttemptQA = () => {
  const [ScoreModal, setScoreModal] = useState(false);
  const [openDialogbox, setOpenDialogBox] = useState(false);
  const [answerData, setanswerData] = useState("");
  const [Obtainedmarks, setObtainedmarks] = useState(0);
  const navigate = useNavigate();
  const handleOk = () => {
    setScoreModal(false);
    localStorage.setItem("QAMarks", Obtainedmarks);
    navigate("/");
  };

  const handleCancel = () => {
    setScoreModal(false);
    localStorage.setItem("QAMarks", Obtainedmarks);
    navigate("/");
  };
  const [tableData, setTableData] = useState([]);
  const [currentQuestion, setcurrentQuestion] = useState({});

  // const [time, setTime] = useState(60);

  // useEffect(() => {
  //   let timer = setInterval(() => {
  //     setTime((time) => {
  //       if (time === 0) {
  //         clearInterval(timer);
  //         setScoreModal(true);
  //         return 0;
  //       } else return time - 1;
  //     });
  //   }, 1000);
  // }, []);

  // useEffect(() => {
  //   function handleVisibilityChange() {
  //     if (document.visibilityState === 'hidden') {
  //       // The user switched to another tab or minimized the browser window
  //       // Perform some actions here, such as pausing a video or showing a warning
  //        alert('Please stay on this page');
  //       setScoreModal(true);

  //     } else {
  //       // The user switched back to the tab
  //       // Perform some actions here, such as resuming a video or hiding the warning
  //     }
  //   }

  //   document.addEventListener('visibilitychange', handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //   };
  // }, []);

  const closeDialogBox = () => {
    setOpenDialogBox(false);
  };
  const getpost = () => {
    axios
      .get("/api/Question/get-question")
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length) {
            setTableData(res.data);
            setcurrentQuestion(res.data[0]);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getpost();
  }, []);

  console.log(tableData);

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [aiFeedback, setAiFeedback] = useState([]);

  const clickNextQuestion = (e) => {
    if (!answerData) {
      setOpenDialogBox(true);
    } else {
      evaluateWithAI();
    }
  };

  const evaluateWithAI = async () => {
    setIsEvaluating(true);
    try {
      const response = await axios.post("/api/AIEvaluation/evaluate-answer", {
        Question: currentQuestion.question,
        StudentAnswer: answerData,
      });

      const { score, feedback } = response.data;

      // Calculate marks based on AI score (score is out of 10)
      const earnedMarks = (score / 10) * currentQuestion.marks;
      setObtainedmarks((prev) => prev + earnedMarks);
      setAiFeedback((prev) => [
        ...prev,
        { question: currentQuestion.question, feedback, score },
      ]);

      if (currentQuestion?.id !== tableData.slice(-1)[0]?.id) {
        setanswerData("");
        const index = tableData.findIndex((x) => x.id === currentQuestion.id);
        setcurrentQuestion(tableData[index + 1]);
      } else {
        setScoreModal(true);
      }
    } catch (err) {
      console.error(
        "AI Evaluation failed, falling back to keyword matching",
        err
      );
      // Fallback to keyword matching if AI fails
      handleKeywordMatchingFallback();
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleKeywordMatchingFallback = () => {
    let obj = currentQuestion;
    let answerStr = answerData.split(" ");
    let result = answerStr.filter(
      (x) =>
        x.toLowerCase() === obj.keyword1.trim().toLowerCase() ||
        x === obj.keyword2.trim().toLowerCase() ||
        x === obj.keyword3.trim().toLowerCase() ||
        x === obj.keyword4.trim().toLowerCase() ||
        x === obj.keyword5.trim().toLowerCase()
    );
    if (result.length === 5 || answerData === obj.answer) {
      setObtainedmarks((prev) => prev + obj.marks);
    } else {
      let calculateMarks = obj.marks / 5;
      let getMarks =
        result.length === 1 ? calculateMarks : calculateMarks * result.length;
      setObtainedmarks((prev) => prev + getMarks);
    }

    if (currentQuestion?.id !== tableData.slice(-1)[0]?.id) {
      setanswerData("");
      const index = tableData.findIndex((x) => x.id === currentQuestion.id);
      setcurrentQuestion(tableData[index + 1]);
    } else {
      setScoreModal(true);
    }
  };

  return (
    <>
      {openDialogbox && (
        <DialogBox
          openDialog={openDialogbox}
          title="Please fill the answer first"
          handleOk={closeDialogBox}
          Okaybtn={true}
        />
      )}
      {ScoreModal && (
        <Modal
          title="Result"
          open={ScoreModal}
          okText="Ok"
          closable={false}
          footer={[
            <Button key="ok" type="secondary" onClick={handleOk}>
              OK
            </Button>,
          ]}
        >
          <Box>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
              className="mt-3 mb-4"
            >
              Your Marks is {Obtainedmarks.toFixed(2)}/{" "}
              {tableData.reduce(function (acc, obj) {
                return acc + +obj.marks;
              }, 0)}
            </Typography>
            <Box mt={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                AI Feedback:
              </Typography>
              {aiFeedback.map((f, i) => (
                <Box key={i} mt={1} p={1} bgcolor="#f5f5f5" borderRadius={1}>
                  <Typography variant="body2">
                    <b>Q:</b> {f.question}
                  </Typography>
                  <Typography variant="body2">
                    <b>Score:</b> {f.score}/10
                  </Typography>
                  <Typography variant="body2">
                    <b>Feedback:</b> {f.feedback}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Modal>
      )}
      <HeadBreadCrumb text1={"Dashboard"} text2={"Question/Answer"} url={"/"} />
      {/* <div className="row m-2">
      <div className="col-12">
      <p className="text-center text-bg-danger">
      Time left: {`${Math.floor(time / 60)}`.padStart(2, 0)}:
      {`${time % 60}`.padStart(2, 0)}
      </p>
      </div>
      </div> */}

      <div className="row m-2">
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <h3 id="QuestionText" className="mt-2">
              Question
            </h3>
            <div className="align-items-center d-flex justify-content-end w-auto">
              <label className="align-items-center mt-2 d-flex px-2">
                marks:
              </label>
              <TextField
                className="mt-2 w-50 "
                fullWidth
                disabled
                size="small"
                value={currentQuestion?.marks ?? ""}
                sx={{
                  "& legend": { display: "none", textAlign: "center" },
                  "& fieldset": { top: 0 },
                }}
              />
            </div>
          </div>
          <h6 className="mt-1">{currentQuestion?.question ?? ""}</h6>
          <div>
            <h3 id="AnswerText" className="mt-5">
              Answer:
            </h3>
            <TextField
              fullWidth
              value={answerData}
              onChange={(e) => setanswerData(e.target.value)}
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
              }}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end footerBtn">
        <Button
          variant="outlined"
          sx={{
            width: 200,
            color:
              currentQuestion?.id === tableData.slice(-1)[0]?.id
                ? "red"
                : "blue",
          }}
          endIcon={
            currentQuestion?.id === tableData.slice(-1)[0]?.id ? (
              <SaveIcon />
            ) : (
              <NavigateNextIcon />
            )
          }
          disabled={isEvaluating}
          onClick={clickNextQuestion}
        >
          {isEvaluating
            ? "Evaluating..."
            : currentQuestion?.id === tableData.slice(-1)[0]?.id
            ? "Submit"
            : "Next Question"}
        </Button>
        {/* <Button
              variant="outlined"
              sx={{
                width: 200,
              }}
              endIcon={<SaveIcon />}
              onClick={showScoreModal}
            >
              Submit
            </Button> */}
      </div>
    </>
  );
};
export default AttemptQA;
