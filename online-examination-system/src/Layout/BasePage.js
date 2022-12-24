import { Route, Routes  } from "react-router-dom";
import DashBoard from '../Pages/DashBoard/DashBoard'

import SignInOutContainer from "../Pages/SignInOutContainer/SignInOutContainer";
import StudentLoginPage from "../Pages/StudentLoginPage/StudentLoginPage";
import StudentSignUpPage from "../Pages/StudentSignUpPage/StudentSignUpPage";
import TeacherLoginPage from "../Pages/TeacherLoginPage/TeacherLoginPage";

export default function BasePage(props) {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<TeacherLoginPage />} />
        <Route path="/StudentSignUpPage" element={<StudentSignUpPage />} />
        <Route path="/StudentLoginPage" element={<StudentLoginPage />} />
        <Route path="/SignInOutContainer" element={<SignInOutContainer />} />
        <Route path="/DashBoard" element={<DashBoard/>} />


      </Routes>
    </div>
  );
}
