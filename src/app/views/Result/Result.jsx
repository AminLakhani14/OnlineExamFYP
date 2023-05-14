import React, { useEffect, useMemo, useState } from "react";
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
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 60, type: "number", editable: true },
  {
    field: "userName",
    headerName: "Name",
    width: 300,
    editable: true,
  },
  {
    field: "course",
    headerName: "Subject",
    width: 300,
    editable: true,
  },
  {
    field: "qMarks",
    headerName: "QA Marks",
    width: 150,
    editable: true,
  },
  {
    field: "mcqMarks",
    headerName: "MCQs marks",
    width: 150,
    editable: true,
  },
  {
    field: "ObtainedMarks",
    headerName: "Total marks",
    width: 150,
    editable: true,
  },
  {
    field: "totalMarks",
    headerName: "Out of",
    width: 150,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    Name: "Amin",
    Subject: "english",
    QAMarks: "1",
    MCQsMarks: "1",
    Outof: "1",
    TotalMarks: "1",
  },
  {
    id: 2,
    Name: "Amin",
    Subject: "english",
    QAMarks: "1",
    MCQsMarks: "1",
    Outof: "1",
    TotalMarks: "1",
  },
  {
    id: 3,
    Name: "Amin",
    Subject: "english",
    QAMarks: "1",
    MCQsMarks: "1",
    Outof: "1",
    TotalMarks: "1",
  },
  {
    id: 4,
    Name: "Amin",
    Subject: "english",
    QAMarks: "1",
    MCQsMarks: "1",
    Outof: "1",
    TotalMarks: "1",
  },
];

const Result = () => {

  const [resultData,setResultData]=useState([])
  useEffect(()=>{
    fetchResults()
  },[])

  const fetchResults=()=>{
    const response=axios.get('https://localhost:7040/Get-Result')
                  .then(res=>{
                    if(res.status===200) {
                      console.log(res.data)
                      let data=[...res.data]

                    }
                  }).catch(err=>{
                    console.log('err',err)
                  })
  }
  return (
    <>
      <div className="row m-0 mt-3">
        <div className="col-3">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              DashBoard
            </Link>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              Result
            </Typography>
          </Breadcrumbs>
        </div>
        <hr />
      </div>

      <div className="row m-0 mt-3">
        <div className="col-12">
          <Box sx={{ height: 500, width: "100%" }}>
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
    </>
  );
};
export default Result;
