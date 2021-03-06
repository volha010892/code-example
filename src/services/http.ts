import axios from 'axios';
import Toasters from '../components/popUp/PopUp';
import Error from '../models/Error';

const client = axios.create({
  baseURL: process.env.API_BASE_URL,
});

const processError = (error: Error, message?: string) => {
  if (message) {
    return Toasters.error(message);
  }
  return Toasters.error(
    error.response.data.StatusText || 'Произошла непредвиденная ошибка, пожалуйста, попробуйте ещё раз'
  );
};

export { client, processError };