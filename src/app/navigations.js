import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SchoolIcon from "@mui/icons-material/School";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import RuleIcon from "@mui/icons-material/Rule";
import GroupIcon from "@mui/icons-material/Group";
import ClassIcon from "@mui/icons-material/Class";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export const navigations = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  { label: "ADMINISTRATION", type: "label", auth: ["SA", "Admin"] },
  {
    name: "Manage Schools",
    path: "/admin/schools",
    icon: <SchoolIcon />,
    auth: ["SA"],
  },
  {
    name: "Manage Classes",
    path: "/admin/classes",
    icon: <ClassIcon />,
    auth: ["SA", "Admin"],
  },
  {
    name: "Manage Subjects",
    path: "/admin/subjects",
    icon: <MenuBookIcon />,
    auth: ["SA", "Admin"],
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <GroupIcon />,
    auth: ["SA", "Admin"],
  },
  {
    name: "School Settings",
    path: "/admin/settings",
    icon: "settings",
    auth: ["SA", "Admin"],
  },

  {
    label: "DAILY OPERATIONS",
    type: "label",
    auth: ["Admin", "Teacher", "Student"],
  },
  {
    name: "Attendance",
    path: "/operations/attendance",
    icon: "how_to_reg",
    auth: ["Admin", "Teacher"],
  },
  {
    name: "Study Materials",
    path: "/operations/materials",
    icon: "cloud_upload",
    auth: ["Admin", "Teacher", "Student"],
  },
  {
    name: "Chat",
    path: "/operations/chat",
    icon: "chat",
    auth: ["Admin", "Teacher", "Student"],
  },

  {
    name: "ACADEMICS",
    icon: "school",
    children: [
      {
        name: "Manage Exams",
        path: "/academics/exams",
        icon: "assignment",
        auth: ["Admin", "Teacher"],
      },
      {
        name: "Attempt Exams",
        path: "/academics/attempt-exams",
        icon: "play_arrow",
        auth: ["Student"],
      },
      {
        name: "Assignments",
        path: "/academics/assignments",
        icon: "event_note",
        auth: ["Admin", "Teacher", "Student"],
      },
    ],
  },
  {
    name: "Question Bank",
    icon: "storage",
    children: [
      {
        name: "Question/Answers",
        path: "/Examination/QA",
        iconText: "QA",
        auth: ["Teacher", "Admin"],
      },
      {
        name: "MCQs",
        path: "/Examination/MCQs",
        iconText: "MCQ",
        auth: ["Teacher", "Admin"],
      },
      {
        name: "Question Bank",
        path: "/Examination/VQP",
        iconText: "QB",
        auth: ["Teacher", "Admin"],
      },
    ],
  },
  {
    name: "Manage Papers",
    icon: <ManageAccountsIcon />,
    auth: ["Admin", "Teacher"],
    children: [
      { name: "QA Papers", path: "/Manage/ViewQAExam", iconText: "QA" },
      { name: "MCQ Papers", path: "/Manage/ViewMCQExam", iconText: "MCQ" },
    ],
  },
  {
    name: "Attempt Exam",
    icon: "play_arrow",
    auth: ["Student"],
    children: [
      { name: "Subjective", path: "/AttemptExam/AttemptQA", iconText: "S" },
      { name: "Objective", path: "/AttemptExam/AttemptMCQs", iconText: "O" },
    ],
  },
  {
    name: "View Results",
    path: "/Result/Result",
    icon: <PendingActionsIcon />,
    auth: ["Student", "Teacher", "Admin", "SA"],
  },
  { name: "Exam Rules", path: "/ExamRules/ExamRules", icon: <RuleIcon /> },

  {
    label: "ENGAGEMENT",
    type: "label",
    auth: ["Student", "SA", "Admin", "Teacher"],
  },
  {
    name: "Games",
    path: "/games",
    icon: "videogame_asset",
    auth: ["Student", "SA", "Admin", "Teacher"],
  },

  {
    name: "Documentation",
    icon: "launch",
    type: "extLink",
    path: "https://github.com/AminLakhani14/OnlineExamFYP",
  },
];
