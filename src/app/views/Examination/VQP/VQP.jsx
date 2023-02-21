import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const INITIAL_STATE = {
};
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
        <IconButton aria-label="Delete" color="primary">
                    <DeleteIcon />
                  </IconButton>

                  <IconButton aria-label="Edit" color="success">
                    <EditIcon />
                  </IconButton>
      </strong>
    ),
    
    sortable: false,
    width: 160,
  }
];


const VQP = () => {
  const [tableData, setTableData] = useState([])

  const [formData, setformData] = useState({ ...INITIAL_STATE });
  
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
  // useEffect(() => {
  //   fetch("https://localhost:7040/api/Question/get-question")
  //     .then((data) => data.json())
  //     .then((data) => setTableData(data))

  // }, [])

  useEffect(() => {
    getpost();
  }, [])

  console.log(tableData)



  return (
    <>
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
