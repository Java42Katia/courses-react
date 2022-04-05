import React, { useState, useRef } from "react";
import { Course } from "../models/Course";
import { TextField, Grid, makeStyles } from '@material-ui/core'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import _ from 'lodash';
import ChartStatistics from "./common/ChartStatistics";
import { useSelector } from "react-redux";
import { coursesSelector } from "../redux/store";
type Props = {

    minInterval: number;
    maxInterval: number;
    isCost: boolean;

}
type Distribution = {
    id: number
    min: number;
    max: number;
    amount: number
}
const useStyles = makeStyles(() => (
    {

        viewStats: {

            marginTop: 40
        },
        chart: {
            minHeight: "60vh"
        }
    }
))

const Statistics: React.FC<Props> = (props) => {
    const classes = useStyles();
    const { minInterval, maxInterval, isCost } = props;
    const initialMessage = `enter number in the range [${minInterval}-${maxInterval}] `;
    const columns: GridColDef[] = [
        { field: 'min', headerName: 'Min Value', width: 200, flex: 1, align: 'center', headerAlign: 'center', sortable: false },
        { field: 'max', headerName: 'Max Value', width: 200, flex: 1, align: 'center', headerAlign: 'center', sortable: false },
        { field: 'amount', headerName: 'Occurrences', flex: 1, align: 'center', headerAlign: 'center' }
    ]
    const [statistics, setStatistics] = useState<Distribution[]>([]);
    const courses: Course[] = useSelector(coursesSelector)
    const [flError, setError] = useState(false);
    let hintMessage = useRef(initialMessage);
    function countCourses(interval: number): Distribution[] {

        const statObj = _.countBy(courses,
            course => {
                const value = isCost ? course.cost : course.hours;
                return Math.floor(value / interval);
            });

        return Object.entries(statObj).map((entry, index) =>
            ({ id: index, min: +entry[0] * interval, max: +entry[0] * interval + interval - 1, amount: entry[1] }))

    }
    const onChangeInterval = (event: any) => {
        const intervalValue: number = +event.target.value;
        if (!intervalValue) {
            hintMessage.current = initialMessage;
            setStatistics([]);
            setError(false);
        } else if (intervalValue >= minInterval && intervalValue <= maxInterval) {
            hintMessage.current = '';
            setError(false);

            setStatistics(countCourses(intervalValue));
        } else if (intervalValue < minInterval) {
            setError(true);
            hintMessage.current = `interval can not be less than ${minInterval}`;
        } else {
            setError(true);
            hintMessage.current = `interval can not be greater than ${maxInterval}`
        }
    }

    return <div style={{ margin: 30 }}><Grid container justifyContent='center' spacing={3}>
        <Grid item xs={12} sm={7} >
            <TextField label={'inetrval'} error={flError} helperText={hintMessage.current}
                onChange={onChangeInterval}></TextField>
        </Grid>
        <Grid item xs={12} md={6} className={classes.viewStats} >
            <DataGrid columns={columns} rows={statistics} pageSize={5} autoHeight />
        </Grid>
        <Grid item xs={12} md={6} className={classes.chart} >
            <ChartStatistics data={statistics.map(d => ({ min: d.min, amount: d.amount }))} />
        </Grid>
    </Grid></div>
}
export default Statistics;