import React, { useRef, useState } from 'react';
import { Course } from '../../models/Course';
import { DataGrid, GridCellParams, GridColDef, GridEditRowModelParams, GridEditRowsModel } from '@material-ui/data-grid';
import { Delete } from '@material-ui/icons'
import { IconButton, Button, Typography } from '@material-ui/core';
import { maxCost, minCost, minHours, maxHours } from '../../config/courses-config';
import EditorLecturer from '../EditorLecturer';
import EditorOpeningDate from '../EditorOpeningDate';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { coursesSelector, ReducersType, userSelector } from '../../redux/store';
import UserData from '../../models/UserData';
import { remove, update } from '../../redux/actions';



type AlertCellInfo = {
    id: string;

    value: any;
    course: any;
    field: string;
}


const Courses: React.FC = () => {
    const userData: UserData = useSelector(userSelector);
    const courses: Course[] = useSelector(coursesSelector);
    const code = useSelector<ReducersType, boolean>(state => state.code);
    const fields: GridColDef[] = [
        {
            field: 'course', headerName: 'Course Name', width: 250,
            align: 'center', headerAlign: 'center'
        },
        {
            field: 'lecturer', headerName: 'Lecture Name', width: 200,
            align: 'center', headerAlign: 'center', editable: userData.isAdmin && code,
            renderEditCell: (params: GridCellParams) => {
                return <EditorLecturer {...params}></EditorLecturer>
            }
        },
        {
            field: 'cost', headerName: 'Cost', description: 'Cost of course in NIS', type: 'number', width: 150,
            align: 'center', headerAlign: 'center', editable: userData.isAdmin && code
        },
        {
            field: 'hours', headerName: 'Hours', description: 'Course duration in hours', type: 'number', width: 150,
            align: 'center', headerAlign: 'center', editable: userData.isAdmin && code
        },
        {
            field: 'openingDate', headerName: 'Date', description: 'Date of the course opening', type: 'date', flex: 1,
            align: 'center', headerAlign: 'center', editable: userData.isAdmin && code,
            renderEditCell: (params: GridCellParams) =>
                <EditorOpeningDate {...params}></EditorOpeningDate>
        },

    ];
    const [flAlert, setAlert] = useState(false);
    const [flDelete, setFlDelete] = useState(false);
    const [message, setAlertMessage] = useState('');
    const alertInfoRef = useRef<AlertCellInfo>({ course: null, field: '', value: '', id: '' });
    const ids = useRef<number[]>([]);
    const api = useRef<any>();
    const dispatch = useDispatch();

    function selectionHandler(selection: any) {
        ids.current = selection;
        setFlDelete(selection.length > 0 && userData.isAdmin && code);
    }
    function deleteFn() {

        for (let i = 0; i < ids.current.length; i++) {
            dispatch(remove(+ids.current[i]));
        }
        setFlDelete(false)
    }
    function updateFromEditor(course: any, field: string,
        id: string, model: GridEditRowsModel,
        validateFn: (value: any) => boolean = (value: any) => true,
        toStringFn: (value: any) => string = (value: any) => value.toString()) {
        const value = model[id][field].value as any;
        if (!validateFn(value)) {
            model[id][field] = { ...model[id][field], error: true }
        } else if (toStringFn(course[field]) !== toStringFn(value)) {
            confirmAlert({ course, field, value, id }, toStringFn);

        }

    }

    function confirmAlert(alertCellInfo: AlertCellInfo,
        toStringFn: (value: any) => string) {
        alertInfoRef.current = alertCellInfo;
        const { field, course, value } = alertCellInfo;
        setAlert(true);
        setAlertMessage(`you are going to update ${field}: old value: ${toStringFn(course[field])}; new value: ${toStringFn(value)}`);
    }
    function clickUNDO() {
        const { course, field, id } = alertInfoRef.current;

        api.current.setEditCellValue({ id, field, value: course[field] })
        setAlert(false);

    }
    function clickCONFIRM() {
        const { course, field, id, value } = alertInfoRef.current;
        course[field] = value;
        //props.updateFn(+id, course); 
        dispatch(update(+id, course));
        setAlert(false);
    }
    function onEdit(params: GridEditRowModelParams) {

        const model = params.model;
        api.current = params.api;
        Object.keys(model).forEach(id => {
            const course: Course = params.api.getRow(id) as Course;


            if (model[id].cost) {
                updateFromEditor(course, 'cost', id, model, (value: any) =>
                    value >= minCost && value <= maxCost)

            }
            if (model[id].hours) {
                updateFromEditor(course, 'hours', id, model, (value: any) =>
                    value >= minHours && value <= maxHours)

            }
            if (model[id].lecturer) {
                updateFromEditor(course, 'lecturer', id, model)
            }
            if (model[id].openingDate) {
                updateFromEditor(course, 'openingDate', id, model, undefined,
                    (value: any) => (value as Date).toLocaleDateString())
            }
        });


    }

    return <div>
        <Typography align={'center'}>List of Courses</Typography>
        <IconButton disabled={!flDelete} onClick={deleteFn}>
            <Delete />
        </IconButton>
        {flAlert && <Alert
            action={
                <div>
                    <Button color="inherit" size="small" onClick={clickUNDO}>
                        UNDO
                    </Button>
                    <Button color="inherit" size="small" onClick={clickCONFIRM}
                    >
                        CONFIRM
                    </Button>
                </div>
            }
        >{message}
        </Alert>}

        <div style={{ height: '70vh' }}>
            {!code &&
                <Alert severity={'warning'}>{`administrator ${userData.displayName} does not have permission for deleting/update `}</Alert>}
            <DataGrid checkboxSelection columns={fields}
                rows={courses ? courses : []} pageSize={10} onSelectionModelChange={selectionHandler}
                onEditRowModelChange={onEdit} />
        </div>

    </div>
}
export default Courses;