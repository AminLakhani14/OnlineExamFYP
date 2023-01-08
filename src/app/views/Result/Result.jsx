import * as React from "react";
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

const Result = () => {
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
          <table class="table table-info table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">No.#</th>
                <th scope="col">Name</th>
                <th scope="col">Subject</th>
                <th scope="col">Marks</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Amin</td>
                <td>Science</td>
                <td>1</td>
                <td>10</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Amin</td>
                <td>Science</td>
                <td>1</td>
                <td>10</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Amin</td>
                <td>Science</td>
                <td>1</td>
                <td>10</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Amin</td>
                <td>Science</td>
                <td>1</td>
                <td>10</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Amin</td>
                <td>Science</td>
                <td>1</td>
                <td>10</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>Amin</td>
                <td>Science</td>
                <td>1</td>
                <td>10</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>Amin</td>
                <td>Science</td>
                <td>1</td>
                <td>10</td>
                </tr>
              <tr>
                <th scope="row">8</th>
                <td>Amin</td>
                <td>Science</td>
                <td>1</td>
                <td>10</td>
              </tr>
          </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Result;
