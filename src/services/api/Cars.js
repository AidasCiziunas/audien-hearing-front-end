/*
	- Cars Page Services
*/
import apiClient from '@/config/axios';
import vars from '@/services/path';

const getAllCars = () => apiClient.get();

const getCar = (car_id) => apiClient.get('', { car_id });

const createCar = (name, model) => apiClient.post('', { name, model });

const searchCars = (payload, reqHeaders) =>
  apiClient.post('cars/searchCar', payload, reqHeaders);

const getLocations = (payload) => apiClient.post(vars.carLocationPath, payload);

const getFilterCars = (payload, reqHeaders) =>
  apiClient.post('cars/filterCar', payload, reqHeaders);

const getCarDetailById = (payload, reqHeaders) =>
  apiClient.post('cars/getCarDetail', payload, reqHeaders);

const getCarBySearchId = (payload, reqHeaders) =>
  apiClient.post('cars/searchCarBySearchId', payload, reqHeaders);

const getCarPaymentPreferences = (payload, reqHeaders) =>
  apiClient.post('cars/getCarPaymentPreference', payload, reqHeaders);

export default {
  getAllCars,
  getCar,
  createCar,
  searchCars,
  getFilterCars,
  getCarDetailById,
  getCarBySearchId,
  getCarPaymentPreferences,
  getLocations,
};
