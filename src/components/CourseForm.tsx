import React, {useState, useEffect, useRef} from "react";
import { minCost, maxCost, minHours, maxHours,
     courseNames, lecturers, minYear, maxYear } from "../config/courses-config";
import { Course } from "../models/Course";
import {Grid, TextField, MenuItem, Select, InputLabel, FormControl, Button} from '@material-ui/core'
type Props = {
    commitFn: (course: Course)=> void;
}
function emptyCourse(): Course {
    return {cost: 0, hours:0, lecturer: '',course: '', openingDate: new Date()};
}
const initialHoursMessage = `enter the course duration in hours [${minHours},${maxHours}]`
const initialCostMessage = `enter the course cost in NIS [${minCost}, ${maxCost}]`
const CourseForm: React.FC<Props> = (props) => {
    const [courseObj, setCourse] = useState<Course>(emptyCourse());
    const [isValid, setValid] = useState(false);
    const [errorCost, setErrorCost] = useState(false);
    const [errorHours, setErrorHours] = useState(false);
    const hoursMessage = useRef(initialHoursMessage);
    const costMessage = useRef(initialCostMessage);
    const handlerCost = (event: any) => {
        const costValue = +event.target.value;
        const courseEntr = {...courseObj};
        courseEntr.cost = costValue;
        setCourse(courseEntr);
        if(!costValue) {
            setErrorCost(false);
            costMessage.current = initialCostMessage;
        } else if (costValue >= minCost && costValue <= maxCost) {
            setErrorCost(false);
            costMessage.current = '';
        } else if (costValue < minCost) {
            setErrorCost(true);
            costMessage.current = `cost can't be less than ${minCost}`;
        } else {
            setErrorCost(true);
            costMessage.current = `cost can't be greater than ${maxCost}`
        }


    }
    const handlerHours = (event: any) => {
        const hoursValue = +event.target.value;
        const courseEntr = {...courseObj};
        courseEntr.hours = hoursValue;
        setCourse(courseEntr);
        if(!hoursValue) {
            setErrorHours(false);
            hoursMessage.current = initialHoursMessage;
        } else if (hoursValue >= minHours && hoursValue <= maxHours) {
            setErrorHours(false);
            hoursMessage.current = '';
        } else if (hoursValue < minCost) {
            setErrorHours(true);
            hoursMessage.current = `hours can't be less than ${minHours}`;
        } else {
            setErrorHours(true);
            hoursMessage.current = `hours can't be greater than ${maxHours}`
        }


    }
    const handlerLecturer = (event: any) => {
        const courseEntr = {...courseObj};
        courseEntr.lecturer = event.target.value;
        setCourse(courseEntr);
    }
    const handlerCourseName = (event: any) => {
        const courseEntr = {...courseObj};
        courseEntr.course = event.target.value;
        setCourse(courseEntr);
    }
    const handlerOpeningDate = (event: any) => {
        const courseEntr = {...courseObj};
        courseEntr.openingDate = new Date(event.target.value);
        setCourse(courseEntr);
    }
    const onSubmitFn = (event: any) => {
        event.preventDefault();
        props.commitFn(courseObj);
        (document.querySelector('form') as any).reset();
    }
    const onResetFn = (event: any) => {
        setCourse(emptyCourse());
    }
    useEffect(() => {
        const {cost, hours} = courseObj;
        setValid(cost >= minCost && cost <= maxCost && hours >= minHours
             && hours <= maxHours);
    }, [courseObj])
    return <form onSubmit={onSubmitFn} onReset={onResetFn}> 
        <Grid container spacing={3} justifyContent={'center'}>
            <Grid item xs={12} sm={6}>
                <FormControl required style={{minWidth: '40vw'}}>
                    <InputLabel id={'course-name-label'}>Course Name</InputLabel>
                    <Select value={courseObj.course} labelId={'course-name-label'}
                     onChange={handlerCourseName}>
                         <MenuItem value={''}>None</MenuItem>
                         {courseNames.map((name) =>
                          <MenuItem value={name} key={name}> {name}
                         </MenuItem> )}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl required style={{minWidth: '40vw'}}>
                    <InputLabel id={'lecturer-name-label'}>Lecturer Name</InputLabel>
                    <Select value={courseObj.lecturer} labelId={'lecturer-name-label'}
                     onChange={handlerLecturer}>
                         <MenuItem value={''}>None</MenuItem>
                         {lecturers.map((name) =>
                          <MenuItem value={name} key={name}> {name}
                         </MenuItem> )}
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label={'Duration'} error={errorHours}
                     helperText = {hoursMessage.current} onChange={handlerHours}/>

                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label={'Cost'} error={errorCost}
                     helperText = {costMessage.current} onChange={handlerCost}/>

                </Grid>
                <Grid item xs={12} sm={6}>
                        <TextField required label={'Opening Date'} type={'date'}
                        onChange={handlerOpeningDate} inputProps={
                            {min: `${minYear}-01-01`,
                             max: `${maxYear}-12-31`}
                        } InputLabelProps={{
                            shrink: true
                        }}/>
                
            </Grid>

        </Grid>
        <Button type={'submit'} disabled={!isValid}>Submit</Button>
        <Button type={'reset'}>Reset</Button> 
    </form>;
}
export default CourseForm;