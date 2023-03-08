<template>
    <div class="trip-tab-box">
        <v-card>
            <v-row>
                <v-col cols="12">
                    <h6>Tell Us About The Supplier</h6>
                </v-col>
            </v-row>
            <v-form lazy-validation ref="genetalBookingForm">
            <div class="register-trip-tab-box">
                <v-row>
                    <v-col cols="12" sm="5">
                        <v-row>
                            <v-col cols="4">
                                <label class="trip-label">Type of Booking<span class="red--text">*</span></label>

                            </v-col>
                            <v-col cols="8">
                                <v-select :rules="[v => !!v || 'Booking type is required']"
                                        v-model="compBookingType" :items="bookingTypes" item-text="vcDisplayName"
                                        item-value="iBookingTypeID" placeholder="Select Booking Type"
                                        @change="updateBookingType()"></v-select>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="12" sm="7" class="supplier-colum">
                        <v-row>
                            <v-col cols="12" sm="2" class="m-0 p-0">
                                <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <label class="trip-label">Supplier
                                                <i class="fas fa-info-circle blue--text" style="cursor: pointer" v-on="on"
                                                    :attrs="attrs"></i><span class="red--text">*</span></label>
                                        </template>
                                        <div class="supplier-tooltip">
                                            <h6>Supplier Specific Format:</h6>
                                            <span class="princeline-box">priceline</span>
                                            <label style="color: #000">CONFID: 33334333</label>
                                            <p>
                                                (Priceline uses confirmation ID, which
                                                is a 7 digit alphanumeric)
                                            </p>
                                        </div>
                                    </v-tooltip>
                            </v-col>

                            <v-col cols="12" sm="5" class="m-0">
                                <v-text-field v-model="searchSupplier.name" @input="changeInput($event, 'single')"
                                        @keydown.enter="enter('single')" @keydown.down="down('single')"
                                        @keydown.up="up('single')" label="Eg. Carnival Cruise Line"
                                        :disabled="stillCantFindMySupplier"
                                        :rules="[checkValidFields]"
                                        small
                                        append-icon="fas fa-search" single-line hide-details="auto"
                                         autocomplete="off"></v-text-field>
                                    <v-list dense v-if="hasInput" class="activity-listing-box" style="margin-top:20px">
                                        <v-list-item-group v-model="selectedItem" color="primary"
                                            class="activitiy-listing">
                                            <v-list-item v-for="(
                                          supplier, supplierIdex
                                        ) in filteredSuppliersList" :key="supplierIdex" @click="setSupplier(supplier)">
                                                <v-list-item-content>
                                                    <v-list-item-title>
                                                        {{ supplier.name }}
                                                    </v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                            </v-col>

                            <v-col cols="12" sm="5" class="p-0 mt-7" v-if="compBookingType">
                                <v-checkbox v-model="cantFindMySupplier" :label="`Cant Find My Supplier`"
                                            @change="fetchAllSuppliers($event)">
                                </v-checkbox>
                            </v-col>
                        </v-row>
                <v-row class="mt-6" v-if="showStillCantFindMySupplier">
                <v-col cols="12" sm="12">
                    <v-row>
                        <v-col cols="12" sm="5" class="offset-2 m-0">
                            <v-text-field v-model="searchSupplierAll.name"
                                                    @input="changeInput($event, 'all')" @keydown.enter="enter('all')"
                                                    @keydown.down="down('all')" @keydown.up="up('all')"
                                                    label="Eg. Carnival Cruise Line" append-icon="fas fa-search"
                                                    single-line hide-details="auto"
                                                    :rules="[checkValidFields]"
                                                    :disabled="stillCantFindMySupplier"
                                                    small
                                                    autocomplete="off"></v-text-field>
                                                <v-list dense v-if="hasInputAll" class="activity-listing-box"
                                                    style="margin-top:20px; width:239px;">
                                                    <v-list-item-group v-model="selectedItemAll" color="primary"
                                                        class="activitiy-listing">
                                                        <v-list-item v-for="(
                                          supplier, supplierIdex
                                        ) in filteredSuppliersListAll" :key="supplierIdex"
                                                            @click="setSupplierAll(supplier)">
                                                            <v-list-item-content   @click="compBookingType = supplier.type.id">
                                                                <v-list-item-title>
                                                                    {{ supplier.name }} - <a
                                                                        style="text-decoration: underline !important;"><strong>{{
                                                                            supplier.type.vcBookingType
                                                                        }}</strong></a>
                                                                </v-list-item-title>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                    </v-list-item-group>
                                                </v-list>
                        </v-col>
                        <v-col cols="12" sm="5" class="mt-7 p-0 m-0">
                            <v-checkbox v-model="stillCantFindMySupplier"
                                            :label="`Still Cant Find My Supplier`" hide-details
                                            class="shrink mr-2 mt-0" @change="comCustomSupplierName = ''"></v-checkbox>
                                         
                        </v-col>
                    </v-row>

         
                    
                   
                </v-col>
            </v-row>

            <v-row class="mt-6">
                       
                               <v-col cols="12" sm="12">
                                   <v-row>
                                       <v-col cols="12" sm="5" class="offset-2">
                                           <v-text-field class="custom-supplier-name" style="" v-if="stillCantFindMySupplier"
                                                   v-model="comCustomSupplierName" placeholder="Enter Supplier Name"
                                                   single-line
                                                   hide-details="auto"
                                                   autocomplete="off"
                                                   :rules="[v => !!v || 'Supplier name is required']"></v-text-field>
                                       </v-col>
                                   </v-row>
                                 
                               </v-col>
                           </v-row>

                    </v-col>
                </v-row>

      
         
            </div>
    
                <div class="register-trip-tab-box">
                    <v-row>
                        <v-col cols="12" sm="5">
                            <v-row>
                                <v-col cols="12" sm="4">
                                   
                                    <label class="trip-label">Confirmation ID<span class="red--text">*</span></label>
                                </v-col>
                                <v-col cols="12" sm="8">
                                    <v-text-field v-model="objTW.confirmationID" single-line
                                        placeholder="Enter Confirmation id" hide-details="auto"
                                        :rules="[v => !!v || 'Confirmation ID is Required']"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>

                <div class="register-trip-tab-box">
                    <v-row>
                        <v-col cols="12">
                            <h6 style="padding-bottom: 20px">
                                Enter Any Other Numbers You May Haves
                            </h6>
                        </v-col>
                    </v-row>
                    <v-row v-if="row1">
                        <v-col cols="12" sm="3">
                            <v-select :items="numberOptions1" item-text="title" item-value="value"
                                v-model="selectedOption1" label="Select Type">
                            </v-select>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field v-model="objTW.bookingID"
                                :placeholder="selectedOption1 !== '' ? selectedOption1 : 'Enter a number'"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="1" class="mt-7">
                            <v-btn color="primary" small tile @click="addRow(2)"><v-icon>mdi-plus</v-icon></v-btn>
                        </v-col>
                    </v-row>
                    <!--second-->
                    <v-row v-if="row2">
                        <v-col cols="12" sm="3">
                            <v-select :items="numberOptions2" item-text="title" item-value="value"
                                v-model="selectedOption2" label="Select Type">
                            </v-select>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field ref="row2" v-model="objTW.bookingReference"
                                :placeholder="selectedOption2 !== '' ? selectedOption2 : 'Enter a number'"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="1" class="mt-7">
                            <v-btn color="error" small tile @click="removeRow(2)"><v-icon>mdi-minus</v-icon></v-btn>
                        </v-col>
                        <v-col cols="12" sm="1" class="mt-7">
                            <v-btn  color="primary" small tile @click="addRow(3)"><v-icon>mdi-plus</v-icon></v-btn>
                        </v-col>
                    </v-row>
                    <!--Third-->
                    <v-row v-if="row3">
                        <v-col cols="12" sm="3">
                            <v-select :items="numberOptions3" item-text="title" item-value="value"
                                v-model="selectedOption3" label="Select Type">
                            </v-select>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field ref="row3" v-model="objTW.supplierReference"
                                :placeholder="selectedOption3 !== '' ? selectedOption3 : 'Enter a number'"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="1" class="mt-7">
                            <v-btn color="error" small tile @click="removeRow(3)"><v-icon>mdi-minus</v-icon></v-btn>
                        </v-col>
                        <v-col cols="12" sm="1" class="mt-7">
                            <v-btn  color="primary" small tile @click="addRow(4)"><v-icon>mdi-plus</v-icon></v-btn>
                        </v-col>
                    </v-row>

                    <!--Fourth-->
                    <v-row v-if="row4">
                        <v-col cols="12" sm="3">
                            <v-select :items="numberOptions4" item-text="title" item-value="value"
                                v-model="selectedOption4" label="Select Type">
                            </v-select>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field ref="row3" v-model="objTW.itenirary"
                                :placeholder="selectedOption4 !== '' ? selectedOption4 : 'Enter a number'"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="1" class="mt-7">
                            <v-btn color="error" small tile @click="removeRow(4)"><v-icon>mdi-minus</v-icon></v-btn>
                        </v-col>
                        <v-col cols="12" sm="1" class="mt-7">
                            <v-btn color="primary" small tile @click="addRow(5)"><v-icon>mdi-plus</v-icon></v-btn>
                        </v-col>
                     
                    </v-row>

                    <!--Fifth-->
                    <v-row v-if="row5">
                        <v-col cols="12" sm="3">
                            <v-select :items="numberOptions5" item-text="title" item-value="value"
                                v-model="selectedOption5" label="Select Type">
                            </v-select>
                        </v-col>
                        <v-col cols="12" sm="3"> 
                            <v-text-field ref="row3" v-model="objTW.other"
                                :placeholder="selectedOption5 !== '' ? selectedOption5: 'Enter a number'"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="1" class="mt-7">
                            <v-btn color="error" small tile @click="removeRow(5)"><v-icon>mdi-minus</v-icon></v-btn>
                        </v-col>
                     
                    </v-row>
                </div>

                <div class="register-trip-tab-box">
                    <v-row>
                        <v-col cols="12">
                            <p style="margin: 0px">Is this a group?</p>
                            <v-radio-group v-model="isThisGroup" row>
                                <v-radio label="Yes" value="yes"></v-radio>
                                <v-radio label="No" value="no"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </div>
                <div v-if="isThisGroup == 'yes'" class="register-trip-tab-box mb-3">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-row>
                                <v-col cols="12" sm="5">
                                    <label class="group-number">Group Number</label>
                                </v-col>
                                <v-col cols="12" sm="7">
                                    <v-text-field v-model="groupNumber" placeholder="Enter group number"
                                        hide-details="auto" single-line
                                        :rules="[v => !!v || 'Group number is required']">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <p>
                                        (These numbers are for matching up the
                                        booking. We use this to pay for your
                                        commissions, so the more information the
                                        easier it is for you to get PAID!)
                                    </p>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>
                <div class="register-trip-tab-box">
                    <v-row>
                        <v-col cols="4" sm="2">
                            <v-row>
                                <v-col cols="12">
                                    <v-btn @click.prevent="updateSteps(-1)" color="primary" class="car-search-btn">
                                        <strong>BACK</strong>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="4" sm="2">
                            <v-row>
                                <v-col cols="12">
                                    <v-btn @click.prevent="updateSteps('next')" color="error" class="car-search-btn">
                                        <strong>NEXT</strong>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import robServices from '@/services/api/RegisterOutsideBookings.js';
