import {
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
import HeadBreadCrumb from "app/components/BreadCrumb/HeadBreadCrumb";

const MCQ = () => {
  const names = [
    "Programming Fundamentals",
    "OOP",
    "Artifical Intelligence",
    "Software Engineering",
    "BlockChain",
    "Parallel and Distributive Programming",
  ];
  return (
    <>
      <HeadBreadCrumb text1={'Dashboard'} text2={'MCQs'} url={'/'}/>

      <div className="row m-2">
        <div className="col-12">
          <FormControl className="mt-4" sx={{ minWidth: 400 }} size="small">
            <InputLabel id="demo-select-small">Subject</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label="Subject"
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="d-flex justify-content-between mt-4">
            <h3 id="QuestionText" className="m-0 mt-2">
              Question1:{" "}
            </h3>
            <div className="align-items-center d-flex justify-content-end w-auto">
              <label className="align-items-center mt-2 d-flex px-2">marks:</label>
              <TextField
            className="mt-2 w-50"
            fullWidth
            size="small"
            sx={{
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
            }}
          />
            </div>
          </div>
          <TextField
            className="mt-2"
            fullWidth
            size="small"
            sx={{
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
            }}
          />
          <div className="d-flex justify-content-between mt-4">
         <div className="col-3">
           <h3 id="Answer_MCQs">Answer:</h3>
         </div>
       </div>

       <div className="row m-0">
         <div className="col-2 my-2">
           <label>Option 1:</label>
         </div>
         <div className="col-1 my-2">
         <TextField
          fullWidth
            sx={{
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
            }}
          />    
        </div>
      </div>

      <div className="row m-0">
        <div className="col-2 my-2">
          <label>Option 2:</label>
        </div>
        <div className="col-1 my-2">
        <TextField
          fullWidth
            sx={{
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
            }}
          />    
        </div>
      </div>

      <div className="row m-0">
        <div className="col-2 my-2">
          <label>Option 3:</label>
        </div>
        <div className="col-1 my-2">
        <TextField
          fullWidth
            sx={{
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
            }}
          />    

        </div>
      </div>
      <div className="row m-0">
        <div className="col-2 my-2">
          <label>Option 4:</label>
        </div>
        <div className="col-1 my-2">
        <TextField
          fullWidth
            sx={{
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
            }}
          />    
        </div>
      </div>

      <div className="row m-0">
        <div className="col-2 my-2">
          <label>Correct Answer:</label>
        </div>

        <div className="col-1 my-2">
        <TextField
          fullWidth
            sx={{
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
            }}
          />    
        </div>
      </div>
        </div>
      </div>
      <div className="footerBtn d-flex justify-content-between mt-5 my-5">
            <Button
              variant="outlined"
              className=""
              sx={{
                width: 300,
              }}
              startIcon={<SendIcon />}
            >
              Add Question
            </Button>
            <Button
              variant="outlined"
              className=""
              sx={{
                width: 300,
                color: "red",
              }}
              startIcon={<DeleteIcon />}
            >
              Clear
            </Button>
          </div>
    </>
    // <>
    //    <div className="row m-2">
    //     <div className="col-12">
    //       <FormControl className="mt-4" sx={{ minWidth: 400 }} size="small">
    //         <InputLabel id="demo-select-small">Subject</InputLabel>
    //         <Select
    //           labelId="demo-select-small"
    //           id="demo-select-small"
    //           label="Subject"
    //         >
    //           {names.map((name) => (
    //             <MenuItem key={name} value={name}>
    //               {name}
    //             </MenuItem>
    //           ))}
    //         </Select>
    //       </FormControl>
    //       <div className="d-flex justify-content-between mt-4">
    //         <h3 id="QuestionText" className="m-0 mt-2">
    //           Question1:{" "}
    //         </h3>
    //         <div className="align-items-center d-flex justify-content-end w-auto">
    //           <label className="align-items-center mt-2 d-flex px-2">marks:</label>
    //           <TextField
    //         className="mt-2 w-50"
    //         fullWidth
    //         size="small"
    //         sx={{
    //           "& legend": { display: "none" },
    //           "& fieldset": { top: 0 },
    //         }}
    //       />
    //         </div>
    //       </div>

    //     <TextField
    //       fullWidth
    //         sx={{
    //           "& legend": { display: "none" },
    //           "& fieldset": { top: 0 },
    //         }}
    //       />
    //     </div>
    //   </div>

    //   <br />

    //   <div className="row m-0">
    //     <div className="col-3">
    //       <h3 id="Answer_MCQs">Answer:</h3>
    //     </div>
    //   </div>

    //   <div className="row m-0">
    //     <div className="col-2 my-2">
    //       <label>Option 1:</label>
    //     </div>
    //     <div className="col-1 my-2">
    //     <TextField
    //       fullWidth
    //         sx={{
    //           "& legend": { display: "none" },
    //           "& fieldset": { top: 0 },
    //         }}
    //       />    
    //     </div>
    //   </div>

    //   <div className="row m-0">
    //     <div className="col-2 my-2">
    //       <label>Option 2:</label>
    //     </div>
    //     <div className="col-1 my-2">
    //     <TextField
    //       fullWidth
    //         sx={{
    //           "& legend": { display: "none" },
    //           "& fieldset": { top: 0 },
    //         }}
    //       />    
    //     </div>
    //   </div>

    //   <div className="row m-0">
    //     <div className="col-2 my-2">
    //       <label>Option 3:</label>
    //     </div>
    //     <div className="col-1 my-2">
    //     <TextField
    //       fullWidth
    //         sx={{
    //           "& legend": { display: "none" },
    //           "& fieldset": { top: 0 },
    //         }}
    //       />    

    //     </div>
    //   </div>
    //   <div className="row m-0">
    //     <div className="col-2 my-2">
    //       <label>Option 4:</label>
    //     </div>
    //     <div className="col-1 my-2">
    //     <TextField
    //       fullWidth
    //         sx={{
    //           "& legend": { display: "none" },
    //           "& fieldset": { top: 0 },
    //         }}
    //       />    
    //     </div>
    //   </div>

    //   <div className="row m-0">
    //     <div className="col-2 my-2">
    //       <label>Correct Answer:</label>
    //     </div>

    //     <div className="col-1 my-2">
    //     <TextField
    //       fullWidth
    //         sx={{
    //           "& legend": { display: "none" },
    //           "& fieldset": { top: 0 },
    //         }}
    //       />    
    //     </div>
    //   </div>

    //   <br />
    //   <br />
    //   <br />
    //   <div className="row m-0">
    //     <div className="col-12">
    //       <Button
    //         variant="outlined"
    //         className="float-start"
    //         sx={{
    //           width: 300,
    //         }}
    //         startIcon={<SendIcon />}
    //       >
    //         Add Question
    //       </Button>
    //       {/* <Button variant="contained">Add Question</Button> */}
    //       <Button
    //         variant="outlined"
    //         className="float-end"
    //         sx={{
    //           width: 300,
    //           color: "red",
    //         }}
    //         startIcon={<DeleteIcon />}
    //       >
    //         Clear
    //       </Button>
    //     </div>
    //   </div>
    //         </div>

    // </>
  );
};
export default MCQ;
