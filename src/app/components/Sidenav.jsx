import { styled } from '@mui/system';
import { MatxVerticalNav } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { AttemptExam, Dashboard, Manage, UploadExam, navigations } from 'app/navigations';
import { Fragment, useState } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import RuleIcon from '@mui/icons-material/Rule';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { getUserId } from 'app/utils/utils';
import axios from 'axios';

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative',
}));

const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.54)',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: { display: 'none' },
}));
const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  const AttepmtExamOptions= ()=>{
    let getAttemptedUsers=JSON.parse(localStorage.getItem('QAattempUsers'))
    let getMCQsAttemptedUsers=JSON.parse(localStorage.getItem('MCQSAttemptUsers'))
    let userId=getUserId()
    // let getResonse=await axios.get('https://localhost:7040/Get-Result')
    // debugger
    // if(getResonse.data){
    //   let mcqsResult=getResonse.data.mcQmarks.includes(userId)
    //   let qaResult=getResonse.data.qaMarks.includes(userId)
    //   console.log(mcqsResult,qaResult)
    // }
    if(getAttemptedUsers?.includes(userId) && getMCQsAttemptedUsers?.includes(userId)) return false;
    else if(getAttemptedUsers?.includes(userId)){
      return {
        name: 'Attempt Exam',
        icon: 'home',
        children: [{ name: 'MCQs', path: '/AttemptExam/AttemptMCQs', iconText: 'A' }]
      }
    }else if(getMCQsAttemptedUsers?.includes(userId)){
      return {
        name: 'Attempt Exam',
        icon: 'home',
        children: [{name: 'Question/Answers', path: '/AttemptExam/AttemptQA', iconText: 'A'}]
      }
    }else{
      return {
        name: 'Attempt Exam',
        icon: 'home',
        children: [
          {name: 'Question/Answers', path: '/AttemptExam/AttemptQA', iconText: 'A'},
          { name: 'MCQs', path: '/AttemptExam/AttemptMCQs', iconText: 'A' },
        ],
      }
    }
  }
 
  const renderNavigation=()=>{
    if((localStorage.getItem("User") === 'Student')){
      if(!AttepmtExamOptions())
      return [
        Dashboard(),
        { label: 'Menu', type: 'label' },
        { name: 'View Result', path: '/Result/Result', icon: <PendingActionsIcon /> },
        { name: 'Rule', path: '/ExamRules/ExamRules', icon: <RuleIcon /> },
      
        {
          name: 'Documentation',
          icon: 'launch',
          type: 'extLink',
          path: 'https://github.com/AminLakhani14/OnlineExamFYP',
        },
      ]
      else{
        return [
          Dashboard(),
          { label: 'Menu', type: 'label' },
          AttepmtExamOptions(),
          { name: 'View Result', path: '/Result/Result', icon: <PendingActionsIcon /> },
          { name: 'Rule', path: '/ExamRules/ExamRules', icon: <RuleIcon /> },
        
          {
            name: 'Documentation',
            icon: 'launch',
            type: 'extLink',
            path: 'https://github.com/AminLakhani14/OnlineExamFYP',
          },
        ]
      }
   
    }
    else if((localStorage.getItem("User") === 'Teacher' || localStorage.getItem("User") === 'Admin')){
      return [
        Dashboard(),
        { label: 'Menu', type: 'label' },
        UploadExam(),
        Manage(),
        { name: 'View Result', path: '/Result/Result', icon: <PendingActionsIcon /> },
        { name: 'Rule', path: '/ExamRules/ExamRules', icon: <RuleIcon /> },
      
        {
          name: 'Documentation',
          icon: 'launch',
          type: 'extLink',
          path: 'https://github.com/AminLakhani14/OnlineExamFYP',
        },
      ]
    }
  }
  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        {/* Side Menu bar */}
        <MatxVerticalNav 
        items={ renderNavigation()} 
        />
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />
    </Fragment>
  );
};

export default Sidenav;
