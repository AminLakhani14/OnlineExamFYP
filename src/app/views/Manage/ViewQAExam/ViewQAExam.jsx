import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const columns = [
  { field: 'id', headerName: 'id', width: 100 ,type: 'number',editable: true},
  {
    field: 'course',
    headerName: 'course',
    width: 150,
    editable: true,
  },
  {
    field: 'question',
    headerName: 'question',
    width: 800,
    editable: true,
  },
  {
    field: 'marks',
    headerName: 'marks',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    // valueGetter: (params) =>
    //   `${params.row.Subject || ''} ${params.row.Question || ''}`,
  },
  
];



// const rows = [
//   { id: 1, Subject: 'English', Question: 'what is noun?', Marks: 35 },
//   { id: 2, Subject: 'Science', Question: 'How many solar planet are there in space?', Marks: 42 },
//   { id: 3, Subject: 'Science', Question: 'How many solar planet are there in space?', Marks: 45 },
//   { id: 4, Subject: 'Science', Question: 'How many solar planet are there in space?', Marks: 16 },
//   { id: 5, Subject: 'Science', Question: 'How many solar planet are there in space?', Marks: 11 },
//   { id: 6, Subject: 'Science', Question: 'How many solar planet are there in space?', Marks: 150 },
//   { id: 7, Subject: 'Science', Question: 'How many solar planet are there in space?', Marks: 44 },
//   { id: 8, Subject: 'Science', Question: 'How many solar planet are there in space?', Marks: 36 },
//   { id: 9, Subject: 'Science', Question: 'How many solar planet are there in space?', Marks: 65 },
// ];

const ViewQAExam = () => {
  useEffect(() => {
    fetch("https://localhost:7040/api/Question/get-question")
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
export default ViewQAExam;
