import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { GET_CITY_BY_NAME } from '../../../../gql';
import { addLocation } from '../../../../redux/locations/actions';

import { LocationDto, RootState, Location } from '../../../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

interface NewLocationFormProps {
  onLocationAdd: (location: LocationDto) => void;
  locations: Location;
}

function NewLocationForm({ onLocationAdd, locations }: NewLocationFormProps) {
  const [value, setValue] = useState('');
  const classes = useStyles();
  const [error, setError] = useState({ show: false, text: '' });

  const [getCityByName, { data }] = useLazyQuery<{ getCityByName: LocationDto }>(GET_CITY_BY_NAME);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cityName = event.currentTarget.cityName.value as string;

    if (!cityName) {
      setError({ show: true, text: 'Field should not be empty!' });
      return;
    }

    if (
      data &&
      data.getCityByName &&
      data.getCityByName.name.toLocaleLowerCase().localeCompare(cityName.toLocaleLowerCase()) === 0 &&
      !locations.byId[data.getCityByName.id]
    ) {
      onLocationAdd(data.getCityByName);
    } else {
      getCityByName({ variables: { name: cityName } });
    }

    setValue('');
  };

  const handleClose = () => {
    setError({ show: false, text: '' });
  };

  useEffect(() => {
    if (data) {
      if (data.getCityByName && !locations.byId[data.getCityByName.id]) {
        onLocationAdd(data.getCityByName);
      } else if (data.getCityByName && locations.byId[data.getCityByName.id]) {
        setError({ show: true, text: 'You already have same location!' });
      } else {
        setError({ show: true, text: 'Location was not found!' });
      }
    }
  }, [data]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className={classes.row}>
          <TextField name="cityName" id="cityName" label="Required" onChange={handleChange} value={value} />
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </div>
      </form>
      {error.show && (
        <Alert variant="filled" severity="error" onClose={handleClose}>
          {error.text}
        </Alert>
      )}
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    locations: state.locations,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLocationAdd: (location: LocationDto) => dispatch(addLocation(location)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewLocationForm);
