import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from '@material-ui/data-grid';
import { CircularProgress, Grid } from '@material-ui/core';
import axios from '../../../axios-default';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 180 },
  { field: 'lastName', headerName: 'Last name', width: 180 },
  {
    field: 'course',
    headerName: 'Course',
    width: 130,
  },
  {
    field: 'group',
    headerName: 'Group',
    width: 130,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) => `something`,
  // },
];

export default function DataTable(props: any) {
  const [users, setUsers] = React.useState<Array<any>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const tableRef = React.useRef(null);
  const [rows, setRows] = React.useState<
    Array<{
      id: Number;
      course: string;
      group: string;
      firstName: string;
      lastName: string;
    }>
  >([]);

  React.useEffect(() => {
    async function getStudents() {
      console.log(`token is ${props.token}`);
      console.log(`props is ${props}`);

      const response = await axios.get('/secretary/students', {
        headers: {
          Authorization: `Bareer ${props.token}`,
        },
      });
      if (response.status !== 200) {
        // redirect or something ealse
      }

      const data = response.data;
      setUsers(data.students);
      console.log(data.students);
      console.log(users);
      const rows1: Array<{
        id: Number;
        course: string;
        group: string;
        firstName: string;
        lastName: string;
      }> = [];
      data.students.map((item: any, index: number) => {
        rows1.push({
          id: index + 1,
          firstName: item.firstName,
          lastName: item.lastName,
          course: item.course,
          group: item.group,
        });
      });
      setRows(rows1);
      setIsLoading(false);
    }
    getStudents();
  }, []);

  return (
    <div style={{ height: '83vh', width: '100%' }}>
      {!isLoading ? (
        <DataGrid
          ref={tableRef}
          rows={rows}
          columns={columns}
          pageSize={20}
          checkboxSelection={false}
        />
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
