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
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
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
  { field: 'result', headerName: 'Result', width: 190 },
  { field: 'profession', headerName: 'Profession', width: 190 },

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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

export default function tableForEmployer(props: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [factors, setFactors] = useState<string[]>([]);
  const [newTable, setTable] = useState<any>();
  const [profession, setProfession] = useState<string>('');
  const [professionObjects, setProfessionObjects] = useState<
    Array<{ name: string; subjects: Array<any> }>
  >();
  const [selections, setSelections] = useState<Array<string>>([]);
  const classes = useStyles();

  const onSelectionChange = (param: GridSelectionModelChangeParams) => {
    // console.log(param.selectionModel);
    const ids = param.selectionModel as string[];
    console.log(ids);
    setFactors(ids);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setProfession(event.target.value as string);
    console.log(`professionObjects is ${event.target.value as string}`);
    if(professionObjects) {
        console.log(`item.name = professio is ${event.target.value as string}`);
        console.log(`variant is ${professionObjects[0].name}`);
        console.log(`profession is ${event.target.value as string}`);

        const variant = professionObjects.find((item: any) => item.name == event.target.value as string);
        console.log(`variant is ${variant}`);
        
        const ids = variant!.subjects.map((item:any) => item._id)
        setSelections(ids);
    }
  };

  const onChangeProfession: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const currentProfession = e.target.value;
    setProfession(currentProfession);

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
    const configure = data.map((item: any, index: number) => {
      return {
        id: item.student._id,
        index: index + 1,
        name: item.student.firstName,
        result: item.result,
        profession: profession
      };
    });

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

      const professions = response.data.variants;
      console.log(`professions is ${professions}`);

      professions.forEach((item: any) => {
          console.log(item);
      })
      setProfessionObjects(professions);
      setRows(rowCopy);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const filterSelections = () => {
    if(professionObjects) {
        const variant = professionObjects.find((item: any) => item.name = profession);
        const ids = variant?.subjects.map((item:any) => item._id)
        return ids;
    }

    return [];
  }

  return (
    <div style={{ height: '83vh', width: '100%' }}>
      {!isLoading ? (
        !!!newTable ? (
            <div>
          <Grid container spacing={1}>
            <Grid item xs={8}>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={profession}
                name="profession"
                label="Профессия"
                id="outlined-basic"
                onChange={onChangeProfession}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl variant="outlined" className={classes.formControl}>
                {/* <InputLabel id="demo-simple-select-outlined-label">
                  Профессии
                </InputLabel> */}
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={profession}
                  onChange={handleChange}
                  label="Профессии"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {professionObjects?.map((item) => {
                    return <MenuItem value={item.name}>{item.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            </Grid>

            <div style={{ height: '63vh', width: '100%' }}>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={20}
              checkboxSelection
              selectionModel={selections}
              onSelectionModelChange={onSelectionChange}
            />
         </div>
         </div>

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
