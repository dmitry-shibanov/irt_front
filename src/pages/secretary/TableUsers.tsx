import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import axiosDefault from '../../axios-default';
import axios from 'axios';

class TableUser extends Component<any, any> {
  state = {
    items: [],
  };

  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    const response = await axios.get('http://localhost:3700/secretary/students');

    if (response.status !== 200) {
      // redirect or something ealse
    }

    const data = response.data;
    console.log(data);
    this.setState({
      items: data.students,
    });
  }

  render() {
    return (
      this.state.items.length === 0 ? <h1>nothdkhkj</h1> :
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Курс</th>
            <th>Группа</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map((item: any, index: any) => {
            return (
              <tr>
                <td>{index}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.course}</td>
                <td>{item.group}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default TableUser;
