import { Typography } from "@material-ui/core";
import React from "react";


import { MAX_HOURS_INT, MIN_HOURS_INT } from "../../config/courses-config";
import Statistics from "../Statistics";



const HoursStatistics: React.FC = () => {

    return <div>
        <Typography align={'center'}>Hours Statistics</Typography>
        <Statistics
            minInterval={MIN_HOURS_INT} maxInterval={MAX_HOURS_INT} isCost={false} />
    </div>
}
export default HoursStatistics;