import axios from 'axios'
import { evBus } from '@/services/bus.js';
import _ from 'lodash';
export default {
    name: 'GeneralBooking',
    data() {
        return {
            showCantFindMySupplier: false,
            showStillCantFindMySupplier: false,
            cantFindMySupplier: false,
            stillCantFindMySupplier: false,
            customSupplierName: '',
            numberOptions1: [
                { title: 'Booking ID', value: 'Booking ID', disabled: false },
                { title: 'Iteniriray', value: 'Iteniriray', disabled: false },
                { title: 'Supplier Reference', value: 'Supplier Reference', disabled: false },
                { title: 'Booking Reference', value: 'Booking Reference', disabled: false },
                { title: 'Other', value: 'Other', disabled: false },
            ],
            row1: true,
            row2: false,
            row3: false,
            row4: false,
            row5:false,
            objTW: {
                confirmationID:'',
                bookingID: '',
                supplierReference: '',
                bookingReference:'',
                itenirary:'',
                other: '',
            },
            selectedOption1: '',
            numberOptions2: [
                { title: 'Booking ID', value: 'Booking ID', disabled: false },
                { title: 'Iteniriray', value: 'Iteniriray', disabled: false },
                { title: 'Supplier Reference', value: 'Supplier Reference', disabled: false },
                { title: 'Booking Reference', value: 'Booking Reference', disabled: false },
                { title: 'Other', value: 'Other', disabled: false },
            ],
            selectedOption2: '',
            numberOptions3: [
            { title: 'Booking ID', value: 'Booking ID', disabled: false },
                { title: 'Iteniriray', value: 'Iteniriray', disabled: false },
                { title: 'Supplier Reference', value: 'Supplier Reference', disabled: false },
                { title: 'Booking Reference', value: 'Booking Reference', disabled: false },
                { title: 'Other', value: 'Other', disabled: false },
            ],
            selectedOption3: '',

            numberOptions4: [
            { title: 'Booking ID', value: 'Booking ID', disabled: false },
                { title: 'Iteniriray', value: 'Iteniriray', disabled: false },
                { title: 'Supplier Reference', value: 'Supplier Reference', disabled: false },
                { title: 'Booking Reference', value: 'Booking Reference', disabled: false },
                { title: 'Other', value: 'Other', disabled: false },
            ],

            selectedOption4: '',
            numberOptions5: [
                { title: 'Booking ID', value: 'Booking ID', disabled: false },
                { title: 'Iteniriray', value: 'Iteniriray', disabled: false },
                { title: 'Supplier Reference', value: 'Supplier Reference', disabled: false },
                { title: 'Booking Reference', value: 'Booking Reference', disabled: false },
                { title: 'Other', value: 'Other', disabled: false },
            ],

            selectedOption5: '',
            selectedItem: -1,
            selectedItemAll: -1,
            totalNumberOfOptions: 1,
            isThisGroup: 'no',
            groupNumber: '',
            newTripName: '',
            suppliersList: [],
            suppliersListAll: [],
            bookingTypes: [],
            bookingType: '',
            hasInput: false,
            hasInputAll: false,
            searchSupplier: {
                iMasterSupplierID: 594,
                id:'',
                name:'',
                type: {
                    id:'',
                    vcBookingType:'',
                    vcDisplayName: ''
                }
            },
            searchSupplierAll: {
                iMasterSupplierID: 594,
                id:'',
                name:'',
                type: {
                    id:'',
                    vcBookingType:'',
                    vcDisplayName: ''
                }
            },
            displayAllSuppliers: false,
            selectedSupplier: {},
            displayRowNumber: 1,
            customError: '',

        }
    },
    computed: {

        comCustomSupplierName:{
            get(){
                 return this.customSupplierName
            },

            set(newValue){
                 this.customSupplierName = newValue
            }
        },

        checkValidFields(){
            if(this.comCustomSupplierName == ''  && this.searchSupplier.name == '' && this.searchSupplierAll.name == '' ){
                 return 'Supplier name is required'
            }
          
          if(this.searchSupplier == {}  || this.searchSupplierAll == {} ){
             return 'Supplier name is required'
        }
        else{
             return true
        }
            
        },
        compBookingType: {
            get() {
                return this.bookingType
            },

            set(newValue) {
                this.bookingType = newValue
            }
        },
        errorMessage: {
            get: function () {
                return this.customError
            },

            set: function (newValue) {
                this.customError = newValue
            }
        },
        filteredSuppliersList() {
            if (this.searchSupplier.name !== '') {
                let that = this;
                let a = _.filter(this.suppliersList, function (el) {
                    return el.name.toLowerCase().includes(that.searchSupplier.name.toLowerCase())
                });
                if (a.length == 0) {
                    this.hasInput = false;
                } else {
                    this.hasInput = true;
                    return a;
                }
            }
            else {
                this.hasInput = false;
            }

        },

        filteredSuppliersListAll() {
            if (this.searchSupplierAll.name !== '') {
                let that = this;
                let a = _.filter(this.suppliersListAll, function (el) {
                    return el.name.toLowerCase().includes(that.searchSupplierAll.name.toLowerCase())
                });
                if (a.length == 0) {
                    this.hasInputAll = false;
                } else {
                    this.hasInputAll = true;
                    return a;
                }
            }
            else {
                this.hasInputAll = false;
            }

        }

    },

    mounted() {
        robServices.getBookingTypes().then((response) => {
            if (response.data.success) {
                this.bookingTypes = response.data.data
            }
        })
            .catch((err) => {
                console.log('GetBookingTypesError', err)
            });


    },

    methods: {
        resetRestSuppliers(){
            this.searchSupplier = {...{}}
            this.searchSupplierAll = {...{}}
        },
        fetchAllSuppliers(checked) {
             this.showStillCantFindMySupplier = checked
               evBus.$emit('isLoading', true)
               const API_URL = `https://commission-uploader-dev.inteletravel.com/api/v1/shoppingcart/suppliers`
               let reqInstance = axios.create({
                headers: {
                    Authorization: `Bearer 2|cnS3bnbKT8vyfR3QeBn35dobH6SrOBbuHNKXeWM3`
                }
            })
            reqInstance.get(API_URL)
                .then((res) => {
                    this.suppliersListAll = res.data.data
                    this.stillCantFindMySupplier = false
                    evBus.$emit('isLoading', false);
                })

            

            
          
        },
        removeRow(row) {
            switch (row) {
                  case 2:
                    this.objTW.bookingReference = ''
                    this.row2 = false
                    break

                  case 3:
                    this.objTW.supplierReference = ''
                    this.row3 = false
                    break
                    case 4:
                    this.objTW.itenirary= ''
                    this.row4 = false
                    break

                    case 5:
                    this.objTW.other = ''
                    this.row5 = false
                    break
                default:
                    false

            }
        },
        addRow(row) {
            row == 2 ? this.row2 = true : row == 3 ? this.row3 = true : row == 4 ? this.row4 = true: row==5? this.row5 = true: false
        },
        isNumeric(value) {
            var numbers = /^[0-9]+$/;
            if (value == null) return true
            if (!value.match(numbers)) {
                return 'Please enter only numeric values'
            } else {
                return true
            }
        },
        changeInput(val, type) {
            if (type == 'single') {
                this.hasInput = true
                this.selectedItem = -1
                if (val == '') {
                    this.hasInput = false
                }
            }
            if (type == 'all') {
                this.hasInputAll = true
                this.selectedItemAll = -1
                if (val == '') {
                    this.hasInputAll = false
                }
            }
        },
        enter(val) {
            if (val == 'all') {
                this.searchSupplierAll = { ...this.filteredSuppliersListAll[this.selectedItemAll] }
                this.hasInputAll = false
            }
            this.searchSupplier = { ...this.filteredSuppliersList[this.selectedItem] }
            this.hasInput = false
        },
        up(val) {
            if (val == 'all') {
                if (this.selectedItemAll > 0) this.selectedItemAll--
            }
            if (this.selectedItem > 0) this.selectedItem--
        },
        down(val) {
            if (val == 'all') {
                if (this.selectedItemAll < this.suppliersListAll.length - 1) this.selectedItemAll++
            }
            if (this.selectedItem < this.suppliersList.length - 1) this.selectedItem++
        },
        checkConfirmationId(value, index) {
            if ((value == '' || value == null) && index == 0) {
                return 'Atleast one ID is required';
            }

            return true;

        },
        updateBookingType() {
            evBus.$emit('isLoading', true);
            this.cantFindMySupplier = false
            this.showCantFindMySupplier = true
            this.stillCantFindMySupplier = false
            this.showStillCantFindMySupplier = false
            this.comCustomSupplierName 
            const API_URL = `https://commission-uploader-dev.inteletravel.com/api/v1/shoppingcart/suppliers?type_id=${this.compBookingType}`
            let reqInstance = axios.create({
                headers: {
                    Authorization: `Bearer 2|cnS3bnbKT8vyfR3QeBn35dobH6SrOBbuHNKXeWM3`
                }
            })

            reqInstance.get(API_URL)
                .then((res) => {
                    this.suppliersList = res.data.data
                    evBus.$emit('isLoading', false);
                })


            this.$emit('updateBookingType', this.compBookingType);
        },
        setSupplier(supplier) {
            this.hasInput = false;
            this.searchSupplier = { ...supplier };

            this.selectedSupplier = this.searchSupplier
        },
        setSupplierAll(supplier) {
            this.hasInputAll = false;
            this.searchSupplierAll = { ...supplier };
            this.selectedSupplier = {...this.searchSupplierAll}
        },
        updateSteps(val) {
        if (val == 'prev') {
                this.$emit('updateSteps', val);
            }
          /*   else if (val == 'next' && !this.$refs.genetalBookingForm.validate()) {
                return;
            } */
            else {
                let obj = {
                    [this.selectedOption1.replace(/\s/g, "")]: this.objTW.bookingID,
                    [this.selectedOption2.replace(/\s/g, "")]: this.objTW.bookingReference,
                    [this.selectedOption3.replace(/\s/g, "")]: this.objTW.supplierReference,
                    [this.selectedOption4.replace(/\s/g, "")]: this.objTW.itenirary,
                    [this.selectedOption5.replace(/\s/g, "")]: this.objTW.other
                }

                obj = _.omitBy(obj, v=> v == "" || v == undefined)
                let storePayLoad = {
                    nBookingTypeID: this.compBookingType,
                    nSupplierID: this.comCustomSupplierName !== '' ? -1: this.selectedSupplier.type.id,
                    vcConfirmationID: this.objTW.confirmationID,
                    nBookingID: obj.BookingID,
                    nSupplierReference: obj.SupplierReference,
                    nBookingReference: obj.BookingReference,
                    vcItineraryID: obj.Iteniriray,
                    vcOtherID: obj.Other,
                    vcGroupNumber: this.groupNumber
                }
                
                if(this.comCustomSupplierName == ''){
                    storePayLoad.vcVendor = this.selectedSupplier.name
                }
                if(this.comCustomSupplierName !== ''){
                    storePayLoad.vcSupplierName = this.comCustomSupplierName
                }

                console.log('store', storePayLoad)
                this.$store.dispatch('generalBookingState', storePayLoad)
                 this.$emit('updateSteps', val) 

            } 
           
        },

    },

    
}
</script>

