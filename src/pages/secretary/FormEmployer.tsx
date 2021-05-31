import React, { Component, MouseEventHandler } from 'react';
import { Container, Form, Row, Table, Button } from 'react-bootstrap';
import ISubjects from '../../models/state/ISubjects';
import axios from '../../axios-default';

class FormEmployer extends Component<
  any,
  {
    subjects?: Array<ISubjects>;
    isLoading: boolean;
    chosenSubjects?: Array<string>;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      chosenSubjects: [],
    };
  }

  sendSubjects: MouseEventHandler<HTMLElement> = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      '/secretary/calculateStudentResults',
      this.state.chosenSubjects,
      {
        headers: {
          Authorization: `Bareer ${this.props.token}`,
        },
      }
    );

    if (response.status === 200) {
      this.props.history.push(`/tables/${response.data.id}`);
    } else {
      console.log('status to post subjects is error');
    }
  };

  choseSubjects: MouseEventHandler<HTMLInputElement> = async (e) => {
    const id = e.currentTarget.id;
    console.log(e.currentTarget.id);
    
    const checked = e.currentTarget.checked;
    if(checked) {
      this.state.chosenSubjects?.push(id);
    } else {
      const index = this.state.chosenSubjects?.indexOf(id);
      this.state.chosenSubjects?.splice(index!, 1);
    }
    console.log(this.state.chosenSubjects);

    this.setState({
      chosenSubjects: [...this.state.chosenSubjects!],
    });

    
  };

  async componentDidMount() {
    const response = await axios.get<{ subjects: Array<ISubjects> }>(
      '/secretary/subjects',
      {
        headers: {
          Authorization: `Bareer ${this.props.token}`,
        },
      }
    );

    if (response.status !== 200) {
      console.log('error to get subjects');
    }

    const data = response.data;

    this.setState({
      isLoading: false,
      subjects: data.subjects,
    });
  }

  render() {
    return (
      <Container fluid style={{ marginTop: '5rem' }}>
        <Row>
          {' '}
          <Button onClick={this.sendSubjects}> Искать </Button>{' '}
        </Row>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Включить</th>
              <th>Предмет/факторы</th>
            </tr>
          </thead>
          <tbody>
            {this.state.subjects?.map((item: ISubjects, index: Number) => {
              // console.log(item)
              return (
                <tr key={`${index}-${item._id}`}>
                  <td>{index}</td>
                  <td>
                    <Form.Check
                      type={'checkbox'}
                      key={item._id}
                      id={item._id}
                      onClick={this.choseSubjects}
                    />
                  </td>
                  <td>{item.name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default FormEmployer;
