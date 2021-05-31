import { FormEvent } from "react";
import { RouteComponentProps } from "react-router-dom";

interface IGeneral extends RouteComponentProps<any> {
    loginHandler: (e: FormEvent<HTMLFormElement>, authData: any, userType: string) => void;
    signupHandler: (e: FormEvent<HTMLFormElement>, state: any) => void;
    logout: any;
    isAuth: boolean;
    authLoading: boolean;
    userId: number | string | null;
    token: string | null;
    role?: string
}

export default IGeneral;