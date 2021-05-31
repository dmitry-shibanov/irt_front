import React, { Component } from 'react';
import { Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import axios from '../../axios-default';
import ISubjects from '../../models/state/ISubjects';
import IStudent from '../../models/state/Student';

class StudentProfile extends Component<
  { userId: string; token: string },
  { student?: IStudent | undefined; isLoading: boolean }
> {
  constructor(props: { userId: string; token: string }) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    const response = await axios.get<IStudent>(
      `/student/students/${this.props.userId}`,
      {
        headers: {
          Authorization: `Bareer ${this.props.token}`,
        },
      }
    );

    if (response.status !== 200) {
      console.log(`status  code is not equal 200 - ${response.status}`);
    }

    const studentFull = response.data;
    console.log(studentFull);
    this.setState({
      isLoading: false,
      student: studentFull,
    });
  }

  render() {
    return !this.state.isLoading ? (
      this.state.student ? (
        <Container fluid style={{marginTop: "5rem"}}>
          <Row>
            <Col xs={1}></Col>
            <Col xs={3}>
              <Row> Имя: {this.state.student.firstName} </Row>
              <Row> Фамилия: {this.state.student.lastName} </Row>
              <Row> Курс: {this.state.student.course} </Row>
              <Row> Группа: {this.state.student.group} </Row>
            </Col>
            <Col xs={8}>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Предмет</th>
                    <th>Оценка</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.student!.subjects.map(
                    (item: { id: ISubjects; mark: string }, index: Number) => {
                      return (
                        <tr>
                          <td>{index}</td>
                          <td>{item.id.name}</td>
                          <td>{item.mark}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      ) : (
        <h1>Не удалось загрухить данные</h1>
      )
    ) : (
      <Spinner
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animation="border"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
}

export default StudentProfile;
