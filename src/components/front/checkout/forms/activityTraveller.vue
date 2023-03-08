<template>
    <span style="display: block !important;">
        <v-expansion-panel-header>
            <div class="accordian-header">
                <div class="in-left">
                    <i class="fas fa-tasks" style="color: #FFF!important; font-size: 20px!important;"></i>
                </div>
                <div class="in-right">
                    <div class="step1-pickup-data">
                        <p>
                            {{ car.item.details.activity[0].title }}
                        </p>
                    </div>

                    <div class="accordian-compare-img">
                        <img
                            src="@/assets/images/checkout-compare-arrow.png"
                            alt=""
                        />
                    </div>

                    <div class="step1-pickup-date">
                        <p>
                            {{ justFormatRawDate(car.item.pdate) }} -
                            {{ justFormatRawDate(car.item.ddate) }}
                        </p>
                    </div>
                </div>
            </div>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
            <div class="add-travel-box-top step1-add-travel-box">
                <div class="step2-payment-information">
                    <h3>Guests</h3>
                    <p>
                        *Guests names must match the traveler’s passport or
                        Government-issued photo ID
                    </p>
                </div>

                <div class="travel-box-iner step1-travel-box">
                    <div
                        class="add-travel-form"
                        v-for="(objTraveler, trvInd) in car.traveler"
                        :key="trvInd"
                    >
                        <v-form :ref="'form99' + ind + '' + trvInd" >


                            <hr class="solid" style="margin-top: 50px;"/>

                              <div class="step2-payment-information">
                                <h4>

                                  {{ objTraveler.displayTitle }}

                                </h4>
                            
                              </div>

                            <v-row class="m-0">
                                <div class="col-md-12 col-sm-12">
                                    <v-row
                                        align="center"
                                        class="ml-0 mr-o mb-5"
                                    >
                                        <div class="add-travel-input mt-10" v-if="!['child','infant','youth'].includes(objTraveler.customerType)">
                                            <v-select
                                                :items="objTraveler.pTravelers"
                                                item-text="text"
                                                item-value="value"
                                                :label="
                                                    objTraveler.pTravelersLabel
                                                "
                                                :rules="[
                                                    v =>
                                                        !!v ||
                                                        'Title is required'
                                                ]"
                                                v-model="
                                                    objTraveler.pTravelersVal
                                                "
                                                width="300"
                                                @change="showInvitation($event)"
                                                @focus="phoneFocusedForm(ind, trvInd)"
                                            >
                                            </v-select>
                                        </div>

                                       

                                        <div
                                            v-if="
                                                objTraveler.pTravelersVal == 2
                                            "
                                            class="add-travel-input row col-md-12 col-sm-12"
                                        >
                                            <!--Start Search CRM-->

                                            <div
                                                :class="
                                                    tripTravellers.length > 0
                                                        ? 'col-md-12 col-sm-12'
                                                        : 'col-md-12 col-sm-12'
                                                "
                                                style="padding: 0px!important;"
                                            >
                                                Existing Guest

                                                <v-spacer></v-spacer>

                                                <v-text-field
                                                    v-model="
                                                        objTraveler
                                                            .searchTravelers
                                                            .search
                                                    "
                                                    append-icon="mdi-magnify"
                                                    label="Search Customers"
                                                    single-line
                                                    hide-details
                                                    clearable
                                                    outlined
                                                    :loading="
                                                        objTraveler.searchTravelers.loading
                                                    "
                                                    @keyup="
                                                        filterTravelers(
                                                            $event,
                                                            ind,
                                                            trvInd
                                                        )
                                                    "
                                                    @focus="phoneFocusedForm(ind, trvInd)"
                                                >
                                                </v-text-field>

                                                <v-data-table
                                                    class="tablerows"
                                                    :headers="
                                                        objTraveler
                                                            .searchTravelers
                                                            .headers
                                                    "
                                                    :items="
                                                        objTraveler
                                                            .searchTravelers
                                                            .travellers
                                                    "
                                                    :items-per-page="5"
                                                    v-if="
                                                        objTraveler
                                                            .searchTravelers
                                                            .travellers.length >
                                                            0
                                                    "
                                                    style="margin-top: 20px;"
                                                >
                                                    <template v-slot:item="row">
                                                        <tr>
                                                            <td>
                                                                {{
                                                                    row.item
                                                                        .srIndex
                                                                }}
                                                            </td>
                                                            <td>
                                                                {{
                                                                    row.item
                                                                        .vcFName
                                                                }}
                                                            </td>
                                                            <td>
                                                                {{
                                                                    row.item
                                                                        .vcLName
                                                                }}
                                                            </td>
                                                            <td>
                                                                {{
                                                                    row.item
                                                                        .vcHPhone
                                                                }}
                                                            </td>
                                                            <td>
                                                                {{
                                                                    row.item
                                                                        .vcEmail
                                                                }}
                                                            </td>
                                                            <td>
                                                                <v-btn
                                                                    x-small
                                                                    color="primary"
                                                                    dark
                                                                    @click="
                                                                        populateTravelerFormBySrch(
                                                                            $event,
                                                                            row.item,
                                                                            ind,
                                                                            trvInd
                                                                        )
                                                                    "
                                                                >
                                                                    SELECT
                                                                </v-btn>
                                                            </td>
                                                        </tr>
                                                    </template>
                                                </v-data-table>
                                            </div>

                                            <div
                                                class="col-md-12 pl-0 pb-2"
                                                style=""
                                                v-if="tripTravellers.length"
                                            >
                                                Travelers Of Trip

                                                <v-spacer></v-spacer>

                                                <a
                                                    href="javascript:void(0);"
                                                    v-for="(traveler,
                                                    trvIndExisting) in tripTravellers"
                                                    @click="
                                                        populateTravelerFormByTraveler(
                                                            traveler.traveller,
                                                            ind,
                                                            trvInd
                                                        )
                                                    "
                                                    :key="'activity'+trvIndExisting"
                                                >
                                                    {{
                                                        traveler.traveller
                                                            .firstName +
                                                            ' ' +
                                                            traveler.traveller
                                                                .lastName
                                                    }}
                                                </a>
                                            </div>

                                          <div class="col-md-12 pt-3 pl-0" v-if="objTraveler.searchTravelers.error">
                      
                                            <v-alert dense outlined prominent type="error">
                                              There are no records that match the search criteria.
                                            </v-alert>

                                            <!--
                                              <v-alert type="error">
                                                No records found against your search..!
                                              </v-alert>
                                            -->
                      
                                          </div>
                                            <!--Ends Search CRM-->
                                        </div>
                                    </v-row>

                                    <v-row
                                        align="center"
                                        class="ml-0 mr-0 mb-5 mt-0 gender"
                                        v-if="
                                            objTraveler.pTravelersVal == 1 ||
                                                objTraveler.showFormForcely == true"
                                    >
                                        <label class="aligment"
                                            >Salutation</label
                                        >

                                        <v-radio-group
                                            row
                                            class="ml-8 gender"
                                            v-model="objTraveler.saluation"
                                            :rules="[
                                                v =>
                                                    v.length > 0 ||
                                                    'Salutation field is required.'
                                            ]"
                                        >
                                            <v-radio
                                                class="px-4"
                                                label="Mr."
                                                value="Mr."
                                                name="rdSalutation[]['salutation']"
                                                color="primary"
                                                :checked="objTraveler.checked"
                                            ></v-radio>
                                            <v-radio
                                                class="px-4"
                                                label="Mrs."
                                                value="Mrs."
                                                name="rdSalutation[]['salutation']"
                                                color="primary"
                                            ></v-radio>
                                            <v-radio
                                                class="px-4"
                                                label="Ms."
                                                value="Ms."
                                                name="rdSalutation[]['salutation']"
                                                color="primary"
                                            ></v-radio>
                                            <v-radio
                                                class="px-4"
                                                label="Dr."
                                                value="Dr."
                                                name="rdSalutation[]['salutation']"
                                                color="primary"
                                            ></v-radio>
                                            <v-radio
                                                class="px-4"
                                                label="Other."
                                                value="Other."
                                                name="rdSalutation[]['salutation']"
                                                color="primary"
                                            ></v-radio>
                                        </v-radio-group>
                                    </v-row>
                                </div>

                                <div
                                    class="col-md-12 col-sm-12"
                                     v-if="objTraveler.pTravelersVal == 1 ||
                                            objTraveler.showFormForcely == true"
                                >
                                    <div class="row ml-0 mr-o  align-center">
                                        <div class="col-md-4 col-sm-4">
                                            <div class="add-travel-input">
                                                <v-text-field
                                                    label="First Name"
                                                    placeholder="Enter Your First Name"
                                                    v-model="
                                                        objTraveler.firstName
                                                    "
                                                    :rules="[
                                                        v =>
                                                            !!v ||
                                                            'First name field is required.'
                                                    ]"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-4 col-sm-4">
                                            <div class="add-travel-input">
                                                <v-text-field
                                                    label="Middle Name"
                                                    placeholder="Enter Your Middle Name"
                                                    v-model="
                                                        objTraveler.middleName
                                                    "
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-4 col-sm-4">
                                            <div class="add-travel-input">
                                                <v-text-field
                                                    label="Last Name"
                                                    placeholder="Enter Your Last Name"
                                                    v-model="
                                                        objTraveler.lastName
                                                    "
                                                    :rules="[
                                                        v =>
                                                            !!v ||
                                                            'Last name field is required.'
                                                    ]"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-sm-6" v-if="!['child','infant','youth'].includes(objTraveler.customerType)">
                                            <div class="add-travel-input">
                                                <v-text-field
                                                    label="Email"
                                                    placeholder="Enter Your Email"
                                                    v-model="
                                                        objTraveler.regemail
                                                    "
                                                    :rules="[
                                                        v => CheckvalidEmail(v)
                                                    ]"
                                                ></v-text-field>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-sm-6" v-if="!['child','infant','youth'].includes(objTraveler.customerType)"></div>

                                        <div class="col-md-6 col-sm-6">
                                            <label class="input-label"
                                                >Birth Date</label
                                            >
                                            <dobActivity
                                                class="mt-2"
                                                v-model="objTraveler.date1"
                                                @fgchange="dobFlightUpdate"
                                                :index="ind"
                                                :travelIndex="trvInd"
                                                :fgbod="objTraveler.date1"
                                                :fgDepartDate="
                                                    car.item.pdate.split('T')
                                                "
                                                :role="objTraveler.customerType"
                                                :rules="birthDateRules"
                                            />
                                        </div>

                                        <div class="col-md-6 col-sm-6" v-if="!['child','infant','youth'].includes(objTraveler.customerType)">
                                            <label
                                                class="input-label mpl"
                                                style="color: rgba(0, 0, 0, 0.6) !important;"
                                            >
                                                Mobile Phone Number
                                            </label>
                                            <div
                                                class="add-travel-input mobile-feild-styling"
                                            >
                                            
                                            <vue-tel-input-vuetify
                                                    v-bind="$attrs"
                                                    v-model="
                                                        objTraveler.regmobile
                                                    "
                                                    background-color="white"
                                                    v-on:country-changed="
                                                        countryChanged
                                                    "
                                                    :rules="[
                                                        v =>
                                                            !!v ||
                                                            'Cell Phone is required',
                                                        checkValidNumber
                                                    ]"
                                                    :value="
                                                        objTraveler.premobileval
                                                    "
                                                    :preferredCountries="
                                                        preferredCountries
                                                    "
                                                    :defaultCountry="
                                                        defaultCountry
                                                    "
                                                    :disabledFetchingCountry="
                                                        true
                                                    "
                                                    :onlyCountries="whiteList"
                                                    @input="onUpdatePhone"
                                                    @focus="phoneFocusedForm(ind, trvInd)"
                                                    name="traveller[][phone]"
                                                />


                                                <!-- <phone-num-select
                                                    v-model="
                                                        objTraveler.regmobile
                                                    "
                                                    name="traveller[][phone]"
                                                    :value="
                                                        objTraveler.premobileval
                                                    "
                                                    :phoneDetails="false"
                                                /> -->
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-sm-6" v-if="!['child','infant','youth'].includes(objTraveler.customerType)">
                                            <div class="add-travel-input">
                                                <country-select
                                                    v-model="
                                                        objTraveler.country
                                                    "
                                                />
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-sm-6" v-if="!['child','infant','youth'].includes(objTraveler.customerType)">
                                            <div
                                                class="add-travel-input"
                                                style="margin-top: 32px;"
                                            >
                                                <region-select
                                                    v-model="objTraveler.state"
                                                    :country="
                                                        objTraveler.country
                                                    "
                                                    :updateValue="
                                                        objTraveler.state
                                                    "
                                                />
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-sm-6" v-if="!['child','infant','youth'].includes(objTraveler.customerType)">
                                            <div class="add-travel-input">
                                                <label
                                                    class="input-label"
                                                ></label>
                                                <v-text-field
                                                    label="Street Address"
                                                    placeholder="Enter Your Street Address"
                                                    v-model="
                                                        objTraveler.address
                                                    "
                                                    :rules="addressRules"
                                                ></v-text-field>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-sm-6" v-if="!['child','infant','youth'].includes(objTraveler.customerType)">
                                            <div
                                                class="add-travel-input"
                                                style=""
                                            >
                                                <v-text-field
                                                    :hide-details="false"
                                                    label="City"
                                                    placeholder="City"
                                                    v-model="objTraveler.city"
                                                    :rules="[
                                                        v =>
                                                            !!v ||
                                                            'City field is required.'
                                                    ]"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-sm-6" v-if="!['child','infant','youth'].includes(objTraveler.customerType)">
                                            <div
                                                class="add-travel-input"
                                                style=""
                                            >
                                                <v-text-field
                                                    :hide-details="false"
                                                    label="Zip Code"
                                                    placeholder="Zip Code"
                                                    v-model="objTraveler.zip"
                                                    :rules="[
                                                        v =>
                                                            !!v ||
                                                            'Zip Code is required.'
                                                    ]"
                                                ></v-text-field>
                                            </div>
                                        </div>


                                        <!--QUESTIONS OF TRAVELLER START-->
                                        <div
                                            class="travel-box-button"
                                            v-if="objTraveler.hasBookingQuestions"
                                        >
                                            <ActivityQuestion :objTraveler="objTraveler" :trvQuestions="objTraveler.bookingQuestionAnswers" @answered="putAnswerToQuestion" @answeredUnit="putAnswerUnitToQuestion" />
                                        </div>
                                        <!--QUESTION OF TRAVELLER ENDS-->

                                        <!--
                                        <div
                                            class="travel-box-button"
                                            v-if="checkOutType == 'trip'"
                                        >
                                            <div class="setmargin">
                                                <v-checkbox
                                                    label="Save Traveler? Selecting this will save this user"
                                                    v-model="
                                                        objTraveler.ckBoxSaveTraveler
                                                    "
                                                    v-on:change="
                                                        saveTravelerByCk(
                                                            $event,
                                                            'villa',
                                                            car,
                                                            ind,
                                                            trvInd,
                                                            objTraveler,
                                                            objTraveler.ckBoxSaveTraveler
                                                        )
                                                    "
                                                    input-value="true"
                                                    :readonly="
                                                        objTraveler.ckBoxSaveTravelerReadOnly
                                                    "
                                                    :error-messages="
                                                        objTraveler.ckBoxSaveTravelerError
                                                    "
                                                    :class="'form99ck' + ind"
                                                    :rules="[
                                                        v =>
                                                            !!v ||
                                                            'Please complete the required fields.'
                                                    ]"
                                                ></v-checkbox>
                                            </div>
                                        </div>
                                        -->
                                        
                                        <div 
                                            class="travel-box-button"
                                            v-if="['adult','traveler'].includes(objTraveler.customerType)"                                       
                                        >
                                            <div
                                                class="setmargin"
                                                style="margin-bottom: 10px!important; margin-left: 0px!important; padding-left: 0px!important;"
                                            >
                                                <v-checkbox
                                                    label="Use this traveler's information as the Credit Card payment information. You can only select one traveler's information."
                                                    v-model="
                                                        objTraveler.ckBoxCardInfo
                                                    "
                                                    @change="
                                                        v =>
                                                            makeCardInfo(
                                                                'car',
                                                                car.item.Id,
                                                                trvInd,
                                                                objTraveler.ckBoxCardInfo
                                                            )
                                                    "
                                                    input-value="true"
                                                    :checked="
                                                        doCheckByDefault(
                                                            ind,
                                                            objTraveler.ckBoxCardInfo
                                                        )
                                                    "
                                                ></v-checkbox>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <!--ends if objTraveler.pTravelersVal==1 -->
                            
                                <div class="col-md-12 col-sm-12 pt-5" v-if="car.hasBookingQuestions && trvInd==car.traveler.length-1"><!--QUESTION CLASS-->

                                    <hr style="border: none;" size="30" noshade />

                                    <div class="travel-box-button setmargin">
                                    <!--STARTS QUESTION INNER-->

                                        <div class="step2-payment-information">
                                            <h3>Booking Questions</h3>
                                        </div>

                                        <div class="row ml-0 mr-o mt-2 align-center" v-for="QST in booking_questions">
                                            <!-- IF TYPE IS SELECT-->
                                            <div class="col-md-12 col-sm-12" v-if="QST.type=='SELECT' && QST.is_visibile">
                                                <div class="add-travel-input" v-if="QST.is_required">
                                                    <v-select
                                                        :label="QST.label"
                                                        :placeholder="QST.label"
                                                        v-model="QST.answer"
                                                        :items="QST.allowedAnswers"
                                                        :rules="[
                                                            v =>
                                                                !!v ||
                                                                QST.Message
                                                        ]"
                                                        @change="bookingQuestions(QST)"
                                                        outlined
                                                    ></v-select>
                                                </div>
                                                <div class="add-travel-input" v-else>
                                                    <v-select
                                                        :label="QST.label"
                                                        :placeholder="QST.label"
                                                        v-model="QST.answer"
                                                        :items="QST.allowedAnswers"
                                                        @change="bookingQuestions(QST)"
                                                        outlined
                                                    ></v-select>
                                                </div>
                                            </div>

                                            <!--IF TYPE STRING-->
                                            <div class="col-md-12 col-sm-12" v-if="QST.type=='STRING'  && QST.is_visibile">
                                                <div class="add-travel-input" v-if="QST.is_required">
                                                    <v-text-field
                                                        :label="QST.label"
                                                        :placeholder="QST.label"
                                                        @change="addTripBookingQuestionsToStore()"
                                                        v-model="QST.answer"
                                                        :rules="[
                                                            v =>
                                                                !!v ||
                                                                QST.Message
                                                        ]"
                                                        outlined
                                                    ></v-text-field>
                                                </div>
                                                <div class="add-travel-input" v-else>
                                                    <v-text-field
                                                        :label="QST.label"
                                                        :placeholder="QST.label"
                                                        v-model="QST.answer"
                                                        @change="addTripBookingQuestionsToStore()"
                                                        :maxlength="parseInt(QST.maxlength)"
                                                        outlined
                                                    ></v-text-field>
                                                </div>
                                            </div>

                                            <!--IF TYPE LOCATION_REF_OR_FREE_TEXT-->
                                            <div class="col-md-12 col-sm-12" v-if="QST.type=='LOCATION_REF_OR_FREE_TEXT' && QST.is_visibile">
                                                <div class="add-travel-input" v-if="QST.is_required">
                                                    <template v-if="!['TRANSFER_ARRIVAL_DROP_OFF','TRANSFER_DEPARTURE_PICKUP'].includes(QST.id) && allowCustomTravellerPickup == false">
                                                        <v-autocomplete
                                                            :label="QST.label"
                                                            :placeholder="QST.label"
                                                            v-model="QST.answer"
                                                            @change="addTripBookingQuestionsToStore()"
                                                            :items="QST.locations"
                                                            v-if="QST.locations.length > 0"
                                                            :rules="[
                                                                v =>
                                                                    !!v ||
                                                                    QST.Message
                                                            ]"
                                                            outlined>
                                                        </v-autocomplete>
                                                    </template>
                                                    <template v-else>
                                                        <template v-if="QST.locations.length > 0">
                                                            <v-autocomplete
                                                                :label="QST.label"
                                                                :placeholder="QST.label"
                                                                v-model="QST.answer"
                                                                @change="addTripBookingQuestionsToStore()"
                                                                :items="QST.locations"
                                                                :rules="[
                                                                    v =>
                                                                        !!v ||
                                                                        QST.Message
                                                                ]"
                                                                v-if="QST.locations.length > 0"
                                                                outlined>
                                                            </v-autocomplete>
                                                            <v-text-field
                                                                :label="QST.label"
                                                                :placeholder="QST.label"
                                                                v-model="QST.free_answer"
                                                                @change="addTripBookingQuestionsToStore()"
                                                                v-if="QST.answer == 'I_DONT_SEE_MY_PICKUP_LOCATION' || QST.locations.length == 0"
                                                                :hint="QST.hint"
                                                                :rules="[
                                                                    v =>
                                                                        !!v ||
                                                                        QST.Message
                                                                ]"
                                                                :maxlength="parseInt(QST.maxlength)"
                                                                outlined
                                                            ></v-text-field>
                                                        </template>
                                                        <template v-else>
                                                            <v-text-field
                                                                :label="QST.label"
                                                                :placeholder="QST.label"
                                                                v-model="QST.answer"
                                                                    :rules="[
                                                                    v =>
                                                                        !!v ||
                                                                        QST.Message
                                                                ]"
                                                                :hint="QST.hint"
                                                                @change="addTripBookingQuestionsToStore()"
                                                                :maxlength="parseInt(QST.maxlength)"
                                                                outlined
                                                            ></v-text-field>
                                                        </template>
                                                    </template>
                                                </div>
                                                <div class="add-travel-input" v-else>
                                                    <template v-if="allowCustomTravellerPickup == false">
                                                        <v-autocomplete
                                                            :label="QST.label"
                                                            :placeholder="QST.label"
                                                            v-model="QST.answer"
                                                            @change="addTripBookingQuestionsToStore()"
                                                            :items="QST.locations"
                                                            v-if="QST.locations.length > 0"
                                                            outlined>
                                                        </v-autocomplete>
                                                    </template>
                                                    <template v-else>
                                                        <template  v-if="QST.locations.length > 0">
                                                            <v-autocomplete
                                                                :label="QST.label"
                                                                :placeholder="QST.label"
                                                                v-model="QST.answer"
                                                                @change="addTripBookingQuestionsToStore()"
                                                                :items="QST.locations"
                                                                v-if="QST.locations.length > 0"
                                                                outlined>
                                                            </v-autocomplete>
                                                            <v-text-field
                                                                :label="QST.label"
                                                                :placeholder="QST.label"
                                                                :hint="QST.hint"
                                                                :maxlength="parseInt(QST.maxlength)"
                                                                @change="addTripBookingQuestionsToStore()"
                                                                v-model="QST.free_answer"
                                                                v-if="QST.answer == 'I_DONT_SEE_MY_PICKUP_LOCATION' || QST.locations.length == 0"
                                                                outlined
                                                            ></v-text-field>
                                                        </template>
                                                        <template v-else>
                                                            <v-text-field
                                                                :label="QST.label"
                                                                :placeholder="QST.label"
                                                                v-model="QST.answer"
                                                                @change="addTripBookingQuestionsToStore()"
                                                                :hint="QST.hint"
                                                                :maxlength="parseInt(QST.maxlength)"
                                                                outlined
                                                            ></v-text-field>
                                                        </template>
                                                    </template>
                                                </div>
                                            </div>


                                            <!--NUMBER_OR_UNIT-->
                                            <!--Case For NUMBER_AND_UNIT Field-->
                                            <div class="col-md-12 col-sm-12" v-if="QST.type=='NUMBER_AND_UNIT' && QST.is_visibile">
                                                <div class="add-travel-input" v-if="QST.is_required">
                                                        
                                                        <label class="input-label">{{ QST.label }}</label>

                                                        <v-text-field
                                                            type="number"
                                                            v-model="QST.answer"
                                                            @change="addTripBookingQuestionsToStore()"
                                                            :placeholder="QST.label"
                                                            :rules="[
                                                                v => !!v || 'This field is required.'
                                                            ]"
                                                            style="width: 50%!important; float:left;"
                                                            :maxlength="parseInt(QST.maxlength)"
                                                        ></v-text-field>

                                                        <v-select 
                                                        :items="QST.units" 
                                                        v-model="QST.unit"
                                                        @change="addTripBookingQuestionsToStore()"
                                                        style="width: 20%!important; float:left; margin-left: 10px;" label="Unit"></v-select>
                                                    </div>

                                                    <div class="add-travel-input" v-else>
                                                        <label class="input-label">{{ QST.label }}</label>

                                                        <v-text-field
                                                            type="number"
                                                            v-model="QST.answer"
                                                            @change="addTripBookingQuestionsToStore()"
                                                            :placeholder="QST.label"
                                                            :rules="[
                                                                v =>
                                                                    !!v ||
                                                                    QST.Message
                                                            ]"
                                                            style="width: 50%!important; float:left;"
                                                            :maxlength="parseInt(QST.maxlength)"
                                                        ></v-text-field>

                                                        <v-select 
                                                        :items="QST.units" 
                                                        v-model="QST.unit"
                                                        @change="addTripBookingQuestionsToStore()"
                                                        style="width: 20%!important; float:left; margin-left: 10px;" label="Unit"></v-select>
                                                    </div>
                                            </div>


                                            <!--Case For Date Field-->
                                            <div class="col-md-12 col-sm-12" v-if="QST.type=='DATE' && QST.is_visibile">
                                                <div class="add-travel-input">

                                                        <div class="add-travel-input" v-if="QST.is_required">
                                                            <v-text-field
                                                                type="date"
                                                                :min="todayDate"
                                                                date-format="MM/dd/yyyy"
                                                                :label="QST.label"
                                                                :placeholder="QST.label"
                                                                v-model="QST.answer"
                                                                @change="addTripBookingQuestionsToStore()"
                                                                :rules="[
                                                                    v =>
                                                                        !!v ||
                                                                        QST.Message
                                                                ]"
                                                                :hint="QST.hint"
                                                                :maxlength="parseInt(QST.maxlength)"
                                                                placeholder="mm/dd/yyyy"
                                                                outlined
                                                            ></v-text-field>
                                                        </div>
                                                        <div class="add-travel-input" v-else>
                                                            <v-text-field
                                                                type="date"
                                                                :min="todayDate"
                                                                date-format="MM/dd/yyyy"
                                                                :label="QST.label"
                                                                :placeholder="QST.label"
                                                                v-model="QST.answer"
                                                                @change="addTripBookingQuestionsToStore()"
                                                                :hint="QST.hint"
                                                                :maxlength="parseInt(QST.maxlength)"
                                                                placeholder="mm/dd/yyyy"
                                                                outlined
                                                            ></v-text-field>
                                                        </div>

                                                    <!--
                                                      <v-menu
                                                        ref="menu"
                                                        v-model="menu"
                                                        :close-on-content-click="false"
                                                        :return-value.sync="date"
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="auto"
                                                      >
                                                        <template v-slot:activator="{ on, attrs }">
                                                          <v-text-field
                                                            v-model="QST.answer"
                                                            :label="QST.label"
                                                            prepend-icon="mdi-calendar"
                                                            readonly
                                                            v-bind="attrs"
                                                            v-on="on"
                                                          ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                          v-model="date"
                                                          no-title
                                                          scrollable
                                                        >
                                                          <v-spacer></v-spacer>
                                                          <v-btn
                                                            text
                                                            color="primary"
                                                            @click="menu = false"
                                                          >
                                                            Cancel
                                                          </v-btn>
                                                          <v-btn
                                                            text
                                                            color="primary"
                                                            @click="$refs.menu.save(QST.answer)"
                                                          >
                                                            OK
                                                          </v-btn>
                                                        </v-date-picker>
                                                      </v-menu>
                                                      -->


                                                    <!--

                                                    <dobFlight
                                                        class="mt-2"
                                                        v-model="QST.answer"
                                                        @fgchange="bdChangeFunc"
                                                        :index="bookIndex"
                                                        :travelIndex="trvalerIndex"
                                                        :fgbod="defBdOfTrv"
                                                        :fgDepartDate="departDate"
                                                        :rules="bDayRules"
                                                        :role="roleOfDate"
                                                        :ageLimits="limitOfAge"
                                                    />

                                                    -->

                                                </div>
                                            </div>


                                            <!--Case For Time Field-->
                                            <div class="col-md-12 col-sm-12" v-if="QST.type=='TIME' && QST.is_visibile">
                                                <div class="add-travel-input">
                                                        <div class="add-travel-input" v-if="QST.is_required">
                                                            <v-text-field
                                                            type="time"
                                                                :label="QST.label"
                                                                :placeholder="QST.label"
                                                                v-model="QST.answer"
                                                                @change="addTripBookingQuestionsToStore()"
                                                                :rules="[
                                                                    v =>
                                                                        !!v ||
                                                                        QST.Message
                                                                ]"
                                                                :hint="QST.hint"
                                                                :maxlength="parseInt(QST.maxlength)"
                                                                placeholder="HH:mm"
                                                                outlined
                                                            ></v-text-field>
                                                        </div>
                                                        <div class="add-travel-input" v-else>
                                                            <v-text-field
                                                            type="time"
                                                                :label="QST.label"
                                                                :placeholder="QST.label"
                                                                v-model="QST.answer"
                                                                @change="addTripBookingQuestionsToStore()"
                                                                :hint="QST.hint"
                                                                :maxlength="parseInt(QST.maxlength)"
                                                                placeholder="HH:mm"
                                                                outlined
                                                            ></v-text-field>
                                                        </div>
                                                </div>
                                            </div>


                                            <!--Case For NUMBER Field-->
                                            <div v-if="QST.type=='NUMBER' && QST.is_visibile">
                                                <div class="add-travel-input" v-if="QST.is_required">
                                                    <label class="input-label">{{ QST.label }}</label>
                                                    <v-text-field
                                                        type="number"
                                                        v-model="QST.answer"
                                                        @change="addTripBookingQuestionsToStore()"
                                                        :placeholder="QST.label"
                                                        :rules="[
                                                            v => !!v || 'This field is required.'
                                                        ]"
                                                    ></v-text-field>
                                                </div>

                                                <div class="add-travel-input" v-else>
                                                    <label class="input-label">{{ QST.label }} </label>
                                                    <v-text-field
                                                        type="number"
                                                        :placeholder="QST.label"
                                                        v-model="QST.answer"
                                                        @change="addTripBookingQuestionsToStore()"
                                                    ></v-text-field>
                                                </div>
                                            </div>
                                        

                                        </div><!--Last Div-->


                                    </div><!--ENDS QUESTIONS INNER DUV-->

                                </div><!--ENDS QUESTION CLASS-->

                            </v-row>

                        </v-form>
                    </div>
                    <!--form ends-->

                    <!--checkbox for car details-->
                    <v-row class="m-0">
                        <div class="col-md-12 col-sm-12">
                            <div class="form-checkBox">
                                
                                <div
                                    class="setmargin"
                                    style="margin-top: 20px;"
                                    v-if="checkOutType != 'trip'"
                                >
                                    <v-form :ref="'refAgreeTerms' + ind">
                                        <v-checkbox
                                            v-model="car.agreeTerms"
                                            :rules="[
                                                v =>
                                                    !!v ||
                                                    'Please check this box to agree..!'
                                            ]"
                                            label=""
                                        >
                                            <template slot="label">
                                                I have read and accept the
                                                &nbsp;
                                                <a
                                                    href="https://wp.inteletravel.com/terms/"
                                                    target="_blank"
                                                    @click="doOpenTerms()"
                                                >
                                                    Terms & Conditions
                                                </a>

                                                ,&nbsp;

                                                <a
                                                    href="javascript: void(0);"
                                                    @click="
                                                        doCancelPolicyPopUp(
                                                            [car.item.details.activityDetails],
                                                            'activity'
                                                          );
                                                        car.agreeTerms = true;
                                                    "
                                                >
                                                    Cancellation Policy
                                                </a>

                                                ,&nbsp;

                                                <a
                                                    href="javascript: void(0);"
                                                    @click="
                                                      doCancelPolicyPopUp(
                                                            [car.item.details.activityDetails],
                                                            'activity'
                                                          );
                                                        car.agreeTerms = true;
                                                    "
                                                >
                                                    Taxes and Fees
                                                </a>
                                            </template>
                                        </v-checkbox>
                                    </v-form>
                                </div>

                                <div class="setmargin" style="margin-top: 20px;" v-if="checkOutType== 'trip'">

                                    <v-form :ref="'refAgreeTerms' + ind">
                                          <v-checkbox
                                              :error-messages="car.agreeTermsError" 
                                              v-model="car.agreeTerms"
                                              :rules="[
                                                  v =>
                                                      !!v ||
                                                      'Please check this box to agree..!'
                                              ]"
                                              label=""
                                              ref="refAgreeTerms"
                                              v-on:change="saveTravelerByCkInGroup($event, 'activity', car, ind, car.agreeTerms)"
                                          >
                                              <template slot="label">
                                               <span class="accept-read">
                                                   I have read and accept the </span>
                                                  &nbsp;
                                                  <a
                                                      href="https://wp.inteletravel.com/terms/"
                                                      target="_blank"
                                                      @click="doOpenTerms()"
                                                  >
                                                      Terms & Conditions
                                                  </a>

                                                  ,&nbsp;

                                                  <a
                                                      href="javascript: void(0);"
                                                      @click="
                                                          doCancelPolicyPopUp(
                                                            [car.item.activityDetails.activityDetail],
                                                            'activity'
                                                          );
                                                          // eslint-disable-next-line vue/no-mutating-props
                                                          car.agreeTerms = true;
                                                      "
                                                  >
                                                      Cancellation Policy
                                                  </a>

                                                  ,&nbsp;

                                                  <a
                                                      href="javascript: void(0);"
                                                      @click="
                                                           doCancelPolicyPopUp(
                                                            [car.item.activityDetails.activityDetail],
                                                            'activity'
                                                          );
                                                          // eslint-disable-next-line vue/no-mutating-props
                                                          car.agreeTerms = true;
                                                      "
                                                  >
                                                      Taxes and Fees
                                                  </a>
                                              </template>
                                          </v-checkbox>
                                      </v-form>

                                </div>

                                <div class="setmargin pl-2 travel-box-button pt-5" style="" v-if="car.saveUserError">
                                    <div class="form-checkBox">
                                        <div class="setmargin blackwido">
                                            <v-alert
                                                dense
                                                outlined
                                                prominent
                                                type="error"
                                            >
                                              <span v-html="car.saveUserErrorDetail"></span>
                                            </v-alert>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </v-row>
                    <!--checkbox for car details-->
                </div>
            </div>
        </v-expansion-panel-content>
     <invitation-pop-form 
      :DisplayPopUp="openDetailPopUp" 
      @hideDetailsBox="openDetailPopUp = false">
    </invitation-pop-form> 
    </span>
