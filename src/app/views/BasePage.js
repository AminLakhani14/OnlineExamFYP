import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import AttemptMCQ from './AttemptExam/AttemptMCQs/AttemptMCQ';
import AttemptQA from './AttemptExam/AttemptQA/AttemptQA';
import Card from './Cards/Card1';
import MCQ from './Examination/MCQs/MCQs';
import QA from './Examination/QA/QA';
import ViewMCQs from './Examination/ViewMCQs/ViewMCQs';
import VQP from './Examination/VQP/VQP';
import ExamRules from './ExamRules/ExamRules';
import ViewExam from './Manage/ViewMCQExam/ViewExam';
import ViewQAExam from './Manage/ViewQAExam/ViewQAExam';
import Result from './Result/Result';
import Signup from './sessions/Signup';

// const AppTable = Loadable(lazy(() => import('./tables/AppTable')));
// const AppForm = Loadable(lazy(() => import('./forms/AppForm')));
// const AppButton = Loadable(lazy(() => import('./buttons/AppButton')));
// const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')));
// const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')));
// const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')));
// const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')));
// const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')));
// const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')));
// const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')));
// const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')));
// const AppAutoComplete = Loadable(lazy(() => import('./auto-complete/AppAutoComplete')));
// const AppExpansionPanel = Loadable(lazy(() => import('./expansion-panel/AppExpansionPanel')));

const BasePage = [
  {
    path: '/Examination/QA', element: <QA />,
  },
  {
    path: '/Examination/MCQs', element: <MCQ />,
  },
  {
    path: '/AttemptExam/AttemptMCQs', element: <AttemptMCQ />,
  },
  {
    path: '/AttemptExam/AttemptQA', element: <AttemptQA />,
  },
  {
    path: '/Examination/VQP', element: <VQP />,
  },
  {
    path: '/Examination/ViewMCQs', element: <ViewMCQs />,
  },
  {
    path: '/Cards/Card1', element: <Card />,
  },
  {
    path: '/Manage/ViewQAExam', element: <ViewQAExam />,
  },
  {
    path: '/Manage/ViewMCQExam', element: <ViewExam />,
  },
  {
    path: '/Result/Result', element: <Result />,
  },
  {
    path: '/ExamRules/ExamRules', element: <ExamRules />,
  },
  {
    path: '/sessions/Signup', element: <Signup />,
  },
  
  
];

export default BasePage;
