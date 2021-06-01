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
  {
    field: 'subject',
    headerName: 'Subjects',
    width: 2330,
  },
];

export default function DataTable(props: any) {
  const [subjects, setSubjects] = React.useState<
    Array<{ _id: string; subject: string }>
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [rows, setRows] = React.useState<
    Array<{
      id: Number;
      subject: string;
    }>
  >([]);

  React.useEffect(() => {
    async function getStudents() {
      const response = await axios.get('/secretary/subjects', {
        headers: {
          Authorization: `Bareer ${props.token}`,
        },
      });
      if (response.status !== 200) {
        // redirect or something ealse
      }

      const data = response.data;
      setSubjects(data.subjects);
      const rowsCopy: Array<{
        id: Number;
        subject: string;
      }> = [];
      console.log(data.subjects);
      data.subjects.map((item: any, index: number) => {
        rowsCopy.push({
          id: index + 1,
          subject: item.name as string,
        });
      });
      setRows(rowsCopy);
      setIsLoading(false);
    }
    getStudents();
  }, []);

  return (
    <div style={{ height: '83vh', width: '100%' }}>
      {!isLoading ? (
        <DataGrid
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
