<template>
  <span style="display: block !important;">
    <v-expansion-panel-header>
      <div class="accordian-header">
        <div class="in-left" v-if="car.engine == 'hotel'">
          <span>
            <img :src="require('@/assets/images/hotel.png').default" alt="" />
          </span>
        </div>
        <div class="in-right">
          <div class="step1-pickup-data">
            <p>
              {{ car.item.hotel.displayName }}
            </p>
          </div>

          <div class="accordian-compare-img">
            <img src="@/assets/images/checkout-compare-arrow.png" alt="" />
          </div>

          <div class="step1-pickup-date">
            <p>
              {{ getHotelCountryDFOnly(car.item.pdate) }} -
              {{ getHotelCountryDFOnly(car.item.ddate) }}
            </p>
          </div>
        </div>
      </div>
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      
      <div class="add-travel-box-top step1-add-travel-box">
        
        <div class="step2-payment-information">
          <h3>
            Guests
          </h3>
          <p>
            *Guests names must match the traveler’s passport or
            Government-issued photo ID
          </p>
        </div> <!--Main Inner Div 1 Ends-->

        <div class="travel-box-iner step1-travel-box">
          <div
            class="add-travel-form"
            style=""
            v-for="(objTraveler, trvInd) in car.traveler"
            :key="'hotel1' + trvInd"
          >
            <div
              class="step2-payment-information"
              style="margin: 25px 0px 25px 0px;"
              v-if="objTraveler.roomNumber != false"
            >
              <h3>
                {{ objTraveler.roomNumber }}
              </h3>
            </div>

            <v-form :ref="'form99' + ind + '' + trvInd">

              <div class="step2-payment-information">
                <h4>

                  {{ objTraveler.displayTitle }}

                </h4>
            
              </div>

              <v-row class="m-0">
                <div class="col-md-12 col-sm-12">
                  <v-row align="center" class="ml-0 mr-o mb-0">
                    <div
                      class="add-travel-input mt-10"
                      v-if="objTraveler.FlagSearchTravelers == false"
                    >
                      <v-select
                        :items="objTraveler.pTravelers"
                        item-text="text"
                        item-value="value"
                        :label="objTraveler.pTravelersLabel"
                        :rules="[v => !!v || 'Title is required']"
                        :disabled="objTraveler.FlagSearchTravelers"
                        v-model="objTraveler.pTravelersVal"
                        @change="
                          objTraveler.searchTravelers.error = false;
                          objTraveler.pTravelersVal == 0
                            ? (objTraveler.showFormForcely = false)
                            : 'no';
                            showInvitation($event)
                        "
                        @focus="phoneFocusedForm(ind, trvInd)"
                        width="300"
                      >
                      </v-select>
                    </div>

                    <!-- <div
                      class="add-travel-input mt-10 "
                      v-if="objTraveler.pTravelersVal == 2"
                    >
                      <v-radio-group
                        row
                        class="ml-8 gender"
                        v-model="objTraveler.userType"
                        @change="filterByUserType($event, ind, trvInd, 'Guest')"
                      >
                        <v-radio
                          class="px-4"
                          label="Customer"
                          value="customer"
                          name="rdSalutation[]['salutation']"
                          color="primary"
                        ></v-radio>
                        <v-radio
                          class="px-4"
                          label="Traveller"
                          value="traveller"
                          name="rdSalutation[]['salutation']"
                          color="primary"
                        ></v-radio>
                      </v-radio-group>
                    </div> -->

                    <div
                      v-if="objTraveler.pTravelersVal == 2"
                      class="add-travel-input row col-md-12 col-sm-12"
                    >
                      <!--Start Search CRM-->

                      <div
                        :class="
                          tripTravellers.length > 0
                            ? 'col-md-12 col-sm-12'
                            : 'col-md-12 col-sm-12'
                        "
                        style="padding: 0px 0px 15px 0px!important;"
                      >
                        <span> Existing Guest</span>
                        <v-text-field
                          v-model="objTraveler.searchTravelers.search"
                          append-icon="mdi-magnify"
                          label="Search Customers"
                          single-line
                          hide-details
                          clearable
                          outlined
                          :loading="objTraveler.searchTravelers.loading"
                          @keyup="filterTravelers($event, ind, trvInd, 'Guest')"
                          @focus="phoneFocusedForm(ind, trvInd)"
                          :rules="[v => !!v || 'existing field is required']"
                        >
                        </v-text-field>

                        <v-data-table
                          :headers="objTraveler.searchTravelers.headers"
                          :items="objTraveler.searchTravelers.travellers"
                          :items-per-page="5"
                          v-if="
                            objTraveler.searchTravelers.travellers.length > 0
                          "
                          class="tablerows"
                          style="margin-top: 20px;"
                        >
                          <template v-slot:item="row">
                            <tr>
                              <td>
                                {{ row.item.srIndex }}
                              </td>
                              <td>
                                {{ row.item.vcFName }}
                              </td>
                              <td>
                                {{ row.item.vcLName }}
                              </td>
                              <td>
                                {{ row.item.vcHPhone }}
                              </td>
                              <td>
                                {{ row.item.vcEmail }}
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
                                  class="white--text"
                                >
                                  SELECT
                                </v-btn>
                              </td>
                              <v-expansion-panels>
                                <td>
                                  <v-expansion-panel>
                                    <v-expansion-panel-header
                                      class="hidandshow-flight-btn"
                                      @click="expand(row.item.srIndex)"
                                    >
                                    </v-expansion-panel-header>
                                  </v-expansion-panel>
                                </td>
                              </v-expansion-panels>
                            </tr>
                            <tr v-if="expanded && checkId == row.item.srIndex">
                              <td colspan="12">
                                <template>
                                  <v-card tile>
                                    <div>
                                      <v-list-item dense>
                                        <v-list-item-content>
                                          <v-list-item-title>
                                            <ul
                                              class="list-group-flush p-3 my-3"
                                            >
                                              <li class="list-group-item">
                                                User ID:
                                                <span>{{
                                                  row.item.iUserID
                                                }}</span>
                                              </li>
                                              <li class="list-group-item">
                                                Agent Pin:
                                                <span>{{
                                                  row.item.vcAgentPIN
                                                }}</span>
                                              </li>
                                              <li class="list-group-item">
                                                Pin:
                                                <span>{{
                                                  row.item.vcPIN
                                                }}</span>
                                              </li>
                                              <li class="list-group-item">
                                                User Type:
                                                <span>{{
                                                  row.item.userType
                                                }}</span>
                                              </li>
                                              <li class="list-group-item">
                                                Salutation:
                                                <span>{{
                                                  row.item.vcSalutation
                                                }}</span>
                                              </li>
                                              <li class="list-group-item">
                                                First Name:
                                                <span>{{
                                                  row.item.vcFName
                                                }}</span>
                                              </li>
                                              <li class="list-group-item">
                                                Last Name:
                                                <span>{{
                                                  row.item.vcLName
                                                }}</span>
                                              </li>
                                              <li class="list-group-item">
                                                Gender:
                                                <span>{{
                                                  row.item.gender
                                                }}</span>
                                              </li>

                                              <li class="list-group-item">
                                                Phone:
                                                <span>{{
                                                  row.item.vcHPhone
                                                }}</span>
                                              </li>
                                              <li class="list-group-item">
                                                Email:
                                                <span>{{
                                                  row.item.vcEmail
                                                }}</span>
                                              </li>
                                              <li class="list-group-item">
                                                Address:
                                                <span>{{
                                                  row.item.vcAddress
                                                }}</span>
                                              </li>
                                              <li class="list-group-item">
                                                City:
                                                <span>{{
                                                  row.item.vcCity
                                                }}</span>
                                              </li>
                                              <li class="list-group-item">
                                                State:
                                                <span>{{
                                                  row.item.vcState
                                                }}</span>
                                              </li>
                                              <li class="list-group-item">
                                                Country:
                                                <span>{{
                                                  row.item.vcCountry
                                                }}</span>
                                              </li>
                                              <li class="list-group-item">
                                                Zip:
                                                <span>{{
                                                  row.item.vcZip
                                                }}</span>
                                              </li>
                                            </ul>
                                          </v-list-item-title>
                                        </v-list-item-content>
                                      </v-list-item>
                                    </div>
                                  </v-card>
                                </template>
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
                          v-for="(traveler, KtrvInd) in tripTravellers"
                          @click="
                            populateTravelerFormByTraveler(
                              traveler.traveller,
                              ind,
                              trvInd
                            )
                          "
                          :key="'hotel' + trvInd"
                        >
                          {{
                            traveler.traveller.firstName +
                              ' ' +
                              traveler.traveller.lastName
                          }}
                        </a>
                      </div>

                      <div class="col-md-12 pt-3" v-if="objTraveler.searchTravelers.error">
                      
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
                        objTraveler.showFormForcely == true
                    "
                  >
                    <label class="aligment">Salutation</label>

                    <v-radio-group
                      row
                      class="ml-8 gender"
                      v-model="objTraveler.saluation"
                      :rules="[
                        v => v.length > 0 || 'Salutation field is required.',
                        v => v != '' || 'Salutation field is required.'
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
                  class="col-md-12 col-sm-12 p-0"
                  v-if="
                    objTraveler.pTravelersVal == 1 ||
                      objTraveler.showFormForcely == true
                  "
                >
                  <div class="row ml-0 mr-o align-center">
                    <div class="col-md-4 col-sm-4">
                      <div class="add-travel-input">
                        <v-text-field
                          label="First Name"
                          placeholder="Enter Your First Name"
                          v-model="objTraveler.firstName"
                          :rules="[
                            v => !!v || 'First name field is required.',
                            v => (v && v.length >= 3) ||
                              'First name field must have atleast 3 characters'
                          ]"
                        ></v-text-field>
                      </div>
                    </div>

                    <div class="col-md-4 col-sm-4">
                      <div class="add-travel-input">
                        <v-text-field
                          label="Middle Name"
                          placeholder="Enter Your Middle Name"
                          v-model="objTraveler.middleName"
                        ></v-text-field>
                      </div>
                    </div>

                    <div class="col-md-4 col-sm-4">
                      <div class="add-travel-input">
                        <v-text-field
                          label="Last Name"
                          placeholder="Enter Your Last Name"
                          v-model="objTraveler.lastName"
                          :rules="[
                            v => !!v || 'Last name field is required.',
                            v => (v && v.length >= 3) ||
                              'Last name field must have atleast 3 characters'
                          ]"
                        ></v-text-field>
                      </div>
                    </div>
                    <div v-if="objTraveler.isActive" class="col-md-6 col-sm-6">
                      <div class="add-travel-input">
                        <v-text-field
                          label="Email"
                          placeholder="Enter Your Email"
                          v-model="objTraveler.regemail"
                          :rules="[v => CheckvalidEmail(v)]"
                        ></v-text-field>
                      </div>
                    </div>

                    <div
                      class="col-md-6 col-sm-6"
                      v-if="objTraveler.customerType != 'child'"
                    ></div>

                    <!--<div class="col-md-6 col-sm-6">
                                                    <div class="add-travel-input">
                                                        <v-select
                                                            :items="genderItems"
                                                            item-text="title"
                                                            item-value="value"
                                                            label="Select Gender"
                                                            :rules="[v => !!v || 'Gender field is required']" 
                                                            v-model="objTraveler.gender">
                                                        </v-select>
                                                    </div>
                                                </div>-->

                    <div
                      v-if="objTraveler.isActive"
                      class="col-md-6 col-sm-6"
                      style=""
                    >
                      <label
                        class="input-label"
                        style="color: rgba(0, 0, 0, 0.6) !important;"
                      >
                        Mobile Phone Number
                      </label>
                      <div class="add-travel-input  mobile-feild-styling">
                        <vue-tel-input-vuetify
                          v-bind="$attrs"
                          v-model="objTraveler.regmobile"
                          background-color="white"
                          v-on:country-changed="countryChanged"
                          :rules="[
                            v => !!v || 'Cell Phone is required',
                            checkValidNumber
                          ]"
                          :value="objTraveler.premobileval"
                          :preferredCountries="preferredCountries"
                          :defaultCountry="objTraveler.defaultCountry"
                          :disabledFetchingCountry="true"
                          :onlyCountries="whiteList"
                          @input="onUpdatePhone"
                          @focus="phoneFocusedForm(ind, trvInd)"
                          name="traveller[][phone]"
                        />

                        <!--
                                                <phone-num-select
                                                    v-model="
                                                        objTraveler.regmobile
                                                    "
                                                    name="traveller[][phone]"
                                                    :value="
                                                        objTraveler.premobileval
                                                    "
                                                    :phoneDetails="false"
                                                    :formMatrix="true"
                                                    :parentFormIndex="ind"
                                                    :subFormIndex="trvInd"
                                                />
                                                -->
                      </div>
                    </div>

                    <!--
                                        <div class="col-md-6 col-sm-6">
                                            <label class="input-label"
                                                >Birth Date</label
                                            >
                                            <dobFlight
                                                class="mt-2"
                                                v-model="objTraveler.date1"
                                                @fgchange="dobFlightUpdate"
                                                :index="ind"
                                                :travelIndex="trvInd"
                                                :fgbod="objTraveler.date1"
                                                :fgDepartDate="car.item.pdate.split('T')"
                                                :role="objTraveler.customerType"
                                                :rules="birthDateRules"
                                            />
                                        </div>
                                        -->

                    <div
                      v-if="
                        (checkedDob(objTraveler.date1) > 12 &&
                          objTraveler.customerType == 'child') ||
                          (checkedDob(objTraveler.date1) > 12 &&
                            objTraveler.customerType == 'infant')
                      "
                      class="col-md-6 col-sm-6"
                    >
                      <div class="add-travel-input">
                        <country-select v-model="objTraveler.country" />
                      </div>
                    </div>
                    <div
                      v-if="
                        objTraveler.customerType == 'senior' ||
                          objTraveler.customerType == 'adult'
                      "
                      class="col-md-6 col-sm-6"
                    >
                      <div class="add-travel-input">
                        <country-select v-model="objTraveler.country" />
                      </div>
                    </div>

                    <div
                      v-if="
                        (checkedDob(objTraveler.date1) > 12 &&
                          objTraveler.customerType == 'child') ||
                          (checkedDob(objTraveler.date1) > 12 &&
                            objTraveler.customerType == 'infant')
                      "
                      class="col-md-6 col-sm-6"
                    >
                      <div class="add-travel-input" style="margin-top: 50px;">
                        <v-text-field
                          label="Street Address"
                          placeholder="Enter Your Street Address"
                          v-model="objTraveler.address"
                          :rules="addressRules"
                        ></v-text-field>
                      </div>
                    </div>

                    <div
                      v-if="
                        objTraveler.customerType == 'senior' ||
                          objTraveler.customerType == 'adult'
                      "
                      class="col-md-6 col-sm-6"
                    >
                      <div class="add-travel-input" style="margin-top: 30px;">
                        <v-text-field
                          label="Street Address"
                          placeholder="Enter Your Street Address"
                          v-model="objTraveler.address"
                          :rules="addressRules"
                        ></v-text-field>
                      </div>
                    </div>

                    <div
                      v-if="
                        (checkedDob(objTraveler.date1) > 12 &&
                          objTraveler.customerType == 'child') ||
                          (checkedDob(objTraveler.date1) > 12 &&
                            objTraveler.customerType == 'infant')
                      "
                      class="col-md-6 col-sm-6"
                    >
                      <div class="add-travel-input" style="top: 7px;">
                        <region-select
                          v-model="objTraveler.state"
                          :country="objTraveler.country"
                          :updateValue="objTraveler.state"
                          :rules="[v => !!v || 'State field is required.']"
                        />
                      </div>
                    </div>
                    <div
                      v-if="
                        objTraveler.customerType == 'senior' ||
                          objTraveler.customerType == 'adult'
                      "
                      class="col-md-6 col-sm-6"
                    >
                      <div class="add-travel-input" style="top: 7px;">
                        <region-select
                          v-model="objTraveler.state"
                          :country="objTraveler.country"
                          :updateValue="objTraveler.state"
                          :rules="[v => !!v || 'State field is required.']"
                        />
                      </div>
                    </div>

                    <div
                      v-if="
                        (checkedDob(objTraveler.date1) > 12 &&
                          objTraveler.customerType == 'child') ||
                          (checkedDob(objTraveler.date1) > 12 &&
                            objTraveler.customerType == 'infant')
                      "
                      class="col-md-6 col-sm-6"
                    >
                      <div class="add-travel-input" style="margin-top: 20px;">
                        <v-text-field
                          :hide-details="false"
                          label="City"
                          placeholder="Enter City"
                          v-model="objTraveler.city"
                          :rules="[v => !!v || 'City field is required.']"
                        ></v-text-field>
                      </div>
                    </div>
                    <div
                      v-if="
                        objTraveler.customerType == 'senior' ||
                          objTraveler.customerType == 'adult'
                      "
                      class="col-md-6 col-sm-6"
                    >
                      <div class="add-travel-input" style="margin-top: 20px;">
                        <v-text-field
                          :hide-details="false"
                          label="City"
                          placeholder="Enter City"
                          v-model="objTraveler.city"
                          :rules="[v => !!v || 'City field is required.']"
                        ></v-text-field>
                      </div>
                    </div>

                    <div
                      v-if="
                        (checkedDob(objTraveler.date1) > 12 &&
                          objTraveler.customerType == 'child') ||
                          (checkedDob(objTraveler.date1) > 12 &&
                            objTraveler.customerType == 'infant')
                      "
                      class="col-md-6 col-sm-6"
                    >
                      <div class="add-travel-input" style="margin-top:9px;">
                        <v-text-field
                         
                          :hide-details="false"
                          label="Zip Code"
                          placeholder="Enter Zip Code"
                          v-model="objTraveler.zip"
                          :rules="[v => !!v || 'Zip Code is required.']"
                        ></v-text-field>
                      </div>
                    </div>
                    <div
                      v-if="
                        objTraveler.customerType == 'senior' ||
                          objTraveler.customerType == 'adult'
                      "
                      class="col-md-6 col-sm-6"
                    >
                      <div class="add-travel-input" style="margin-top: 20px;">
                        <v-text-field
                          
                          :hide-details="false"
                          label="Zip Code"
                          placeholder="Enter Zip Code"
                          v-model="objTraveler.zip"
                          :rules="[v => !!v || 'Zip Code is required.']"
                        ></v-text-field>
                      </div>
                    </div>

                    <!--
                    <div
                      class="travel-box-button"
                      v-if="checkOutType == 'trip'"
                    >
                      <div class="setmargin">
                        <v-checkbox
                          label="Save Traveler? Selecting this will save this user"
                          v-model="objTraveler.ckBoxSaveTraveler"
                          v-on:change="
                            saveTravelerByCk(
                              $event,
                              'hotel',
                              car,
                              ind,
                              trvInd,
                              objTraveler,
                              objTraveler.ckBoxSaveTraveler
                            )
                          "
                          input-value="true"
                          :readonly="objTraveler.ckBoxSaveTravelerReadOnly"
                          :error-messages="objTraveler.ckBoxSaveTravelerError"
                          :class="'form99ck' + ind"
                          :rules="[
                            v => !!v || 'Please complete the required fields.'
                          ]"
                        ></v-checkbox>
                      </div>
                    </div>
                    -->

                    <div
                      class="travel-box-button"
                      v-if="
                        objTraveler.customerType == 'senior' ||
                          objTraveler.customerType == 'adult'
                      "
                    >
                      <div class="setmargin mb-5 hmr">
                        <v-checkbox
                          label="Use this traveler's information as the Credit Card payment information. You can only select one traveler's information."
                          v-model="objTraveler.ckBoxCardInfo"
                          v-on:change="
                            makeCardInfo(
                              'flight',
                              car.item.Id,
                              trvInd,
                              objTraveler.ckBoxCardInfo
                            )
                          "
                          input-value="true"
                          :checked="
                            doCheckByDefault(ind, objTraveler.ckBoxCardInfo)
                          "
                        ></v-checkbox>
                      </div>
                    </div>

                    <!-- This is invalid so making it commented

                    <div
                      class="travel-box-button"
                      v-if="
                        objTraveler.customerType == 'senior' ||
                          objTraveler.customerType == 'adult'
                      "
                    >
                      <div class="setmargin mb-5 hmr">
                        <v-checkbox
                          label="Please check this box to agree..!"
                          v-model="objTraveler.ckBoxCardInfo"
                          v-on:change="
                            makeCardInfo(
                              'flight',
                              car.item.Id,
                              trvInd,
                              objTraveler.ckBoxCardInfo
                            )
                          "
                          input-value="true"
                          :checked="
                            doCheckByDefault(ind, objTraveler.ckBoxCardInfo)
                          "
                        >
                        </v-checkbox>
                        <div class="termscondition">
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
                              doCancelPolicyPopUp(car.item.room, 'hotel');
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
                              doCancelPolicyPopUp(car.item.room, 'hotel');
                              // eslint-disable-next-line vue/no-mutating-props
                              car.agreeTerms = true;
                            "
                          >
                            Taxes and Fees
                          </a>
                        </div>
                      </div>
                    </div>
                    -->

                  </div>
                </div>
                <!--end id pTravelers=1-->
              </v-row>
            </v-form>
          </div>
          <!--form ends-->

          <!--checkbox for car details-->
          <v-row class="">
            <div class="col-md-12 col-sm-12">
              <div class="form-checkBox">
                  <div class="setmargin pl-2" style="margin-top: 20px;" v-if="checkOutType == 'trip'">
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
                              v-on:change="saveTravelerByCkInGroup($event, 'hotel', car, ind, car.agreeTerms)"
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
                                              car.item.room,
                                              'hotel'
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
                                              car.item.room,
                                              'hotel'
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
                  
                  <div class="setmargin pl-2" style="margin-top: 20px;" v-if="checkOutType != 'trip'">
                      <v-form :ref="'refAgreeTerms' + ind">
                          <v-checkbox
                              :value="car.agreeTerms"
                              :rules="[
                                  v =>
                                      !!v ||
                                      'Please check this box to agree..!'
                              ]"
                              label=""
                              ref="refAgreeTerms"
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
                                              car.item.room,
                                              'hotel'
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
                                              car.item.room,
                                              'hotel'
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
        </div> <!--Main Inner Div 2 Ends-->

      </div> <!--Main Outer Div Ends-->
    
    </v-expansion-panel-content>
  <invitation-pop-form 
      :DisplayPopUp="openDetailPopUp" 
      @hideDetailsBox="openDetailPopUp = false">
    </invitation-pop-form> 
    <!---->
  </span>
