import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../types';
import CityWeatherInfo from './components/CityWeatherInfo';
import NewLocationForm from './components/NewLocationForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

type LocationPageProps = PropsFromRedux & {
  loadingStatus: boolean;
};

function LocationPage({ currentLocation, loadingStatus, locations }: LocationPageProps) {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <h1>Current Location:</h1>
          {loadingStatus ? 'Loading...' : null}
          {!loadingStatus && currentLocation && <CityWeatherInfo location={currentLocation} currentLocation />}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {!loadingStatus && (
          <Paper className={classes.paper}>
            Search new location
            <NewLocationForm />
          </Paper>
        )}
      </Grid>
      <Grid item xs={12}>
        {locations.allIds.length > 0 && (
          <Paper className={classes.paper}>
            {locations.allIds.map((id) => (
              <CityWeatherInfo key={id} location={locations.byId[id]} />
            ))}
          </Paper>
        )}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    currentLocation: state.currentLocation.location,
    locations: state.locations,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LocationPage);
