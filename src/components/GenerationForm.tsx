import React from "react";
import { GenerationData } from "../models/GenerationData";
import {
    Grid, makeStyles, Paper, FormLabel, FormGroup,
    RadioGroup, Radio, FormControlLabel, TextField, Button
} from '@material-ui/core'
import { COURSE_TYPES, MAX_AMOUNT_COURSES, MIN_AMOUNT_COURSES } from "../config/generation-config";
import { useRef, useState, useEffect } from "react";
type Props = {
    commitFn: (generationData: GenerationData) => void;
}
const useStyles = makeStyles(() => (
    {
        input: {
            minWidth: '40vw'
        }
    }
))
const initialMessage =
    `Enter number of the courses in [${MIN_AMOUNT_COURSES}-${MAX_AMOUNT_COURSES} ]`
const initialGenerationData: GenerationData = { courseType: COURSE_TYPES[0], nCourses: 0 };
const GenerationForm: React.FC<Props> = (props) => {
    const classes = useStyles();
    const messageNcourses = useRef(initialMessage);
    const [errorNcourse, setError] = useState(false);
    const [isValid, setValid] = useState(false);
    const [generationData, setGenData] = useState<GenerationData>(initialGenerationData)
    const handlerNcourses = (event: any) => {
        const genData = { ...generationData };
        const nCourses = +event.target.value;
        genData.nCourses = nCourses;
        setGenData(genData);
        if (!event.target.value) {
            messageNcourses.current = initialMessage;
            setError(false)
        } else if (nCourses >= MIN_AMOUNT_COURSES && nCourses <= MAX_AMOUNT_COURSES) {
            messageNcourses.current = '';
            setError(false);
        } else if (nCourses < MIN_AMOUNT_COURSES) {
            setError(true);
            messageNcourses.current = `amount of the courses can't be less than ${MIN_AMOUNT_COURSES}`
        } else {
            setError(true);
            messageNcourses.current = `amount of the courses can't be greater than ${MAX_AMOUNT_COURSES}`
        }
    }
    const handlerCourseType = (event: any) => {
        const genData = { ...generationData };

        genData.courseType = event.target.value;
        setGenData(genData);
    }
    useEffect(() => {
        setValid(generationData.nCourses >= MIN_AMOUNT_COURSES && generationData.nCourses <= MAX_AMOUNT_COURSES);
    }, [generationData])
    const onSubmitFn = (event: any) => {
        event.preventDefault();
        props.commitFn(generationData);
    }
    const onResetFn = (event: any) => {
        setGenData({ ...initialGenerationData });
    }
    return <Paper>
        <form onSubmit={onSubmitFn} onReset={onResetFn}>
            <Grid container justifyContent={'center'}>
                <Grid item xs={7}>
                    <TextField className={classes.input} label="amount of generated courses"
                        error={errorNcourse} onChange={handlerNcourses}
                        helperText={messageNcourses.current} />
                </Grid>
                <Grid item xs={7}>
                    <FormGroup>
                        <FormLabel>Course Type</FormLabel>
                        <RadioGroup className={classes.input} value={generationData.courseType} onChange={handlerCourseType}>
                            {COURSE_TYPES.map(type => <FormControlLabel
                                control={<Radio />} key={type} value={type} label={type} />)}

                        </RadioGroup>
                    </FormGroup>
                </Grid>

            </Grid>
            <Button type="submit" disabled={!isValid}>Submit</Button>
            <Button>Reset</Button>

        </form>
    </Paper>
}
export default GenerationForm;