import React, { Component, MouseEventHandler } from 'react';
import { Form, Table } from 'react-bootstrap';
import axioxDefault from '../../axios-default';

class TableChoseCategories extends Component {

    state = {
        subjects: [],
        isLoading: true
    }

    async componentDidMount() {
        const response = await axioxDefault.get('/subjects');
        const statusCode = response.status;
        if(statusCode !== 200) {
            // message or something else, try after short period
        }
        const data = response.data;
        this.setState({
            subjects: data.subjects,
            isLoading: false
        });
    }

  render() {
    return (
        <div></div>
    //     this.state.isLoading ?
    //     <h1>M</h1> 
    //     :
    //   <div>
    //     <h3>Учебные предметы</h3>
    //     <hr></hr>
    //     <Table striped bordered hover>
    //       <thead>
    //         <tr>
    //           <th>#</th>
    //           <th>Subject</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {this.state.subjects.map((item: any) => {
    //             return <tr>
    //                 <td>
    //             <Form.Check id={item.id} aria-label="option 1" />
    //           </td>
    //           <td>{item.name}</td>
    //             </tr>
    //         })}
    //       </tbody>
    //     </Table>
    //     <h3>Факторы</h3>
    //     <hr></hr>
    //     <Table striped bordered hover>
    //       <thead>
    //         <tr>
    //           <th>#</th>
    //           <th>Factor</th>
    //           <th>Result</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <td>
    //             <Form.Check aria-label="option 1" />
    //           </td>
    //           <td>Mark</td>
    //           <td>Otto</td>
    //         </tr>
    //         <tr>
    //           <td>
    //             <Form.Check aria-label="option 1" />
    //           </td>
    //           <td>Jacob</td>
    //           <td>Thornton</td>
    //         </tr>
    //         <tr>
    //           <td>
    //             <Form.Check aria-label="option 1" />
    //           </td>
    //           <td>Larry the Bird</td>
    //           <td>@twitter</td>
    //         </tr>
    //       </tbody>
    //     </Table>
    //   </div>
    );
  }
}

export default TableChoseCategories;
