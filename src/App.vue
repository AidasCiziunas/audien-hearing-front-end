<template>
  <v-app id="app">
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import { evBus } from '@/services/bus.js';
import tripServices from '@/services/api/Trips';

export default {
  name: 'App',
  mounted() {
    this.$pusher.channel(`payment`).listen('.added-method', (payload) => {
      evBus.$emit('SavePayment', payload);
    });

    this.$pusher.channel(`payment`).listen('.free-user-book-method', (payload) => {

          console.log('Pusher payment maded payloads: ', payload);

          if(payload.agent.agentPin==this.getPinOfSignedUser()) {
               
               evBus.$emit('reInitTripSummary', payload.trip.tripId, this.$store.state.tripStore.invitedCustomerEmail);
                //  && payload.trip.tripId==this.tripDetail.trip_id
               this.$awn.success('Customer has successfully paid Trip ('+payload.trip.tripId+').', {durations: {success: 0}});

               /* let onOk = () => {

                    this.getCurrentTripInvitly();  
                  };

                 let onCancel = () => {};

                  this.$awn.confirm(
                  'Customer has successfully paid Trip ('+payload.trip.tripId+').',
                  onOk,
                  onCancel,
                  {
                    labels: {
                      confirm: "Payment Added",
                      confirmOk: "View Trip Details",
                      confirmCancel: "Close"
                    },
                    icons: {
                      confirm: "check-circle",
                    },
                    modal: {
                      confirm: "Please click to view trip details."
                    }
                  }
                ); */

            evBus.$emit('customerPaymentPerfromed', payload);

          } // Ends IF

    });

  },
  watch:{
    '$store.state.authStore.user': function() {
      this.setSentryAgentScope();
    }
  },
  methods: {
    setSentryAgentScope(){
      let userPin = this.getPinOfSignedUser();
      if (userPin != '') {
        let that = this;
        let userKey=this.getUserSentryKey();
        that.$sentry.configureScope(function (scope) {
          scope.setUser({
            [userKey]: userPin,
          });
        });
      }
    },
    getUserSentryKey(){
      if(this.$store.state.authStore.user[0].userType=="customer") {
        return 'freeUserPin';
      }
      return 'agentPin';
    },

    getPinOfSignedUser() {

        if(this.$store.state.authStore.user==false)
            return '';

        // IF customer do return here
        if(this.$store.state.authStore.user[0].userType=="customer") {

            if(typeof this.$store.state.authStore.user[0].customer!= 'undefined') {

                if(typeof this.$store.state.authStore.user[0].customer.pin!='undefined')
                    return this.$store.state.authStore.user[0].customer.pin;

                if(typeof this.$store.state.authStore.user[0].customer.vcPIN!='undefined')
                    return this.$store.state.authStore.user[0].customer.vcPIN;

            } else if (typeof this.$store.state.authStore.user[0].pin!='undefined') {

                return this.$store.state.authStore.user[0].pin;
            }

        }
            
            // IF agent then it may have pin or vcPIN
        if(typeof this.$store.state.authStore.user[0].agent!= 'undefined')
            if(typeof this.$store.state.authStore.user[0].agent.pin != 'undefined')
                return this.$store.state.authStore.user[0].agent.pin;

        if(typeof this.$store.state.authStore.user[0].agent!= 'undefined')
            if(typeof this.$store.state.authStore.user[0].agent.vcPIN != 'undefined')
                return this.$store.state.authStore.user[0].agent.vcPIN;
    },

    getCurrentTripInvitly() {

      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let reqPayLoad = {
        searchBy: 'tripId',
        searchKey: this.tripDetail.tripID,
      };

      tripServices.searchTrip((reqHeaders, reqPayLoad)).then((response) => {

        if (response.data.errors.message == 'Session is expired.') {
          this.$awn.success(
            'Your being timed out due to inactivity, Please try View Hotel again !'
          );

          /*    this.$emit('resetSearch', hotelId); */
        } else if (
          response.data.message ==
          'Hotel Package not found! Please try again later.'
        ) {
          this.$awn.alert(
            'We have not received the details needed from our supplier to view this hotel . Please select another hotel.'
          );
        } else {

          if (response.data.data[0].tripbookings.length > 0) {
            this.$store.dispatch('UserAllTripsDetails', response.data.data);

            this.$router.push('/trip-details').catch(() => {});
          } else {
            this.$awn.alert(
              'Trip booking data not available for this trip ID.'
            );
          }
        }
      });
    },

  },
};
</script>
<style type="text/css">

#awn-popup-wrapper .awn-popup-title {
    font-size: 22px;
    font-weight: 700;
    text-transform: uppercase;
    margin-top: 8px;
}

#awn-popup-wrapper .awn-popup-body {
    position: relative;
    border-radius: 6px;
    word-break: break-word;
    background: none!important;
    padding: 24px;
    min-width: 320px;
    font-size: 18px!important;
    max-width: 500px;
    color: #FFF!important;
}
#awn-popup-wrapper .awn-buttons .awn-btn {
    border-radius: 4px;
    border: 0;
    font-weight: 700;
    -webkit-transition: background .2s linear;
    transition: background .2s linear;
    font-size: 16px;
    width: 45%;
    line-height: 35px;
    color: #fff;
}
</style>
