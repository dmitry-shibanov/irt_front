import React, { Component } from 'react';
import axios from '../../axios-default';
import IStudent from '../../models/state/Student';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { CircularProgress, Grid } from '@material-ui/core';
class StudentProfile extends Component<
  { userId: string; token: string },
  { student?: IStudent | undefined; isLoading: boolean; tableRows?: any }
> {
  constructor(props: { userId: string; token: string }) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  columns: GridColDef[] = [
    { field: 'index', headerName: 'Индекс', width: 130 },
    { field: 'subject', headerName: 'Предмет', width: 380 },
    { field: 'mark', headerName: 'Оценка', width: 130 },
  ];

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
    const tableRows = studentFull.subjects.map((item, index) => {
      return {
        id: item.id._id,
        index: index + 1,
        subject: item.id.name,
        mark: item.mark,
      };
    });
    console.log(tableRows);
    console.log(studentFull);
    this.setState({
      isLoading: false,
      student: studentFull,
      tableRows: tableRows,
    });
  }

  render() {
    return (
      <div style={{ height: '83vh', width: '100%' }}>
        {!this.state.isLoading ? (
          this.state.student ? (
            <DataGrid
              rows={this.state.tableRows}
              columns={this.columns}
              pageSize={20}
              checkboxSelection={false}
            />
          ) : (
            <h1>Не удалось загрухить данные</h1>
          )
        ) : (
          <Grid
            container
            justify="center"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CircularProgress />
          </Grid>
        )}
      </div>
    );
  }
}

export default StudentProfile;
