import React, { useState } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ActionItem } from '../../models/common/ActionItem';
type Props = {
    items: ActionItem[]
}
const NavigatorDesktop: React.FC<Props> = (props) => {
    const [tabNumber, setTabNumber] = useState(0);
    const { items } = props;
    function tabNumberChange(event: any, newTabNumber: number) {
        setTabNumber(newTabNumber);
    }
    function getTabs(): React.ReactNode[] {
        return items.map((item, index) => <Tab key={index}
            component={Link} to={item.path} label={item.label} />)
    }


    return <AppBar position="static">
        <Tabs value={tabNumber} onChange={tabNumberChange}>
            {getTabs()}
        </Tabs>
    </AppBar>
}
export default NavigatorDesktop;

