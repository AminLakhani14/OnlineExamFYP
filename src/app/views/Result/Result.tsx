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
import { getUserId } from "app/utils/utils";

const columns = [
  { field: "id", headerName: "ID", width: 60, type: "number", editable: true },
  {
    field: "userName",
    headerName: "Name",
    width: 300,
    editable: true,
  },
  // {
  //   field: "course",
  //   headerName: "Subject",
  //   width: 300,
  //   editable: true,
  // },
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
    headerName: "Obtained Marks",
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

export   const ShowCalculatedResults=(response)=>{
  let { register, qaMarks, mcQmarks }= response;
  let mergeArrays=[...qaMarks, ...mcQmarks]
  console.log( mergeArrays,' mergeArrays');

  let registerIDs=register.map(x=>x.id)
  debugger
  let filteredArrays = registerIDs.reduce((result, key) => {
    const filteredArray = mergeArrays.filter(item => item.registerID === key);
    result[key] = filteredArray.length && filteredArray.reduce(
      (total, record) => {
        total.obtainedSum +=record['qMarks'] ? Number(record.qMarks) : 0 + record['mcqMarks'] ? Number(record.mcqMarks) : 0;
        total.totalSum += record.totalMarks;
        total.mcqMarks += record['mcqMarks'] ? Number(record.mcqMarks) : 0;
        total.qMarks += record['qMarks'] ? Number(record.qMarks) : 0;
        total.key=record['registerID'];
        total.userName=record.register.userName;
        return total;
      },
      { obtainedSum: 0, totalSum: 0, mcqMarks: 0, qMarks:0, key:'' , userName:''}
    );
    return result;
  }, {});
  // filteredArrays=filteredArrays.filter(x=>x!==0)
  console.log( filteredArrays,' filteredArrays');

  let updatedRsultArray=Object.values(filteredArrays).filter(x=>x)
  console.log( updatedRsultArray,' updatedRsultArray');

  let mcqsResult=updatedRsultArray.map((x,index)=>{
    return {
      id:index+1,
      registerID:x.key,
      userName: x.userName,
      qMarks: updatedRsultArray.find(item=>item.key===x?.key)?.qMarks ?? 0,
      mcqMarks: updatedRsultArray.find(item=>item.key===x?.key)?.mcqMarks ?? 0,
      ObtainedMarks: updatedRsultArray.find(item=>item.key===x?.key)?.obtainedSum ?? 0,
      totalMarks: updatedRsultArray.find(item=>item.key===x?.key)?.totalSum ?? 0,
    }
  })
  const checkAdmin=localStorage.getItem("User");
  let displayResult=[];
  if(checkAdmin!=="Student") displayResult=[...mcqsResult];
  else{
    displayResult=mcqsResult.filter(x=>x.registerID===getUserId());
  }
  return displayResult ?? mcqsResult
  // setRowData(displayResult ?? mcqsResult)
  // console.log(mcqsResult,'mcqsResult')

}
const Result = () => {

  const [rowData,setRowData]=useState([])
  useEffect(()=>{
    fetchResults()
  },[])

  const fetchResults=async()=>{
    await axios.get('https://localhost:7040/Get-Result').then(res=>{
        if(res.status===200) {
          console.log(res.data)
          let result=ShowCalculatedResults(res.data)
          setRowData(result)

        }})
        .catch(err=>{
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
              rows={rowData}
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
