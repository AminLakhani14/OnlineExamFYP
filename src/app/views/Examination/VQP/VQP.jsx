import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: 'id', headerName: 'QNo.#', width: 100 ,type: 'number',editable: true},
  {
    field: 'Subject',
    headerName: 'Subject',
    width: 150,
    editable: true,
  },
  {
    field: 'Question',
    headerName: 'Question',
    width: 600,
    editable: true,
  },
  {
    field: 'Marks',
    headerName: 'Marks',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
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

const rows = [
  { id: 1, Subject: 'English', Question: 'what is noun?', Marks: 35 },
  { id: 2, Subject: 'Science', Question: 'How many solar planet are there in space?', Marks: 42 },
  { id: 3, Subject: 'Science', Question: 'How many solar planet are there in space?', Marks: 45 },
  { id: 4, Subject: 'Science', Question: 'How many solar planet are there in space?', Marks: 16 },
  { id: 5, Subject: 'Science', Question: 'How many solar planet are there in space?', Marks: 11 },
  { id: 6, Subject: 'Science', Question: 'How many solar planet are there in space?', Marks: 150 },
  { id: 7, Subject: 'Science', Question: 'How many solar planet are there in space?', Marks: 44 },
  { id: 8, Subject: 'Science', Question: 'How many solar planet are there in space?', Marks: 36 },
  { id: 9, Subject: 'Science', Question: 'How many solar planet are there in space?', Marks: 65 },
];

const VQP = () => {
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
export default VQP;