</template>
<script>
import dobActivity from '@/components/common/widgets/dobActivity';
import PhoneNumSelect from '@/components/common/widgets/PhoneNumSelect.vue';
import CountrySelect from '@/components/common/widgets/CountrySelect.vue';
import RegionSelect from '@/components/common/widgets/RegionSelect.vue';
import ActivityQuestion from '@/components/front/checkout/forms/activityQuestion.vue';
import { evBus } from "@/services/bus.js";
import { mapState } from 'vuex';
import InvitationPopForm from '../InvitationPopForm.vue';
export default {
    name: 'activityTraveller',
    components: {
        PhoneNumSelect,
        CountrySelect,
        RegionSelect,
        dobActivity,
        InvitationPopForm,
        ActivityQuestion
    },
    props: [
        'car',
        'ind',
        'doOpenTerms',
        'makeCardInfo',
        'saveTravelerByCk',
        'makePrimaryTraveler',
        'CheckvalidEmail',
        'populateTravelerFormBySrch',
        'filterTravelers',
        'dobUpdate',
        'checkOutType',
        'tripTravellers',
        'populateTravelerFormByTraveler',
        'dobFlightUpdate',
        'saveTravelerByCkInGroup'
    ],
    data() {
        return {
            birthDateRules: [
                v => !!v || 'Birth date is required',
                v => v || (v && v.length >= 10) || 'yes'
            ],
            addressRules: [
                v => !!v || 'Address is required',
                v =>
                    (v && v.length >= 10) ||
                    'Address must have atleast 10 characters',
                v => (v && v.length <= 30) || 'Address maximum 30 characters allowed',
                v => !/[^a-zA-Z0-9 ]/.test(v) ||
                'Address must contain only alphabets, numbers and space.',
            ],
            openDetailPopUp:false,
            preferredCountries: ['US', 'GB', 'MX'],
            defaultCountry: '',
            phone: {
                countryCode: '',
                isValid: false,
                phoneNumber: '',
                countryCallingCode: '',
                formattedNumber: '',
                nationalNumber: '',
                formatInternational: '',
                formatNational: '',
                uri: '',
                e164: ''
            },
            mainFormIndex: '',
            subFormIndex: '',
            booking_questions:[],
            arrivalQuestions: ['TRANSFER_AIR_ARRIVAL_AIRLINE', 'TRANSFER_AIR_ARRIVAL_FLIGHT_NO', 
                'TRANSFER_ARRIVAL_DROP_OFF', 'PICKUP_POINT','TRANSFER_RAIL_ARRIVAL_LINE', 
                'TRANSFER_RAIL_ARRIVAL_STATION', 'TRANSFER_ARRIVAL_TIME',
                'TRANSFER_PORT_ARRIVAL_TIME', 'TRANSFER_PORT_CRUISE_SHIP'],
            departureQuestions: [
                'TRANSFER_AIR_DEPARTURE_AIRLINE', 'TRANSFER_AIR_DEPARTURE_FLIGHT_NO', 
                'TRANSFER_DEPARTURE_DATE', 'TRANSFER_DEPARTURE_TIME', 'TRANSFER_DEPARTURE_PICKUP',
                'TRANSFER_RAIL_DEPARTURE_LINE', 'TRANSFER_RAIL_DEPARTURE_STATION', 'TRANSFER_DEPARTURE_DATE', 
                'TRANSFER_DEPARTURE_TIME', 'TRANSFER_DEPARTURE_PICKUP',
                'TRANSFER_PORT_CRUISE_SHIP', 'TRANSFER_DEPARTURE_DATE', 'TRANSFER_PORT_DEPARTURE_TIME', 'TRANSFER_DEPARTURE_PICKUP',
                'TRANSFER_DEPARTURE_PICKUP'],
            todayDate:new Date().toISOString().slice(0, 10)
        };
    },
    created: function() {

    evBus.$on('uncheckBoxOfAgree', (data) => {

        this.car.agreeTerms = false;
    });
    

    console.log('Cars', this.car);

    this.bookingQuestions();

    },
    methods:{
        getAllLocations(){
            let locationNames = [];
            let objActivityDetail = {};
            if((typeof this.car.item.activityDetails == 'undefined') && (typeof this.car.item.details.activityDetails != 'undefined')){
                objActivityDetail = this.car.item.details.activityDetails;
            }
            else{
                const { activityDetail } = this.car.item.activityDetails;
                objActivityDetail = activityDetail;
            }
            if (!objActivityDetail || !objActivityDetail.logistics || !objActivityDetail.logistics.travelerPickup) return locationNames;
            const { locations } = objActivityDetail.logistics.travelerPickup;
            if (!locations) return locationNames;
            const { locationsDetails } = objActivityDetail;
            if (!locationsDetails) return locationNames;
            const filteredLocations = locations;
            for (const location of filteredLocations) {
                if (!locationsDetails[location.location.ref]) continue;
                if(typeof locationsDetails[location.location.ref].details != 'undefined')
                {
                    locationNames.push({
                        value:location.location.ref,
                        text:locationsDetails[location.location.ref].details.formatted_address,
                        pickupType:location.pickupType
                    });
                }
                else{
                    locationNames.push({
                        value:location.location.ref,
                        text:locationsDetails[location.location.ref].name,
                        pickupType:location.pickupType
                    });
                }
            }
            return locationNames;
        },
        reformateMode(location_mode){
            if(location_mode == 'AIR'){
                location_mode = 'AIRPORT';
            }
            if(location_mode == 'SEA'){
                location_mode = 'PORT';
            }
            if(location_mode == 'RAIL'){
                location_mode = 'TRAIN';
            }
            if(location_mode == 'OTHER'){
                location_mode = 'HOTEL';
            }
            return location_mode;
        },
        getQuestionLocations(question) {
            let locationNames = this.getAllLocations(question);
            // if(['TRANSFER_ARRIVAL_DROP_OFF','TRANSFER_DEPARTURE_PICKUP'].includes(question.id)){
            //     return [];
            // }

            if(['PICKUP_POINT','TRANSFER_ARRIVAL_DROP_OFF','TRANSFER_DEPARTURE_PICKUP'].includes(question.id)){
                let location_mode = this.getSelectedTransferArivalMode();
                location_mode = this.reformateMode(location_mode);

                if(location_mode){
                    locationNames=locationNames.filter((location)=>typeof location.text != 'undefined' && location.pickupType == location_mode);
                }
                else{
                    locationNames=locationNames.filter((location)=>typeof location.text != 'undefined' && location.pickupType == 'HOTEL');
                }
            }
            
            if(
                (locationNames.length > 0 && question.id == 'PICKUP_POINT' && this.allowCustomTravellerPickup) ||
                (['TRANSFER_ARRIVAL_DROP_OFF','TRANSFER_DEPARTURE_PICKUP'].includes(question.id))){
                locationNames.unshift({
                    value:'I_DONT_SEE_MY_PICKUP_LOCATION',
                    text:'I don\'t see my pickup location',
                    pickupType:'NONE'
                })
            }
            return [...locationNames];
        },
        getSelectedTransferDepartureMode(){
            let location_mode='';
            this.car.bookingQuestions.forEach((pQuestion)=>{
                if(pQuestion.id == 'TRANSFER_DEPARTURE_MODE') {
                    location_mode = pQuestion.answer;
                }
            });
            if(location_mode == 'AIR'){
                location_mode = 'AIRPORT';
            }
            if(location_mode == 'SEA'){
                location_mode = 'PORT';
            }
            if(location_mode == 'RAIL'){
                location_mode = 'TRAIN';
            }
            return location_mode;
        },
        setSelectedPickupType(Question,unit){
            this.car.bookingQuestions.forEach((pQuestion)=>{
                if(pQuestion.id == Question.id) {
                    pQuestion.unit   = unit;
                    pQuestion.answer = '';
                    pQuestion.free_answer = '';
                }
            });
            this.bookingQuestions();
        },
        
        putAnswerToQuestion(Question) {

            this.car.traveler.forEach(objTraveler => {

                objTraveler.bookingQuestionAnswers.forEach(pQuestion => {

                    if(pQuestion.id==Question.id && pQuestion.travelerNum==Question.travelerNum) {

                        pQuestion.answer = Question.answer;
                    }
                });

            });
        },

        putAnswerUnitToQuestion(Question) {

            this.car.traveler.forEach(objTraveler => {

                objTraveler.bookingQuestionAnswers.forEach(pQuestion => {

                    if(pQuestion.id==Question.id && pQuestion.travelerNum==Question.travelerNum) {

                        pQuestion.unit = Question.unit;
                    }
                });

            });
        },

        phoneFocusedForm(mainFormIndex, subFormIndex) {

          this.mainFormIndex = mainFormIndex;
          this.subFormIndex = subFormIndex;
        },

        showInvitation(val){
          
            if(val==3){
              this.openDetailPopUp = true;
            }
        },

        checkedDob(date) {
            return Number(moment().diff(moment(date), 'years', false));
        },

        doCheckByDefault(index, value) {

            if (index == 0) {
                return value != value;
            } else {
                return value != value;
            }
        },

        onUpdatePhone(formattedNumber, { number, valid, country }) {

            this.validNumber = valid;
            this.country = country.name;
            this.phone.countryCode = country.iso2;
            this.phone.isValid = valid;
            this.phone.phoneNumber = formattedNumber.replace(/\s+/g, '');
            this.phone.countryCallingCode = country.dialCode;
            this.phone.formattedNumber = number.e164;
            this.phone.nationalNumber = number.significant;
            this.phone.formatInternational = number.international;
            this.phone.formatNational = number.national;
            this.phone.uri = number.rfc3966;
            this.phone.e164 = number.e164;

            this.$emit('onPhoneData', this.phone);

            let num = number.international;

            if (num) {
                num = num.replace('+', '');
                num = num.replace(/\s+/g, '');
                num = num.replace('undefined', '');

                this.mobile = num;
            }

              this.phone.parentFormIndex = this.mainFormIndex;  
              this.phone.subFormIndex = this.subFormIndex;

              evBus.$emit('phoneDetails', this.phone);
        },
        checkValidNumber() {
            if (!this.validNumber) return 'Please enter valid mobile number';
            return true;
        },
        countryChanged(country) {
            this.country = country.name;
        },
        getQuestionType(question){
            if(['TRANSFER_ARRIVAL_MODE','TRANSFER_DEPARTURE_MODE'].includes(question.id)){
                return 'SELECT';
            }
            return question.type;
        },
        getQuestionUnit(question){
            if(question.type == "LOCATION_REF_OR_FREE_TEXT" && (typeof question.units !== 'undefined')){
                if(question.unit){
                    return question.unit;
                }
                if(['TRANSFER_ARRIVAL_DROP_OFF','TRANSFER_DEPARTURE_PICKUP'].includes(question.id)){
                    return 'FREETEXT';
                }
                if(!this.allowCustomTravellerPickup){
                    return "LOCATION_REFERENCE";
                }
                else{
                    if(question.locations && question.locations.length > 0){
                        return "LOCATION_REFERENCE";
                    }
                    else{
                        return 'FREETEXT';
                    }
                    
                }
            }
            return false;
        },
        isQuestionRequired(question) {
            if (question.required === 'OPTIONAL') {
                return false;
            }
            else if (question.required === 'MANDATORY') {
                return true;
            }
            else if (question.required === 'CONDITIONAL') {
                const arrivalQuestions = {
                    AIR: ['TRANSFER_AIR_ARRIVAL_AIRLINE', 'TRANSFER_AIR_ARRIVAL_FLIGHT_NO', 'TRANSFER_ARRIVAL_TIME', 'TRANSFER_ARRIVAL_DROP_OFF', 'PICKUP_POINT'],
                    RAIL: ['TRANSFER_RAIL_ARRIVAL_LINE', 'TRANSFER_RAIL_ARRIVAL_STATION', 'TRANSFER_ARRIVAL_TIME', 'TRANSFER_ARRIVAL_DROP_OFF'],
                    SEA: ['TRANSFER_PORT_ARRIVAL_TIME', 'TRANSFER_PORT_CRUISE_SHIP', 'TRANSFER_ARRIVAL_DROP_OFF', 'PICKUP_POINT'],
                    OTHER: ['PICKUP_POINT'],
                };
                const departureQuestions = {
                    AIR: ['TRANSFER_AIR_DEPARTURE_AIRLINE', 'TRANSFER_AIR_DEPARTURE_FLIGHT_NO', 'TRANSFER_DEPARTURE_DATE', 'TRANSFER_DEPARTURE_TIME', 'TRANSFER_DEPARTURE_PICKUP'],
                    RAIL: ['TRANSFER_RAIL_DEPARTURE_LINE', 'TRANSFER_RAIL_DEPARTURE_STATION', 'TRANSFER_DEPARTURE_DATE', 'TRANSFER_DEPARTURE_TIME', 'TRANSFER_DEPARTURE_PICKUP'],
                    SEA: ['TRANSFER_PORT_CRUISE_SHIP', 'TRANSFER_DEPARTURE_DATE', 'TRANSFER_PORT_DEPARTURE_TIME', 'TRANSFER_DEPARTURE_PICKUP'],
                    OTHER: ['TRANSFER_DEPARTURE_PICKUP']
                };
                const arrivalMode = this.filteredQuestionById('TRANSFER_ARRIVAL_MODE');
                const departureMode = this.filteredQuestionById('TRANSFER_DEPARTURE_MODE');
                if(!this.isQuestionExistsById('TRANSFER_ARRIVAL_MODE') &&  Object.values(arrivalQuestions).some(questions => questions.includes(question.id))){
                    return true;
                }

                if(!this.isQuestionExistsById('TRANSFER_DEPARTURE_MODE') &&  Object.values(departureQuestions).some(questions => questions.includes(question.id))){
                    return true;
                }
                
                return (arrivalQuestions[arrivalMode] && arrivalQuestions[arrivalMode].includes(question.id)) || (departureQuestions[departureMode] && departureQuestions[departureMode].includes(question.id));
            }
            return false;
        },
        isQuestionExistsById(id){
            let found_question = this.car.bookingQuestions.filter((question)=>question.id == id);
            if(found_question.length > 0){
                return true;
            }
            return false;
        },
        getQuestionOrder(question){
            let questions=[
                'TRANSFER_ARRIVAL_MODE',
                'PICKUP_POINT',
                'TRANSFER_AIR_ARRIVAL_AIRLINE',
                'TRANSFER_AIR_ARRIVAL_FLIGHT_NO',
                'TRANSFER_RAIL_ARRIVAL_LINE',
                'TRANSFER_RAIL_ARRIVAL_STATION',
                'TRANSFER_PORT_CRUISE_SHIP',
                'TRANSFER_PORT_ARRIVAL_TIME',
                'TRANSFER_ARRIVAL_TIME',
                'TRANSFER_ARRIVAL_DROP_OFF',
        
                'TRANSFER_DEPARTURE_MODE',
                'TRANSFER_DEPARTURE_PICKUP',
                'TRANSFER_AIR_DEPARTURE_AIRLINE',
                'TRANSFER_AIR_DEPARTURE_FLIGHT_NO',
                'TRANSFER_DEPARTURE_DATE',
                'TRANSFER_DEPARTURE_TIME',
                'TRANSFER_DEPARTURE_DATE',
                'TRANSFER_RAIL_DEPARTURE_STATION',
                'TRANSFER_PORT_DEPARTURE_TIME',
                'TRANSFER_RAIL_DEPARTURE_LINE',
                
                'SPECIAL_REQUIREMENTS',
            ];
            let index = questions.indexOf(question.id);
            return index > -1?index:null;
        },
        filteredQuestionById(id){
            try {
                return this.booking_questions.filter((question)=>question.id == id)[0].answer;
            } catch (error) {
                return false;
            }
        },
        getAllowedAnswers(question){
            if(['TRANSFER_ARRIVAL_MODE','TRANSFER_DEPARTURE_MODE'].includes(question.id)){
                if(this.allowCustomTravellerPickup){
                    return [
                        {value:'AIR',text:'AIRPORT'},
                        {value:'SEA',text:'PORT'},
                        {value:'RAIL',text:'TRAIN'},
                        {value:'OTHER',text:'HOTEL'}];
                }

                // [{value:'AIR',text:'Airport'},{value:'SEA',text:'Port'},{value:'RAIL',text:'Train'},{value:'OTHER',text:'Other'}];
                let locationNames = this.getAllLocations(question);
                const allowedAnswers = [...new Set(locationNames.map(item => item.pickupType))];
                let response = [];
                for(let i = 0; i < allowedAnswers.length; i++){
                    if(allowedAnswers[i] == 'HOTEL'){
                        continue;
                    }
                    let value=allowedAnswers[i];
                    let text=allowedAnswers[i];
                    if(value == 'AIRPORT')
                    {
                        value = 'AIR';
                    }
                    if(value == 'PORT')
                    {
                        value = 'SEA';
                    }
                    if(value == 'RAIL'){
                        value = 'TRAIN';
                    }
                    if(value == 'OTHER'){
                        text = 'HOTEL';
                    }
                    response.push({
                        value:value,
                        text:text
                    })
                }
                return response;
            }
            return question.allowedAnswers;
        },
        getQuestionAvailableUnits(question){
            if(['TRANSFER_ARRIVAL_DROP_OFF','TRANSFER_DEPARTURE_PICKUP'].includes(question.id)){
                return ['FREETEXT'];
            }
            return question.units;
        },
        isModeExists(id){
            let mode = this.car.bookingQuestions.filter((question)=> question.id == id);
            if(mode.length > 0){
                return true;
            }
            else{
                return false;
            }
        },
        removeArrivalQuestions(all_questions){
            return all_questions.filter((question)=> !this.arrivalQuestions.includes(question.id));
        },
        removeDepartureQuestions(all_questions){
            return all_questions.filter((question)=> !this.departureQuestions.includes(question.id));
        },
        addArrivalQuestions(all_questions){
            const arrivalQuestions = {
                AIR: [
                    {question:'TRANSFER_AIR_ARRIVAL_AIRLINE',id:'TRANSFER_AIR_ARRIVAL_AIRLINE',type:'STRING',label:'Arrival airline',legacyBookingQuestionId:7}, 
                    {question:'TRANSFER_AIR_ARRIVAL_FLIGHT_NO',id:'TRANSFER_AIR_ARRIVAL_FLIGHT_NO',type:'STRING',label: "Arrival flight number",legacyBookingQuestionId:8},
                    {question:'TRANSFER_ARRIVAL_TIME',id: 'TRANSFER_ARRIVAL_TIME',type:'TIME',label:"Arrival time",legacyBookingQuestionId:12}, 
                    {question:'TRANSFER_ARRIVAL_DROP_OFF',id:'TRANSFER_ARRIVAL_DROP_OFF',type:'LOCATION_REF_OR_FREE_TEXT',label:"Where would you like to be dropped off",legacyBookingQuestionId:11}, 
                    {question:'PICKUP_POINT',id:'PICKUP_POINT',type:'LOCATION_REF_OR_FREE_TEXT',label:"I would like to be picked up from",legacyBookingQuestionId:6}],
                RAIL: [
                    {question:'TRANSFER_RAIL_ARRIVAL_LINE',id:'TRANSFER_RAIL_ARRIVAL_LINE',type:'STRING',label:"Name of arrival rail provider",legacyBookingQuestionId:19}, 
                    {question:'TRANSFER_RAIL_ARRIVAL_STATION',id:'TRANSFER_RAIL_ARRIVAL_STATION',type:'STRING',label:"Name of arrival station",legacyBookingQuestionId:20}, 
                    {question:'TRANSFER_ARRIVAL_TIME',id:'TRANSFER_ARRIVAL_TIME',type:'TIME',label:"Arrival time",legacyBookingQuestionId:12}, 
                    {question:'TRANSFER_ARRIVAL_DROP_OFF',id:'TRANSFER_ARRIVAL_DROP_OFF',type:'LOCATION_REF_OR_FREE_TEXT',label:"Where would you like to be dropped off",legacyBookingQuestionId:11}],
                SEA: [
                    {question:'TRANSFER_PORT_ARRIVAL_TIME',id:'TRANSFER_PORT_ARRIVAL_TIME',type:'TIME',label:"Disembarkation time",legacyBookingQuestionId:16}, 
                    {question:'TRANSFER_PORT_CRUISE_SHIP',id:'TRANSFER_PORT_CRUISE_SHIP',type:'STRING',label:"Name of cruise ship",legacyBookingQuestionId:17}, 
                    {question:'TRANSFER_ARRIVAL_DROP_OFF',id:'TRANSFER_ARRIVAL_DROP_OFF',type:'LOCATION_REF_OR_FREE_TEXT',label:"Where would you like to be dropped off",legacyBookingQuestionId:11}, 
                    {question:'PICKUP_POINT',id:'PICKUP_POINT',type:'LOCATION_REF_OR_FREE_TEXT',label:"I would like to be picked up from",legacyBookingQuestionId:6}],
                OTHER: [
                    {question:'PICKUP_POINT',id:'PICKUP_POINT',type:'LOCATION_REF_OR_FREE_TEXT',label:"I would like to be picked up from",legacyBookingQuestionId:6}]
            };
            let selectedMode = this.getSelectedTransferArivalMode();
            let modeQuestions = arrivalQuestions[selectedMode];
            modeQuestions.forEach((question)=>{
                let answer = '';
                let unit = '';
                let units = '';
                let locations = this.getQuestionLocations(question);
                this.booking_questions.forEach((bQuestion)=>{
                    if(bQuestion.id == question.id){
                        answer = bQuestion.answer;

                        question.locations=locations;
                        unit = this.getQuestionUnit(bQuestion);
                        units = this.getQuestionAvailableUnits(bQuestion);
                    }
                });
                
                all_questions.push({
                    group: "PER_BOOKING",
                    id: question.id,
                    label: question.label,
                    legacyBookingQuestionId: question.legacyBookingQuestionId,
                    maxLength: 255,
                    required : true,
                    is_visibile:true,
                    type: question.type,
                    question: question.type,
                    answer:answer,
                    unit:unit,
                    units:units,
                    locations:locations
                });
            });
            return all_questions;
        },
        addDepartureQuestions(all_questions){
            const departureQuestions = {
                AIR: [
                    {question:'TRANSFER_AIR_DEPARTURE_AIRLINE',id:'TRANSFER_AIR_DEPARTURE_AIRLINE',type:'STRING',label:'Name of departure airline',legacyBookingQuestionId:9}, 
                    {question:'TRANSFER_AIR_DEPARTURE_FLIGHT_NO',id:'TRANSFER_AIR_DEPARTURE_FLIGHT_NO',type:'STRING',label: "Departure flight number",legacyBookingQuestionId:10},
                    {question:'TRANSFER_DEPARTURE_DATE',id: 'TRANSFER_DEPARTURE_DATE',type:'DATE',label:"Departure date",legacyBookingQuestionId:13}, 
                    {question:'TRANSFER_DEPARTURE_TIME',id:'TRANSFER_DEPARTURE_TIME',type:'TIME',label:"Departure time",legacyBookingQuestionId:15}, 
                    {question:'TRANSFER_DEPARTURE_PICKUP',id:'TRANSFER_DEPARTURE_PICKUP',type:'LOCATION_REF_OR_FREE_TEXT',label:"I would like to be picked up from",legacyBookingQuestionId:14}],
                RAIL: [
                    {question:'TRANSFER_RAIL_DEPARTURE_LINE',id:'TRANSFER_RAIL_DEPARTURE_LINE',type:'STRING',label:"Name of departure rail provider",legacyBookingQuestionId:21}, 
                    {question:'TRANSFER_RAIL_DEPARTURE_STATION',id:'TRANSFER_RAIL_DEPARTURE_STATION',type:'STRING',label:"Name of departure station",legacyBookingQuestionId:22}, 
                    {question:'TRANSFER_DEPARTURE_DATE',id:'TRANSFER_DEPARTURE_DATE',type:'DATE',label:"Departure date",legacyBookingQuestionId:13}, 
                    {question:'TRANSFER_DEPARTURE_TIME',id:'TRANSFER_DEPARTURE_TIME',type:'TIME',label:"Departure time",legacyBookingQuestionId:15},
                    {question:'TRANSFER_DEPARTURE_PICKUP',id:'TRANSFER_DEPARTURE_PICKUP',type:'LOCATION_REF_OR_FREE_TEXT',label:"Where would you like to be dropped off",legacyBookingQuestionId:14}],
                SEA: [
                    {question:'TRANSFER_PORT_CRUISE_SHIP',id:'TRANSFER_PORT_CRUISE_SHIP',type:'STRING',label:"Name of cruise ship",legacyBookingQuestionId:17}, 
                    {question:'TRANSFER_DEPARTURE_DATE',id:'TRANSFER_DEPARTURE_DATE',type:'DATE',label:"Departure date",legacyBookingQuestionId:13}, 
                    {question:'TRANSFER_PORT_DEPARTURE_TIME',id:'TRANSFER_PORT_DEPARTURE_TIME',type:'TIME',label:'Boarding time',legacyBookingQuestionId:18}, 
                    {question:'TRANSFER_DEPARTURE_PICKUP',id:'TRANSFER_DEPARTURE_PICKUP',type:'LOCATION_REF_OR_FREE_TEXT',label:"Where would you like to be dropped off",legacyBookingQuestionId:14}],
                OTHER: [
                    {question:'TRANSFER_DEPARTURE_PICKUP',id:'TRANSFER_DEPARTURE_PICKUP',type:'LOCATION_REF_OR_FREE_TEXT',label:"I would like to be picked up from",legacyBookingQuestionId:14}]
            };
            let selectedMode = this.getSelectedDepartureArivalMode();
            let modeQuestions = departureQuestions[selectedMode];
            modeQuestions.forEach((question)=>{
                let answer = '';
                let unit = '';
                let units = '';
                this.booking_questions.forEach((bQuestion)=>{
                    if(bQuestion.id == question.id){
                        answer = bQuestion.answer;

                        unit = this.getQuestionUnit(question);
                        units = this.getQuestionAvailableUnits(question);
                    }
                });

                all_questions.push({
                    group: "PER_BOOKING",
                    id: question.id,
                    label: question.label,
                    legacyBookingQuestionId: question.legacyBookingQuestionId,
                    maxLength: 255,
                    required : true,
                    is_visibile:true,
                    type: question.type,
                    question:question.question,
                    answer:answer,
                    unit:unit,
                    units:units
                });
            });
            return all_questions;
        },
        getSelectedTransferArivalMode(){
            let location_mode='';
            this.booking_questions.forEach((pQuestion)=>{
                if(pQuestion.id == 'TRANSFER_ARRIVAL_MODE') {
                    location_mode = pQuestion.answer;
                }
            });
            return location_mode;
        },
        getSelectedDepartureArivalMode(){
            let location_mode='';
            this.booking_questions.forEach((pQuestion)=>{
                if(pQuestion.id == 'TRANSFER_DEPARTURE_MODE') {
                    location_mode = pQuestion.answer;
                }
            });
            return location_mode;
        },
        setVisibility(questions){
            let formated_questions = [];
            questions.forEach((question)=>{
                let locations = this.getQuestionLocations(question);
                let units = this.getQuestionAvailableUnits(question);
                let unit = this.getQuestionUnit(question);
                let type=this.getQuestionType(question);
                let allowedAnswers = this.getAllowedAnswers(question);
                let order = this.getQuestionOrder(question);
                let is_required = question.required;
                if(is_required == 'CONDITIONAL'){
                    is_required = true;
                }
                else if(question.required == 'OPTIONAL'){
                    is_required = false;
                }
                else if(question.required == 'MANDATORY'){
                    is_required = true;
                }

                formated_questions.push({
                    group: question.group,
                    answer: question.answer,
                    free_answer: question.free_answer,
                    id: question.id,
                    label: question.label,
                    legacyBookingQuestionId: question.legacyBookingQuestionId,
                    maxLength: question.maxLength,
                    required : question.required,
                    is_required : is_required,
                    is_visibile:true,
                    type: type,
                    locations:locations,
                    units:units,
                    unit:unit,
                    question:question.question,
                    Message : question.label+' is required',
                    allowedAnswers:allowedAnswers,
                    order:order
                });
            });
            formated_questions = formated_questions.sort((a, b) => a.order - b.order);
            return formated_questions;
        },
        setQuestionAnswers(questions){
            let answered_questions = [];
            questions.forEach((question)=>{
                let answer = '';
                let free_answer = '';
                let unit = '';
                this.booking_questions.forEach((bQuestion)=>{
                    if(bQuestion.id == question.id){
                        answer = bQuestion.answer;
                        if(bQuestion.unit){
                            unit = bQuestion.unit;
                        }
                        if(bQuestion.free_answer){
                            free_answer=bQuestion.free_answer;
                        }
                    }
                });
                answered_questions.push({
                    group: question.group,
                    answer: answer,
                    free_answer: free_answer,
                    id: question.id,
                    label: question.label,
                    legacyBookingQuestionId: question.legacyBookingQuestionId,
                    maxLength: question.maxLength,
                    required : question.required,
                    is_visibile:true,
                    type: question.type,
                    locations:question.locations,
                    units:question.units,
                    unit:unit,
                    question:question.question,
                    Message : question.Message,
                    allowedAnswers:question.allowedAnswers,
                    order:question.order
                });
            });
            return answered_questions;
        },
        resetSelectedModeAnswers(question){
            let formated_questions = [];
            if(question.id == 'TRANSFER_ARRIVAL_MODE'){
                this.booking_questions.forEach((qst)=>{
                    if(this.arrivalQuestions.includes(qst.id)){
                        qst.answer = '';
                        qst.free_answer = '';
                    }
                    formated_questions.push(qst);
                });
            }
            else if(question.id == 'TRANSFER_DEPARTURE_MODE'){
                this.booking_questions.forEach((qst)=>{
                    if(this.departureQuestions.includes(qst.id)){
                        qst.answer = '';
                        qst.free_answer = '';
                    }
                    formated_questions.push(qst);
                });
            }
            this.booking_questions=formated_questions;
            return true;
        },
        bookingQuestions(reset_question=false){
            
            let all_questions = this.car.bookingQuestions;
            if(reset_question){
                this.resetSelectedModeAnswers(reset_question);
            }
            if(this.booking_questions.length > 0)
                all_questions = this.setQuestionAnswers(all_questions);
            
            if(this.isModeExists('TRANSFER_ARRIVAL_MODE')){
                all_questions = this.removeArrivalQuestions(all_questions);
                if(this.getSelectedTransferArivalMode()){
                    all_questions = this.addArrivalQuestions(all_questions);
                }
            }
            if(this.isModeExists('TRANSFER_DEPARTURE_MODE')){
                all_questions = this.removeDepartureQuestions(all_questions);
                if(this.getSelectedDepartureArivalMode()){
                    all_questions = this.addDepartureQuestions(all_questions);
                }
            }
            all_questions = this.setVisibility(all_questions);

            this.booking_questions=all_questions;
            this.addTripBookingQuestionsToStore();
        },
        addTripBookingQuestionsToStore(){
            let allBookinQuestions=this.car.bookingQuestions;
            this.booking_questions.forEach((question,i)=>{
                var filterQuestion = allBookinQuestions.map(function(e) { return e.id; }).indexOf(question.id);

                if(filterQuestion != -1){
                    allBookinQuestions[filterQuestion].answer=question.answer;
                    if(question.unit){
                        allBookinQuestions[filterQuestion].unit=question.unit;
                    }
                    if(question.answer == 'I_DONT_SEE_MY_PICKUP_LOCATION'  && typeof question.free_answer != undefined){
                        allBookinQuestions[filterQuestion].answer=question.free_answer;
                        allBookinQuestions[filterQuestion].unit='FREETEXT';
                    }
                }
                else{
                    allBookinQuestions.push(question);
                }
            });
            
            this.car.bookingQuestions=allBookinQuestions;
        }
    },

    mounted(){
        if (this.domain == 'us') {
            this.defaultCountry = 'US';
        } else if (this.domain == 'uk') {
            this.defaultCountry = 'GB';
        } else if (this.domain == 'mx') {
            this.defaultCountry == 'MX';
        } else {
            // eslint-disable-next-line no-undef
            this.defaultCountry = domain.toUpperCase();
        }

        if (typeof this.phoneDetails !== 'undefined') {
            // needed to not show details of input-number as per requirements

            this.showMobileDetails = this.phoneDetails;
        }

        if (typeof this.value !== 'undefined') {
            // needed to not show details of input-number as per requirements

            this.defaultCountry = null;
            this.premobileval = this.value;
        }

        if (typeof this.formMatrix !== 'undefined') {
            // needed to not show details of input-number as per requirements

            this.emitDetailEvents = true;
        }

    },
    computed:{
        ...mapState({
            domain: state => state.envStore.domain,
            ActivityStore: state => state.ActivityStore
        }),
        watchableParams () {
      return {...this.booking_questions}
    },
        // eslint-disable-next-line vue/return-in-computed-property
        whiteList() {
            if (this.domain == 'us')
                return [
                    'US',
                    'AS',
                    'BS',
                    'BB',
                    'BZ',
                    'BM',
                    'KY',
                    'DO',
                    'FM',
                    'GU',
                    'JM',
                    'MH',
                    'UM',
                    'MP',
                    'PS',
                    'PZ',
                    'KN',
                    'TT',
                    'TC',
                    'VI'
                ];
            else if (this.domain == 'uk') return ['GB', 'VG'];
            else if (this.domain == 'mx') return ['MX'];
            else if (this.domain == 'fr')
                return [
                    'PF',
                    'TF',
                    'GP',
                    'GY',
                    'MQ',
                    'YT',
                    'NC',
                    'RE',
                    'BL',
                    'MF',
                    'PM',
                    'WF'
                ];
        },
        mobile: {
            get: function() {
                return this.value;
            },
            set: function(newVal) {
                this.$emit('input', newVal);
            }
        },
        allowCustomTravellerPickup() {
            
            const { car } = this;
            if (!car || !car.item) {
                return false;
            }
            const { activityDetails } = car.item;
            if(typeof this.car.item.details != 'undefined'){
                let details = this.car.item.details;
                if(typeof details.activityDetails != 'undefined'){
                    let activityDetails=details.activityDetails;
                    if(typeof activityDetails.logistics != 'undefined'){
                        let logistics= activityDetails.logistics;
                        if(typeof logistics.travelerPickup != 'undefined'){
                           return logistics.travelerPickup.allowCustomTravelerPickup && activityDetails.freeTextAllow;
                        }
                    }
                }
            }
            if (!activityDetails || !activityDetails.activityDetail) {
                return false;
            }
            const { logistics } = activityDetails.activityDetail;
            if (!logistics || !logistics.travelerPickup) {
                return false;
            }
            return logistics.travelerPickup.allowCustomTravelerPickup && activityDetails.activityDetail.freeTextAllow;
        },
    },
    watch: {
        watchableParams (newParams, oldParams) {
        this.addTripBookingQuestionsToStore();
    }
  }
};
</script>
