// history of table results, we can click on list item and see result
import {
  Box,
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemProps,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { useState, useEffect, FC } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

const ListOfTableResults: FC<{ token: string }> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box flexDirection="row"></Box>
      <List component="nav" aria-label="main history box">
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItemLink href="#simple-list">
          <ListItemText primary="Spam" />
        </ListItemLink>
      </List>
    </div>
  );
};

export default ListOfTableResults;
