/*
	- Trip Page Services
*/
import apiClient from '@/config/axios';
import vars from '@/services/path';

const END_POINT = vars.baseURL;

const availableExtraServices = () =>
    apiClient.post('extraService/availableServices');

const addAvailableService = (requestPayload) =>
apiClient.post('extraService/add',requestPayload);

const removeAvailableService = (requestPayload) =>
apiClient.post('extraService/delete',requestPayload);

const getExtraService = (requestPayload) =>

apiClient.post('extraService/getRequestService',requestPayload);

export default {
    availableExtraServices,
    addAvailableService,
    removeAvailableService,
    getExtraService
  
};
