
import { Observable, of, lastValueFrom } from "rxjs";
import Axios from "axios-observable";
import {catchError, map} from 'rxjs/operators';
import CoursesInterfaces from "./CoursesInterfaces";
import { Course } from "../models/Course";
import { AUTH_TOKEN_ITEM } from "../config/auth-config";
const bearer = 'Bearer '
function getAuthHeader() {
 return {'Authorization' : ''}
}
export default class CoursesAxiosImpl implements CoursesInterfaces {
    constructor(private url:string) {}
    add(course: Course): Promise<boolean> {
        return lastValueFrom
        (Axios.post(this.url, course, {
           headers: getAuthHeader () 
        }).pipe(map(response => true),
         catchError(err => of(false))));
     
    }
    remove(id: number): Promise<boolean> {
        return lastValueFrom 
        (Axios.delete(this.getUrlWithId(id),{
            headers: getAuthHeader () 
         }).pipe(map(() => true),
         catchError(err => of(false))));
    }
    private getUrlWithId(id: number): string {
       return `${this.url}/${id}`;
    }
    update(id: number, newCourse: Course): Promise<boolean> {
       return lastValueFrom
       (Axios.put(this.getUrlWithId(id), newCourse,{
        headers: getAuthHeader () 
     }).pipe(map(() => true),
        catchError(err => of(false))));
    }
    get(id?: number): Observable<Course | Course[] | null>   {
        if (id == undefined) {
            return Axios.get<Course[]>(this.url,{
                headers: getAuthHeader () 
             })
            .pipe(map(response => response.data), catchError(err => of(null)))
        } else {
            return Axios.get<Course>(this.getUrlWithId(id),{
                headers: getAuthHeader () 
             })
            .pipe(map(response => response.data), catchError(err => of(null)))

        }
    }
    
}