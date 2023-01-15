import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "@mui/material";
import HeadBreadCrumb from "app/components/BreadCrumb/HeadBreadCrumb";

const ViewMCQs = () => {
  return (
    <>
      <HeadBreadCrumb text1={'Dashboard'} text2={'Update MCQs'} url={'/'}/>

      <div className="row m-0 mt-3">
        <div className="col-12">
          <table class="table table-info table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">QNo.#</th>
                <th scope="col">Subject</th>
                <th scope="col">Question</th>
                <th scope="col">Option 1</th>
                <th scope="col">Option 2</th>
                <th scope="col">Option 3</th>
                <th scope="col">Option 4</th>
                <th scope="col">Marks</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Science</td>
                <td>How many solar planet are there in space?</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>1</td>
                <td>
                  <IconButton aria-label="Delete" color="primary">
                    <DeleteIcon />
                  </IconButton>

                  <IconButton aria-label="Edit" color="success">
                    <EditIcon />
                  </IconButton>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Science</td>
                <td>How many solar planet are there in space?</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>1</td>
                <td>
                  <IconButton aria-label="Delete" color="primary">
                    <DeleteIcon />
                  </IconButton>

                  <IconButton aria-label="Edit" color="success">
                    <EditIcon />
                  </IconButton>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Science</td>
                <td>How many solar planet are there in space?</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>1</td>
                <td>
                  <IconButton aria-label="Delete" color="primary">
                    <DeleteIcon />
                  </IconButton>

                  <IconButton aria-label="Edit" color="success">
                    <EditIcon />
                  </IconButton>
                </td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Science</td>
                <td>How many solar planet are there in space?</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>1</td>
                <td>
                  <IconButton aria-label="Delete" color="primary">
                    <DeleteIcon />
                  </IconButton>

                  <IconButton aria-label="Edit" color="success">
                    <EditIcon />
                  </IconButton>
                </td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Science</td>
                <td>How many solar planet are there in space?</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>1</td>
                <td>
                  <IconButton aria-label="Delete" color="primary">
                    <DeleteIcon />
                  </IconButton>

                  <IconButton aria-label="Edit" color="success">
                    <EditIcon />
                  </IconButton>
                </td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>Science</td>
                <td>How many solar planet are there in space?</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>1</td>
                <td>
                  <IconButton aria-label="Delete" color="primary">
                    <DeleteIcon />
                  </IconButton>

                  <IconButton aria-label="Edit" color="success">
                    <EditIcon />
                  </IconButton>
                </td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>Science</td>
                <td>How many solar planet are there in space?</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>1</td>
                <td>
                  <IconButton aria-label="Delete" color="primary">
                    <DeleteIcon />
                  </IconButton>

                  <IconButton aria-label="Edit" color="success">
                    <EditIcon />
                  </IconButton>
                </td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td>Science</td>
                <td>How many solar planet are there in space?</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>1</td>
                <td>
                  <IconButton aria-label="Delete" color="primary">
                    <DeleteIcon />
                  </IconButton>

                  <IconButton aria-label="Edit" color="success">
                    <EditIcon />
                  </IconButton>
                </td>
              </tr>
          </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default ViewMCQs;
