import axios from 'axios';
import { MarkUpInterface } from '../service-markup/service-markup';

const API_KEY =
  'live_AcyYtuijYJbkmYjKcd9PeRtrvi4CnLbJ764HvvUKbVThSm2i7VrmHhlXwyRWDXiZ';
const URL_SELECT = 'https://api.thecatapi.com/v1/breeds';
const URL_BREED_ID = 'https://api.thecatapi.com/v1/images/search';

const theCatApi = axios.create();
theCatApi.defaults.headers.common['x-api-key'] = API_KEY;

function fetchBreeds() {
  return theCatApi
    .get(URL_SELECT)
    .then(response => response.data)
    .catch(() => MarkUpInterface.showError('select'));
}

function fetchCatByBreed(evt) {
  const { value } = evt.target;
  return theCatApi
    .get(URL_BREED_ID, {
      params: {
        breed_ids: value,
      },
    })
    .then(response => response.data)
    .catch(() => MarkUpInterface.showError('card'));
}

export { fetchBreeds, fetchCatByBreed };
