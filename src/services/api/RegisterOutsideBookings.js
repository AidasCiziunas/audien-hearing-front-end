/*
	- Register Outside Booking  Page Services
*/
import apiClient from '@/config/axios';
import vars from '@/services/path';

const getBookingTypes = () => 
apiClient.get('trip/getBookingTypes');

const getSuppliersList = () => 
apiClient.get('trip/suppliers');
const registerBooking = (payload, reqHeaders)=>
apiClient.post('trip/registerBooking', payload, reqHeaders);

export default{
    getBookingTypes,
    getSuppliersList,
    registerBooking
}