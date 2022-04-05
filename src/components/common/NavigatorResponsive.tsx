import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { ActionItem } from "../../models/common/ActionItem";
import NavigatorDesktop from "./NavigatorDesktop";
import NavigatorMobile from "./NavigatorMobile";
type Props = {
    items: ActionItem[]
}
const useStyles = makeStyles(theme => ({
    page: {
        marginBottom: theme.spacing(3)
    }
}))
const NavigatorResponsive: React.FC<Props> = (props) => {
    const classes = useStyles();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 900px)'
    })
    return <div className={classes.page}>{isDesktopOrLaptop ? <NavigatorDesktop items={props.items} /> :
        <NavigatorMobile items={props.items} />}</div>
}
export default NavigatorResponsive