import { PayloadAction } from "@reduxjs/toolkit";
import { college } from "../config/courses-config";
import { Course } from "../models/Course";
import UserData from "../models/UserData";

export const SET_COURSES_ACTION = 'courses/set';
export const SET_USER_ACTION = 'user/set';
export const SET_CODE_ACTION = 'code/set';
export const codeSet = (code: boolean): PayloadAction<boolean> =>
    ({ payload: code, type: SET_CODE_ACTION });
export const coursesSet = (courses: Course[] | null):
    PayloadAction<Course[] | null> => ({ type: SET_COURSES_ACTION, payload: courses });
export const userSet = (user: UserData):
    PayloadAction<UserData> => ({ type: SET_USER_ACTION, payload: user });
export const add = (course: Course): (dispatch: any) => void => {
    return async (dispatch) => {
        let result;
        try {
            result = !!await college.addCourse(course);
        } catch (err) {
            result = false;
        }
        dispatch(codeSet(result))
    }
}
export const remove = (id: number): (dispatch: any) => void => {
    return async (dispatch) => {
        let result;
        try {
            result = await college.removeCourse(id);
        } catch (err) {
            result = false;
        }
        dispatch(codeSet(result))
    }
}
export const update = (id: number, course: Course): (dispatch: any) => void => {
    return async (dispatch) => {
        let result;
        try {
            result = await college.updateCourse(id, course);
        } catch (err) {
            result = false;
        }
        dispatch(codeSet(result))
    }
}
export const bulk = (courses: Course[]): (dispatch: any) => void => {
    return async (dispatch) => {
        let result;
        try {
            await college.bulkAdd(courses);
            result = true
        } catch (err) {
            result = false;
        }
        dispatch(codeSet(result))
    }
}