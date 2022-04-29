import College from "../services/College";
import CoursesAxiosImpl from "../services/CoursesAxiosImpl";
//import CoursesAxiosImpl from "../services/CoursesAxiosImpl";
import CoursesFireImpl from "../services/CoursesFireImpl";


export const minHours = 80;
export const maxHours = 500;
export const lecturers = [
  "Eduard", "Elena", "Grigory", "Igor", "Ivan",
  "Taya", "Yulia", "Yuri", "Vladimir", "Daniel"
];
export const courseNames = [
  "Basic Programming", "Java Core", "Java Back-End",
  "HTML, CSS, JS", "React", "QA Manual", "QA Automation"
];
export const minYear = 2010;
export const maxYear = 2021;
export const minId = 1000000;
export const maxId = 9999999;
export const minCost = 5000;
export const maxCost = 18000;
export const MIN_COST_INT = 100;
export const MAX_COST_INT = 5000;
export const MIN_HOURS_INT = 10;
export const MAX_HOURS_INT = 100;
// export const college =
//   new College(new CoursesFireImpl('courses'));
export const college = 
  new College(new CoursesAxiosImpl('http://localhost:8080/courses'));
export const CODE_SET_TIMEOUT = 300;