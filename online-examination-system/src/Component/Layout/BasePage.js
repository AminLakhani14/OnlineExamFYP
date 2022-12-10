import { Route, Routes  } from "react-router-dom";

import SignInOutContainer from "../SignInOutContainer/SignInOutContainer";
import StudentLoginPage from "../StudentLoginPage/StudentLoginPage";
import StudentSignUpPage from "../StudentSignUpPage/StudentSignUpPage";
import TeacherLoginPage from "../TeacherLoginPage/TeacherLoginPage";

export default function BasePage(props) {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<TeacherLoginPage />} />
        <Route path="/StudentSignUpPage" element={<StudentSignUpPage />} />
        <Route path="/StudentLoginPage" element={<StudentLoginPage />} />
        <Route path="/SignInOutContainer" element={<SignInOutContainer />} />
      </Routes>
    </div>
  );
}
