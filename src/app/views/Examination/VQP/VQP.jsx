import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Link, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Modal } from "antd";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const VQP = () => {

  const INITIAL_STATE = {
  };

  const names = [
    "Programming Fundamentals",
    "OOP",
    "Artifical Intelligence",
    "Software Engineering",
    "BlockChain",
    "Parallel and Distributive Programming",
  ];

  const columns = [
    { field: 'id', headerName: 'QNo.#', width: 50 ,type: 'number',editable: false},
    {
      field: 'course',
      headerName: 'Subject',
      cellClass: 'normalLineHeight',
      width: 200,
      editable: false,
    },
    {
      field: 'question',
      headerName: 'Question',
      cellClass: 'normalLineHeight',
      width: 600,
      editable: false,
    },
    {
      field: 'keyword1',
      headerName: 'keyword1',
      width: 100,
      editable: false,
    },
    {
      field: 'keyword2',
      headerName: 'keyword2',
      width: 100,
      editable: false,
    },
    {
      field: 'keyword3',
      headerName: 'keyword3',
      width: 100,
      editable: false,
    },
    {
      field: 'keyword4',
      headerName: 'keyword4',
      width: 100,
      editable: false,
    },
    {
      field: 'keyword5',
      headerName: 'keyword5',
      width: 100,
      editable: false,
    },
    {
      field: 'marks',
      headerName: 'Marks',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
      // valueGetter: (params) =>
      //   `${params.row.Subject || ''} ${params.row.Question || ''}`,
    },
    {
      field: 'Action',
      headerName: 'Action',
      description: 'This column has a value getter and is not sortable.',
      renderCell: () => (
        <strong>
                    <IconButton onClick={showModal} aria-label="Edit" color="success">
                      <EditIcon />
                    </IconButton>

                    <IconButton aria-label="Delete" onClick={showDeleteModal} color="primary">
                      <DeleteIcon />
                    </IconButton>
        </strong>
      ),
      
      sortable: false,
      width: 160,
    }
  ];
  
  
  

  
  

  const getpost = () => {
    debugger;
  
    axios
      .get(`https://localhost:7040/api/Question/get-question`, formData)
      .then((res) => {
        debugger;
        if (res.status === 200) {
          setTableData(res.data);
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

  const [tableData, setTableData] = useState([])

  const [formData, setformData] = useState({ ...INITIAL_STATE });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  
  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [DeleteModal, setDeleteModal] = useState(false);

  const showDeleteModal = () => {
    setDeleteModal(true);
  };
  
  
  const handleOks = () => {
    setDeleteModal(false);
  };
  
  const handleCancels = () => {
    setDeleteModal(false);
  };
  
  
  return (
    <>
    <Modal title="Delete Question Answer" open={DeleteModal} okText="Yes"
        cancelText="No" onOk={handleOks} onCancel={handleCancels}>
    <Box>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2" className="mt-3 mx-4 mb-4">
            Do you want to delete this Question?
          </Typography>
          <div className="mb-4">
        </div>
        </Box>
    </Modal>

      <Modal title="Edit Question Answer  " width={1000} open={isModalOpen} okText="Update"
        cancelText="Cancel" onOk={handleOk} onCancel={handleCancel}>
      <div className="row m-2">
        <div className="col-12">
          <FormControl className="mt-4" sx={{ minWidth: 400 }} size="small">
            <InputLabel id="demo-select-small">Subject</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label="Subject"
              name="course"
              // onChange={handleChange}
              // value={formData.course}
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
                // onChange={handleChange}
                // value={formData.marks}
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
            // onChange={handleChange}
            // value={formData.question}
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
              // onChange={handleChange}
              // value={formData.answer}
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
                // onChange={handleChange}
                // value={formData.keyword1}
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
                // value={formData.keyword2}
                // onChange={handleChange}
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
                // value={formData.keyword3}
                // onChange={handleChange}
                className="ms-3"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
              <TextField
                fullWidth
                name="keyword4"
                // value={formData.keyword4}
                // onChange={handleChange}
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
                // value={formData.keyword5}
                // onChange={handleChange}
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
      <div className="row m-0 mt-3">
        <div className="col-12">
        <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
        </div>
      </div>
    </>
  );
};
export default VQP;
