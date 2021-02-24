import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GET_CITY_BY_NAME } from './gql';
import LocationPage from './pages/LocationPage';
import { addCurrentLocation } from './redux/currentLocation/actions';
import { LocationDto } from './types';
import { getCity } from './utils';

interface AppProps {
  onCurrentLocationAdd: (location: LocationDto) => void;
}

function App({ onCurrentLocationAdd }: AppProps) {
  const [initialLoading, setInitialLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState('');
  const [getCityByName, { data, loading }] = useLazyQuery<{ getCityByName: LocationDto }>(GET_CITY_BY_NAME);

  const getMyLocation = () => {
    setInitialLoading(true);

    async function success(position: GeolocationPosition) {
      const data = await getCity(position);
      setCurrentCity(data.city);
      setInitialLoading(false);
    }

    function error() {
      setCurrentCity('Kyiv');
      setInitialLoading(false);
    }

    if (!navigator.geolocation) {
      setCurrentCity('Kyiv');
      setInitialLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error, { timeout: 1000 });
    }
  };

  useEffect(() => {
    getMyLocation();
  }, []);

  useEffect(() => {
    if (currentCity) {
      getCityByName({ variables: { name: currentCity } });
    }
  }, [currentCity]);

  useEffect(() => {
    if (data) {
      onCurrentLocationAdd(data.getCityByName);
    }
  }, [data]);

  const loadingStatus = initialLoading || loading;

  return (
    <Container maxWidth="sm">
      <LocationPage loadingStatus={loadingStatus} />
    </Container>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onCurrentLocationAdd: (location: LocationDto) => dispatch(addCurrentLocation(location)),
  };
};

export default connect(null, mapDispatchToProps)(App);
