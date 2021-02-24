export async function getCity(position: GeolocationPosition) {
  const latitude = 'latitude=' + position.coords.latitude;
  const longitude = '&longitude=' + position.coords.longitude;
  const query = latitude + longitude + '&localityLanguage=en';
  const url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?';

  const response = await fetch(`${url}${query}`);
  const data = await response.json();

  return data;
}
