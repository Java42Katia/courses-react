import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';


// Generate Sales Data


type Props = {
  data : {min: number, amount: number}[]
}

const ChartStatustics:React.FC<Props> = (props) => {
  const {data} = props;
  const theme = useTheme();

  return (
    <React.Fragment>
      
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis dataKey="min" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              amount
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main}
           dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
export default ChartStatustics;