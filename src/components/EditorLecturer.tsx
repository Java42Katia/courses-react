import React from "react";
import {Select, InputLabel, MenuItem} from '@material-ui/core';
import {GridCellParams} from '@material-ui/data-grid';
import { lecturers } from "../config/courses-config";
const EditorLecturer: React.FC<GridCellParams> = (props) => {
    const {id, api, field, value} = props;
    const handleSelectChange = (event: any) => {
        api.setEditCellValue({id, field, value: event.target.value},
             event);
    }
    return <div>
        <InputLabel>Lecturer Name</InputLabel>
        <Select value={value} onChange={handleSelectChange}>
            {lecturers.map(l => <MenuItem value={l} key={l}>{l}</MenuItem>)}

        </Select>
    </div>
}
export default EditorLecturer;