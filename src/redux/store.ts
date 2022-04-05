import { applyMiddleware, combineReducers, createStore } from "redux";
import { Course } from "../models/Course";
import UserData from "../models/UserData";
import { codeReducer, coursesReducer, userReducer } from "./reducers";
import thunk from 'redux-thunk'

export type ReducersType = {
    courses: Course[],
    user: UserData,
    code: boolean

}
const reducers = combineReducers<ReducersType>({
    courses: coursesReducer,
    user: userReducer,
    code: codeReducer
});
export const store = createStore(reducers, applyMiddleware(thunk));
export const coursesSelector = (state: ReducersType): Course[] => state.courses;
export const userSelector = (state: ReducersType): UserData => state.user;
export const codeSelector = (state: ReducersType): boolean => state.code;