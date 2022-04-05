import CoursesInterface from "./CoursesInterfaces";
import { Course } from "../models/Course";
import { Observable, of } from "rxjs";
import { collectionData, docData } from "rxfire/firestore";
import { catchError } from "rxjs/operators";
import firebase from 'firebase';
import appFire from "../config/firebase-config";
export default class CoursesFireImpl implements CoursesInterface {
    fireCollection: firebase.firestore.CollectionReference;
    constructor(collectionName: string) {
        //connection with collection of the given name
        this.fireCollection = appFire.firestore().collection(collectionName);
    }
    private async isExists(id: string): Promise<boolean> {
        const doc = await this.fireCollection.doc(id).get();
        
        return doc.exists;
    }
    private async setCourse(id: string, course: Course): Promise<boolean> {
        let res: boolean;
        try {

            await this.fireCollection.doc(id).set({
                ...course,
                openingDate: course.openingDate.toISOString().substr(0, 10)
            });
            res = true;
        } catch (error) {
            console.log(error)
            res = false;
        }
        console.log(res)
        return res;

    }
    async add(course: Course): Promise<boolean> {
        const id = (course.id as number).toString();
        if (await this.isExists(id)) {
            return false;
        }
        return this.setCourse(id, course);
    }
    async remove(id: number): Promise<boolean> {
        const idStr = id.toString();
        if (!await this.isExists(idStr)) {
            return false;
        }
        try {
            await this.fireCollection.doc(idStr).delete();
            return true;
        } catch (error) {
            return false;
        }
    }
    async update(id: number, newCourse: Course): Promise<boolean> {
        const idStr = id.toString();
        const resExists = await this.isExists(idStr);

        if (!resExists) {
            return false;
        }
        return this.setCourse(idStr, newCourse);
    }
    get(id?: number): Observable<Course | Course[] | null> {
        let res: Observable<Course | Course[] | null>;
        if (id) {
            const idStr = id.toString();
            res = docData<Course>(this.fireCollection.doc(idStr));
        } else {
            res = collectionData<Course>(this.fireCollection);

        }
        return res.pipe(catchError(err => of(null)));
    }

}