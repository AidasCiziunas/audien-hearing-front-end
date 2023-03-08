<template>

    <div class="col-md-12 col-lg-12">

    <section class="trip-detail-wrapper" v-show="onlineMode==false">
        <v-container> 
           <div class="title-heading">  
            <h1 class="blue-heading">Quote Details</h1>  
          </div>
        <v-form ref="form" class="" lazy-validation> 
          <v-card class="trip-card">
            <div class="banner-section-box"> 
              <div class="trip-detail-inner-left-box">
                <p>
                  <img :src="require('@/assets/images/trip-blue-icon.svg').default" 
               style="width: 23px;margin-left: -3px;"/> 
                <strong>&nbsp; {{ tripId }} - 
                  {{ makeTripDisplayName(tripName) }}  </strong></p>
                  <p class="mt-5" style="font-size: 14px !important;font-weight: 500;" v-if="tripBookings.length>0 && atol==true ">
                    <img v-if="domain == 'uk'" :src="require('@/assets/images/atol-warning.jpg').default" 
               class="atol-icon"/> 
               <img v-if="domain == 'ie'" :src="require('@/assets/images/topps.jpg').default" 
               style="width:60px; height:30px;"/> 
                    {{tripBookings[tripBookings.length-1].atolMessage}}
                    </p>  
                  <p v-if="$route.name!='trip-quote'"> <i class="fas fa-money-bill-alt"></i>
                  <strong>&nbsp;  Total Trip Amount: {{ CSymbol }} {{ myTripAmount }}</strong></p>
              </div>  

            </div>
          </v-card>
        </v-form>  
        
         

        </v-container>
      </section> 

        <section class="mt-0">
            
            <v-container> 

              <div class="row">
                  <QuoteTab
                    :fType="fType"
                    :tripDisplayName="tripName"
                    :tripId="tripId"
                    :transformToCode="transformToCode"
                    :setNightCount="setNightCount"
                    :removeTrip="removeTrip"
                    :onlineMode="onlineMode"
                    :personCount="personCount"
                    :fixPathOfImage="fixPathOfImage"
                   /> 
              </div>
                <br></br>
             </v-container>
        </section>

      </div>

</template>
<script>
var moment = require('moment');
import QuoteTab from './tabs/viewDetails/QuoteTab.vue';
import { evBus } from '@/services/bus.js';

export default {

  name: 'TripQuote',
  components: {
    QuoteTab
  },

  data() {
    return {
        fType : '',
        tripId: '',
        tripName: '',
        myTripAmount: '',
        onlineMode: false,
        myTripAmount: 0,
        tripBookings:[],
        domain: ''
      }
  },

  created: function() {
    this.tripBookings=[];
    this.tripId = this.$route.params.id;
    evBus.$on('offlineTripQuoteDetails', details => {
        this.tripId=details.tripId;
        details = this.doCleanArray(details);
        this.tripName = details.tripName;
        this.tripBookings=details.tripbookings;
        this.getTotalTripAmount(details.tripbookings);
    });

    evBus.$emit('toggleBannerDisplay', true);
  },

  mounted() {
     this.domain = this.$store.state.envStore.domain;
  },

  methods: {

    fixPathOfImage(path) {

        if(path.indexOf("square60") >= 0)
            return path.replace("square60", "square810");

        return path;
    },

    personCount(rooms) {
        let initialValue = 0;
        let adults = rooms.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.persons.adult;
        }, initialValue);
        let children = rooms.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.persons.child;
        }, initialValue);
        return `${
            adults > 1 ? adults + ' adults' : adults + ' adult'
        }, ${children} children`;
    },

    removeTrip(item) {

        this.$confirm('Are you sure?', { title: 'Delete Item' }).then(
    
            res => {

                if (res == false) return false;

                let reqHeaders = {headers: { 'Content-Type': 'application/json' }};

                let reqDataForm = {};

                reqDataForm.tripId = item.tripId;
                reqDataForm.tripMetaId = item.id;

                tripServices
                    .deleteTripData(reqDataForm, reqHeaders)
                    .then(() => {

                        this.$awn.info(
                            'Item has removed successfully from trip',
                            {
                                labels: { info: 'Item Deleted' }
                            }
                        );

                        this.viewTrip(reqDataForm.tripId);
                    })
                    .catch(() => {
                    
                        this.$awn.alert(
                            'Please try later, server encounter error..!'
                        );
                    
                    });
            }
        );
    
    },

    setNightCount(searchData) {
      let a = moment(searchData.checkinDate, 'YYYY-MM-DD');
      let b = moment(searchData.checkoutDate, 'YYYY-MM-DD');
      let total = moment.duration(b.diff(a)).asDays();

      return total;
    
    },

    transformToCode(name) {
      return name.slice(name.indexOf('(') + 1, name.indexOf(')'));
    },

    getTotalTripAmount(tripBooking) {

      let _myBookings = tripBooking, amount = 0;

      _myBookings.forEach((bookItem, index) => {

         bookItem.item = JSON.parse(this.doCleanArray(bookItem.details));

        if (bookItem.engine == 'car')
          amount += parseFloat(bookItem.item.engineDetails.FinalPrice);

        if (bookItem.engine == 'flight')
          amount += parseFloat(bookItem.item.engineDetails.totalPrice);

        if (bookItem.engine == 'hotel')
          amount += parseFloat(bookItem.packagePrice);

        if (bookItem.engine == 'villa')
          amount += parseFloat(this.getPriceOfVillaRooms(bookItem.item.rooms));
      });

      this.myTripAmount =  amount.toFixed(2);
    
    },

  },
  computed:{
    atol(){
      return this.tripBookings && this.tripBookings[this.tripBookings.length-1].atol
    }
  }

};
</script>
<style scoped="">
  .banner-section{
       height: 42px !important;
    line-height: 28px !important;

  }
  .atol-icon{
      width: 23px;
    margin-left: 0px;
    position: relative;
    top: -5px;
    right: 3px;
}
</style>