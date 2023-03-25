import {
  Box,
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
import { Modal } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const AttemptQA = () => {

  const [ScoreModal, setScoreModal] = useState(false);

  const showScoreModal = () => {
    setScoreModal(true);
  };
  
  
  const handleOk = () => {
    setScoreModal(false);
  };
  
  const handleCancel = () => {
    setScoreModal(false);
  };
  const [tableData, setTableData] = useState([])
  const [currentQuestion, setcurrentQuestion] = useState({})
 
  const getpost = () => {
    debugger;
  
    axios
      .get(`https://localhost:7040/api/Question/get-question`)
      .then((res) => {
        debugger;
        if (res.status === 200) {
          if(res.data.length){
            setTableData(res.data);
            setcurrentQuestion(res.data[0])
          }
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
  
  useEffect(() => {
    getpost();
  }, [])
  
  console.log(tableData)

  const  clickNextQuestion=(e)=>{
    if(currentQuestion?.id===tableData.slice(-1)[0]?.id ){
      showScoreModal();
      // handle submit
    }else{
      // handle next question
      let array=[...tableData]
      let obj=array.find(x=>x.id===currentQuestion.id+1)
      debugger
      setcurrentQuestion(obj)
      
    }
  }


  return (
    <>
    <Modal title="Result" open={ScoreModal} okText="Ok" onCancel={handleCancel}
         onOk={handleOk}>
    <Box>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2" className="mt-3 mb-4">
            Your Marks is 10/10
          </Typography>
          <div className="mb-4">
        </div>
        </Box>
    </Modal>
      <HeadBreadCrumb text1={"Dashboard"} text2={"Question/Answer"} url={"/"} />
      <div className="row m-2">
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <h3 id="QuestionText" className="mt-2">
              Question {currentQuestion?.id ?? ''}:
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
                  "& legend": { display: "none",textAlign: "center" },
                  "& fieldset": { top: 0 },
                }}
              />
            </div>
          </div>
          <h6 className="mt-1">
            {currentQuestion?.question ?? ""}
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
      <div className="d-flex justify-content-end footerBtn">
            <Button
              variant="outlined"
              sx={{
                width: 200,
                color: currentQuestion?.id===tableData.slice(-1)[0]?.id ? "red" :"blue",
              }}
              endIcon={currentQuestion?.id===tableData.slice(-1)[0]?.id ?  <SaveIcon /> :  <NavigateNextIcon />}
              onClick={clickNextQuestion}
            >
              {currentQuestion?.id===tableData.slice(-1)[0]?.id ? "Submit" : "Next Question" }
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
