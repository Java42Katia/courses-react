import { Button } from "@material-ui/core";
import React from "react";
import { authService } from "../../config/auth-config";
const Logout: React.FC = () => {
    function onClickFn() {
        authService.logout();
    }
    return <Button onClick={onClickFn} color="secondary" variant="contained">Logout</Button> 
}
export default Logout;