import React from "react";
import { COURSES_MAP } from "../../config/generation-config";
import { Course } from "../../models/Course";
import { GenerationData } from "../../models/GenerationData";
import getCourse from "../../util/random-course";
import GenerationForm from "../GenerationForm";
import {
    minId, maxId, minHours, maxHours, lecturers,
    minYear, maxYear, minCost, maxCost
} from '../../config/courses-config';
import { useDispatch } from "react-redux";
import { bulk } from "../../redux/actions";
import { Typography } from "@material-ui/core";

const Generation: React.FC = () => {
    const dispatch = useDispatch();
    function generate(generationData: GenerationData) {
        const courses: Course[] = [];
        for (let i = 0; i < generationData.nCourses; i++) {
            courses.push(getCourse(minId, maxId, minHours, maxHours, lecturers,
                COURSES_MAP.get(generationData.courseType) as string[], minYear, maxYear, minCost, maxCost))
        }
        dispatch(bulk(courses));
    }
    return <div>
        <Typography align={'center'}>Generation Random Courses</Typography>
        <GenerationForm commitFn={generate} /></div>
}
export default Generation;