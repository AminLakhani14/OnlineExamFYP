import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Alert, Box, Link, Snackbar, Typography } from "@mui/material";
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
import axios from "axios";
import { useEffect } from "react";
import VMCQsEdit from "./VMCQsEdit";

const ViewMCQs = () => {
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
    { field: 'id', headerName: 'QNo.#', width: 60 ,type: 'number',editable: true},
    {
      field: 'course',
      headerName: 'Subject',
      width: 120,
      editable: true,
    },
    {
      field: 'question',
      headerName: 'Question',
      width: 400,
      editable: true,
    },
    {
      field: 'optionA',
      headerName: 'Option 1',
      width: 120,
      editable: true,
    },
    {
      field: 'optionB',
      headerName: 'Option 2',
      width: 120,
      editable: true,
    },
    {
      field: 'optionC',
      headerName: 'Option 3',
      width: 120,
      editable: true,
    },
    {
      field: 'optionD',
      headerName: 'Option 4',
      width: 120,
      editable: true,
    },
    {
      field: 'correctAnswer',
      headerName: 'Correct Answer',
      width: 120,
      editable: true,
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
      renderCell: (e) => (
       
        <strong>
                    <IconButton onClick={()=>showModal(e)} aria-label="Edit" color="success">
                      <EditIcon />
                    </IconButton>

                    <IconButton aria-label="Delete" onClick={()=>showDeleteModal(e)} color="primary">
                      <DeleteIcon />
                    </IconButton>
        </strong>
      ),
      
      sortable: false,
      width: 160,
    }
  ];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editObj, seteditObj] = useState({});
  const [deleteId, setDeleteId] = useState("");

  const showModal = (e) => {
    console.log(e,'row')
    seteditObj(e.row)
    setIsModalOpen(true);
  };
  

  const showDeleteModal = (e) => {
    setDeleteId(e.row.id)
    setDeleteModal(true);
  };
  
  
  const handleDeleteQuestion = () => {
    axios
    .delete(`https://localhost:7040/api/MCQs/${deleteId}`)
    .then((res) => {
      debugger;
      if (res.status === 200) {
        getpost()
        setDeleteModal(false);
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
  
  const [DeleteModal, setDeleteModal] = useState(false);

  const handleOks = () => {
    setDeleteModal(false);
  };
  
  const handleCancels = () => {
    setDeleteModal(false);
  };  

  const handlecloseEdit = () => {
    setIsModalOpen(false);
  };

  const [openS, setOpenS] = useState(false);

  const handleClick = () => {
    setOpenS(true);
  };

  const handleClosed = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenS(false);
  };

  const [news, setnews] = useState(false);

  const handleClicked = () => {
    setnews(true);
  };

  const handleCloseded = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setnews(false);
  };

  const getpost = () => {
    debugger;
  
    axios
      .get(`https://localhost:7040/api/MCQs/Get-MCQs`, formData)
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
        handleClicked(true)

      });
      handleClick(true)
      // handleCancel(true)
  };
  
  useEffect(() => {
    getpost();
  }, [])

  console.log(tableData)

  const [tableData, setTableData] = useState([])

  const [formData, setformData] = useState({ ...INITIAL_STATE });

  return (
    <>
    {/* <Snackbar
        anchorOrigin={{ vertical:"top", horizontal:"right" }}
        open={news}
        autoHideDuration={1000}
        onClose={handleCloseded}
      >
      <Alert severity="success" sx={{ width: '100%' }}>
        Data Add successfully!
      </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical:"top", horizontal:"right" }}
        open={openS}
        autoHideDuration={1000}
        onClose={handleClosed}
      >
      <Alert severity="error" sx={{ width: '100%' }}>
        Something Went wrong!
      </Alert>
      </Snackbar> */}
     <Modal title="Delete MCQs" open={DeleteModal} okText="Yes"
        cancelText="No" onOk={handleDeleteQuestion} onCancel={handleCancels}>
    <Box>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2" className="mt-3 mx-4 mb-4">
            Do you want to delete this Question?
          </Typography>
          <div className="mb-4">
        </div>
        </Box>
    </Modal>
    {isModalOpen && 
      <VMCQsEdit 
        openModal={isModalOpen}
        subjectNames={names}
        handleCancel={handlecloseEdit}
        rowObject={editObj}
        getpost={getpost}
      />}
    

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
