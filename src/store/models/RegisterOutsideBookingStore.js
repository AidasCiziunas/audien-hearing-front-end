const state = {
    vcClientPIN: null,
    files:[],
    tripId:null,
    nBookingTypeID:null,
    vcSupplierID: null,
    nSupplierID:null,
    vcConfirmationID:null,
    nBookingID:null,
    nBookingReference:null,
    nSupplierReference:null,
    vcItineraryID:null,
    vcOtherID:null,
    vcGroupNumber:null,
    vcClientName:null,
    nNumberOfPsgrs:null,
    dTravelStartDate:null,
    dTravelEndDate:null,
    vcLiftCity:null,
    vcFinalDestination:null,
    vcSupplierName: null,
    vcVendor:null,
    vcVendorNumber:null,
    vcVendorAddress:null,
    vcVendorCityState:null,
    nTotalCharges:null,
    nTotalCurrency:null,
    nTotalCommission: null,
    dBooked:null
};

const mutations = {
   tripScreenStateM(state, payload){
       state.tripId = payload.tripId;
   },

 
   generalBookingStateM(state, payload){
     state.nBookingTypeID = payload.nBookingTypeID
     state.nSupplierID = payload.nSupplierID

     if(payload.vcSupplierName !== undefined){
        state.vcSupplierName = payload.vcSupplierName
     }

     if(payload.vcItineraryID !== undefined){
        state.vcItineraryID = payload.vcItineraryID

     }

     if(payload.vcOtherID !== undefined){
        state.vcOtherID = payload.vcOtherID

     }

     if(payload.nBookingReference !== undefined){
        state.nBookingReference = payload.nBookingReference

     }

     if(payload.nSupplierReference !== undefined){
        state.nSupplierReference = payload.nSupplierReference

     }

     if(payload.nBookingID !== undefined){
     state.nBookingID = payload.nBookingID

     }

     if(payload.vcGroupNumber){
      state.vcGroupNumber = payload.vcGroupNumber

     }
     
     state.vcVendor = payload.vcVendor;
     state.vcConfirmationID = payload.vcConfirmationID
     state.vcSupplierID = payload.vcSupplierID
   },
   specificBookingStateM(state, payload){
     state.vcLiftCity = payload.vcLiftCity;
     state.vcFinalDestination = payload.vcFinalDestination;
     state.nTotalCommission = payload.nTotalCommission
     state.dTravelStartDate = payload.dTravelStartDate;
     state.dTravelEndDate = payload.dTravelEndDate;
     state.dBooked = payload.dBooked
     state.nTotalCurrency = payload.nTotalCurrency
     state.nTotalCharges = payload.nTotalCharges;
     state.nNumberOfPsgrs = payload.nNumberOfPsgrs;
     state.files = payload.files;
   },
   
   travellerStateM(state, payload){
    state.vcClientName = payload.vcClientName;
   },

   resetRosStoreM(state){
     const keys = Object.keys(state)
     for(let i =0; i < keys.length; i++){
        state[keys[i]] = null
     }
   }


};

const actions = {

    tripScreenState({commit}, payload){
        commit('tripScreenStateM', payload);
    },

    generalBookingState({commit}, payload){
        commit('generalBookingStateM', payload);
    },
    specificBookingState({commit}, payload){
        commit('specificBookingStateM', payload);
    },
    travellerState({commit}, payload){
        commit('travellerStateM', payload);
    },

    resetRosStore({commit}){
         commit('resetRosStoreM')
    }


};


export default {
    state,
    mutations,
    actions
};