</template>
<script>
import CountrySelect from '@/components/common/widgets/CountrySelect.vue';
import moment from 'moment';
import RegionSelect from '@/components/common/widgets/RegionSelect.vue';
import { evBus } from "@/services/bus.js";
import { mapState } from 'vuex';
import InvitationPopForm from '../InvitationPopForm.vue';
export default {
  name: 'carTraveller',
  components: {
    CountrySelect,
    RegionSelect,
    InvitationPopForm
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
    'dobFlightUpdate',
    'checkOutType',
    'expiryDateRules',
    'expiryUpdate',
    'tripTravellers',
    'populateTravelerFormByTraveler',
    'filterByUserType',
    'saveTravelerByCkInGroup',
  ],
  created: function() {

    evBus.$on('uncheckBoxOfAgree', (data) => {

      this.car.agreeTerms = false;
    });
  
  },
  methods: {
    showInvitation(val){
      
        if(val==3){
          this.openDetailPopUp = true;
        }
    },
    phoneFocusedForm(mainFormIndex, subFormIndex) {
      this.mainFormIndex = mainFormIndex;
      this.subFormIndex = subFormIndex;
    },
    checkedDob(date) {
      return Number(moment().diff(moment(date), 'years', false));
    },
    expand(num) {
      this.checkId = num;
      if (num != this.prevCheckId) {
        this.prevCheckId = num;
        this.expanded = true;
      } else {
        this.expanded = !this.expanded;
      }
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
    }
  },
  data() {
    return {
      genderItems: [
        { title: 'Male', value: 'M' },
        { title: 'Female', value: 'F' }
      ],
      birthDateRules: [
        v => !!v || 'Birth date is required',
        v => v || (v && v.length >= 10) || 'yes'
      ],
      addressRules: [
        v => !!v || 'Address is required',
        v => (v && v.length >= 10) || 'Address must have atleast 10 characters',
        v => !/[^a-zA-Z0-9 ]/.test(v) || 'Address must contain only alphabets, numbers and space.',
        v => (v && v.length <= 30) || 'Address maximum 30 characters allowed'
      ],
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
      expanded: false,
      singleExpand: false,
      checkId: '',
      prevCheckId: 0,
      panel: [0, 1],
      readonly: false,
      mainFormIndex: '',
      subFormIndex: '',
      openDetailPopUp: false,
    };
  },
  mounted() {
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
  computed: {
    ...mapState({
      domain: state => state.envStore.domain
    }),
    // eslint-disable-next-line vue/return-in-computed-property
    whiteList() {
      
      return [];

      /*
       white list feature has disabled as per instructions from lead, please don`t enable this whitelist coz we need all countries. The code is still there and not removed thinking if we ever need whitelist we can reuse it.
      */

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
    }
  }
};
</script>
