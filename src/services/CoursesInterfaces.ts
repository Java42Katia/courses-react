import { Observable } from "rxjs";
import { Course } from "../models/Course";

export default interface CoursesInterface {
    add(course: Course): Promise<boolean>;
    remove(id: number): Promise<boolean>;
    update(id: number, newCourse: Course): Promise<boolean>;
    get(id?:number): Observable<Course | Course[] | null>;
}