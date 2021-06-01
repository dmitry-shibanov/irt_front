import React, { useState, useEffect } from 'react';
import {
  DataGrid,
  GridColDef,
  GridSelectionModelChangeParams,
  GridValueGetterParams,
} from '@material-ui/data-grid';
import {
  CircularProgress,
  createStyles,
  Fab,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { green } from '@material-ui/core/colors';

import axios from '../../../axios-default';

const columns: GridColDef[] = [
  { field: 'index', headerName: 'Index', width: 130 },
  { field: 'factors', headerName: 'Factors', width: 380 },
];

const columns1: GridColDef[] = [
  { field: 'index', headerName: 'Index', width: 130 },
  { field: 'name', headerName: 'Name', width: 210 },
  { field: 'result', headerName: 'Result', width: 190 }
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
      position: 'relative',
      minHeight: 200,
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
  })
);

export default function tableForEmployer(props: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [factors, setFactors] = useState<string[]>([]);
  const [newTable, setTable] = useState<any>();
  const classes = useStyles();

  const onSelectionChange = (param: GridSelectionModelChangeParams) => {
    // console.log(param.selectionModel);
    const ids = param.selectionModel as string[];
    console.log(ids);
    setFactors(ids);
  };

  const calculateResult: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    const response = await axios.post(
      '/secretary/searchresult',
      { subjects: factors },
      {
        headers: {
          Authorization: `Bareer ${props.token}`,
        },
      }
    );

    const data = response.data.result;
    const configure = data.map((item: any, index: number)=>{
        return {
            id: item.student._id,
            index: index + 1,
            name: item.student.firstName,
            result: item.result
        }
    })

    setTable(configure);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/secretary/findsuitablestudent', {
        headers: {
          Authorization: `Bareer ${props.token}`,
        },
      });

      console.log(`response test is ${response.data.subjects}`);

      if (response.status === 200) {
      }

      const rowCopy = response.data.subjects.map((item: any, index: number) => {
        return {
          id: item._id,
          index: index + 1,
          factors: item.name,
        };
      });

      setRows(rowCopy);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div style={{ height: '83vh', width: '100%' }}>
      {!isLoading ? (
        !!!newTable ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={20}
            checkboxSelection
            onSelectionModelChange={onSelectionChange}
          />
        ) : (
          <DataGrid
            rows={newTable}
            columns={columns1}
            pageSize={20}
            checkboxSelection
            onSelectionModelChange={onSelectionChange}
          />
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
      <Fab
        aria-label={'Add'}
        className={classes.fab}
        color={'primary'}
        onClick={calculateResult}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
