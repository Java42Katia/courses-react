import { Typography } from "@material-ui/core";
import React from "react";


import { MAX_COST_INT, MIN_COST_INT } from "../../config/courses-config";
import Statistics from "../Statistics";



const CostStatistics: React.FC = () => {

    return <div>
        <Typography align={'center'}>Cost Statistics</Typography>
        <Statistics
            minInterval={MIN_COST_INT} maxInterval={MAX_COST_INT} isCost={true} /></div>
}
export default CostStatistics;