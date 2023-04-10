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

function VQPEdit(props) {
    const [formData, setformData] = useState({});
    useEffect(()=>{
      if(props.rowObject){
        setformData({...props.rowObject})
      }
    },[props.rowObject])

    const handleChange=(e)=>{
      let name = e.target.name;
      let value = e.target.value;
      if(name==="keyword1" || name==="keyword2" || name==="keyword3" || name==="keyword4" || name==="keyword5"){
        setformData((prevState) => ({
          ...prevState,
          [name]: value.toLowerCase(),
        }));
      }else{
        setformData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
    const handleOk=()=>{
        axios
        .put(`https://localhost:7040/api/Question/${formData.id}`, formData)
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
    <Modal title="Edit Question Answer  " width={1000} open={props.openModal} okText="Update"
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
    </Modal>
    </>
  )
}

export default VQPEdit