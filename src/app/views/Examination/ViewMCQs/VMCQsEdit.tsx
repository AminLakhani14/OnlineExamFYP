import React,{ useEffect ,useState} from 'react'
import { Modal } from "antd";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from 'axios';

function VMCQsEdit(props) {
    const [formData, setformData] = useState({});
    useEffect(()=>{
      if(props.rowObject){
        setformData({...props.rowObject})
      }
    },[props.rowObject])

    const handleChange = (e) => {
        try {
          let name = e.target.name;
          let value = e.target.value;
          setformData((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        } catch (error) {
    
        }
      };
    const handleOk=()=>{
        axios
        .put(`https://localhost:7040/api/MCQs/${formData.id}`, formData)
        .then((res) => {
          debugger;
          if (res.status === 200) {
            props.getpost()
            props.handleCancel()
            console.log("hello world", res.data);
          } else {
            console.log("something went wrong");
          }
        })
        .catch((err) => {
          debugger;
          console.error(err);
        });

    }
  return (  
    <>
    <Modal title="Edit MCQs" width={1000} height={800} open={props.openModal} okText="Update"
        cancelText="Cancel" onOk={handleOk} onCancel={props.handleCancel}>

      <div className="row m-2">
        <div className="col-12">
        <label className="align-items-center mt-2 d-flex px-2">
            Subject
          </label>
        <TextField
            className="mt-2 w-50"
            fullWidth
            size="small"
            name="course"
            disabled
            value={formData.course}
            sx={{
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
            }}
        />
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
                size="small"
                name="marks"
                value={formData.marks}
                onChange={handleChange}
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
            size="small"
            onChange={handleChange}
            value={formData.question}
            sx={{
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
            }}
          />
          <div className="d-flex justify-content-between mt-4">
            <div className="col-3">
              <h3 id="Answer_MCQs">Answer:</h3>
            </div>
          </div>

          <div className="row m-0">
            <div className="col-2 my-2">
              <label>Option 1:</label>
            </div>
            <div className="col-3 my-2">
              <TextField
                fullWidth
                  name="optionA"
                value={formData.optionA}
                onChange={handleChange}
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="col-2 my-2">
              <label>Option 2:</label>
            </div>
            <div className="col-3 my-2">
              <TextField
                fullWidth
                value={formData.optionB}
                name="optionB"
                onChange={handleChange}
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="col-2 my-2">
              <label>Option 3:</label>
            </div>
            <div className="col-3 my-2">
              <TextField
                fullWidth
                value={formData.optionC}
                name="optionC"
                onChange={handleChange}
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
            </div>
          </div>
          <div className="row m-0">
            <div className="col-2 my-2">
              <label>Option 4:</label>
            </div>
            <div className="col-3 my-2">
              <TextField
                fullWidth
                value={formData.optionD}
                name="optionD"
                onChange={handleChange}
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
            </div>
          </div>

          <div className="row m-0">
            <div className="col-2 my-2">
              <label>Correct Answer:</label>
            </div>

            <div className="col-3 my-2">
              <TextField
                fullWidth
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleChange}
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    
        </Modal>
    </>
  )
}

export default VMCQsEdit