import React, { Component, Fragment } from 'react';
import axios from '../../axios-default';
import IHistory from '../../models/props/IHistory';
import IConfirmPassword from '../../models/IConfirmPassword';

class ConfirmPassword extends Component<IHistory, IConfirmPassword> {
  constructor(props: IHistory) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      message: '',
    };
  }

  async componentDidMount() {
    const token = this.props.match.params.token;
    const result = await axios.get('/confirmPassword', {
      params: {
        token: token,
      },
    });

    if (result.data.error == false) {
      this.setState({
        loading: false,
        message: result.data.message,
      });
    } else {
      this.setState({
        loading: false,
        error: true,
        message: result.data.message,
      });
    }
  }

  render() {
    const { message, error, loading } = this.state;

    if (loading) {
      return <div>Loading data....</div>;
    } else if (error) {
      return (
        <Fragment>
          <h1>Произошла ошибка</h1>
          <p>{message}</p>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <h1>Вы успешно прошли регистрацию</h1>
          <p>{message}</p>
          <p>Теперт вы можеет успешно войти в систему</p>
        </Fragment>
      );
    }
  }
}

export default ConfirmPassword;
