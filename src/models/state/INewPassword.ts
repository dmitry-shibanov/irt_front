import IConfirmPassword from "../IConfirmPassword";

interface INewPassword extends IConfirmPassword {
    password: {
        value: string,
        valid: boolean,
        touched: boolean,
        validators: [(value: string) => boolean, (value: any) => boolean]
      },
      formIsValid: boolean
}

export default INewPassword;