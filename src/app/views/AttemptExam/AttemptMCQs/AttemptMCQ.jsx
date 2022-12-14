import {
  Breadcrumbs,
  Button,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Link,
  MenuItem,
  Pagination,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from '@mui/icons-material/Save';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const AttemptMCQ = () => {
  return (
    <>
     <div className="row m-0">
        <div className="d-flex justify-content-between mt-4">
          <h3 id="QuestionText" className="m-0 mt-2">
            Question1:{" "}
          </h3>
          <div className="align-items-center d-flex justify-content-end w-auto">
            <label className="align-items-center mt-2 d-flex px-2">
              marks:
            </label>
            <TextField
              className="mt-2 w-50"
              fullWidth
              disabled
              size="small"
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
              }}
            />
          </div>
        </div>
      </div>
      <div className="row m-0">
        <div className="col-12">
            <h6>which country located in the east of Pakistan?</h6>
        </div>
      </div>

      <br />

      <div className="row m-0">
        <div className="col-3">
          <h3 id="Answer_MCQs">Options:</h3>
        </div>
      </div>

      <div className="row m-0">
        <div className="col-2 my-2">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="India"
              />
              <FormControlLabel 
              value="2"
               control={<Radio />} 
               label="Chain" />

              <FormControlLabel
                value="3"
                control={<Radio />}
                label="Afghanistan"
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="Iran"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <br />
      <br />
      <br />
      <div className="row m-0">
        <div className="col-12">
          <Button
            variant="outlined"
            className="float-start"
            sx={{
              width: 300,
            }}
            endIcon={<SaveIcon />}
          >
            Save Answer
          </Button>
          {/* <Button variant="contained">Add Question</Button> */}
          <Button
            variant="outlined"
            className="float-end"
            sx={{
              width: 300,
              color: "red",
            }}
            endIcon={<NavigateNextIcon />}
          >
            Next Question
          </Button>
        </div>
      </div>
      <div className="row ">
        <div className="col-4"></div>
        <div className="col-4 mt-5">
          <Stack spacing={4}>
            <Pagination count={10} variant="outlined" shape="rounded" />
          </Stack>
        </div>
      </div>
    </>
  );
};
export default AttemptMCQ;
