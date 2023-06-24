import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Alert, Box, Link, Snackbar, Typography } from "@mui/material";
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
import VQPEdit from "./VQPEdit";

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
  useEffect(() => {
    getpost();
  }, [])
  
  

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
        // handleClicked(true)
      });
      // handleClick(true)
      // handleCancel(true)
  };
  
  console.log(tableData)

  const [tableData, setTableData] = useState([])

  const [formData, setformData] = useState({ ...INITIAL_STATE });
  const [editObj, seteditObj] = useState({});
  const [deleteId, setDeleteId] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (e) => {
    console.log(e,'row')
    seteditObj(e.row)
    setIsModalOpen(true);
  };
  
  const handlecloseEdit = () => {
    setIsModalOpen(false);
  };

  const [DeleteModal, setDeleteModal] = useState(false);

  const showDeleteModal = (e) => {
    setDeleteId(e.row.id)
    setDeleteModal(true);
  };
  
  
  const handleDeleteQuestion = () => {
    axios
    .delete(`https://localhost:7040/api/Question/${deleteId}`)
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
      // handleClicked(true)
      console.error(err);
    });
    // handleClick(true)
  };
  
  const handleCancels = () => {
    setDeleteModal(false);
  };
  
  
  return (
    <>
    <Snackbar
        anchorOrigin={{ vertical:"top", horizontal:"right" }}
        open={news}
        autoHideDuration={1000}
        onClose={handleClosed}
      >
      <Alert severity="success" sx={{ width: '100%' }}>
        Data Add successfully!
      </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical:"top", horizontal:"right" }}
        open={openS}
        autoHideDuration={1000}
        onClose={handleCloseded}
      >
      <Alert severity="error" sx={{ width: '100%' }}>
        Something Went wrong!
      </Alert>
      </Snackbar>
    <Modal title="Delete Question Answer" maskClosable={false}
    open={DeleteModal} okText="Yes"
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
      <VQPEdit 
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
    </>
  );
};
export default VQP;
