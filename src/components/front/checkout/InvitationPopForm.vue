<template>
    <span style="display: none; height: 1px; visibility: hidden;">
  		
        <v-dialog v-model="DisplayPopUp" max-width="650px" style="z-index: 99999!important;">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Save Car Trip
                </v-btn>
            </template>
            <v-card>
                    <div class="car-popup-header">
                        <div class="in-left">
                            <ul>
                                <li>&nbsp;</li>
                            </ul>
                        </div>
                        <div class="in-right">
                            <v-btn icon @click="doPopClose">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </div>
                    </div>
                    <div class="car-popup-body" style="padding: 12px">
                        <div class="car-popup-content" style="min-height: auto;">
                            <div class="car-popup-button p-4">
                                    <div class="add-travel-input col-md-12 col-sm-12">
                                        <h3 class="text-center">Trip Traveller Invitation</h3>
                                        <div class="add-travel-input mt-5 ">
                                        <div v-if="emailinvalidMsg==true" class="error--text text-center" >Your invitation mail not sent to customer</div>
                                <v-form ref="form">
                                    <v-radio-group
                                        row
                                        class="ml-8 gender"
                                        v-model="userType"
                                        :rules="[
                                            v => v.length > 0 || 'User type field is required.'
                                        ]"
                                    >
                                        <v-radio
                                        class="px-4"
                                        label="Customer"
                                        value="customer"
                                        name="usertype"
                                        color="primary"
                                        ></v-radio>
                                        <v-radio
                                        class="px-4"
                                        label="Traveler"
                                        value="traveller"
                                        name="usertype"
                                        color="primary"
                                        ></v-radio>
                                    </v-radio-group>

                                    <div
                                        :class="'col-md-12 col-sm- p-0'"
                                        style=""
                                    >
                                    Customer Email

                                        <v-spacer></v-spacer>

                                        <v-text-field
                                         v-model="search"
                                         placeholder="Enter Customer Email"
                                        :rules="[v => !!v || 'Email field is required.']"
                                        >
                                        </v-text-field>

                                        <v-btn @click="submitForm()" class=" primary mb-5 checkout-one-submit"> Sent Invitation </v-btn>
                                        </div>
                                </v-form>
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
            </v-card>
        </v-dialog>

    </span>
</template>
<script>

import InvitationServices from '@/services/api/Invitation';
import { mapState } from 'vuex';
export default {
	name: "InvitationPopForm",
    props: {
        DisplayPopUp: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            finalResults: [],
            reivingEngine: null,
            userType:'',
            search:'',
            emailinvalidMsg:false,
        };
    },
    components: { },
    computed: { 
          ...mapState({
            tripStore: state => state.tripStore,
            tripBook: state => state.tripStore.tripBookings
        }),
    },
    methods: {
      
      doPopClose() {

        this.finalResults = [];
        this.$emit('hideDetailsBox');
      },

      submitForm(){
          let valid = this.$refs.form.validate();
          if(valid){
            let reqPayLoad = {
                   email : this.search,
                   tripId : this.tripStore.tripID,
            };

            let reqHeaders = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
            };

            InvitationServices.sendPaymetMethod(reqPayLoad, reqHeaders)
                    .then(rsp => {
                       if (rsp.data.success == false && rsp.data.message == 'Token has expired') {
                        this.doPopLogout();
                        return true;
                    } else {
                        this.$awn.success('Please Check Your Email', {
                            labels: { success: 'Email Send Successfully ...' }
                        });

                        this.doPopClose();
                    }
                    }).catch(err => {
                        this.emailinvalidMsg = true;
                         this.$awn.alert('Invalid Email', {
                            labels: { success: 'Please check your email' }
                        });
                        // console.log('InvitationServices.sendPaymetMethod', err);
                    });
          }
          
      },

      transformToCode(name) {

        return name.slice(name.indexOf("(") + 1, name.indexOf(")"));
      }
    }
    
};
</script>