import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
// Icons
import EditIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/DoneAllTwoTone';
import RevertIcon from '@material-ui/icons/NotInterestedOutlined';

interface ITableRows {
  [props: string]: string | boolean | number;
}

interface PreviousRowState {
  [props: string]: ITableRows;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
}));

// const createData = (
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) => ({
//   id: name.replace(' ', '_'),
//   name,
//   calories,
//   fat,
//   carbs,
//   protein,
//   isEditMode: false,
// });

const createData = (obj: ITableRows): ITableRows => {
  return { ...obj, isEditMode: false, id: obj['_id'] };
};

const CustomTableCell = (obj: {
  row: ITableRows;
  name: string;
  onChange: any;
}) => {
  const classes = useStyles();
  const { isEditMode } = obj.row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={obj.row[obj.name]}
          name={obj.name}
          onChange={(e) => obj.onChange(e, obj.row)}
          className={classes.input}
        />
      ) : (
        obj.row[obj.name]
      )}
    </TableCell>
  );
};

const TableCommon: React.FC<{
  rows: Array<ITableRows>;
  columns: Array<string>;
}> = (props) => {
  //   const [rows, setRows] = React.useState<Array<ITableRows>>([
  //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //     createData('Eclair', 262, 16.0, 24, 6.0),
  //   ]);
  const generateRows = props.rows.map(createData);
  const [rows, setRows] = React.useState<Array<ITableRows>>(generateRows);
  const [previous, setPrevious] = React.useState<PreviousRowState | null>(null);
  const classes = useStyles();

  const onToggleEditMode = (id: string) => {
    let toggled: PreviousRowState | null = { ...previous };
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          if (!row.isEditMode) {
            toggled = { ...toggled, [id]: { ...row } };
          } else {
            delete toggled![id];
          }

          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });

    console.log(`toggled is ${toggled[id]}`);
    // if (toggled) {
    setPrevious((state) => {
      return { ...toggled };
    });
    // }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    row: ITableRows
  ) => {
    // if (previous && !previous[row.id as string]) {
    //   setPrevious((state) => ({ ...state, [row.id as string]: row }));
    // }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = (id: string) => {
    console.log(`id is ${id}`);
    console.log(`previous is ${previous![id]}`);
    const newRows = rows.map((row) => {
      if (previous && row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    console.log(`newRows is ${newRows[0]['calories']}`);

    setRows(newRows);
    // setPrevious((state) => {
    //   if (state) {
    //     delete state[id];
    //   }
    //   return state;
    // });
    const newPrevious = { ...previous };
    delete newPrevious[id];
    setPrevious(newPrevious);
    // onToggleEditMode(id);
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            {props.columns.map((column) => {
              return <TableCell align="left">{column}</TableCell>;
            })}
            {/* <TableCell align="left" />
            <TableCell align="left">Dessert (100g serving)</TableCell>
            <TableCell align="left">Calories</TableCell>
            <TableCell align="left">Fat&nbsp;(g)</TableCell>
            <TableCell align="left">Carbs&nbsp;(g)</TableCell>
            <TableCell align="left">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id as string}>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(row.id as string)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(row.id as string)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onToggleEditMode(row.id as string)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              {Object.getOwnPropertyNames(row).map((item: string) => {
                if (
                  item === 'id' ||
                  item === '_id' ||
                  !Object.getOwnPropertyNames(props.rows[0]).includes(item)
                ) {
                  return null;
                }
                return <CustomTableCell {...{ row, name: item, onChange }} />;
              })}

              {/* <CustomTableCell {...{ row, name: 'name', onChange }} />
              <CustomTableCell {...{ row, name: 'calories', onChange }} />
              <CustomTableCell {...{ row, name: 'fat', onChange }} />
              <CustomTableCell {...{ row, name: 'carbs', onChange }} />
              <CustomTableCell {...{ row, name: 'protein', onChange }} /> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TableCommon;
