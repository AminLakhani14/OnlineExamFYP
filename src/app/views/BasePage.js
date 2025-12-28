import AttemptMCQ from "./AttemptExam/AttemptMCQs/AttemptMCQ";
import AttemptQA from "./AttemptExam/AttemptQA/AttemptQA";
import MCQ from "./Examination/MCQs/MCQs";
import QA from "./Examination/QA/QA";
import ViewMCQs from "./Examination/ViewMCQs/ViewMCQs";
import VQP from "./Examination/VQP/VQP";
import ExamRules from "./ExamRules/ExamRules";
import ViewExam from "./Manage/ViewMCQExam/ViewExam";
import ViewQAExam from "./Manage/ViewQAExam/ViewQAExam";
import Result from "./Result/Result";
import Signup from "./sessions/Signup";
import SchoolList from "./lms/SchoolList";
import ClassList from "./lms/ClassList";
import SubjectList from "./lms/SubjectList";
import UserManagement from "./lms/UserManagement";
import TenantSettings from "./lms/TenantSettings";
import Attendance from "./operations/Attendance";
import StudyMaterial from "./operations/StudyMaterial";
import ChatRoom from "./operations/ChatRoom";
import ManageExams from "./academics/ManageExams";
import AttemptExams from "./academics/AttemptExams";
import Assignments from "./academics/Assignments";
import Games from "./games/Games";
import SnakeGame from "./games/SnakeGame";
import MemoryGame from "./games/MemoryGame";
import MazeRunner from "./games/MazeRunner";

const BasePage = [
  {
    path: "/operations/attendance",
    element: <Attendance />,
  },
  {
    path: "/operations/materials",
    element: <StudyMaterial />,
  },
  {
    path: "/operations/chat",
    element: <ChatRoom />,
  },
  {
    path: "/academics/exams",
    element: <ManageExams />,
  },
  {
    path: "/academics/attempt-exams",
    element: <AttemptExams />,
  },
  {
    path: "/academics/assignments",
    element: <Assignments />,
  },
  {
    path: "/admin/schools",
    element: <SchoolList />,
  },
  {
    path: "/admin/classes",
    element: <ClassList />,
  },
  {
    path: "/admin/subjects",
    element: <SubjectList />,
  },
  {
    path: "/admin/users",
    element: <UserManagement />,
  },
  {
    path: "/admin/settings",
    element: <TenantSettings />,
  },
  {
    path: "/Examination/QA",
    element: <QA />,
  },
  {
    path: "/Examination/MCQs",
    element: <MCQ />,
  },
  {
    path: "/AttemptExam/AttemptMCQs",
    element: <AttemptMCQ />,
  },
  {
    path: "/AttemptExam/AttemptQA",
    element: <AttemptQA />,
  },
  {
    path: "/Examination/VQP",
    element: <VQP />,
  },
  {
    path: "/Examination/ViewMCQs",
    element: <ViewMCQs />,
  },
  {
    path: "/Manage/ViewQAExam",
    element: <ViewQAExam />,
  },
  {
    path: "/Manage/ViewMCQExam",
    element: <ViewExam />,
  },
  {
    path: "/Result/Result",
    element: <Result />,
  },
  {
    path: "/ExamRules/ExamRules",
    element: <ExamRules />,
  },
  {
    path: "/sessions/Signup",
    element: <Signup />,
  },
  {
    path: "/games",
    element: <Games />,
  },
  {
    path: "/games/snake",
    element: <SnakeGame />,
  },
  {
    path: "/games/memory",
    element: <MemoryGame />,
  },
  {
    path: "/games/maze",
    element: <MazeRunner />,
  },
];

export default BasePage;
