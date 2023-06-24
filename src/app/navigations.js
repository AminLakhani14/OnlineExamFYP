import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SchoolIcon from '@mui/icons-material/School'
import HomeIcon from '@mui/icons-material/Home'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import RuleIcon from '@mui/icons-material/Rule'
import { useEffect } from 'react'

// let user = localStorage.getItem("Admin"){}

// useEffect(()=>{
//   if (localStorage.getItem("Admin") ) 
//   {
//     navigations.splice(2, 2);
//   } else if (localStorage.getItem("Teacher") ){
//     navigations.splice(4, 1);
//   }
//   else if (localStorage.getItem("Student") ){
//     navigations.splice(2, 2);
//   }
// },[])

function UploadExam() {
  return {
    name: 'Upload Exam',
    icon: 'books',
    children: [
      { name: 'Question/Answers', path: '/Examination/QA', iconText: 'A' },
      { name: 'MCQs', path: '/Examination/MCQs', iconText: 'B' },
      {
        name: 'Update Question Paper',
        path: '/Examination/VQP',
        iconText: 'B',
      },
      { name: 'Update MCQs', path: '/Examination/ViewMCQs', iconText: 'B' },
    ],
  }
}
function Dashboard() {
  return { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' }
}
function Manage() {
  return {
    name: 'Manage',
    icon: <ManageAccountsIcon />,
    children: [
      { name: 'View QA Paper', path: '/Manage/ViewQAExam', iconText: 'E' },
      { name: 'View MCQs Paper', path: '/Manage/ViewMCQExam', iconText: 'E' },
    ],
  }
}
function AttemptExam() {
  return {
    name: 'Attempt Exam',
    icon: 'home',
    children: [
      {
        name: 'Question/Answers',
        path: '/AttemptExam/AttemptQA',
        iconText: 'A',
      },
      { name: 'MCQs', path: '/AttemptExam/AttemptMCQs', iconText: 'A' },
    ],
  }
}

export const navigations = [
  
  Dashboard(),
  { label: 'Menu', type: 'label' },
  UploadExam(),
  Manage(),
  AttemptExam(),
  { name: 'View Result', path: '/Result/Result', icon: <PendingActionsIcon /> },
  { name: 'Rule', path: '/ExamRules/ExamRules', icon: <RuleIcon /> },

  {
    name: 'Documentation',
    icon: 'launch',
    type: 'extLink',
    path: 'https://github.com/AminLakhani14/OnlineExamFYP',
  },
]

if (localStorage.getItem === 'Admin') navigations.splice(2, 1)
