export interface Location {
  byId: {
    [key: string]: LocationDto;
  };
  allIds: string[];
}

export interface LocationDto extends Weather {
  id: string;
  name: string;
  country: string;
  coords: {
    lon: number;
    lat: number;
  };
}

export interface Weather {
  weather: {
    summary: {
      title: string;
      description: string;
      icon: string;
    };
    temperature: {
      min: number;
      max: number;
      actual: number;
      feelsLike: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
      visibility: number;
      humidity: number;
    };
  };
}
