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
import HeadBreadCrumb from "app/components/BreadCrumb/HeadBreadCrumb";

const ViewQAExam = () => {
  return (
    <>
           <HeadBreadCrumb text1={'Dashboard'} text2={'View QA'} url={'/'}/>


      <div className="row m-0 mt-3">
        <div className="col-12">
          <table class="table table-info table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">QNo.#</th>
                <th scope="col">Subject</th>
                <th scope="col">Question</th>
                <th scope="col">Marks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>English</td>
                <td>what is noun?</td>
                <td>2</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Science</td>
                <td>How many solar planet are there in space?</td>
                <td>10</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Programming</td>
                <td>What is OOP?</td>
                <td>3</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Programming</td>
                <td>What is OOP?</td>
                <td>3</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Programming</td>
                <td>What is OOP?</td>
                <td>3</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>Programming</td>
                <td>What is OOP?</td>
                <td>3</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>Programming</td>
                <td>What is OOP?</td>
                <td>3</td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td>Programming</td>
                <td>What is OOP?</td>
                <td>3</td>
              </tr>
              <tr>
                <th scope="row">9</th>
                <td>Programming</td>
                <td>What is OOP?</td>
                <td>3</td>
                </tr>
              <tr>
                <th scope="row">10</th>
                <td>Programming</td>
                <td>What is OOP?</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default ViewQAExam;
