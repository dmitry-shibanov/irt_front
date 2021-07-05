import { CircularProgress, Grid } from '@material-ui/core';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import React, { FC, useState, useEffect } from 'react';
import axios from '../../../axios-default';
import EditableTable from '../../../components/Table/EditableTable';

// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   {
//     field: 'factors',
//     headerName: 'Факторы',
//     width: 230,
//   },
// ];

const columns = ['Факторы'];

const TableFactors: FC<any> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<
    Array<{
      id: string;
      factor: string;
    }>
  >([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/secretary/factors', {
        headers: {
          Authorization: `Bareer ${props.token}`,
        },
      });
      if (response.status !== 200) {
      }

      const factors = response.data.factors;
      // .map((item: any) => {
      //   return {
      //     id: item._id,
      //     name: item.name,
      //   };
      // });
      setRows(factors);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div style={{ height: '83vh', width: '100%' }}>
      {!isLoading ? (
        <EditableTable columns={columns} rows={rows} />
      ) : (
        // <DataGrid
        //   rows={rows}
        //   columns={columns}
        //   pageSize={20}
        //   checkboxSelection={false}
        // />
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
};

export default TableFactors;
