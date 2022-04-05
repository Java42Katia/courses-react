import { PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../models/Course";
import UserData from "../models/UserData";
import { SET_COURSES_ACTION, SET_USER_ACTION, SET_CODE_ACTION } from "./actions";

export const coursesReducer = (courses: Course[] = [],
    action: PayloadAction<Course[]>) => {
    return action.type === SET_COURSES_ACTION ? action.payload : courses;
};
export const userReducer =
    (userData: UserData = { username: '', isAdmin: false, displayName: '' },
        action: PayloadAction<UserData>): UserData => {
        return action.type === SET_USER_ACTION ? action.payload : userData
    };
export const codeReducer =
    (code: boolean = true, action: PayloadAction<boolean>): boolean => {
        return action.type === SET_CODE_ACTION ? action.payload : code;
    }