import axios from 'axios';

export const apiNext = axios.create({
  baseURL: 'https://car-rental-api.goit.global',
});
