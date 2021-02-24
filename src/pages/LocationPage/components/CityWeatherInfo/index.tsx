import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';

import { removeLocation } from '../../../../redux/locations/actions';
import { LocationDto } from '../../../../types';

type CityWeatherInfoProps = PropsFromRedux & {
  location: LocationDto;
  currentLocation?: boolean;
};

function CityWeatherInfo({ location, currentLocation, onLocationRemove }: CityWeatherInfoProps) {
  const handleLocationDelete = () => {
    onLocationRemove(location.id);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <h1>Info</h1>
        <div>City: {location.name}</div>
        <div>Country: {location.country}</div>
      </Grid>

      <Grid item xs={6}>
        <h2>Weather</h2>
        <div>Title: {location.weather.summary.title}</div>
        <div>Description Max: {location.weather.summary.description}</div>

        <div>Temperature: {location.weather.temperature.actual}</div>
        <div>Temperature Min: {location.weather.temperature.min}</div>
        <div>Temperature Max: {location.weather.temperature.max}</div>
      </Grid>

      {!currentLocation && (
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleLocationDelete}>
            Delete
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLocationRemove: (id: string) => dispatch(removeLocation(id)),
  };
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CityWeatherInfo);
