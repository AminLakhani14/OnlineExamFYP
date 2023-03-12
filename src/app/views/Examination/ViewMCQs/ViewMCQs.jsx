import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Link, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import HeadBreadCrumb from "app/components/BreadCrumb/HeadBreadCrumb";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Modal } from "antd";


const ViewMCQs = () => {

  const names = [
    "Programming Fundamentals",
    "OOP",
    "Artifical Intelligence",
    "Software Engineering",
    "BlockChain",
    "Parallel and Distributive Programming",
  ];

  const columns = [
    { field: 'id', headerName: 'QNo.#', width: 60 ,type: 'number',editable: true},
    {
      field: 'Subject',
      headerName: 'Subject',
      width: 120,
      editable: true,
    },
    {
      field: 'Question',
      headerName: 'Question',
      width: 400,
      editable: true,
    },
    {
      field: 'Option1',
      headerName: 'Option 1',
      width: 120,
      editable: true,
    },
    {
      field: 'Option2',
      headerName: 'Option 2',
      width: 120,
      editable: true,
    },
    {
      field: 'Option3',
      headerName: 'Option 3',
      width: 120,
      editable: true,
    },
    {
      field: 'Option4',
      headerName: 'Option 4',
      width: 120,
      editable: true,
    },
    {
      field: 'Marks',
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
       <IconButton aria-label="Delete" color="primary" onClick={showDeleteModal}>
       <DeleteIcon />
       </IconButton>
        </strong>
      ),
      
      sortable: false,
      width: 160,
    }
  ];
  
  const rows = [
    { id: 1, Subject: 'English', Question: 'what is noun?',Option1 : 'a',Option2 : 'b' ,Option3 : 'c', Option4 : 'd', Marks: 1 },
    { id: 2, Subject: 'English', Question: 'what is noun?',Option1 : 'a',Option2 : 'b' ,Option3 : 'c', Option4 : 'd', Marks: 1 },
    { id: 3, Subject: 'English', Question: 'what is noun?',Option1 : 'a',Option2 : 'b' ,Option3 : 'c', Option4 : 'd', Marks: 1 },
    { id: 4, Subject: 'English', Question: 'what is noun?',Option1 : 'a',Option2 : 'b' ,Option3 : 'c', Option4 : 'd', Marks: 1 },
    { id: 5, Subject: 'English', Question: 'what is noun?',Option1 : 'a',Option2 : 'b' ,Option3 : 'c', Option4 : 'd', Marks: 1 },
    { id: 6, Subject: 'English', Question: 'what is noun?',Option1 : 'a',Option2 : 'b' ,Option3 : 'c', Option4 : 'd', Marks: 1 },
    { id: 7, Subject: 'English', Question: 'what is noun?',Option1 : 'a',Option2 : 'b' ,Option3 : 'c', Option4 : 'd', Marks: 1 },
    { id: 8, Subject: 'English', Question: 'what is noun?',Option1 : 'a',Option2 : 'b' ,Option3 : 'c', Option4 : 'd', Marks: 1 },
    { id: 9, Subject: 'English', Question: 'what is noun?',Option1 : 'a',Option2 : 'b' ,Option3 : 'c', Option4 : 'd', Marks: 1 },
    { id: 10, Subject: 'English', Question: 'what is noun?',Option1 : 'a',Option2 : 'b' ,Option3 : 'c', Option4 : 'd', Marks: 1 },
  ];

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
     <Modal title="Delete MCQs" open={DeleteModal} okText="Yes"
        cancelText="No" onOk={handleOks} onCancel={handleCancels}>
    <Box>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2" className="mt-3 mx-4 mb-4">
            Do you want to delete this Question?
          </Typography>
          <div className="mb-4">
        </div>
        </Box>
    </Modal>
    <Modal title="Edit MCQs" width={1000} height={800} open={isModalOpen} okText="Update"
        cancelText="Cancel" onOk={handleOk} onCancel={handleCancel}>

      <div className="row m-2">
        <div className="col-12">
          <FormControl className="mt-4" sx={{ minWidth: 400 }} size="small">
            <InputLabel id="demo-select-small">Subject</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label="Subject"
              // value={state.course}
              // onChange={(ev) => {
              //   setState({ ...state, course: ev.target.value });
              // }}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
                // value={state.marks}
                // onChange={(ev) => {
                //   setState({ ...state, marks: ev.target.value });
                // }}
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
            // value={state.question}
            // onChange={(ev) => {
            //   setState({ ...state, question: ev.target.value });
            // }}
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
            <div className="col-1 my-2">
              <TextField
                fullWidth
                // value={state.option1}
                // onChange={(ev) => {
                //   setState({ ...state, option1: ev.target.value });
                // }}
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
            <div className="col-1 my-2">
              <TextField
                fullWidth
                // value={state.option2}
                // onChange={(ev) => {
                //   setState({ ...state, option2: ev.target.value });
                // }}
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
            <div className="col-1 my-2">
              <TextField
                fullWidth
                // value={state.option3}
                // onChange={(ev) => {
                //   setState({ ...state, option3: ev.target.value });
                // }}
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
            <div className="col-1 my-2">
              <TextField
                fullWidth
                // value={state.option4}
                // onChange={(ev) => {
                //   setState({ ...state, option4: ev.target.value });
                // }}
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

            <div className="col-1 my-2">
              <TextField
                fullWidth
                // value={state.correctAnswer}
                // onChange={(ev) => {
                //   setState({ ...state, correctAnswer: ev.target.value });
                // }}
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
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>


      <div className=""></div>
    </>
  );
};
export default ViewMCQs;
