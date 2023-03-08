import { evBus } from '@/services/bus';
import { mapState } from 'vuex';
import moment from 'moment';
import countryCodes from '@/services/data/countraycodes';
export default {
  data() {
    return {
      sortBy: 'lowestPrice_asc',
      dotStyle: { background: '#1e255d', border: '0px' },
      railStyle: { height: '9px', background: 'white' },
      processStyle: { background: '#3d4ed7' },
      tooltipStyle: { color: 'white', background: '#3d4ed7' },

      selHotelName: '',
      sliderValue: [0, 10],
      sliderMinVal: 0,
      sliderMaxVal: 1000,

      distanceSlider: [0, 10],
      distanceMinVal: 0,
      distanceMaxVal: 1000,

      timer: null,
      distance: [],
      seldistance: [],
      hotelFacilities: [],
      selFacilities: ['0'],
      selRoom: ['Any'],
      basisList: [],

      starRating: [],
      selstarRating: ['Any'],

      mbSelFacilities: ['0'],
      mbSeldistance: ['Any'],
      mbselstarRating: ['Any'],

      mbSliderValue: [0, 10],
      mbSliderMinVal: 0,
      mbSliderMaxVal: 10,

      //Distance Slider
      mbldistanceSlider: [0, 10],
      mbldistanceMinVal: 0,
      mbldistanceMaxVal: 4000,

      searchByName: '',
      sortOptions: [
        {
          title: 'Price Low to High',
          value: 'lowestPrice_asc',
          icon: 'fas fa-arrow-alt-up',
        },
        {
          title: 'Price High to Low',
          value: 'lowestPrice_desc',
          icon: 'fas fa-arrow-alt-down',
        },
        {
          title: 'Name A to Z ↓',
          value: 'displayName_asc',
          icon: 'fas fa-arrow-alt-down',
        },
        {
          title: 'Name Z to A ↑',
          value: 'displayName_desc',
          icon: 'fas fa-arrow-alt-down',
        },
      ],

      codes: countryCodes,
    };
  },
  created: function () {
    evBus.$on('saveInTrip', (engineItemId, engine) => {
      this.openSaveTripPopUp(engineItemId, engine);
    });
    evBus.$on('populateFilters', () => {
      this.populateAdvanceFilters();
      this.populateMobileFilters();
    });
  },
  methods: {
    populateAdvanceFilters: async function (callFilters = true) {
      return new Promise((resolve, reject) => {
        if (this.Hotelfilters.filters) {
          let advFilterData = this.doCleanArray(this.Hotelfilters.filters);

          this.$nextTick(() => {
            if (
              typeof advFilterData !== 'undefined' &&
              advFilterData.basisList
            ) {
              advFilterData.basisList.Any = 'Any';
              this.basisList = advFilterData.basisList;
            }

            // SET-UP DISTANCE
            this.distance = advFilterData.distance;

            // SET-UP HOTEL FACILITIES
            if (
              typeof advFilterData !== 'undefined' &&
              advFilterData.hotelFacilities
            ) {
              advFilterData.hotelFacilities.Any = {id: 0, count: 0};
              this.hotelFacilities = advFilterData.hotelFacilities;
            }

            if (
              this.Hotelfilters.appliedFilters &&
              this.Hotelfilters.appliedFilters.hotelFacilities
            ) {
              this.selFacilities =
                this.Hotelfilters.appliedFilters.hotelFacilities.split(',');
            }

            // SET-UP STAR RATING
            if (typeof advFilterData.starRating !== 'undefined') {
              advFilterData.starRating.push(0);
              this.starRating = advFilterData.starRating.reverse();
            }
            if (
              this.Hotelfilters.appliedFilters &&
              this.Hotelfilters.appliedFilters.starRating
            ) {
              let startRating =
                typeof this.Hotelfilters.appliedFilters.starRating === 'number'
                  ? [this.Hotelfilters.appliedFilters.starRating]
                  : this.Hotelfilters.appliedFilters.starRating
                      .split(',')
                      .map(function (x) {
                        return parseInt(x, 10);
                      });
              this.selstarRating = startRating;
            }
            // SET-UP SLIDERS
            if (typeof advFilterData.priceRange !== 'undefined') {
              this.sliderMinVal = Math.floor(advFilterData.priceRange.minPrice);
              this.sliderMaxVal = Math.ceil(advFilterData.priceRange.maxPrice);
            }
            this.sliderValue = [
              this.Hotelfilters.appliedFilters &&
              this.Hotelfilters.appliedFilters.priceRange
                ? this.Hotelfilters.appliedFilters.priceRange.min
                : this.sliderMinVal,
              this.Hotelfilters.appliedFilters &&
              this.Hotelfilters.appliedFilters.priceRange
                ? this.Hotelfilters.appliedFilters.priceRange.max
                : this.sliderMaxVal,
            ];

            this.distanceMinVal = Math.floor(
              advFilterData.distance.minDistance?advFilterData.distance.minDistance:0
            );
            this.distanceMaxVal = Math.ceil(
              this.Hotelfilters.appliedFilters &&
                this.Hotelfilters.appliedFilters.distance
                ? this.Hotelfilters.appliedFilters.distance.max
                : advFilterData.distance.maxDistance
            );
            this.distanceSlider = [
              this.Hotelfilters.appliedFilters &&
              this.Hotelfilters.appliedFilters.distance
                ? this.Hotelfilters.appliedFilters.distance.min
                : this.distanceMinVal,
              this.Hotelfilters.appliedFilters &&
              this.Hotelfilters.appliedFilters.distance
                ? this.Hotelfilters.appliedFilters.distance.max
                : this.distanceMaxVal,
            ];
            this.mbldistanceMinVal = this.distanceMinVal;
            this.mbldistanceMaxVal = this.distanceMaxVal;
            this.mbldistanceSlider = this.distanceSlider;
            if (
              this.Hotelfilters.appliedFilters &&
              this.Hotelfilters.appliedFilters.sortByField
            ) {
              this.sortBy =
                this.Hotelfilters.appliedFilters.sortByField.sortField +
                '_' +
                this.Hotelfilters.appliedFilters.sortByField.sortOrder;
            }

            resolve('data set');
          });
        } else {
          // console.log('Advance Filters Data Not Found');
        } // Ends IF FILTERS
      }); // promises
    },
    appliedFilter() {
      this.$nextTick(() => {
        if (this.Hotelfilters.appliedFilters.starRating) {
          this.selstarRating =
            this.Hotelfilters.appliedFilters.starRating.split(',');
        }
      });
    },
    setNightCount(searchData) {
      let a = moment(searchData.checkinDate, 'YYYY-MM-DD');
      let b = moment(searchData.checkoutDate, 'YYYY-MM-DD');
      let total = moment.duration(b.diff(a)).asDays();
      this.totalNights = total;
    },
    resetFilter() {
      let advFilterData = this.doCleanArray(this.Hotelfilters.filters);
      this.selstarRating = ['Any'];
      this.selFacilities = ['0'];
      this.selRoom = ['Any'];
      this.seldistance = [];
      this.sliderMinVal = Math.floor(advFilterData.priceRange.minPrice);
      this.sliderMaxVal = Math.ceil(advFilterData.priceRange.maxPrice);
      this.sliderValue = [this.sliderMinVal, this.sliderMaxVal];
      this.mbldistanceSlider = [this.mbldistanceMinVal, this.mbldistanceMaxVal];
    },

    populateMobileFilters() {
      if (this.Hotelfilters.filters) {
        let advFilterData = this.doCleanArray(this.Hotelfilters.filters);

        // SET-UP SLIDERS
        if (advFilterData.priceRange)
          this.mbSliderMinVal = Math.floor(advFilterData.priceRange.minPrice);

        if (advFilterData.priceRange)
          this.mbSliderMaxVal = Math.ceil(advFilterData.priceRange.maxPrice);

        this.mbSliderValue = [
          this.Hotelfilters.appliedFilters &&
          this.Hotelfilters.appliedFilters.priceRange
            ? this.Hotelfilters.appliedFilters.priceRange.min
            : this.mbSliderMinVal,
          this.Hotelfilters.appliedFilters &&
          this.Hotelfilters.appliedFilters.priceRange
            ? this.Hotelfilters.appliedFilters.priceRange.max
            : this.mbSliderMaxVal,
        ];

        // Setup distance slider
        this.mbldistanceSlider = [
          this.mbldistanceMinVal,
          this.mbldistanceMaxVal,
        ];

        // Setup Star rating

        if (
          this.Hotelfilters.appliedFilters &&
          this.Hotelfilters.appliedFilters.starRating
        ) {
          let startRating =
            typeof this.Hotelfilters.appliedFilters.starRating == 'number'
              ? [this.Hotelfilters.appliedFilters.starRating]
              : this.Hotelfilters.appliedFilters.starRating
                  .split(',')
                  .map(function (x) {
                    return parseInt(x, 10);
                  });
          this.mbselstarRating = startRating;
        }
        if (
          this.Hotelfilters.appliedFilters &&
          this.Hotelfilters.appliedFilters.hotelFacilities
        ) {
          this.mbSelFacilities =
            this.Hotelfilters.appliedFilters.hotelFacilities.split(',');
        }
        if (
          this.Hotelfilters.appliedFilters &&
          this.Hotelfilters.appliedFilters.basisList
        ) {
          this.selRoom = this.Hotelfilters.appliedFilters.basisList.split(',');
        }
      } else {
        // console.log('Advacne/Mobile Filters Data Not Found');
      } // Ends IF FILTERS
    },
  },
  computed: {
    reverse() {
      var output = [];
      while (this.starRating.length) {
        output.push(this.starRating.pop());
      }

      return output;
    },
    ...mapState({
      Hotelfilters: (state) => state.hotelStore,
    }),
  },
};
