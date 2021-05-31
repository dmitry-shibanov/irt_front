import { RouteComponentProps } from "react-router-dom";

interface ISignup extends RouteComponentProps<any> {
    loading: boolean;
    onSignup: (e: React.FormEvent<HTMLFormElement>, state: any) => void;
}

export default ISignup;