import { Course } from "../models/Course";
import CoursesInterface from "./CoursesInterfaces";
import _ from 'lodash'
import { minId, maxId } from "../config/courses-config";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"; 
export default class College {
    constructor(private courses: CoursesInterface) {}
    async addCourse(course: Course): Promise<Course | null> {
        if (!course.id) {
            course.id = _.random(minId, maxId);
        }
        const res = await this.courses.add(course);
        return  res ? (course) : null


    }
    removeCourse(id: number): Promise<boolean> {
        return this.courses.remove(id);

    }
    getCourse(id: number): Observable<Course | null> {
        return this.courses.get(id) as Observable<Course | null>;
    }
    getAllCourses(): Observable<Course[]|null>  { 
        return (this.courses.get() as Observable<Course[]>)
        .pipe(map(courses => !courses ? null : courses.map(c => ({...c, openingDate: new Date(c.openingDate)}))))
    }
   async  updateCourse(id: number, newCourse: Course):
     Promise<boolean> {
        return await this.courses.update(id, newCourse);
    } 
    async bulkAdd(courses: Course[]) {
       for(let course of courses) {
           await this.addCourse(course);
       } 
    }
}