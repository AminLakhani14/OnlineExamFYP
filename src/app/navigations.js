import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';

export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  // { label: 'PAGES', type: 'label' },
  // {
  //   name: 'Session/Auth',x
  //   icon: 'security',
  //   children: [
  //     { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
  //     { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
  //     { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
  //     { name: 'Error', iconText: '404', path: '/session/404' },
  //   ],
  // },
  { label: 'Menu', type: 'label' },
  {
    name: 'Upload Exam',
    icon: 'books',
    children: [
      { name: 'Question/Answers', path: '/Examination/QA', iconText: 'A' },
      { name: 'MCQs', path: '/Examination/MCQs', iconText: 'B' },
      { name: 'Update Question Paper', path: '/Examination/VQP', iconText: 'B' },
      { name: 'Update MCQs', path: '/Examination/ViewMCQs', iconText: 'B' },

    ],
  },
  {
    name: 'Manage',
    icon: <ManageAccountsIcon/>,
    children: [
      { name: 'View QA Paper', path: '/Manage/ViewQAExam', iconText: 'E' },
      { name: 'View MCQs Paper', path: '/Manage/ViewMCQExam', iconText: 'E' },
    
    ],
  },
  {
    name: 'Attempt Exam',
    icon: 'home',
    children: [
    { name: 'Question/Answers', path: '/AttemptExam/AttemptQA', iconText: 'A' },
    { name: 'MCQs', path: '/AttemptExam/AttemptMCQs', iconText: 'A' },
    ],
  },
  { name: 'View Result', path: '/Result/Result', icon: 'dashboard' },
  { name: 'Rule', path: '/ExamRules/ExamRules', icon: 'dashboard' },

{
    name: 'Documentation',
    icon: 'launch',
    type: 'extLink',
    path: 'https://github.com/AminLakhani14/OnlineExamFYP',
  },
  
];
