import { evBus } from '@/services/bus';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            sortBy: 'totalPrice-asc-false',
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
            villaAmenities: [],
            propertyTypes: [],
            slugs: [],
            selFacilities: ['Any'],
            selPropertyTypes: ['Any'],
            selRoom: [],
            villasCount: 0,
            starRating: [],

            selstarRating: ['Any'],
            mbSelFacilities: ['Any'],
            mblSelPropertyTypes: ['Any'],
            mbSeldistance: ['Any'],
            mbselstarRating: ['Any'],

            //Distance Slider
            mbldistanceSlider: [0, 10],
            mbldistanceMinVal: 0,
            mbldistanceMaxVal: 4000,

            mbSliderValue: [0, 10],

            mbSliderMinVal: 0,
            mbSliderMaxVal: 10,

            searchByName: '',
            sortOptions: [
                {
                    title: 'Price Low to High',
                    value: 'totalPrice-asc-false',
                    icon: 'fas fa-arrow-alt-up'
                },
                {
                    title: 'Price High to Low',
                    value: 'totalPrice-desc-false',
                    icon: 'fas fa-arrow-alt-down'
                },
                {
                    title: 'Star Rating Low to High',
                    value: 'starRating-asc-false',
                    icon: 'fas fa-arrow-alt-up'
                },
                {
                    title: 'Star Rating High to Low',
                    value: 'starRating-desc-false',
                    icon: 'fas fa-arrow-alt-down'
                },
                {
                    title: 'Occupancy Low to High',
                    value: 'maxOccupancy-asc-false',
                    icon: 'fas fa-arrow-alt-up'
                },
                {
                    title: 'Occupancy High to Low',
                    value: 'maxOccupancy-desc-false',
                    icon: 'fas fa-arrow-alt-down'
                }
            ]
        };
    },
    created: function() {

        evBus.$on('saveInTrip', (engineItemId, engine) => {
            this.openSaveTripPopUp(engineItemId, engine);
        });
        
        evBus.$on('resetMobFilters',()=>{
            this.resetFilter()
        })
        evBus.$on('populateVillaFilters',()=>{
            this.populateAdvanceFilters();
            this.populateMobileFilters();
        })
    },
    methods: {
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

        populateAdvanceFilters: async function() {

            if (this.Villafilters.filters) {

                let advFilterData = this.doCleanArray(
                    this.Villafilters.filters
                );

                this.$nextTick(() => {

                    // SET-UP DISTANCE
                    this.distance = advFilterData.distanceRange;

                    // SET-UP HOTEL FACILITIES
                    advFilterData.villaAmenities.Any = 'Any';
                    this.villaAmenities = advFilterData.villaAmenities;
                    if(this.Villafilters.appliedFilter && this.Villafilters.appliedFilter.villaAmenities){
                        this.selFacilities=this.Villafilters.appliedFilter.villaAmenities.split(',')
                    }
                    //SET-UP VILLAS PROPERTY TYPES
                    this.propertyTypes = advFilterData.propertyType;
                    if(this.Villafilters.appliedFilter && this.Villafilters.appliedFilter.propertyType){
                        this.selPropertyTypes=this.Villafilters.appliedFilter.propertyType
                    }
                    // SET-UP STAR RATING
                    if (typeof advFilterData.starRating !== 'undefined') {
 
                        // SET-UP STAR RATING
                        let star = advFilterData.starRating;

                        star.push(0);

                        this.starRating = star.reverse();
                    }
                    
                    if(this.Villafilters.appliedFilter && this.Villafilters.appliedFilter.starRating){
                      let starRating = typeof this.Villafilters.appliedFilter.starRating==='number' ? [this.Villafilters.appliedFilter.starRating] : this.Villafilters.appliedFilter.starRating.split(',').map(function (x) { return parseInt(x, 10); });
                      this.selstarRating = starRating
                    }
                    // SET-UP Price SLIDERS
                    this.sliderMinVal = Math.floor(
                      advFilterData.priceRange.minPrice
                    );
                    this.sliderMaxVal = Math.ceil(
                       advFilterData.priceRange.maxPrice
                    );

                    this.sliderValue = [
                    this.Villafilters.appliedFilter && this.Villafilters.appliedFilter.priceRange.min ? this.Villafilters.appliedFilter.priceRange.min : this.sliderMinVal,
                    this.Villafilters.appliedFilter && this.Villafilters.appliedFilter.priceRange ? this.Villafilters.appliedFilter.priceRange.max : this.sliderMaxVal
                    ];
                    
                    this.distanceMinVal = Math.floor(
                        advFilterData.distanceRange.minDistance?advFilterData.distanceRange.minDistance:0
                    );
                    this.distanceMaxVal = Math.ceil(
                        advFilterData.distanceRange.maxDistance
                    );
                    this.distanceSlider = [
                       this.Villafilters.appliedFilter && this.Villafilters.appliedFilter.distance.min ? Math.floor(this.Villafilters.appliedFilter.distance.min) : this.distanceMinVal,
                       this.Villafilters.appliedFilter && this.Villafilters.appliedFilter.distance.max ? Math.ceil(this.Villafilters.appliedFilter.distance.max) : this.distanceMaxVal
                    ];
                    if(this.Villafilters.appliedFilter && this.Villafilters.appliedFilter.sortByField){    
                    this.sortBy=this.Villafilters.appliedFilter.sortByField.sortField+'-'+this.Villafilters.appliedFilter.sortByField.sortOrder+'-'+this.Villafilters.appliedFilter.sortByField.sortIsString;
                    }
                
                });

            } // Ends IF FILTERS
        },

        getRawData(formData) {
            const reqPayLoad = {
                sessionId: formData.get('sessionId'),
                priceRange: formData.get('priceRange'),
                sortByField: formData.get('sortByField'),
                villaAmenities: formData.get('villaAmenities'),
                distance: formData.get('distance'),
                starRating: formData.get('starRating'),
                propertyTypes: formData.get('propertyTypes'),
                searchByName: formData.get('searchByName')
            };

            return reqPayLoad;
        },
        resetFilter() {
           
            let advFilterData = this.doCleanArray(this.Villafilters.filters);
            if(advFilterData!=undefined){
            this.selstarRating = [];
            this.mbselstarRating=[];
            this.mbSelFacilities=['Any'];
            this.selFacilities = [];
            
            this.mblSelPropertyTypes=['Any'];
            this.seldistance = [];

            if(typeof advFilterData.priceRange!='undefined') {
                
                this.sliderMinVal = Math.floor(advFilterData.priceRange.minPrice);
                this.mbSliderMinVal=this.sliderMinVal;
                this.sliderMaxVal = Math.ceil(advFilterData.priceRange.maxPrice);
                this.mbSliderMaxVal=this.sliderMaxVal;
            }
            this.sliderValue = [this.sliderMinVal, this.sliderMaxVal];
            this.mbSliderValue=this.sliderValue;
           if(advFilterData.distanceRange != undefined){
           
            this.mbldistanceMinVal = Math.floor(
                advFilterData.distanceRange.minDistance
            );
           
            this.mbldistanceMaxVal = Math.ceil(
                advFilterData.distanceRange.maxDistance
            );
           
            this.mbldistanceSlider = [
                this.mbldistanceMinVal,
                this.mbldistanceMaxVal
            ];
          }
        }
        },

        populateMobileFilters() {

            if (this.Villafilters.filters) {
                
                let advFilterData = this.doCleanArray(
                    this.Villafilters.filters
                );

                // SET-UP SLIDERS
                this.mbSliderMinVal = Math.floor(
                    advFilterData.priceRange.minPrice
                );
                this.mbSliderMaxVal = Math.ceil(
                    advFilterData.priceRange.maxPrice
                );
                // this.mbSliderValue = [this.mbSliderMinVal, this.mbSliderMaxVal];
                this.mbSliderValue = [
                this.Villafilters.appliedFilter && this.Villafilters.appliedFilter.priceRange.min ? this.Villafilters.appliedFilter.priceRange.min : this.mbSliderMinVal,
                this.Villafilters.appliedFilter && this.Villafilters.appliedFilter.priceRange ? this.Villafilters.appliedFilter.priceRange.max : this.mbSliderMaxVal
                ];
                
                //Distance Slider
                this.mbldistanceMinVal = Math.floor(
                    advFilterData.distanceRange.minDistance
                );
                this.mbldistanceMaxVal = Math.ceil(
                    advFilterData.distanceRange.maxDistance
                );
                this.mbldistanceSlider = [
                   this.Villafilters.appliedFilter && this.Villafilters.appliedFilter.distance.min ? Math.floor(this.Villafilters.appliedFilter.distance.min) : this.mbldistanceMinVal,
                   this.Villafilters.appliedFilter && this.Villafilters.appliedFilter.distance.max ? Math.ceil(this.Villafilters.appliedFilter.distance.max) : this.mbldistanceMaxVal
                ];

                // SET-UP STAR RATING
                let star=advFilterData.starRating.slice(1)
               
                    star.push(0);
                this.starRating = star.reverse();
                
                if(this.Villafilters.appliedFilter && this.Villafilters.appliedFilter.starRating){
                  let starRating = typeof this.Villafilters.appliedFilter.starRating==='number' ? [this.Villafilters.appliedFilter.starRating] : this.Villafilters.appliedFilter.starRating.split(',').map(function (x) { return parseInt(x, 10); });
                  this.mbselstarRating = starRating
                }

                // SET-UP HOTEL FACILITIES
                advFilterData.villaAmenities.Any = 'Any';
                this.villaAmenities = advFilterData.villaAmenities;
                if(this.Villafilters.appliedFilter && this.Villafilters.appliedFilter.villaAmenities){
                    this.mbSelFacilities=this.Villafilters.appliedFilter.villaAmenities.split(',')
                }

              
                 //SET-UP VILLAS PROPERTY TYPES
                 this.propertyTypes = advFilterData.propertyType;
                if(this.Villafilters.appliedFilter && this.Villafilters.appliedFilter.propertyType){
                    this.mblSelPropertyTypes=this.Villafilters.appliedFilter.propertyType
                }
            } // Ends IF FILTERS
        }
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
            Villafilters: state => state.villaStore,
            searchData: state => state.villaStore.searchData
        })
    }
};
