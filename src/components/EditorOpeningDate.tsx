import React from "react";
import {TextField} from '@material-ui/core';
import { GridCellParams } from "@material-ui/data-grid";
import { minYear, maxYear } from "../config/courses-config";
const EditorOpeningDate: React.FC<GridCellParams> = (props) => {
    const {id, field, api, value} = props;
    const handlerOpeningDate = (event: any) => {
        api.setEditCellValue({id, field, value: new Date(event.target.value)}, event)
    }
    return <TextField label={'Opening Date'} type={'date'}
    onChange={handlerOpeningDate} 
     value={(value as Date).toISOString().substr(0, 10)}
      inputProps={
        {min: `${minYear}-01-01`,
         max: `${maxYear}-12-31`}
    } InputLabelProps={{
        shrink: true
    }}/>
}
export default EditorOpeningDate;