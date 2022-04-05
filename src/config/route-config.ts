import { ActionItem } from "../models/common/ActionItem";

export const PATH_COURSES = '/courses';
export const PATH_ADD_COURSE = '/course/add';
export const PATH_COST_STATISTICS = "/statistics/cost";
export const PATH_HOURS_STATISTICS = "/statistics/hours";
export const PATH_GENERATION = '/courses/generation'
export const PATH_LOGIN = '/courses/login';
export const PATH_LOGOUT = '/courses/logout'
export const ITEMS: ActionItem[] = [
    
    {path: PATH_COURSES, label: 'Courses'},
    
    
    {path: PATH_ADD_COURSE, label: 'Add New Course', isAdmin:true},
    {path: PATH_COST_STATISTICS, label: 'Cost Statistics'},
    {path: PATH_HOURS_STATISTICS, label: 'Hours Statistics'},
    {path: PATH_GENERATION, label: 'Generation', isAdmin:true},
    {path: PATH_LOGOUT, label: 'Logout'},
    
]