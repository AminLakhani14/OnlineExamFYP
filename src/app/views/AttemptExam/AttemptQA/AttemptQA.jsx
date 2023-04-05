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
import DialogBox from "app/components/DialogBox/DialogBox";
import { useNavigate } from "react-router-dom";

const AttemptQA = () => {

  const [ScoreModal, setScoreModal] = useState(false);
  const [openDialogbox, setOpenDialogBox] = useState(false);
  const [answerData, setanswerData] = useState("");
  const [Obtainedmarks,setObtainedmarks]=useState(0)
  const navigate =useNavigate()
  const handleOk = () => {
    setScoreModal(false);
    localStorage.setItem('QAMarks',Obtainedmarks)
    navigate('/')
  };
  
  const handleCancel = () => {
    setScoreModal(false);
    localStorage.setItem('QAMarks',Obtainedmarks)
    navigate('/')
  };
  const [tableData, setTableData] = useState([])
  const [currentQuestion, setcurrentQuestion] = useState({})

  const [time, setTime] = useState(300);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          setScoreModal(true);
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);
 
  const closeDialogBox=()=>{
    setOpenDialogBox(false)
  }
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
    if(!answerData){
      setOpenDialogBox(true)
    }else{
        handleSaveResult()
    }

  }
  const handleSaveResult=()=>{
    let array=[...tableData]
    let obj=array.find(x=>x.id===currentQuestion.id)
    let answerStr=answerData.split(" ")
    let result=answerStr.filter(x=>x.toLowerCase() ===obj.keyword1.trim().toLowerCase() || x===obj.keyword2.trim().toLowerCase() || x===obj.keyword3.trim().toLowerCase() || x===obj.keyword4.trim().toLowerCase()|| x===obj.keyword5.trim().toLowerCase())
    if(result.length===5 || answerData===obj.answer){
      setObtainedmarks(prev=> prev + obj.marks)
    }else{
      let calculateMarks=obj.marks/5
      let getMarks= result.length===1 ? calculateMarks : calculateMarks * result.length
      setObtainedmarks(prev=> prev + getMarks)
    }
    if(currentQuestion?.id!==tableData.slice(-1)[0]?.id ){
      setanswerData("")
      let index=array.findIndex(x=>x.id===currentQuestion.id)
      let obj1=array[index+1]

      setcurrentQuestion(obj1)
    }else{
       setScoreModal(true);
    }
  }
  
  return (
    <>
   {openDialogbox &&
    <DialogBox
    openDialog={openDialogbox}
    title="Please fill the answer first"
    handleOk={closeDialogBox}
    Okaybtn={true}
    />}
   {ScoreModal &&
     <Modal title="Result"
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
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2" className="mt-3 mb-4">
            Your Marks is {Obtainedmarks.toFixed(2)}/ {tableData.reduce(function (acc, obj) { return acc + +obj.marks; }, 0)}
          </Typography>
          <div className="mb-4">
        </div>
        </Box>
    </Modal>}
      <HeadBreadCrumb text1={"Dashboard"} text2={"Question/Answer"} url={"/"} />
      <div className="row m-2">
      <div className="col-12">
      <p className="text-center text-bg-danger">
      Time left: {`${Math.floor(time / 60)}`.padStart(2, 0)}:
      {`${time % 60}`.padStart(2, 0)}
      </p>
      </div>
      </div>

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
              value={answerData}
              onChange={(e)=>setanswerData(e.target.value)}
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
