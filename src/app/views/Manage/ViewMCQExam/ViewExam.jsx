import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import HeadBreadCrumb from "app/components/BreadCrumb/HeadBreadCrumb";
import { useEffect, useState } from "react";


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
    field: 'marks',
    headerName: 'Marks',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 100,
  },
  
];

const ViewExam = () => {
  useEffect(() => {
    fetch("https://localhost:7040/api/MCQs/Get-MCQs")
      .then((data) => data.json())
      .then((data) => setTableData(data))

  }, [])

  console.log(tableData)



  const [tableData, setTableData] = useState([])

  return (
    <>

    <div className="row m-0 mt-3">
      <div className="col-12">
      <Box sx={{ height: 500, width: '100%' }}>
     <DataGrid
      rows={tableData}
      columns={columns}
      pageSize={10}
      // rowsPerPageOptions={[10]}
      // disableSelectionOnClick
      // experimentalFeatures={{ newEditingApi: true }}
    />
  </Box>
      </div>
    </div>
  </>
  );
};
export default ViewExam;
