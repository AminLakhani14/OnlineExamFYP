import {
  Box,
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
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Modal } from 'antd'
import HeadBreadCrumb from 'app/components/BreadCrumb/HeadBreadCrumb'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import DialogBox from 'app/components/DialogBox/DialogBox'
import { useNavigate } from 'react-router-dom'
import { CalculateResult } from '../CalculateExamResult/CaculateResultApi'
import { getUserId } from 'app/utils/utils'

const AttemptMCQ = () => {
  const [tableData, setTableData] = useState([])
  const [currentQuestion, setcurrentQuestion] = useState({})
  const [ScoreModal, setScoreModal] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [openDialogbox, setOpenDialogBox] = useState(false)
  const [Obtainedmarks, setObtainedmarks] = useState(0)
  const navigate=useNavigate()

  const handleOk = async() => {
    setScoreModal(false)
    localStorage.setItem('MCQsMarks',Obtainedmarks)
    let courseData=tableData.map(x=>x.course).join(',')
    let obj={
      mcqMarks:Obtainedmarks ?? 0,
      totalMarks:tableData.reduce( (acc, obj) => acc + +obj.marks, 0) ?? 0,
      course:courseData ?? '',
      registerID: getUserId()
    }
   
    await CalculateResult('https://localhost:7040/api/QAmarks/Post-MCQsMarks',obj)
    .then(res=>res.status===200 ? navigate("/") : console.log('something went wrong!'))
    .catch(err=>console.log(err))
  }

  const handleCancel = () => {
    setScoreModal(false)
  }

  const getpost = () => {
    axios
      .get(`https://localhost:7040/api/MCQs/Get-MCQs`)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length) {
            setTableData(res.data)
            setcurrentQuestion(res.data[0])
          }
          console.log('hello world', res.data)
        } else {
          console.log('something went wrong')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    getpost()
  }, [])

  console.log(tableData)

  const handleRadio = (e) => {
    let { value } = e.target
    setSelectedOption(value)
  }

  const clickNextQuestion = (e) => {
    if (!selectedOption) {
      setOpenDialogBox(true)
    } else {
      handleSaveResult()
      setSelectedOption('')
    }
  }

  const handleSaveResult = () => {
    let array = [...tableData]
    let selectedQuestion = array.find((x) => x.id === currentQuestion.id)
    if (selectedOption === selectedQuestion.correctAnswer) {
      setObtainedmarks((prev) => prev + +selectedQuestion.marks)
    } else {
      setObtainedmarks((prev) => prev + 0)
    }
    if (currentQuestion?.id !== array.slice(-1)[0]?.id) {
      setSelectedOption('')
      let index = array.findIndex((x) => x.id === currentQuestion.id)
      let obj1 = array[index + 1]
      setcurrentQuestion(obj1)
    } else {
      setScoreModal(true)
    }
  }

  const closeDialogBox = () => {
    setOpenDialogBox(false)
  }

  return (
    <>
      {openDialogbox && (
        <DialogBox
          openDialog={openDialogbox}
          title="Please fill the answer first"
          handleOk={closeDialogBox}
          Okaybtn={true}
        />
      )}
      {ScoreModal && (
        <Modal
          title="Result"
          open={ScoreModal}
          okText="Ok"
          closable={false}
          footer={[
            <Button key="ok" type="secondary" onClick={handleOk}>
              OK
            </Button>,
          ]}
        >
          <Box>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
              className="mt-3 mb-4"
            >
              Your Marks is {Obtainedmarks}/{' '}
              {tableData.reduce(function (acc, obj) {
                return acc + +obj.marks
              }, 0)}
            </Typography>
            <div className="mb-4"></div>
          </Box>
        </Modal>
      )}
      <HeadBreadCrumb text1={'Dashboard'} text2={'MCQs'} url={'/'} />
      <div className="row m-0">
        <div className="d-flex justify-content-between mt-4">
          <h3 id="QuestionText" className="m-0 mt-2">
            Question {currentQuestion?.id ?? ''}:
          </h3>
          <div className="align-items-center d-flex justify-content-end w-auto">
            <label className="align-items-center mt-2 d-flex px-2">
              marks:
            </label>
            <TextField
              className="mt-2 w-50"
              fullWidth
              disabled
              value={currentQuestion?.marks ?? ''}
              size="small"
              sx={{
                '& legend': { display: 'none' },
                '& fieldset': { top: 0 },
              }}
            />
          </div>
        </div>
      </div>
      <div className="row m-0">
        <div className="col-12">
          <h6>{currentQuestion?.question ?? ''}</h6>
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
              name="radio-buttons-group"
              onChange={handleRadio}
              value={selectedOption}
            >
              <FormControlLabel
                label={currentQuestion?.optionA ?? ''}
                control={<Radio />}
                value={currentQuestion?.optionA ?? ''}
              />
              <FormControlLabel
                label={currentQuestion?.optionB ?? ''}
                control={<Radio />}
                value={currentQuestion?.optionB ?? ''}
              />

              <FormControlLabel
                label={currentQuestion?.optionC ?? ''}
                control={<Radio />}
                value={currentQuestion?.optionC ?? ''}
              />
              <FormControlLabel
                label={currentQuestion?.optionD ?? ''}
                control={<Radio />}
                value={currentQuestion?.optionD ?? ''}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <br />
      <br />
      <br />
      <div className="d-flex justify-content-end footerBtn">
        <Button
          variant="outlined"
          sx={{
            width: 200,
            color:
              currentQuestion?.id === tableData.slice(-1)[0]?.id
                ? 'red'
                : 'blue',
          }}
          endIcon={
            currentQuestion?.id === tableData.slice(-1)[0]?.id ? (
              <SaveIcon />
            ) : (
              <NavigateNextIcon />
            )
          }
          onClick={clickNextQuestion}
        >
          {currentQuestion?.id === tableData.slice(-1)[0]?.id
            ? 'Submit'
            : 'Next Question'}
        </Button>
      </div>
    </>
  )
}
export default AttemptMCQ
