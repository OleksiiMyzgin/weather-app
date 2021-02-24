import { gql } from '@apollo/client';

export const GET_CITY_BY_NAME = gql`
  query getCityByName($name: String!) {
    getCityByName(name: $name) {
      id
      name
      country
      coord {
        lon
        lat
      }
      weather {
        summary {
          title
          description
          icon
        }

        temperature {
          min
          max
          actual
          feelsLike
        }
        wind {
          speed
          deg
        }
        clouds {
          all
          visibility
          humidity
        }
      }
    }
  }
`;
