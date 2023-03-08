import moment from 'moment';
import { mapState } from 'vuex';
export default {
    data() {
        return {
            minDepartureDate: this.formattedDate(new Date(), 'YYYY-MM-DD'),
            minArrivalDate: this.getVeryNextDate(
                new Date(new Date().setDate(new Date().getDate() + 1))
            ),
            dotStyle: { background: '#1e255d', border: '0px' },
            railStyle: { height: '9px', background: 'white' },
            processStyle: { background: '#3d4ed7' },
            tooltipStyle: { color: 'white', background: '#3d4ed7' },
            durationVal: [0, 0],
            minDuration: 0,
            maxDuration: 0,
            departureTimeVal: [0, 0],
            minDepart: 0,
            maxDepart: 0,
            minArrivalTime: 0,
            maxArrivalTime: 0,

            arrivalTimeVal: [0, 0],

            arrivalTimeReturnVal: [0, 0],
            minArrivalReturn: 0,
            maxArrivalReturn: 0,

            departureTimeReturnVal: [0, 0],
            minDepartReturn: 0,
            maxDepartReturn: 0,

            priceRangeVal: [0, 0],

            mbSliderMinVal: 0,
            mbSliderMaxVal: 10,
            mbSliderValue: [0, 10],
            sortByOption: [
                {
                    value: 'totalPrice-asc-false',
                    label: 'Price Low To High ↓'
                },
                {
                    value: 'totalPrice-desc-false',
                    label: 'Price High to Low ↑'
                },
                {
                    value: 'airlineName-asc-true',
                    label: 'Name A to Z ↓'
                },
                {
                    value: 'airlineName-desc-true',
                    label: 'Name Z to A ↑'
                }
            ]
        };
    },

    methods: {
        setDefaults() {

            let date = '';

            if(JSON.stringify(this.flightStore.searchData) === JSON.stringify({})) {

                if (this.$store.state.cartStore.lastExpireItemEngine == 'flight') {

                        if (this.$store.state.cartStore.lastExpireInModeOf == 'trip') {

                            let _flightExpiredDetails = this.doCleanArray(this.$store.state.cartStore.lastExpireItemDetail);

                            if(typeof _flightExpiredDetails.details=="string")
                                _flightExpiredDetails.details = JSON.parse(_flightExpiredDetails.details);

                            let _flightTypeStore = _flightExpiredDetails.details.searchData.flightType;

                            let _searchData = _flightExpiredDetails.details.searchData;

                            if (_flightTypeStore == 'oneWay') {
                                date = _searchData.date.toString();
                            } else {
                                date = _searchData.date[0].toString();
                            }

                            this.resetDefault();

                        } //  IF TRIP

                }

            } else {

                if (this.flightTypeStore == 'oneWay') {
                    date = this.searchData.date.toString();
                } else {
                    date = this.searchData.date[0].toString();
                }   

                let appliedAdvanceFilter = this.doCleanArray(this.advanceFilters);

                this.priceRangeVal = [
                        appliedAdvanceFilter && appliedAdvanceFilter.price.min ? appliedAdvanceFilter.price.min : this.priceRange.minPrice,
                        appliedAdvanceFilter && appliedAdvanceFilter.price.max ? appliedAdvanceFilter.price.max : this.priceRange.maxPrice
                ];

                this.minArrivalTime = moment(
                    `${date} ${this.arrivalTime.minArrival}`
                ).unix();
                this.maxArrivalTime = moment(
                    `${date} ${this.arrivalTime.maxArrival}`
                ).unix();
                this.arrivalTimeVal = [
                    appliedAdvanceFilter && appliedAdvanceFilter.arrivalTime.start ? moment(`${date} ${appliedAdvanceFilter.arrivalTime.start}`).unix() : this.minArrivalTime,
                    appliedAdvanceFilter && appliedAdvanceFilter.arrivalTime.end ? moment(`${date} ${appliedAdvanceFilter.arrivalTime.end}`).unix(): this.maxArrivalTime
                ];
           
                this.minDuration = parseFloat(this.duration.minDuration.replace(':', '.')).toString();
                this.maxDuration = parseFloat(this.duration.maxDuration.replace(':', '.')).toString();

                this.durationVal = [
                    appliedAdvanceFilter && appliedAdvanceFilter.duration.start ? parseFloat(appliedAdvanceFilter.duration.start.replace(':', '.')).toString() : this.minDuration,
                    appliedAdvanceFilter && appliedAdvanceFilter.duration.end ? parseFloat(appliedAdvanceFilter.duration.end.replace(':', '.')).toString() : this.maxDuration
                ];

                this.minDepart = moment(
                    `${date} ${this.departureTime.minDepart}`
                ).unix();
                this.maxDepart = moment(
                    `${date} ${this.departureTime.maxDepart}`
                ).unix();
                this.departureTimeVal = [
                    appliedAdvanceFilter && appliedAdvanceFilter.departTime.start ? moment(`${date} ${appliedAdvanceFilter.departTime.start}`).unix() : this.minDepart,
                    appliedAdvanceFilter && appliedAdvanceFilter.departTime.end ? moment(`${date} ${appliedAdvanceFilter.departTime.end}`).unix() : this.maxDepart
                ];

                this.minDepartReturn = moment(
                    `${date} ${this.departureTimeReturn.minDepartReturn}`
                ).unix();
                this.maxDepartReturn = moment(
                    `${date} ${this.departureTimeReturn.maxDepartReturn}`
                ).unix();

                
                this.departureTimeReturnVal = [
                    appliedAdvanceFilter && appliedAdvanceFilter.departReturnTime ? moment(`${date} ${appliedAdvanceFilter.departReturnTime.start}`).unix() : this.minDepartReturn,
                    appliedAdvanceFilter && appliedAdvanceFilter.departReturnTime ? moment(`${date} ${appliedAdvanceFilter.departReturnTime.end}`).unix() : this.maxDepartReturn
                ];

                this.minArrivalReturn = moment(
                    `${date} ${this.arrivalTimeReturn.minArrivalReturn}`
                ).unix();
                this.maxArrivalReturn = moment(
                    `${date} ${this.arrivalTimeReturn.maxArrivalReturn}`
                ).unix();
                
                this.arrivalTimeReturnVal = [
                    appliedAdvanceFilter && appliedAdvanceFilter.arrivalReturnTime ? moment(`${date} ${appliedAdvanceFilter.arrivalReturnTime.start}`).unix() : this.minArrivalReturn,
                    appliedAdvanceFilter && appliedAdvanceFilter.arrivalReturnTime ? moment(`${date} ${appliedAdvanceFilter.arrivalReturnTime.end}`).unix() : this.maxArrivalReturn
                ];

                if(appliedAdvanceFilter && appliedAdvanceFilter.airline)
                    this.airline = appliedAdvanceFilter.airline.split(',');

                if(appliedAdvanceFilter && appliedAdvanceFilter.stops)
                    this.stops = appliedAdvanceFilter.stops.split(',');

                if(appliedAdvanceFilter && appliedAdvanceFilter.alliance)
                    this.alliance = appliedAdvanceFilter.alliance.split(',');
            }
        },
        resetDefault() {
            this.durationVal = [0, 0];
            this.minDuration = 0;
            this.maxDuration = 0;
            this.departureTimeVal = [0, 0];
            this.minDepart = 0;
            this.maxDepart = 0;
            this.minArrivalTime = 0;
            this.maxArrivalTime = 0;
            this.arrivalTimeVal = [0, 0];
            this.arrivalTimeReturnVal = [0, 0];
            this.minArrivalReturn = 0;
            this.maxArrivalReturn = 0;
            this.departureTimeReturnVal = [0, 0];
            this.minDepartReturn = 0;
            this.maxDepartReturn = 0;
            this.priceRangeVal = [0, 0];
            this.mbSliderMinVal = 0;
            this.mbSliderMaxVal = 10;
            this.mbSliderValue = [0, 10];
        },
        formattedDate(reqDate, reqFormat) {
            if (!reqDate) return null;
            reqDate = moment(reqDate).format(reqFormat);
            return reqDate;
        },
        getVeryNextDate(dropOffDay) {
            return this.formattedDate(dropOffDay, 'YYYY-MM-DD');
        },
        nextDay(date) {
            let nextDay = this.formattedDate(
                moment(date).add(1, 'days'),
                'YYYY-MM-DD'
            );
            return nextDay;
        },
        momentFormat(date, format) {
            if (!format) format = 'HH:mm';
            return moment(date * 1000).format(format);
        },
        dateFormat(date) {
            let label = this.momentFormat(date, 'hh:mm A');
            return label;
        },
        priceFormat(price) {
            return (
                this.currencySymbol +
                Number(price)
                    .toFixed(2)
                    .toString()
            );
        },
        durationFormat(time) {
            time=time.toString().replace(".",":");
            var startHours ='';
            var startMinutes = '';
            if(time.toString().split(":")[0]<10){
                startHours = "0"+time.toString().split(":")[0];
              }
              if(time.toString().split(":")[0]>=10){
                startHours = time.toString().split(":")[0];
              }
    
            if(time.toString().split(":")[1]<10){
              startMinutes = time.toString().split(":")[1].includes("0") == false ? ":0"+time.toString().split(":")[1] : ":"+time.toString().split(":")[1];
            }
            if(time.toString().split(":")[1]>=10 && time.toString().split(":")[1]<=59){
              startMinutes = ":"+time.toString().split(":")[1];
            }
    
            if(time.toString().split(":")[1]>59){
              startMinutes = ":"+Math.round((parseInt(time.toString().split(":")[1]) / 100) * 60);
            }
    
            if(time.toString().split(":")[1]==undefined){
              startMinutes = ":00";
            }

            return startHours+startMinutes+' hrs';
          
        }
    },
    computed: {
        ...mapState({
            flightTypeStore: state => state.flightStore.flightType,
            searchData: state => state.flightStore.searchData,
            filters: state => state.flightStore.filters,
            advanceFilters: state => state.flightStore.appliedFltAdvFilter,
        }),
        airlines() {
            return this.filters ? this.filters.airlines : [];
        },
        priceRange() {
            return this.filters ? this.filters.priceRange : [0, 0];
        },
        arrivalTime() {
            return this.filters ? this.filters.arriveTime : [0, 0];
        },
        duration() {
            return this.filters ? this.filters.duration : [0, 0];
        },
        departureTime() {
            return this.filters ? this.filters.departTime : [0, 0];
        },
        departureTimeReturn() {
            return this.filters ? this.filters.departReturnTime : [0, 0];
        },
        arrivalTimeReturn() {
            return this.filters ? this.filters.arrivReturnTime : [0, 0];
        }
    },
    watch: {
        flightTypeStore() {
            this.resetDefault();
            this.setDefaults();
        }
    }
};
