import React from 'react';
import {
    minId, maxId
} from '../../config/courses-config';
import { Course } from '../../models/Course';
import _ from 'lodash';
import CourseForm from '../CourseForm'
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../redux/actions';
import { Typography } from '@material-ui/core';
import { ReducersType, userSelector } from '../../redux/store';
import { Alert } from '@material-ui/lab';

const AddCourse: React.FC = () => {
    const dispatch = useDispatch();
    const code = useSelector<ReducersType, boolean>(state => state.code);
    const userData = useSelector(userSelector);
    function addCourse(course: Course) {
        const courseObj = { id: _.random(minId, maxId), ...course };
        dispatch(add(courseObj));

    }
    return <div>
        <Typography align={'center'}>Add new Course</Typography>
        {code ? <CourseForm commitFn={addCourse} /> :
            <Alert severity={'error'}>{`administrator ${userData.displayName} does not have  permission for adding`}</Alert>}
    </div>
}
export default AddCourse;