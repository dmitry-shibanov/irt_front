import { History } from 'history';
import { RouteComponentProps } from 'react-router-dom';

interface IHistory extends RouteComponentProps<any> {
  history : History
}

export default IHistory;