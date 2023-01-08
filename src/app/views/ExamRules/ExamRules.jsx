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
  
  const ExamRules = () => {
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
                Examination Rules
              </Typography>
            </Breadcrumbs>
          </div>
          <hr />
        </div>
  
      
  
        <div className="row m-0">
          <div className="col-12">
            <h3 id="QuestionText" className="text-center">EXAMINATIONS RULES FOR STUDENTS</h3>
          </div>
        </div>

        <div className="row m-0">
          <div className="col-12">
            <h5>
          1-Participant should reach examination room at least 10 minutes before the scheduled time. No additional time shall be given to Participant arriving late.
          </h5>
        </div>
        <div className="col-12">
        <h5>
          2-Participant who has short attendance in any of the course(s) shall not be allowed to sit in the examination room.</h5>
          </div>
          <div className="col-12">
          <h5>
          3-DON'T BRING YOUR MOBILE PHONE AND ANY OTHER UNAUTHORIZED ELECTRONIC GADGETS!</h5>
          </div>
          <div className="col-12">
          <h5>
          If you bring it to an exam, you should be aware of the following:
            i. The University of Management and Technology accepts no responsibility for any loss or damage to your belongings.
            ii. On finding any of the unauthorized electronic gadgets, can lead the participant to Unfair Means Case.</h5>
        </div>
        <div className="col-12">
        <h5>
            4-Participant must maintain complete silence in the examination room. If a participant has any kind of query he/she should raise his/her hand and wait for the invigilator.
        </h5>
            </div>
            <div className="col-12">
            <h5>
            5-Lending/borrowing of pen, pencil, ruler, calculator, etc. is strictly prohibited in the examination room.
            </h5>
            </div>
            <div className="col-12">
            <h5>
            6-Participant must display UMT ID Card.
            </h5>
            </div>
            <div className="col-12">
            <h5>
            7-No rough work is to be done on the question paper.
            </h5>
            </div>
            <div className="col-12">
            <h5>
            8-Participant must mark his/her attendance on the attendance sheet during the examinations. In case, his/her name is not listed, they need to report to an invigilator immediately.
            </h5>
            </div>
            <div className="col-12">
            <h5>
            9-Participant found cheating, chatting, gesturing or miHSMhaving in the examination room shall be dealt with under the UMC rules.
            </h5>
            </div>
            <div className="col-12">
            <h5>
            10-Any participant using abusive or obscene language in the answer sheet shall be dealt with under disciplinary rules.
            </h5>
            </div>
            <div className="col-12">
            <h5>
            11-Participant cannot leave the examination room without prior permission of the invigilator.
            </h5>
            </div>
            <div className="col-12">
            <h5>
            12-In case of open book/open notes exams, participant must follow instructions given on the front page by the resource person and should not indulge themselves in conversation with one another.
            </h5>
            </div>
            <div className="col-12">
            <h5>
            13-Participant is not allowed to leave his/her seat during the exam without getting permission from the invigilator.
            </h5>
            </div>
            <div className="col-12">
            <h5>
            14-An attempt to gain access to a question paper before the examinations shall be dealt under the iqra rules.
            </h5>
          </div>
          </div>

      </>
    );
  };
  export default ExamRules;
  