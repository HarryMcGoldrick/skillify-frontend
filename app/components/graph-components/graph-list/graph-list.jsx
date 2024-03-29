import {
  Button,
  Grid,
  InputAdornment,
  ListItem, makeStyles, Paper, TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Autocomplete, Pagination } from '@material-ui/lab';
import { Search } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import { getGraphViews } from '../../../services/graph-service';
import { GraphCard } from '../..';
import { getAllTags } from '../../../services/tag-service';

const useStyles = makeStyles(() => ({
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
  const [page, setPage] = useState(1);
  const [graphAmount, setGraphAmount] = useState();
  const pageSize = 4;

  // Updates the current paginated graph list with the current search query
  const updateGraphList = (formData) => {
    if (formData) {
      getGraphViews(formData.search, selectedTags, page, pageSize).then((data) => {
        setGraphViews(data.graphViews);
        setGraphAmount(data.graphAmount);
      });
    } else {
      getGraphViews(null, selectedTags, page, pageSize).then((data) => {
        setGraphViews(data.graphViews);
        setGraphAmount(data.graphAmount);
      });
    }
  };

  // Recieve a list of tags from the server
  useEffect(() => {
    getAllTags().then((data) => {
      setTags(data.tags);
    });

    // Returns a list of graphIds and graphNames
    updateGraphList();
  }, []);

  // When the page is changed recieve a new list of graphs
  useEffect(() => {
    updateGraphList();
  }, [page]);

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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <Grid container direction="row">
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
            <Button type="submit" color="primary" fullWidth variant="contained" style={{ marginTop: 16 }}>Search</Button>
          </Grid>
        </Grid>

      </form>

      <Grid item xs={8}>
        <Paper elevation={3} className={classes.paper}>
          <ul className={classes.list}>
            {graphViews.map((graph) => {
              if (!graph.id || !graph.name || graph.private) {
                return undefined;
              }
              return (
                <ListItem alignItems="flex-start" key={graph.id}>
                  <Grid item xs={12}>
                    <GraphCard graph={graph} />
                  </Grid>
                </ListItem>
              );
            })}
          </ul>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Pagination
          count={Math.ceil(graphAmount / pageSize)}
          onChange={(event, page) => {
            setPage(page);
          }}
        />
      </Grid>
    </Grid>

  );
};

export default GraphList;
