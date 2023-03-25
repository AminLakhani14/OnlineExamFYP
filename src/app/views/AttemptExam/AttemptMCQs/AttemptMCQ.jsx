import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Link,
  MenuItem,
  Pagination,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Modal } from "antd";
import HeadBreadCrumb from "app/components/BreadCrumb/HeadBreadCrumb";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const AttemptMCQ = () => {
  const [tableData, setTableData] = useState([])
  const [currentQuestion, setcurrentQuestion] = useState({})
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
 
  const getpost = () => {
    debugger;
  
    axios
      .get(`https://localhost:7040/api/MCQs/Get-MCQs`)
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
      <HeadBreadCrumb text1={"Dashboard"} text2={"MCQs"} url={"/"} />
     <div className="row m-0">
        <div className="d-flex justify-content-between mt-4">
          <h3 id="QuestionText" className="m-0 mt-2">
          Question {currentQuestion?.id ?? ''}:
          </h3>
          <div className="align-items-center d-flex justify-content-end w-auto">
            <label className="align-items-center mt-2 d-flex px-2">
              marks:
            </label>
            <TextField
              className="mt-2 w-50"
              fullWidth
              disabled
              value={currentQuestion?.marks ?? ""}
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
            <h6>{currentQuestion?.question ?? ""}</h6>
        </div>
      </div>

      <br />

      <div className="row m-0">
        <div className="col-3">
          <h3 id="Answer_MCQs">Options:</h3>
        </div>
      </div>

      <div className="row m-0">
        <div className="col-2 my-2">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
               label={currentQuestion?.optionA ?? ""}
                control={<Radio />}
                value="1"
              />
              <FormControlLabel 
              label={currentQuestion?.optionB ?? ""}
               control={<Radio />} 
               value="2" />

              <FormControlLabel
              label={currentQuestion?.optionC ?? ""}
                control={<Radio />}
                value="3"
              />
              <FormControlLabel
                label={currentQuestion?.optionD ?? ""}
                control={<Radio />}
                value="4"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <br />
      <br />
      <br />
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
      </div>
      
    </>
  );
};
export default AttemptMCQ;
