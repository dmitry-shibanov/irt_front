import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
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
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<
    Array<{
      id: Number;
      subject: string;
    }>
  >([]);

  useEffect(() => {
    async function getStudents() {
      const response = await axios.get('/secretary/subjects', {
        headers: {
          Authorization: `Bareer ${props.token}`,
        },
      });
      if (response.status !== 200) {
        // redirect or something ealse
      }

      const subjects = response.data.subjects;
      const prepareRows = subjects.map((item: any, index: number) => {
        return {
          id: index + 1,
          subject: item.name as string,
        };
      });
      setRows(prepareRows);
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
