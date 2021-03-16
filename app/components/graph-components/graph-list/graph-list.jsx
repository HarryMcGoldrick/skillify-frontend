import {
  Button,
  Grid,
  InputAdornment,
  ListItem, makeStyles, Paper, TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getGraphViews } from '../../../services/graph-service';
import {GraphCard} from '../../../components';
import { Autocomplete, Pagination } from '@material-ui/lab';
import { Search } from '@material-ui/icons';
import { getAllTags } from '../../../services/tag-service';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
  },
  paper: {
    display: 'flex',
  },
  list: {
    padding: 0,
  },
}));

// Displays a list of graphNames that link to the relevant graph
const GraphList = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [graphViews, setGraphViews] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const pageSize = 5;

  useEffect(() => {
    getAllTags().then((data) => {
      setTags(data.tags);
    })

    // Returns a list of graphIds and graphNames
    getGraphViews(null, null, 1, pageSize).then((graphs) => {
      setGraphViews(graphs);
    });
  }, []);

  // Creates a linkable ListItem
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  const updateGraphList = (data) => {
    getGraphViews(data.search, selectedTags, 1, pageSize).then((graphs) => {
      setGraphViews(graphs);
    });
  }

  return (
    <Grid
      container
      spacing={5}
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.container}
    >
      <form onSubmit={handleSubmit(updateGraphList)}>
        <TextField
          name="search"
          id="standard-full-width"
          inputRef={register()}
          label="Map name"
          style={{ margin: 8, width: 800 }}
          placeholder="Search for a map"
          margin="normal"
          type="search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <Grid container row>
        <Grid item xs={8}>
          <Autocomplete
            name="tags"
            multiple
            id="tags-standard"
            options={tags}
            style={{ margin: 8 }}
            getOptionLabel={(option) => option}
            onChange={(event, value) => setSelectedTags(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Tag"
                placeholder="Add Tags"
              />
              )}
          />
        </Grid>
        <Grid item xs={4}>
          <Button type="submit" fullWidth variant="contained" style={{marginTop: 16}}>Search</Button>
        </Grid>
        </Grid>
      
      
      </form >

      <Grid item xs={8}>
        <Paper elevation={3} className={classes.paper}>
          <ul className={classes.list}>
            {graphViews.map((graph) => {
              if (!graph.id || !graph.name) {
                return undefined;
              }
              const { id } = graph;
              return (

                <ListItemLink key={id} href={`/view/${id}`} alignItems="flex-start">
                  <Grid item xs={12}>
                    <GraphCard graph={graph} />
                  </Grid>
                </ListItemLink>
              );
            })}
          </ul>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Pagination count={10} />
      </Grid>
    </Grid>

  );
};

export default GraphList;
