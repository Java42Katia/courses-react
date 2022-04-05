import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import AddCourse from './components/pages/AddCourse';
import Courses from './components/pages/Courses';
import { ITEMS, PATH_ADD_COURSE, PATH_COST_STATISTICS, PATH_COURSES, PATH_GENERATION, PATH_HOURS_STATISTICS, PATH_LOGIN, PATH_LOGOUT } from './config/route-config';

import { Course } from './models/Course';
import CostStatistics from './components/pages/CostStatistics';
import HoursStatistics from './components/pages/HoursStatistics';
import Generation from './components/pages/Generation';

import usePollerRedux from './util/common/usePollerRedux';
import { Alert } from '@material-ui/lab';
import { createTheme, LinearProgress, ThemeProvider } from '@material-ui/core';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import UserData from './models/UserData';
import { authService } from './config/auth-config';
import { ActionItem } from './models/common/ActionItem';
import { codeSet, coursesSet, userSet } from './redux/actions';
import { coursesSelector, ReducersType, userSelector } from './redux/store';
import { CODE_SET_TIMEOUT, college } from './config/courses-config';
import NavigatorResponsive from './components/common/NavigatorResponsive';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


const App: React.FC = () => {
  const theme = createTheme({
    typography: {
      body1: {
        fontWeight: 'bold',

      }
    },
    spacing: 4
  })
  const courses: Course[] | null = usePollerRedux<Course[] | null>(college, college.getAllCourses,
    coursesSet, coursesSelector)

  const userData = usePollerRedux<UserData>(authService,
    authService.getUserData, userSet, userSelector);
  const dispatch = useDispatch();
  const code = useSelector<ReducersType, boolean>(state => state.code);
  useEffect(() => {
    let timeoutId: any;
    if (!code) {
      timeoutId = setTimeout(() => dispatch(codeSet(true)), CODE_SET_TIMEOUT);
    }
    return () => clearTimeout(timeoutId);
  }, [code, dispatch])

  function getItems(): ActionItem[] {
    if (userData) {
      const logoutItem = ITEMS.find(item => item.path === PATH_LOGOUT);
      if (logoutItem) {
        logoutItem.label = userData.displayName;
      }
      return userData.isAdmin ? ITEMS :
        ITEMS.filter(item => !item.isAdmin)
    } else {
      return [];
    }
  }
  return (
    <ThemeProvider theme={theme}><HashRouter >

      {userData?.username ? <div><NavigatorResponsive items={getItems()}></NavigatorResponsive>
        <Redirect to={PATH_COURSES}></Redirect></div> : <Redirect to={PATH_LOGIN}></Redirect>}
      {(!courses && userData.username) ? <div><Alert severity='error'>Server is not in service. Please wait ... </Alert>
        <LinearProgress color="secondary" /></div> : <Switch>
        <Route path={PATH_COURSES} exact render={() =>
          <Courses />} />
        <Route path={PATH_ADD_COURSE} exact render={() =>
          <AddCourse />} />
        <Route path={PATH_COST_STATISTICS} exact render={() =>
          <CostStatistics />} />
        <Route path={PATH_HOURS_STATISTICS} exact render={() =>
          <HoursStatistics />} />
        <Route path={PATH_GENERATION} exact render={() =>
          <Generation />} />
        <Route path={PATH_LOGIN} exact render={() =>
          <Login />} />
        <Route path={PATH_LOGOUT} exact render={() =>
          <Logout />} />


      </Switch>}
    </HashRouter ></ThemeProvider>
  )
}
export default App;