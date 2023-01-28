import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import HeadBreadCrumb from "app/components/BreadCrumb/HeadBreadCrumb";

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

const ViewExam = () => {
  return (
    <>

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
  </>
  );
};
export default ViewExam;
