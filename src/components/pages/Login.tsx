import React from "react";
import { authService } from "../../config/auth-config";
import networkIcons from "../../config/auth-networks-config";
import LoginData from "../../models/common/LoginData";
import LoginForm from "../common/LoginForm";
const Login: React.FC = () => {
    const onSubmit = (loginData: LoginData) => {
        return authService.login(loginData);
    }
    const networkNames = authService.supportedAuthNetworks();
    return <LoginForm onSubmit={onSubmit}
     networks={networkIcons.filter(nw => networkNames.includes(nw.name))} />
}
export default Login;