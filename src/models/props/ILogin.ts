
import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface ILogin extends RouteComponentProps<any> {
    onLogin: (e: React.FormEvent<HTMLFormElement>, authData: any, userType: string) => void;
    loading: boolean;
}

export default ILogin;