import Vue from 'vue';
import { evBus } from '@/services/bus.js';
import tripServices from '@/services/api/Trips';
import carServices from '@/services/api/Cars';
import flightServices from '@/services/api/Flights';
import hotelServices from '@/services/api/Hotel';
import villaServices from '@/services/api/Villa';
import apiClient from '@/services/api/Auth';
import qs from 'qs';
import { mapState } from 'vuex';
var moment = require('moment');
import axios from 'axios';
import LocalStorageService from './config/LocalStorageService';

import currencyData from '@/services/data/currency';
let Helpers = {
  data() {
    return {
      log: console.log.bind(document),
      min_search_autocomplete_length: 3, // autocomplete start search on min characters of length
      list: [], // pagination
      currentPage: 1, // pagination
      totalPages: 1, // pagination
      pageSize: 10, // pagination
      totalVisibleIndexes: 10, // pagination
      focusedEngine: 'car',
      engineItemId: '',
      engineItem: '',
      TimeTrackerMaxTime: [39, 59], // it would be N+1 mins, if 39 meant 40: default 40 mins. type array [mins, seconds]
      TimeTrackerWarnTime: 5, // it would be exact number of mins needed to start warning: default 5 mins
      moveToCheckout: false,
      cartTripHeaders: false,
      selectedBookingID: 0,
      activeTripLink: true, // this.$store.state.envStore.activeTripLink
      carSearchedDetails: false,
      flightSearchedDetails: false,
      hotelSearchedDetails: false,
      villaSearchedDetails: false,
      fetchingCarReqInProgress: false,
      sessionId: '',
      refreshTripWhenItemRemoved: false,
      makeHistoryOfMyTrips: false,
      lodloading: false,
      inSignOutMode: false,
      inCheckLiveSession: false,
      tripName: null,
      trvName: null,
      trvLastName: null,
    };
  },
  methods: {
    getProductPriceCalendar(id){
      let url='https://www.viator.com/orion/ajax/react/product-price-calendar/'+id;
       return axios.get(url,{
        headers: { 'Content-Type': 'application/json',"Access-Control-Allow-Origin":"*"}});
    },
    callVillasBySession(ms = 2000) {
      let that = this;
      let reqPayload = this.doCleanArray(
        this.$store.state.villaStore.searchData
      );
      reqPayload.sessionId = this.$store.state.villaStore.sessionId;
      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      return new Promise((resolve, reject) => {
        villaServices
          .searchVillas(reqPayload, reqHeaders)
          .then((rsp) => {
            if (rsp.data.success == false) that.$awn.alert(rsp.data.errors);

            if (
              rsp.data.success == false &&
              rsp.data.message == 'Token has expired'
            ) {
              that.doPopLogout();
              return true;
            }

            resolve(rsp.data.data.villas);
          })
          .catch((err) => {
            let sessionId = that.$store.state.villaStore.sessionId;
            that.$sentry.withScope(function (scope) {
              scope.setExtra('sessionId', sessionId);
              that.$sentry.captureException(new Error(err));
            });
          });
      }); // Ends promise
    },
    //Create new Trip Function to facilitate 24 hours past flights containing trips
    createNewTrip_ATOL() {
      this.tripName = 'Trip ' + this.getRandStrs(6);

      let storePayload = {
        tripName: this.tripName,
        pTraveler: this.trvName + ' ' + this.trvLastName,
      };

      let reqHeaders = {
        headers: { 'Content-Type': 'application/json' },
      };

      tripServices
        .createTrip({}, reqHeaders)
        .then((rsp) => {
          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            this.doPopLogout();
            return true;
          } else {
            // this.$refs.form.reset();

            let _myNewTripId = rsp.data.data.tripId;
            storePayload.id = rsp.data.data.id;
            storePayload.tripId = _myNewTripId;
            storePayload.tripName = rsp.data.data.tripName;
            storePayload.tripStartDate = this.getDateInFormat(
              rsp.data.data.created_at.substr(0, 10),
              'YYYY/MM/DD'
            ); // saveTripPayLoad.tripStartDate;
            storePayload.primaryTravellerId =
              typeof rsp.data.data.primaryTravellerId !== 'undefined'
                ? rsp.data.data.primaryTravellerId
                : 0;

            storePayload.sessionID = this.getEngineSessionID();
            storePayload.engine = this.focusedEngine;
            storePayload.engineID = this.engineItemId;

            this.saveTripBasicInfo_ATOL(storePayload);
            this.doClosePop();
            this.$awn.success('Trip has created successfully..!', {
              labels: { success: 'Trip Added' },
            });

            if (this.focusedEngine == 'hotel') {
              let infos = {
                hotelId: this.$route.params.id,
                room: this.engineItem,
              };
              let _allHotels = this.doCleanArray(
                  this.$store.state.hotelStore.hotels
                ),
                _filterHotel = this.doCleanArray(
                  this.$store.state.hotelStore.searchData
                ),
                _checkedHotel = _allHotels.find((o) => {
                  if (o.hotelId == infos.hotelId) return true;
                });

              infos.hotel = _checkedHotel;
              infos.roomDetails = _filterHotel.rooms;
              infos.pdate = _filterHotel.checkinDate;
              infos.plocationName = _filterHotel.destination;
              infos.ptime = moment(_filterHotel.checkinDate, 'X').format(
                'HH:mm:ss'
              );
              infos.ddate = _filterHotel.checkoutDate;
              infos.dlocationName = _filterHotel.destination;
              infos.dtime = moment(_filterHotel.checkoutDate, 'X').format(
                'HH:mm:ss'
              );
              infos.engineId = infos.hotelId;
              infos.Id = infos.room.packageId;
              infos.roomId = infos.room.roomId;
              infos.remaining = [39, 59];
              infos.expire = false;
              infos.showTimes = true;

              let cader = {
                engine: this.focusedEngine,
                item: infos,
              };

              this.$store.dispatch('setCartUpComings', {
                UPCOMINGS: cader,
              });

              this.fetchHotelDetails(cader.item.hotelId).then((resp) => {
                if (resp == 'success') {
                  this.addTripData(_myNewTripId, {});
                  // opens new pop-up "what to do next ?"
                  setTimeout(() => {
                    this.newTripCreated = true;
                    evBus.$emit('displayTripSummary');
                  }, 2500);
                } else {
                  this.$awn.alert(
                    'We have not received the details needed from our supplier to view this hotel . Please select another hotel.'
                  );
                } // Ends IF ELSE
              });
            } // Ends If focused engine is hotel
          } // ENDS IF ELSE
        })
        .catch((error) => {
          this.$awn.alert('Please try later, trip cannot be created..!');
          this.doClosePop();
        })
        .finally(() => {
          // do some thing here
        });
    },

    saveTripBasicInfo_ATOL(tripNavInfo) {
      let storePayload = {
        name: tripNavInfo.tripName,
        trv_name: tripNavInfo.pTraveler,
        trip_id: tripNavInfo.tripId,
        primaryTravellerId: tripNavInfo.primaryTravellerId,
        tripStartDate:
          tripNavInfo.tripStartDate != null
            ? tripNavInfo.tripStartDate.substr(0, 10)
            : new Date().toISOString().substr(0, 10),
      };

      this.$store.dispatch('setTripDetail', { TRIP: storePayload });

      return true;
    },

    callHotelsBySession(ms = 1000) {
      let that = this;
      let reqPayload = this.doCleanArray(
        this.$store.state.hotelStore.searchData
      );
      reqPayload.sessionId = this.$store.state.hotelStore.sessionId;
      let reqHeaders = {
        headers: { 'Content-Type': 'application/json' },
      };

      return new Promise((resolve, reject) => {
        hotelServices
          .searchHotels(reqPayload, reqHeaders)
          .then((rsp) => {
            if (rsp.data.success == false) that.$awn.alert(rsp.data.errors);

            if (
              rsp.data.success == false &&
              rsp.data.message == 'Token has expired'
            ) {
              that.doPopLogout();
              return true;
            }

            resolve(rsp.data.data.hotels);
          })
          .catch((err) => {
            let sessionId = that.$store.state.hotelStore.sessionId;
            that.$sentry.withScope(function (scope) {
              scope.setExtra('sessionId', sessionId);
              that.$sentry.captureException(new Error(err));
            });
          });
      }); // Ends promise
    },
    verifyTripByUser() {
      let _currTrip = this.doCleanArray(this.$store.getters.tripSummary);
      let _currTripId = _currTrip.trip_id;

      let reqHeaders = {
        headers: {
          Authorization: 'Bearer ' + this.$store.state.authStore.token,
        },
      };

      tripServices.getUserTrip(reqHeaders).then((rsp) => {
        let _tripOfUsers = rsp.data.data;

        if (_tripOfUsers.length == 0) this.clearTripStores();

        if (_tripOfUsers.length > 0) {
          var collectiveTripIds = _tripOfUsers.map(function (obj) {
            return obj.tripId;
          });

          if (!collectiveTripIds.includes(_currTripId)) this.clearTripStores();
        } // Ends if had array
      });
    },
    clearTripStores() {
      this.$store.dispatch('resetCustomerDetails');
      this.$store.dispatch('reSetTrip');
      this.$store.dispatch('resetCart');
      this.$store.dispatch('resetExpireItemSearchedDetails');
      this.$store.dispatch('resetBookingBulks', {});
    },
    dynamicCurrencySymbol(currency) {
      return currencyData[currency]['symbol'];
    },
    modifyDateByDomain(_myDate) {
      if (this.domain == 'uk' || this.domain == 'mx' || this.domain == 'ie') {
        _myDate = _myDate.split('/');
        _myDate = _myDate[1] + '/' + _myDate[0] + '/' + _myDate[2];
      }

      return _myDate;
    },
    modifyDateByDomainByDash(_myDate) {
      if (this.domain == 'uk' || this.domain == 'mx' || this.domain == 'ie') {
        _myDate = _myDate.split('-');
        _myDate = _myDate[0] + '-' + _myDate[2] + '-' + _myDate[1];
      }

      return _myDate;
    },
    fullDateFormat() {
      if (this.$store.state.envStore.domain == 'us' || this.$store.state.envStore.domain == 'com') {
        return 'ddd, MMM Do, YYYY';
      } else {
        return 'ddd,  Do MMM, YYYY';
      }
    },
    tripTotalAmount(_myBookings) {

      console.log('tripTotalAmount', _myBookings);

      let amount = 0;

      _myBookings.forEach((bookItem) => {

        if (bookItem.engine == 'car') {
          amount += parseFloat(bookItem.details.engineDetails.FinalPrice);
        }
        if (bookItem.engine == 'flight') {
          amount += parseFloat(bookItem.details.engineDetails.totalPrice);
        }

        if (bookItem.engine == 'hotel') {
          amount += parseFloat(bookItem.packagePrice);
        }

        if (bookItem.engine == 'villa') {
          if (this.$store.getters.cartType == 'trip')
            amount += parseFloat(
              this.calculateRoomsPricesInVillaForTripMode(
                this.doCleanArray(bookItem.details.villaDetails)
              )
            );

          if (this.$store.getters.cartType == 'direct')
            amount += parseFloat(
              this.getPriceOfVillaRooms(bookItem.item.rooms)
            );
        }

        if (bookItem.engine == 'activity') {

          console.log('bookItem', bookItem);

          amount += parseFloat(bookItem.packagePrice);
        }

      });

      return amount.toFixed(2);
    },
    searchExpireItem(reqItem, reqEngine, reqMode) {
      this.$store.dispatch('saveExpireItemSearchedDetails', {
        item: reqItem,
        engine: reqEngine,
        mode: reqMode,
      });

      if (reqMode == 'direct') {
        if (reqEngine == 'car') this.$router.push('/cars').catch(() => {});

        if (reqEngine == 'flight') this.$router.push('/flights').catch(() => {});

        if (reqEngine == 'hotel') {
          this.$store
            .dispatch('setHotelAutoSearchAgain', { STATUS: true })
            .then(() => {
              setTimeout(
                function () {
                  this.$router.push('/hotels').catch(() => {});
                }.bind(this),
                500
              );
            });
        }

        if (reqEngine == 'villa') {
          this.$store
            .dispatch('setVillaAutoSearchAgain', { STATUS: true })
            .then(() => {
              setTimeout(
                function () {
                  this.$router.push('/villas').catch(() => {});
                }.bind(this),
                500
              );
            });
        }

        if (reqEngine == 'activity') {
          this.$store
            .dispatch('setActivityAutoSearchAgain', { STATUS: true })
            .then(() => {
              setTimeout(
                function () {
                  this.$router.push('/activities').catch(() => {});
                }.bind(this),
                500
              );
            });
        }
      } // Ends IF Direct-Mode

      if (reqMode == 'trip') {
        if (reqEngine == 'car') {
          if (this.currentRouteName == 'My CARS')
            evBus.$emit('carResearchExpireItemOfTrip');
          else this.$router.push('/cars').catch(() => {});
        }

        if (reqEngine == 'flight') {
          if (this.currentRouteName == 'My FLIGHTS')
            evBus.$emit('flightResearchExpireItemOfTrip');
          else this.$router.push('/flights').catch(() => {});
        }

        if (reqEngine == 'hotel') {
          if (this.currentRouteName == 'My HOTELS')
            evBus.$emit('hotelResearchExpireItemOfTrip');
          else this.$router.push('/hotels').catch(() => {});
        }

        if (reqEngine == 'villa') {
          if (this.currentRouteName == 'My Villas')
            evBus.$emit('villaResearchExpireItemOfTrip');
          else this.$router.push('/villas').catch(() => {});
        }

        if (reqEngine == 'activity') {
          if (this.$route.path !== '/activities'){
            this.$router.push('/activities').catch(() => {});
          }
          else{
            evBus.$emit('activityResearchExpireItemOfTrip');
     
          }
        }
      } // Ends IF Direct-Mode
    },
    getEngineId() {
      if (this.focusedEngine == 'car') return 1;

      if (this.focusedEngine == 'flight') return 2;

      if (this.focusedEngine == 'hotel') return 3;
    },
    getTravellerType() {
      if (this.focusedEngine == 'car') return 1;

      if (this.focusedEngine == 'flight') return 2;

      if (this.focusedEngine == 'hotel') return 3;
    },
    doCleanArray(query) {
      if (query !== undefined) {
        return JSON.parse(JSON.stringify(query));
      }
    },
    getQuestionAnswer(question){
      if(question.id == 'FULL_NAMES_FIRST' && this.objTraveler.hasOwnProperty('firstName') && question.group == 'PER_TRAVELER'){
          question.answer=this.objTraveler.firstName;
          this.$emit('answered', question);
          question.visibility=false;
      }
      else if(question.id == 'FULL_NAMES_LAST' && this.objTraveler.hasOwnProperty('lastName') && question.group == 'PER_TRAVELER'){
          question.answer=this.objTraveler.lastName;
          this.$emit('answered', question);
          question.visibility=false;
      }
      else if(this.objTraveler.customerType && (question.id == 'AGEBAND')){
        question.answer=this.objTraveler.customerType.toUpperCase();
        this.$emit('answered', question);
        question.visibility=false;
      }
      else if(question.id == 'DATE_OF_BIRTH' && this.objTraveler.hasOwnProperty('date1')){
        question.answer=this.objTraveler.date1;
        this.$emit('answered', question);
        question.visibility=false;
      }
      else{
        question.visibility=true;
      }
      return question;
    },
    doStrings(query) {
      return JSON.stringify(query);
    },
    handlePageChange(value) {
      this.currentPage = value;
    },
    doMakePaginations: function (records) {
      this.list = this.doCleanArray(records);

      let totalRecords = this.list.length;
      this.currentPage = 1;
      this.totalPages = Math.ceil(totalRecords / this.pageSize);
    },
    getPageData() {
      let allItems = this.list;
      let startIndex = (this.currentPage - 1) * this.pageSize;
      let endIndex = this.currentPage * this.pageSize;
      return allItems.slice(startIndex, endIndex);
    },
    compareValues(key, order = 'asc') {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }

        const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === 'desc' ? comparison * -1 : comparison;
      };
    },
    containsKey(obj, key) {
      let rr = Object.keys(obj).includes(key);
    },
    doPopLogout() {
      let cader = {
        type: 'error',
        heading: 'User Session Expired',
        message: 'Please login again as your session has expired, Thanks.',
        actionable: false,
        relogin: true,
      };

      evBus.$emit('openInfoPopUp', cader);
    },
    doPopUp(popType, title, body) {
      let cader = {
        type: popType,
        heading: title,
        message: body,
        actionable: true,
        relogin: false,
      };

      evBus.$emit('openInfoPopUp', cader);
    },
    doCancelPolicyPopUp(content, engine) {
      // console.log('doCancelPolicyPopUp', engine, content);

      evBus.$emit('openCanecellationPolicyPopUp', {
        engine: engine,
        content: content,
      });
    },
    getObjectSize: function (obj) {
      var size = 0,
        key;

      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }

      return size;
    },
    getObjectValue: function (reqObj) {
      return Object.values(reqObj).join();
    },
    getAge: function (year, month, day) {
      let _calAge = '';

      var now = new Date();
      var born = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      var birthday = new Date(
        now.getFullYear(),
        born.getMonth(),
        born.getDate()
      );

      if (now >= birthday) _calAge = now.getFullYear() - born.getFullYear();
      else _calAge = now.getFullYear() - born.getFullYear() - 1;

      _calAge = _calAge == 0 ? 1 : _calAge;

      return Math.ceil(_calAge);
    },
    getAgeByDecimalInComp(d1, d2) {
      // return age in decimal, like 35.2

      d1 = d1.split('-');
      d2 = d2.split('-');

      var a = moment([d1[0], d1[1] - 1, d1[2]]).utc();
      var b = moment([d2[0], d2[1] - 1, d2[2]]).utc();

      var ageFraction = b.diff(a, 'years', true);

      return parseFloat(parseFloat(ageFraction).toFixed(3));
    },
    getAgeByDecimal(d1) {
      // return age in decimal, like 35.2

      // need to fix the age by deaprture date at ZERO

      var diffDays,
        oneDay,
        d2 = new Date();

      oneDay = 24 * 60 * 60 * 1000;

      diffDays = (d2 - Date.parse(d1)) / oneDay;

      diffDays = diffDays / 365;

      return parseFloat(parseFloat(diffDays).toFixed(3));
    },
    appendFormdata(FormData, data, name) {
      name = name || '';

      let that = this;

      if (typeof data === 'object') {
        $.each(data, function (index, value) {
          if (name == '') {
            that.appendFormdata(FormData, value, index);
          } else {
            that.appendFormdata(FormData, value, name + '[' + index + ']');
          } // Ends IF ELSE
        });
      } else {
        FormData.append(name, data);
      } // Ends IF ELSE
    },
    getEngineSessionID: function () {
      if (this.focusedEngine == 'car') {
        return this.$store.state.carStore.carSearchedId;
      }

      if (this.focusedEngine == 'flight') {
        return this.$store.state.flightStore.sessionId;
      }

      if (this.focusedEngine == 'hotel') {
        return this.$store.state.hotelStore.roomSessionId == ''
          ? this.$store.state.hotelStore.sessionId
          : this.$store.state.hotelStore.roomSessionId;
      }

      if (this.focusedEngine == 'villa') {
        return this.$store.state.villaStore.sessionId;
      }

      if (this.focusedEngine == 'activity') {
        return this.$store.state.ActivityStore.sessionId == ''
          ? this.$store.state.ActivityStore.searchedAvailabilityData.sessionId
          : this.$store.state.ActivityStore.sessionId;
      }

      return false;
    },
    doClosePop: function () {
      // close the trip search/create popups

      setTimeout(() => {
        this.dialog = false;
        this.saveCarTrip = false;
        this.creatNewTrip = false;
        this.existingTrip = false;
        this.newTripCreated = false;
        this.existingTripUpated = false;
        this.confirmCheckoutBox = false;
        this.openAddCartPopUp = false;
        this.openCancelPolicyPopUp = false;
        this.openCarTermPopUp = false;
      }, 800);
    },
    /*
      openCheckOutPopUp: function (engine, infos) {

        let cader = {
          'engine' : engine,
          'item' : infos
        };
        
        this.$store.dispatch('setCartUpComings', {UPCOMINGS: cader});
        
        this.doClosePop();

        evBus.$emit("openCheckOutPopUp", engine, infos);
      },
      */

    doCheckOut(reqCarId) {
      let that = this;

      let _wish = that.doCleanArray(that.$store.getters.wishLists);

      reqCarId = typeof reqCarId === 'undefined' ? _wish.item.Id : reqCarId;

      // If Item Is Directly Checkout Then Remove Trip
      that.$store.dispatch('reSetTrip');
      evBus.$emit('expireItem', false);

      if (that.focusedEngine == 'car') {
        that.carSearchedDetails = false;
        this.callStatus = false;
        that.fetchCarDetails(reqCarId).then((rsp) => {
          if (rsp == 'success') {
            let cader = {
              item: that.doCleanArray(_wish.item),
              engine: that.doCleanArray(_wish.engine),
            };

            cader.item.searchedDetail = that.doCleanArray(
              that.carSearchedDetails
            );
            that.cartTripHeaders = false;
            that.$store.dispatch('resetCheckoutOnePayload');
            that.$store.dispatch('resetCheckoutTempData');
            that.makeHistory('/cars');
            that.$store.dispatch('addToCart', { payload: cader });
          } else if (rsp == 'error_session_expires') {
            evBus.$emit('searchCarAgain');
          } else if (rsp == 'Cancellation_policy_not_found') {
            that.$awn.alert(
              'We have not received the details needed from our supplier to book this vehicle . Please select another vehicle.'
            );
          } else {
            that.$awn.alert(
              'We have not received the details needed from our supplier to book this vehicle . Please select another vehicle.'
            );
          } // Ends IF ELSE

          that.doClosePop();
        });
      } // Ends If Checkout Car

      if (that.focusedEngine == 'flight') {
        that.flightSearchedDetails = false;

        that.lodloading = true;

        that.fetchFlightDetails(reqCarId).then((rsp) => {
          if (rsp == 'success') {
            let cader = {
              item: that.doCleanArray(_wish.item),
              engine: that.doCleanArray(_wish.engine),
            };

            cader.item.fareDetails = null;
            cader.item.ptime = '';
            cader.item.dtime = '';

            if (typeof that.flightSearchedDetails.fareDetails != 'undefined')
              cader.item.flightDetails = that.doCleanArray(
                that.flightSearchedDetails
              );

            that.cartTripHeaders = false;
            that.$store.dispatch('resetCheckoutOnePayload');
            that.$store.dispatch('resetCheckoutTempData');
            that.makeHistory('/flights');
            that.lodloading = false;
            that.$store.dispatch('addToCart', { payload: cader });
          } else if (rsp == 'error_session_expires') {
            // evBus.$emit('searchCarAgain');
            evBus.$emit('searchFlightAgain');
          } else if (rsp == 'Cancellation_policy_not_found') {
            that.lodloading = false;
            that.$awn.alert(
              'We have not received the details needed from our supplier to book this flight . Please select another flight.'
            );
          } else {
            that.lodloading = false;
            that.$awn.alert(
              'We have not received the details needed from our supplier to book this flight . Please select another flight.'
            );
          } // Ends IF ELSE

          that.doClosePop();
        });
      } // Ends If Checkout Flight

      if (that.focusedEngine == 'hotel') {
        that.hotelSearchedDetails = false;

        reqCarId = _wish.item.hotelId;

        let cader = {
          item: that.doCleanArray(_wish.item),
          engine: that.doCleanArray(_wish.engine),
        };

        let a = moment(cader.item.pdate, 'YYYY-MM-DD');
        let b = moment(cader.item.ddate, 'YYYY-MM-DD');
        let total = moment.duration(b.diff(a)).asDays();
        cader.item.totalNights = total;

        that.cartTripHeaders = false;
        that.$store.dispatch('resetCheckoutOnePayload');
        that.$store.dispatch('resetCheckoutTempData');
        // that.makeHistory('/choose-room/'+reqCarId);
        that.makeHistory('/hotels');

        that.$store.dispatch('addToCart', { payload: cader });

        that.doClosePop();
      } // Ends If Checkout Hotel

      if (that.focusedEngine == 'villa') {
        let cader = {
          item: that.doCleanArray(_wish.item),
          engine: that.doCleanArray(_wish.engine),
        };

        that.cartTripHeaders = false;
        that.$store.dispatch('resetCheckoutOnePayload');
        that.$store.dispatch('resetCheckoutTempData');

        that.makeHistory('/villas');

        that.$store.dispatch('addToCart', { payload: cader });

        that.doClosePop();
      } // Ends If Checkout Villa

      if (that.focusedEngine == 'activity') {
        let cader = {
          item: that.doCleanArray(_wish.item),
          engine: that.doCleanArray(_wish.engine),
        };

        that.cartTripHeaders = false;
        that.$store.dispatch('resetCheckoutOnePayload');
        that.$store.dispatch('resetCheckoutTempData');

        that.makeHistory('/activities');

        that.$store.dispatch('addToCart', { payload: cader });

        that.doClosePop();
      } // Ends If Checkout Villa
    },
    doCheckOutTripDetails: function () {
      let items = this.doCleanArray(
          this.$store.getters.tripSummary.trip_bookings
        ),
        ckItems = [];

      if (items.length) {
        items.forEach((itm, index) => {
          if ('status' in itm) if (itm.status == 'booked') return;

          if (itm.engine == 'car') {
            itm.details.engineDetails.pdate =
              itm.details.searchData.pickUp.date;
            itm.details.engineDetails.ptime =
              itm.details.searchData.pickUp.time;

            itm.details.engineDetails.ddate =
              itm.details.searchData.dropOff.date;
            itm.details.engineDetails.dtime =
              itm.details.searchData.dropOff.time;

            // pick locations
            itm.details.engineDetails.plocationName =
              itm.details.searchData.pickUp.locationName;

            // drop locations
            itm.details.engineDetails.dlocationName =
              itm.details.searchData.dropOff.locationName;

            itm.details.engineDetails.CarHireCompany = itm.supplier;
            itm.details.engineDetails.engineId = itm.engineId;
            itm.details.engineDetails.bookingId = itm.id;
            itm.details.engineDetails.remaining = itm.sessionDetails.remaining;
            itm.details.engineDetails.expire = itm.sessionDetails.expire;
            itm.details.engineDetails.showTimes = true;
            itm.details.engineDetails.sessionId = itm.sessionId;

            let cartItem = {
              engine: itm.engine,
              item: itm.details.engineDetails,
            };

            ckItems.push(cartItem);
            this.makeHistory('/cars');
          } // Ends IF Car

          if (itm.engine == 'flight') {
            itm.plocationName = {
              name: [itm.details.searchData.airportDepartRound[0]],
            };
            // itm.details.engineDetails.flights[0].flightDetails.departData.departCity
            itm.pdate = itm.details.searchData.date;
            /// engineDetails.flights[0].flightDetails.departData.departDate;

            // searchData.OriginDestinationInformations[0].DepartureDateTime;
            //
            itm.ptime =
              itm.details.engineDetails.flights[0].flightDetails.departData.departTime;

            itm.dlocationName = {
              name: [
                itm.details.searchData.airportArriveRound[
                  itm.details.searchData.airportArriveRound.length - 1
                ],
              ],
            };
            // itm.details.engineDetails.flights[0].flightDetails.arriveData.arriveCity

            itm.ddate =
              itm.details.engineDetails.flights[0].flightDetails.arriveData.arriveDate;

            if (itm.details.searchData.date.length > 1)
              itm.ddate = itm.details.searchData.date[1];

            itm.dtime =
              itm.details.engineDetails.flights[0].flightDetails.arriveData.arriveTime;

            itm.directionInd = itm.details.engineDetails.directionInd;
            itm.cabinClass = itm.details.engineDetails.cabinClass;
            itm.engineId = itm.details.engineDetails.routeId;
            itm.Id = itm.details.engineDetails.routeId;
            itm.expire = false;
            itm.showTimes = true;
            itm.flightType = itm.details.engineDetails.directionInd;
            itm.isPassportMandatory =
              itm.details.engineDetails.isPassportMandatory;
            itm.remaining = [14, 59]; // searchedClock.remaining;
            itm.sessionId = itm.sessionId;

            let cartItem = {
              engine: itm.engine,
              item: itm, // .details.engineDetails
            };

            ckItems.push(cartItem);
            this.makeHistory('/flights');
          } // Ends IF Flight

          if (itm.engine == 'hotel') {
            let _filterHotel = itm.details.searchData;

            itm.hotel = this.doCleanArray(itm.details.engineDetails);
            itm.roomDetails = _filterHotel.rooms;
            itm.pdate = _filterHotel.checkinDate;
            itm.plocationName = _filterHotel.destination;
            itm.ptime = moment(_filterHotel.checkinDate, 'X').format(
              'HH:mm:ss'
            );
            itm.ddate = _filterHotel.checkoutDate;
            itm.dlocationName = _filterHotel.destination;
            itm.dtime = moment(_filterHotel.checkoutDate, 'X').format(
              'HH:mm:ss'
            );
            itm.engineId = itm.details.engineDetails.hotelId;
            itm.Id = itm.packageId;

            let _packageId = itm.packageId;
            // _allPackages = this.doCleanArray(itm.hotelDetails.package);
            let room = itm.hotelDetails.package;

            /* _allPackages.find((o) => {

                            if (o.packageId == _packageId) return true;
                          });
                          */

            if (typeof room == 'undefined') {
              itm.roomId = 0;

              if (itm.details.travellers.length > 0)
                itm.roomId = itm.details.travellers[0].roomId;

              itm.room = {
                rooms: [],
              };

              let _allRoomInSearch = _filterHotel.rooms;

              _allRoomInSearch.forEach((searchRoom, index) => {
                itm.room.rooms.push({
                  adults: searchRoom.adults,
                  kidsAges: searchRoom.childs,
                });
              });
            } else {
              itm.roomId = room.rooms[0].roomId;
              let fullRoomDetails = { ...room, ...room.rooms[0] };
              itm.room = fullRoomDetails;
            }

            itm.remaining = [39, 59];
            itm.expire = false;
            itm.showTimes = true;
            itm.sessionId = itm.sessionId;

            let cartItem = {
              engine: itm.engine,
              item: itm, // .details.engineDetails
            };

            ckItems.push(cartItem);

            this.makeHistory('/hotels');
          } // Ends IF Hotel

          if (itm.engine == 'villa') {
            let _filterVilla = itm.details.searchData;

            itm.villa = this.doCleanArray(itm.details.engineDetails);
            itm.pdate = _filterVilla.checkinDate;
            itm.plocationName = _filterVilla.locationData;
            itm.ptime = moment(_filterVilla.checkinDate, 'X').format(
              'HH:mm:ss'
            );
            itm.ddate = _filterVilla.checkoutDate;
            itm.dlocationName = _filterVilla.locationData;
            itm.dtime = moment(_filterVilla.checkoutDate, 'X').format(
              'HH:mm:ss'
            );
            itm.Id = itm.villa.villaId;
            itm.remaining = itm.sessionDetails.remaining;
            itm.expire = false; // itm.sessionDetails.expire;
            itm.showTimes = true;
            itm.villaId = itm.villa.villaId;

            let _allRoomsInVilla = itm.villaDetails.blockData.rooms;
            let _bookedRoomsInVilla = this.doCleanArray(
              itm.details.villaDetails
            );

            itm.rooms = [];

            _bookedRoomsInVilla = _bookedRoomsInVilla[0];

            _bookedRoomsInVilla.block_ids.forEach((blockId, index) => {
              Object.keys(_allRoomsInVilla).forEach(function (roomIndex) {
                // for (const roomIndex in _allRoomsInVilla) {

                if (
                  typeof _allRoomsInVilla[roomIndex] === 'object' &&
                  _allRoomsInVilla[roomIndex] !== null
                )
                  if (blockId == _allRoomsInVilla[roomIndex].block_id) {
                    let totalPrice = Number.parseFloat(
                      _bookedRoomsInVilla.block_quantities[index] *
                        _bookedRoomsInVilla.incrementalPrice[index]
                    ).toFixed(2);

                    _allRoomsInVilla[roomIndex].block_quantities =
                      _bookedRoomsInVilla.block_quantities[index];
                    _allRoomsInVilla[roomIndex].incrementalPrice =
                      _bookedRoomsInVilla.incrementalPrice[index];
                    _allRoomsInVilla[roomIndex].totalIncrementalPrice =
                      totalPrice;

                    itm.rooms.push(_allRoomsInVilla[roomIndex]);
                  }
              });
            });

            itm.payNow = Number(itm.villaDetails.blockData.can_pay_now);

            let cartItem = {
              engine: itm.engine,
              item: itm,
            };

            ckItems.push(cartItem);

            this.makeHistory('/villas');
          } // Ends IF Hotel

          if (itm.engine == 'activity') {

            itm.pdate = itm.details.searchData.fromDate;
            itm.plocationName =
              itm.details.searchData.destinationName;
            itm.ddate = itm.details.searchData.toDate;
            itm.ptime = moment(
              itm.details.searchData.fromDate,
              'X'
            ).format('HH:mm:ss');

            itm.Id = itm.engineId;
            itm.activityId = itm.engineId;
            itm.gradeId = itm.packageId;
            itm.remaining = itm.sessionDetails.remaining;
            itm.expire = itm.sessionDetails.expire;
            itm.showTimes = true;
            itm.details.activityId = itm.engineId;
            itm.details.activity = [itm.details.engineDetails];
            itm.details.availabilityItem =
              itm.activityDetails.activityDetail.packageDetails;
            itm.details.availabilityItem.activityDate =
              itm.activityDetails.activityDetail.activityDate;
            itm.details.searchData = itm.details.searchDat;
            itm.details.activityCkAvbDate =
              itm.activityDetails.activityDetail.activityDate;

            let a = moment(itm.pdate, 'YYYY-MM-DD');
            let b = moment(itm.ddate, 'YYYY-MM-DD');
            let total = moment.duration(b.diff(a)).asDays();

            itm.totalNights = total;

            let cartItem = {
              engine: itm.engine,
              item: itm,
            };

            ckItems.push(cartItem);

            this.makeHistory('/activities');
          } // Ends IF Hotel
        });
      } // Ends IF items length

      if (this.makeHistoryOfMyTrips) {
        this.makeHistoryOfMyTrips = false;
        this.makeHistory('/my_trips');
      }

      let doRedirectForCheckOut = '/checkout-one';

      if (
        ckItems.length == 0 &&
        (this.currentRouteName == 'Checkout Step One' ||
          this.currentRouteName == 'Checkout Step Two')
      ) {
        doRedirectForCheckOut = '/';
      }

      this.$store.dispatch('addTripToCart', {
        payload: ckItems,
        redirectPath: doRedirectForCheckOut,
      });
    },
    doCheckOutTrip: function () {
      if (this.focusedEngine == 'car')
        this.addCarToTrip(this.engineItemId, true);

      if (this.focusedEngine == 'flight')
        this.addFlightToTrip(this.engineItemId, true);

      if (this.focusedEngine == 'hotel')
        this.addHotelToTrip(this.engineItemId, true);

      if (this.focusedEngine == 'villa')
        this.addVillaToTrip(this.engineItemId, true);

      if (this.focusedEngine == 'activity')
        this.addActivityToTrip(this.engineItemId, true);
    },
    addActivityToTrip(itemId, doMeCheckout) {

      let infos = {
        activityId: this.$route.params.id,
        activity: this.engineItem,
      };

      let cader = {engine: this.focusedEngine, item: this.engineItem};

      this.$store.dispatch("setCartUpComings", { UPCOMINGS: cader });

      this.addTripData(this.$store.state.tripStore.tripID, {
        tripId: this.$store.state.tripStore.tripID,
      });
    },
    addHotelToTrip: function (packageId, doMeCheckout) {
      if (this.fetchingCarReqInProgress) return false;

      let infos = { hotelId: this.$route.params.id, room: this.engineItem };
      let _allHotels = this.doCleanArray(this.$store.state.hotelStore.hotels),
        _filterHotel = this.doCleanArray(
          this.$store.state.hotelStore.searchData
        ),
        _checkedHotel = _allHotels.find((o) => {
          if (o.hotelId == infos.hotelId) return true;
        });

      infos.hotel = _checkedHotel;
      infos.roomDetails = _filterHotel.rooms;
      infos.pdate = _filterHotel.checkinDate;
      infos.plocationName = _filterHotel.destination;
      infos.ptime = moment(_filterHotel.checkinDate, 'X').format('HH:mm:ss');
      infos.ddate = _filterHotel.checkoutDate;
      infos.dlocationName = _filterHotel.destination;
      infos.dtime = moment(_filterHotel.checkoutDate, 'X').format('HH:mm:ss');
      infos.engineId = infos.hotelId;
      infos.Id = infos.room.packageId;
      infos.roomId =
        typeof infos.room.roomId != 'undefined'
          ? infos.room.roomId
          : infos.room.rooms[0].roomId;
      infos.remaining = [39, 59];
      infos.expire = false;
      infos.showTimes = true;

      let cader = { engine: this.focusedEngine, item: infos };

      this.$store.dispatch('setCartUpComings', { UPCOMINGS: cader });

      this.fetchingCarReqInProgress = true;

      this.moveToCheckout = doMeCheckout;

      this.addTripData(this.$store.state.tripStore.tripID, {
        tripId: this.$store.state.tripStore.tripID,
      });

      this.fetchingCarReqInProgress = false;
    },
    addVillaToTrip: function (packageId, doMeCheckout) {
      if (this.fetchingCarReqInProgress) return false;

      let infos = {
        villaId: this.$route.params.id,
        rooms: this.engineItem.rooms,
      };

      let _allVillas = this.doCleanArray(this.$store.state.villaStore.villas),
        _filterVilla = this.doCleanArray(
          this.$store.state.villaStore.searchData
        ),
        _checkedVilla = _allVillas.find((o) => {
          if (o.villaId == infos.villaId) return true;
        });

      infos.villa = _checkedVilla;
      infos.pdate = _filterVilla.checkinDate;
      infos.plocationName = _filterVilla.locationData;
      infos.ptime = moment(_filterVilla.checkinDate, 'X').format('HH:mm:ss');
      infos.ddate = _filterVilla.checkoutDate;
      infos.dlocationName = _filterVilla.locationData;
      infos.dtime = moment(_filterVilla.checkoutDate, 'X').format('HH:mm:ss');
      infos.engineId = infos.villaId;
      infos.Id = infos.villaId;
      infos.remaining = [39, 59];
      infos.expire = false;
      infos.showTimes = true;
      infos.payNow = this.engineItem.payNow;

      let cader = {
        engine: this.focusedEngine,
        item: infos,
      };

      this.$store.dispatch('setCartUpComings', { UPCOMINGS: cader });

      this.fetchingCarReqInProgress = true;

      this.moveToCheckout = doMeCheckout;

      this.addTripData(this.$store.state.tripStore.tripID, {
        tripId: this.$store.state.tripStore.tripID,
      });

      this.fetchingCarReqInProgress = false;
    },
    addFlightToTrip: function (routeId, doMeCheckout) {
      this.engineItemId = routeId;

      if (this.fetchingCarReqInProgress) return false;

      this.fetchingCarReqInProgress = true;

      // just add car to selected trip
      this.fetchFlightDetails(routeId).then((rsp) => {
        this.fetchingCarReqInProgress = false;

        if (rsp == 'success') {
          this.moveToCheckout = doMeCheckout;

          this.addTripData(this.$store.state.tripStore.tripID, {
            tripId: this.$store.state.tripStore.tripID,
          });
        } else if (rsp == 'error_nodetails') {
          this.$awn.alert(
            'The route was sold out or unavailable.Please consider other routes perform a new search.'
          );
        } else {
          this.$awn.alert(
            'Session Expired. Please initiate a new search request.'
          );
        } // Ends IF ELSE
      });
    },
    addCarToTrip: function (carId, doMeCheckout) {
      this.engineItemId = carId;

      if (this.fetchingCarReqInProgress) return false;

      this.fetchingCarReqInProgress = true;

      // just add car to selected trip
      this.fetchCarDetails(carId).then((rsp) => {
        this.fetchingCarReqInProgress = false;

        if (rsp == 'success') {
          this.moveToCheckout = doMeCheckout;

          this.addTripData(this.$store.state.tripStore.tripID, {
            tripId: this.$store.state.tripStore.tripID,
          });
        } else {
          this.$awn.alert(
            'We are sorry to inform that no details exist against selected car, please select another..!'
          );
        } // Ends IF ELSE
      });
    },
    checkExpiredItems: function (tripId) {
      let that = this;

      return new Promise((resolve, reject) => {
        if (that.$store.state.cartStore.lastExpireItemEngineId == null)
          resolve();

        if (that.$store.state.cartStore.lastExpireItemEngineId != null) {
          // Delete expired item of trip
          let _carExpiredItem = that.doCleanArray(
            that.$store.state.cartStore.lastExpireItemDetail
          );

          let reqHeaders = {
            headers: { 'Content-Type': 'application/json' },
          };
          /*     let reqDataForm = new FormData();
                    reqDataForm.append('tripId', tripId);
                    reqDataForm.append('tripMetaId', _carExpiredItem.id); */
          let reqPayLoad = {
            tripId: tripId,
            tripMetaId: _carExpiredItem.id,
          };

          tripServices
            .deleteTripData(reqPayLoad, reqHeaders)
            .then((result) => {
              that.$store.dispatch('resetExpireItemSearchedDetails');
            })
            .catch((err) => {
              this.$sentry.captureException(new Error(err));
            })
            .finally(() => {
              resolve();
            });
        } // Ends IF Expire Item Exists
      }); // return promise
    },
    addTripData: function (reqTripId, tripObj) {

      this.checkExpiredItems(reqTripId).then((rsp) => {

        let _tripPayLoad = {
          tripId: reqTripId,
          engine: this.focusedEngine,
          sessionId: this.getEngineSessionID(),
          engineId: this.engineItemId,
        };

        if (this.focusedEngine == 'hotel') {
          let _roomDetails = this.doCleanArray(this.$store.getters.wishLists);

          _tripPayLoad.engineId = _roomDetails.item.hotelId;
          _tripPayLoad.packageId = _roomDetails.item.Id;
        }

        if (this.focusedEngine == 'activity') {

          let _wishedActivity = this.doCleanArray(
            this.$store.getters.wishLists
          );

          console.log('Activity In Store Item Wished To Cart', _wishedActivity);

          _tripPayLoad.packageId = _wishedActivity.item.gradeId;
          if(_wishedActivity.item.startTime){
            _tripPayLoad.startTime = _wishedActivity.item.startTime;
          }
          

          if(typeof _wishedActivity.item.details!='undefined')
            if(typeof _wishedActivity.item.details.startTime!='undefined')
              if(_wishedActivity.item.details.startTime !='0')
              _tripPayLoad.startTime = _wishedActivity.item.details.startTime;

          // console.log('addTripData 1346', _wishedActivity);

          // _tripPayLoad.packageId = _wishedActivity.item.details.gradeId;
        }

        if (this.focusedEngine == 'villa') {
          let villaPayload = this.doCleanArray(this.$store.getters.wishLists);

          let _extraDetail = {
            villaDetails: {
              incrementalPrice: [],
              block_quantities: [],
              block_ids: [],
              pay_now: 0,
              guest_quantities: [],
            },
          };

          let _rooms = villaPayload.item.rooms;
          let items = this.$store.state.villaStore.searchData.rooms;

          _rooms.forEach((room, index) => {
            //
            if (room.incremental_price.currency == this.domainCurrency)
              _extraDetail.villaDetails.incrementalPrice.push(
                room.incremental_price.net_price
              );

            // !='USD' && room.incremental_price.currency!='GBP' && room.incremental_price.currency!='MXN'
            if (room.incremental_price.currency != this.domainCurrency)
              _extraDetail.villaDetails.incrementalPrice.push(
                room.incremental_price.other_currency.price
              );

            _extraDetail.villaDetails.block_quantities.push(
              room.block_quantities
            );
            _extraDetail.villaDetails.block_ids.push(room.block_id);
            for(let i=0; i < Number(room.block_quantities); i++){
              let all = items[i].childs.filter(function(ac){
                return ac >= room.max_children_free_age;
              })
              _extraDetail.villaDetails.guest_quantities.push(items[i].adults + all.length);
            }
          });

          _extraDetail.villaDetails.pay_now = villaPayload.item.payNow;

          _tripPayLoad.villaDetails = _extraDetail.villaDetails;
        }

        let reqHeaders = {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        };

        var reqDataForm = new FormData();

        this.appendFormdata(reqDataForm, _tripPayLoad);

        tripServices
          .addTripData(reqDataForm, reqHeaders)
          .then((rsp) => {

            evBus.$emit('timerUpdate', reqTripId);

            if (
              rsp.data.success == false &&
              rsp.data.message == 'Token has expired'
            ) {
              this.doPopLogout();
              return true;
            } else {
              // this.doClosePop();
              if (
                rsp.data.data[0].tripbookings[
                  rsp.data.data[0].tripbookings.length - 1
                ].atol === true
              ) {
                this.$awn.success(
                  rsp.data.data[0].tripbookings[
                    rsp.data.data[0].tripbookings.length - 1
                  ].atolMessage
                );
              }
              if (rsp.data.data.length == 0) {
                this.$store.dispatch('resetBookingBulks');
                this.$store.dispatch('resetCartBulks');
                this.doClosePop();
                return false;
              } //

              // update cases
              // let _latestBooking = rsp.data.data[0].tripbookings[rsp.data.data[0].tripbookings.length-1];

              if (this.isEmptyObject(tripObj)) {
                // push trip details to set up summary
                this.setUpTripDetails(rsp.data.data[0], 'mixins', false);
              } else {
                // Trip Exists::Then Update
                if (!this.isEmptyObject(tripObj)) {
                  if (this.$store.state.tripStore.tripID != tripObj.tripId) {
                    this.setUpTripDetails(rsp.data.data[0], 'mixins', false);
                  } else if (
                    this.$store.state.tripStore.tripID == tripObj.tripId
                  ) {
                    // _latestBooking.details = this.doParseString(_latestBooking.details);
                    // this.$store.dispatch('addBooking', {BOOKING: _latestBooking});
                    // above code is depriciated as explicitly need to handle travelers and empty booking
                    this.setUpTripDetails(rsp.data.data[0], 'mixins', false);
                  }
                }
              } // INNER IF ELSE

              //this.$awn.success('Trip data has added successfully..!', {labels: {"success": "Trip Data Added"}});

              if (!this.isEmptyObject(tripObj)) {
                this.doClosePop();

                if (this.moveToCheckout) {
                  this.doCheckOutTripDetails();
                  return false;
                }

                setTimeout(() => {
                  evBus.$emit('openExistingTripPopUp');
                }, 1000);
              } // opens up new dialog existing trip updated..
            } // Outer IF ELSE MAIN
          })
          .catch((error) => {
            this.$sentry.captureException(new Error(error));
            if (error.response) {
              if (error.response.data) {
                if (
                  error.response.data.success == false &&
                  error.response.data.createNewTrip == true
                ) {
                  this.$awn.alert(error.response.data.message);
                  setTimeout(() => {
                    this.createNewTrip_ATOL();
                  }, 3000);
                } else {
                  this.$awn.info('Requested data already added in trip..!', {
                    labels: { info: 'Trip Data Added' },
                  });
                }
              } else {
                this.$awn.alert('Please try later, server encounter error..!');
              }
            } else if (error.request) {
              // The request was made but no response was received
              this.$awn.alert('Please try later, server encounter error..!');
            } else {
              // Something happened in setting up the request that triggered an Error
              this.$awn.alert('Please try later, server encounter error..!');
            }
          })
          .finally(() => {
            // do some thing here
          });
      });
    },
    updateBookingsForDisplay: function (tripBookings, tripTravellers) {
      if (tripBookings.length) {
        tripBookings.forEach((item, index) => {
          item.sessionDetails.remaining =
            item.sessionDetails.remaining.split(':');
          item.details = this.doParseString(item.details);
          let _iteratingTraveler = item.details;

          if (_iteratingTraveler.travellers.length == 0) {
            item.travellerAction = 'add';
            item.travellerId = 0;
            item.isPrimarytraveller = false;
            item.travellerName = false;
          } else {
            let _filteredTrv = tripTravellers.find((o) => {
              if (
                o.traveller.iUserID ==
                _iteratingTraveler.travellers[0].travellerId
              )
                return true;
            });

            item.travellerAction = 'update';
            item.travellerId = _iteratingTraveler.travellers[0].travellerId;
            item.isPrimarytraveller =
              _iteratingTraveler.travellers[0].userType == 'customer'
                ? true
                : false;
            // parseInt(item.travellers[0].isPrimaryTraveler);
            item.travellerName =
              _filteredTrv.traveller.vcFName +
              ' ' +
              _filteredTrv.traveller.vcLName;
          }
        });
      } // ENDS IF

      return tripBookings;
    },
    setUpTripDetails: function (tripDetails, callingPoint, paidCustomerMail) {

      tripDetails = this.doCleanArray(tripDetails);

      let _tripTravellers = this.doCleanArray(tripDetails.triptravellers);

      let _tripDisplayBookings = this.doCleanArray(tripDetails.tripbookings);
      _tripDisplayBookings = this.updateBookingsForDisplay(
        _tripDisplayBookings,
        _tripTravellers
      );


      let _tripDetailsCader = {
        creator: tripDetails.tripcreater,
        bookings: _tripDisplayBookings,
        travellers: _tripTravellers,
        agent: tripDetails.trip_agent,
      };


      // customised
      if (_tripDetailsCader.travellers.length)
        _tripDetailsCader.travellers.forEach((item, index) => {

          if(typeof paidCustomerMail != 'undefined') {
            if(item.traveller.email==paidCustomerMail) {
              item.traveller.sent = false;
              item.traveller.paid = true;            
            }
          }

          if (typeof item.primaryTraveller != 'undefined') {
            item.traveller.isPrimaryTraveler = 1;
          } else {
            item.traveller.isPrimaryTraveler = 0;
          }
            
        }); // Ends FOREACH
      // ends customised

      if (callingPoint == 'MyTrips')
        evBus.$emit('tripUpated', tripDetails.tripId);

      console.log('_tripDetailsCader', _tripDetailsCader);


      this.$store.dispatch('setTripSummary', {
        SUMMARY: _tripDetailsCader,
      });

      console.log('setTripSummaryCaders', _tripDetailsCader);

      if (this.refreshTripWhenItemRemoved) {
        this.refreshTripWhenItemRemoved = false;
        this.doCheckOutTripDetails();
      }
    },
    getTripById: function (tripId, callArea) {
      
      if (typeof callArea == 'undefined') callArea = 'mixins';

      let payLoad = {
        searchBy: 'tripId',
        searchKey: tripId,
      };

      let reqHeaders = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      };

      var reqDataForm = new FormData();

      this.appendFormdata(reqDataForm, payLoad);

      tripServices
        .searchTrip(reqDataForm, reqHeaders)
        .then((rsp) => {

          console.log('Search Trip API response 1586:mixins', rsp);

          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            // this.doPopLogout();
            return true;
          } else if (
            rsp.data.success == false &&
            rsp.data.message != 'Token has expired'
          ) {
            // this.$awn.info(rsp.data.message);
          } else {
            this.setUpTripDetails(rsp.data.data[0], callArea, false);
          }
        })
        .catch((err) => {
          this.$sentry.captureException(new Error(err));
          this.$awn.alert('Please try later, server encounter error..!');
        })
        .finally(() => {
          // do some thing here
        });
    },
    viewTripDetails: function (tripId, redirectPath) {
      let reqHeaders = {
          headers: {
            'Content-Type': 'application/json',
          },
        },
        reqPayLoad = {
          searchBy: 'tripId',
          searchKey: tripId,
        };

      tripServices.searchTrip((reqHeaders, reqPayLoad)).then((response) => {
        if (response.data.errors.message == 'Session is expired.') {
          this.$awn.success(
            'Your being timed out due to inactivity, Please try View Hotel again !'
          );

          // eslint-disable-next-line no-undef
          this.$emit('resetSearch', hotelId);
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

            this.$router.push(redirectPath).catch(() => {});
          } else {
            this.$awn.alert(
              'Trip booking data not available for this trip ID.'
            );
          }
        }
      });
    },
    doParseString: function (reqStrings) {
      let _obj = JSON.parse(reqStrings);

      return _obj;
    },
    getDateOnly(date) {
      let format = this.$store.state.envStore.DFormat;

      if (!date) return null;

      date = moment(date).format('YYYY-MM-DD');

      const [year, month, day] = date.split('-');

      if (format == 'DD-MM-YYYY') return `${day}-${month}-${year}`;

      return `${month}-${day}-${year}`;
    },
    getCountryDFOnly(date) {
      date = date.trim();

      let _orgDate = date;

      if (date.includes('T')) {
        let _orgDate = date.split('T');
        date = this.modifyDateByDomainByDash(_orgDate[0]);
        date = date + 'T' + _orgDate[1];
      }

      if (!date.includes('T')) {
        date = this.modifyDateByDomain(date);
      }

      if (
        (this.domain == 'us' || this.domain == 'com') &&
        !date.includes('T')
      ) {
        return date;
      } else {
        return moment(date).format(this.$store.state.envStore.countryDF);
      }
    },
    getHotelCountryDFOnly(date) {
      return moment(date.split('T')[0]).format(
        this.$store.state.envStore.countryDF
      );
    },
    makeTripDisplayName(tripName) {
      let _modifiedName = tripName.replace(/\s/g, '').split('-');
      let _modifiedDate = _modifiedName.pop();
      _modifiedDate = this.modifyDateByDomain(_modifiedDate);
      _modifiedName.push(_modifiedDate);

      return _modifiedName.join(' - ');
    },
    formatPhoneNumber(phoneNumberString) {
      var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
      var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

      if (match) {
        var intlCode = match[1] ? '+1 ' : '';

        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join(
          ''
        );
      }

      return null;
    },
    getDateInFormat(date, reqFormat) {
      let _orgDate = date.split('T')[0];
     
      if (date.includes('/')) _orgDate = this.modifyDateByDomain(_orgDate);

      if (date.includes('-'))
        _orgDate = this.modifyDateByDomainByDash(_orgDate);
     
      let format = 'YYYY-DD-MM';
      if(this.$store.state.envStore.domain=='us' || this.$store.state.envStore.domain=='com'){
         format = 'YYYY-MM-DD';
      }
      return  moment( _orgDate, format,true).format(reqFormat);
      
    },

    justFormatRawDate(date) {
      return moment.utc(date).format(this.$store.state.envStore.countryDF);
    },
    justFormatMyDate(date, reqFormat) {
      return date ? moment(date.split('T')[0]).format(reqFormat) : '';
    },
    revJustFormatHotelCancelDate(date, reqFormat) {
      return date ? moment(date).format(reqFormat + ' hh:mm A') : '';
    },
    getTimeAM(time) {
      // Check correct time format and split into components
      time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        // If time format correct

        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }

      time[0] = time[0] < 10 ? '0' + time[0] : time[0];

      return time[0] + time[1] + time[2] + time[5];
    },
    getTimeOnly(dateTime) {
      return moment(dateTime, 'X').format('HH:mm');
    },
    lapsedTime(dateTime) {
      let today = new Date();

      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();

      let time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

      let now = date + ' ' + time;

      let then = dateTime;

      let timeRemainingInMins = moment(then).diff(moment(now), 'minutes');

      return timeRemainingInMins;
    },
    doLogOut: function () {
      this.$store.dispatch('resetExpireItemSearchedDetails');
      this.$store.dispatch('resetCustomerDetails');
      this.$store.dispatch('reSetCarLocations');
      this.$store.dispatch('reSetTrip');
      this.$store.dispatch('resetCart');
      this.$store.dispatch('userSignOut');
      LocalStorageService.removeItem('app_domain');

      this.inSignOutMode = false;
      this.inCheckLiveSession = false;
    },
    checkUserAlive: async function () {
      return new Promise((resolve, reject) => {
        if (this.inSignOutMode || this.inCheckLiveSession) {
          resolve('success_user_alive');
          return;
        }

        this.inCheckLiveSession = true;

        apiClient.auth
          .userAliveAndActive()
          .then((rsp) => {
            if (rsp.data.success == false) {
              this.inSignOutMode = true;
              this.inCheckLiveSession = true;
              this.doLogOut();
              resolve('error_user_alive');
            } else {
              this.inSignOutMode = false;
              this.inCheckLiveSession = false;
              resolve('success_user_alive');
            }
          })
          .catch((err) => {
            this.inSignOutMode = true;
            this.inCheckLiveSession = true;
            this.doLogOut();
            resolve('error_user_alive');
          })
          .finally(() => {
            evBus.$emit('checkUserAliveFinish');
          });
      });
    },
    isEmptyObject: function (value) {
      return Object.keys(value).length === 0 && value.constructor === Object;
    },
    capitalizeFirstLetter: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    fetchVillaDetails: function (villaId) {
      let that = this;

      let reqHeaders = { headers: { 'Content-Type': 'application/json' } };

      let reqPayLoad = {
        sessionId: that.$store.state.villaStore.sessionId,
        villaId: villaId,
      };

      return new Promise((resolve, reject) => {
        villaServices
          .getVillaDetails(reqPayLoad, reqHeaders)
          .then((response) => {
            if (response.data.errors.message == 'Session is expired.') {
              resolve('error_session_expires');
              return false;
            } else if (
              response.data.message == 'Villa detail not found in search.'
            ) {
              resolve('error_nodetails');
              return false;
            } else if (
              response.data.message ==
              'Sorry, No results matched your search, please try again'
            ) {
              resolve('error_nodetails');
              return false;
            } else if (response.data.success) {
              that.villaSearchedDetails = response.data.data;

              resolve('success');
            } // If Success
          })
          .catch((error) => {
            this.$sentry.captureException(new Error(error));
            // console.error(err);
            resolve('error', err);
          });
      });
    },
    fetchHotelDetails: function (hotelId) {
      let that = this;

      let reqObj = {
        sessionId: that.$store.state.hotelStore.sessionId,
        hotelId: hotelId,
      };

      let reqHeaders = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      };

      return new Promise((resolve, reject) => {
        hotelServices
          .getHotelDetail(qs.stringify(reqObj), reqHeaders)
          .then((response) => {
            if (response.data.errors.message == 'Session is expired.') {
              resolve('error_session_expires');
              return false;
            } else if (
              response.data.message ==
              'Hotel Package not found! Please try again later.'
            ) {
              resolve('error_nodetails');
              return false;
            } else if (response.data.success) {
              that.hotelSearchedDetails = response.data.data;
              resolve('success');
            } // If Success
          })
          .catch((err) => {
            this.$sentry.captureException(new Error(err));
            // console.error(err);
            resolve('error', err);
          });
      });
    },
    fetchFlightDetails: function (flightRouteId) {
      let that = this;

      let reqObj = {
        sessionId: that.$store.state.flightStore.sessionId,
        routeId: flightRouteId,
        gds: that.engineItem.supplier,
        detailsType: 'details',
      };

      let reqHeaders = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      };

      return new Promise((resolve, reject) => {
        flightServices
          .getFlightDetails(qs.stringify(reqObj), reqHeaders)
          .then((rsp) => {
            if (
              rsp.data.success == false &&
              rsp.data.message ==
                'Session Expired. Please initiate a new search request.'
            ) {
              resolve('error_session_expires');
              return false;
            } else if (
              rsp.data.success == false &&
              rsp.data.message !=
                'Session Expired. Please initiate a new search request.'
            ) {
              resolve('error_nodetails');
              return false;
            }

            if (rsp.data.success == true) {
              if (rsp.data.data.fareDetails == undefined) {
                resolve('Cancellation_policy_not_found');
                return false;
              }

              if (typeof rsp.data.data.fareDetails !== 'undefined')
                if (!that.isEmptyObject(rsp.data.data.fareDetails)) {
                  that.flightSearchedDetails = rsp.data.data;
                  resolve('success');
                } else {
                  resolve('error_nodetails');
                }
            } // If Success
          })
          .catch((err) => {
            this.$sentry.captureException(new Error(err));
            // console.error(err);
            resolve('error', err);
          });
      });
    }, // Ends func()
    fetchCarDetails: function (reqCarId) {
      let that = this;

      let reqHeaders = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      };

      let reqDataForm = new FormData();

      reqDataForm.append('sessionId', that.$store.state.carStore.carSearchedId);
      reqDataForm.append('carId', reqCarId);

      return new Promise((resolve, reject) => {
        carServices
          .getCarDetailById(reqDataForm, reqHeaders)
          .then((rsp) => {
            if (
              rsp.data.success == false &&
              rsp.data.message ==
                'Session Expired. Please initiate a new search request.'
            ) {
              resolve('error_session_expires');
              // that.doPopLogout();
              // return true;
            } else if (
              rsp.data.success == false &&
              rsp.data.message !=
                'Session Expired. Please initiate a new search request.'
            ) {
              resolve('error_nodetails');
              return false;
            }

            var carDetailsData = rsp.data.data.carDetails;

            if (carDetailsData.cancellationPolicies == undefined) {
              resolve('Cancellation_policy_not_found');
            }

            if (typeof rsp.data.data.carDetails !== 'undefined')
              if (!that.isEmptyObject(rsp.data.data.carDetails)) {
                this.carSearchedDetails = rsp.data.data;
                if (
                  carDetailsData.cancellationPolicies != undefined &&
                  carDetailsData.packageDetail == undefined
                ) {
                  //this.$awn.alert('Unfortunately, our supplier has not provided any Package Details.');
                }
                resolve('success');
              } else {
                resolve('error_nodetails');
              }
          })
          .catch((error) => {
            this.$sentry.captureException(new Error(error));

            // console.log(
            //     'error occured while fetching car details, mixins global 607. err => ',
            //     err
            // );
            this.$sentry.captureException(new Error(err));
            resolve('error', err);
          });
      });
    }, // Ends func()
    getRandStrs: function (length) {
      var result = [];
      var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;

      for (var i = 0; i < length; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        );
      }

      return result.join('');
    },
    makeHistory: function (reqPath) {
      this.$store.dispatch('setRouteHistory', { HISTORY: reqPath });
    },
    doMoveToBack: function () {
      this.$router.push(this.$store.getters.routeHistory).catch(() => {});
      /*
            if(this.focusedEngine=='car')
              this.$router.push("/cars");

            if(this.focusedEngine=='flight')
              this.$router.push("/flights");

            if(this.focusedEngine=='hotel')
                this.$router.push("/hotels");
            */
    },
    getTotalDaysInDates(startDate, endDate) {
      let a = moment(startDate, 'YYYY-MM-DD');
      let b = moment(endDate, 'YYYY-MM-DD');
      let total = moment.duration(b.diff(a)).asDays();

      return total;
    },
    getRoomPriceByDomain(incPriceObj) {
      if (incPriceObj && incPriceObj.currency == this.domainCurrency)
        return incPriceObj.net_price;

      return incPriceObj ? incPriceObj.other_currency.price : '';
    },
    getPriceOfVillaRooms(villaRooms) {
      var that = this;

      var totalPrices = villaRooms.map(function (el) {
        let getPriceByDomain = that.getRoomPriceByDomain(el.incremental_price);

        return Number.parseFloat(
          Number.parseFloat(el.block_quantities) *
            Number.parseFloat(getPriceByDomain)
        );
      });

      return Number.parseFloat(totalPrices.reduce((a, b) => a + b, 0)).toFixed(
        2
      );
    },
    calculateRoomsPricesInVilla(villaRooms) {
      var that = this;

      var totalPrices = villaRooms.map(function (el) {
        let getPriceByDomain = that.getRoomPriceByDomain(el.incremental_price);

        return (
          Number.parseFloat(el.block_quantities) *
          Number.parseFloat(getPriceByDomain)
        );
      });

      return Number.parseFloat(totalPrices.reduce((a, b) => a + b, 0)).toFixed(
        2
      );
    },
    calculateRoomsPricesInVillaForTripMode(villaRooms) {
      var totalPrices = [];

      villaRooms.forEach((el, index) => {
        for (let k = 0; k < el.block_quantities.length; k++) {
          let roomTotalPrice =
            Number.parseFloat(el.block_quantities[k]) *
            Number.parseFloat(el.incrementalPrice[k]);

          totalPrices.push(roomTotalPrice);
        }
      });

      return Number.parseFloat(totalPrices.reduce((a, b) => a + b, 0)).toFixed(
        2
      );
    },
    getDomainName() {
      var domainList = ['com', 'uk', 'mx', 'ie'];

      var token = document.domain.split('.').slice(-1)[0];
      if (domainList.includes(token)) return token;

      return false;
    },
    getDateInTripName(str) {
      let extractedDate = str.slice(-10);

      return extractedDate.trim();
    },
    makeMedianCapitals(mstring) {
      let strLen = mstring.length;

      return (
        mstring.slice(0, parseInt(strLen) - 2) + mstring.slice(-2).toUpperCase()
      );
    },
    getAgeRuleByRole(role) {
      if (role == 'adult') return '';

      if (role == 'senior') return '( 65+ yrs)';

      if (role == 'child') return '( < 12 yrs)';

      if (role == 'infant') return '( < 2 yrs)';
    },
  }, // Ends method
  computed: {
    ...mapState({
      authStore: (state) => state.authStore,
      HotelStore: (state) => state.hotelStore,
      flightStore: (state) => state.flightStore,
      carSearchFilters: (state) => state.carStore,
      activityStore: (state) => state.ActivityStore,
      domain: (state) => state.envStore.domain,
      domainCurrency: (state) => state.envStore.CType,
      /*
            activeTripLink: (state) => state.envStore.activeTripLink
        */
    }),

    agenInfos() {
      return this.$store.state.authStore.agentData;
    },
    tripExist() {
      return this.$store.getters.hasTrip;
    },
    cartExist() {
      return this.$store.getters.hasCart;
    },
    tripDetail() {
      return this.$store.getters.tripDetails;
    },
    tripSummary() {
      return this.$store.getters.tripSummary;
    },
    bookingExist() {
      return this.$store.getters.tripSummary.trip_bookings.length > 0
        ? true
        : false;
    },
    currencySymbol() {
      return this.$store.state.envStore.CSymbol;
    },
    currentRouteName() {
      return this.$route.name;
    },
    signedUserRole() {
      return this.$store.getters.signedUserRole;
    },
    envDateFormat() {
      if (this.domain == 'uk' || this.domain == 'mx' || this.domain == 'ie') {
        return 'YYYY-DD-MM';
      } else {
        return 'YYYY-MM-DD';
      }
    },
  },
  filters: {
    capitalize: function (value) {
      if (!value) return '';

      value = value.toString();

      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    ucwords(str) {
      var splitStr = str.toLowerCase().split(' ');

      for (var i = 0; i < splitStr.length; i++)
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);

      return splitStr.join(' ');
    },
  },
}; // Ends Obj

Vue.mixin(Helpers);

export default Helpers;
