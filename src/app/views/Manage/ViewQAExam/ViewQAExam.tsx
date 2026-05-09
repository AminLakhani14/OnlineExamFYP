import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const columns = [
  { field: 'id', headerName: 'QNo.#', width: 100 ,type: 'number',editable: false},
  {
    field: 'course',
    headerName: 'Subject',
    width: 150,
    editable: false,
  },
  {
    field: 'question',
    headerName: 'Question',
    width: 800,
    editable: false,
  },
  {
    field: 'marks',
    headerName: 'Marks',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    // valueGetter: (params) =>
    //   `${params.row.Subject || ''} ${params.row.Question || ''}`,
  },
  
];





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
