import { Alert, AlertTitle, Color } from '@material-ui/lab';
import React from 'react';

const commonAlert: React.FC<{
  severity: Color;
  message: string;
  title: string;
}> = (props) => {
  return (
    <Alert severity={props.severity}>
      <AlertTitle>{props.title}</AlertTitle>
      {props.message}
    </Alert>
  );
};

// commonAlert.defaultProps = {
//     message: "Loading"
// }

export default commonAlert;
