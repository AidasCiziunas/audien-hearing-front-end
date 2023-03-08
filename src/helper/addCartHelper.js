import { evBus } from '@/services/bus';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            sortBy: 'FinalPrice-asc-false',
            sliderValue: [0, 10],
            sliderMinVal: 0,
            sliderMaxVal: 1000,
            timer: null,
            dotStyle: { background: '#1e255d', border: '0px' },
            railStyle: { height: '9px', background: 'white' },
            processStyle: { background: '#3d4ed7' },
            tooltipStyle: { color: 'white', background: '#3d4ed7' },
            selTransmission: ['Any'],
            selRentalCompany: ['Any'],
           
            selCarType: ['Any'],
            mbSelCarType: ['Any'],
            mbSelTransmission: ['Any'],
            mbSelRentalCompany: ['Any'],
            mbSliderValue: [0, 10],
            mbSliderMinVal: 0,
            mbSliderMaxVal: 10,
            distance:[2,5],
            minDistance:0,
            maxDistance:5,
            sortOptions: [
                {
                    title: 'Price Low to High',
                    value: 'FinalPrice-asc-false',
                    icon: 'fas fa-arrow-alt-up'
                },
                {
                    title: 'Price High to Low',
                    value: 'FinalPrice-desc-false',
                    icon: 'fas fa-arrow-alt-down'
                },
                {
                    title: 'Name A to Z',
                    value: 'CarHireCompany-asc-false',
                    icon: 'fas fa-arrow-alt-up'
                },
                {
                    title: 'Name Z to A',
                    value: 'CarHireCompany-desc-false',
                    icon: 'fas fa-arrow-alt-down'
                }
            ]
        };
    },
    created: function() {
        evBus.$on('saveInTrip', (engineItemId, engine) => {
            this.openSaveTripPopUp(engineItemId, engine);
        });
        evBus.$on('populateMobileDesktopFilter',()=>{
            this.populateAdvanceFilters();
            this.populateMobileFilters();
        })
    },
    methods: {
        populateAdvanceFilters: async function() {

            return new Promise((resolve, reject) => {

                if (this.carSearchFilters.filters) {


                    let appliedAdvanceFilter = this.doCleanArray(
                        this.carSearchFilters.appliedFilter
                    );
                    
                    let advFilterData = this.doCleanArray(
                        this.carSearchFilters.filters
                    );


                  if(appliedAdvanceFilter){
                    if(typeof appliedAdvanceFilter.distance != 'undefined'){
                        appliedAdvanceFilter.distance = JSON.parse(appliedAdvanceFilter.distance);
                    }
                  }
                  
                  this.minDistance = Math.floor(
                    advFilterData.distance.min
                  );

                 this.maxDistance = Math.ceil(
                    advFilterData.distance.max
                 );
                 
                 this.distance=[
                        appliedAdvanceFilter && appliedAdvanceFilter.distance.min ? appliedAdvanceFilter.distance.min : this.minDistance,
                        appliedAdvanceFilter && appliedAdvanceFilter.distance.max ? appliedAdvanceFilter.distance.max : this.maxDistance
                 ];
                       

                    if(appliedAdvanceFilter)
                        if(typeof appliedAdvanceFilter.priceRange!='undefined')
                                appliedAdvanceFilter.priceRange = JSON.parse(appliedAdvanceFilter.priceRange);

                    // SET-UP SLIDERS
                    this.sliderMinVal = Math.floor(
                        advFilterData.priceRange.minPrice
                    );
                    this.sliderMaxVal = Math.ceil(
                        advFilterData.priceRange.maxPrice
                    );

                    this.sliderValue = [
                        appliedAdvanceFilter && appliedAdvanceFilter.priceRange.min ? appliedAdvanceFilter.priceRange.min : this.sliderMinVal,
                        appliedAdvanceFilter && appliedAdvanceFilter.priceRange.max ? appliedAdvanceFilter.priceRange.max : this.sliderMaxVal
                    ];                    

                    // SET-UP TRANSMISSIONS
                   
                    if(appliedAdvanceFilter)
                        if(typeof appliedAdvanceFilter.transmission!='undefined')
                            this.selTransmission = appliedAdvanceFilter.transmission.split(',');


                    // SET-UP RENTAL COMPANIES
                    
                    if(appliedAdvanceFilter)
                        if(typeof appliedAdvanceFilter.rentalCompany!='undefined')
                            this.selRentalCompany = appliedAdvanceFilter.rentalCompany.split(',');


                    // SET-UP CAR TYPES
                    if(appliedAdvanceFilter)
                        if(typeof appliedAdvanceFilter.carType!='undefined')
                            this.selCarType = appliedAdvanceFilter.carType.split(',');

                } // Ends IF FILTERS

                resolve('loaded filters');
            });
        },
        populateMobileFilters() {

            if (this.carSearchFilters.filters) {

                let advFilterData = this.doCleanArray(
                    this.carSearchFilters.filters
                );

                let appliedAdvanceFilter = this.doCleanArray(
                    this.carSearchFilters.appliedFilter
                );

                if(appliedAdvanceFilter)
                    if(typeof appliedAdvanceFilter.priceRange!='undefined')
                        appliedAdvanceFilter.priceRange = JSON.parse(appliedAdvanceFilter.priceRange);
                
                // SET-UP SLIDERS
                this.mbSliderMinVal = Math.floor(
                    advFilterData.priceRange.minPrice
                );
                this.mbSliderMaxVal = Math.ceil(
                    advFilterData.priceRange.maxPrice
                );
 
                this.mbSliderValue = [
                    appliedAdvanceFilter && appliedAdvanceFilter.priceRange.min ? appliedAdvanceFilter.priceRange.min : this.mbSliderMinVal,
                    appliedAdvanceFilter && appliedAdvanceFilter.priceRange.max ? appliedAdvanceFilter.priceRange.max : this.mbSliderMaxVal
                ];

                if(appliedAdvanceFilter){
                    if(typeof appliedAdvanceFilter.distance != 'undefined'){
                        appliedAdvanceFilter.distance = JSON.parse(appliedAdvanceFilter.distance);
                    }
                }    
                this.minDistance = Math.floor(
                    advFilterData.distance.min
                  );

                 this.maxDistance = Math.ceil(
                    advFilterData.distance.max
                 );
                 
                 this.distance=[
                        appliedAdvanceFilter && appliedAdvanceFilter.distance.min ? appliedAdvanceFilter.distance.min : this.minDistance,
                        appliedAdvanceFilter && appliedAdvanceFilter.distance.max ? appliedAdvanceFilter.distance.max : this.maxDistance
                 ];


                // SET-UP TRANSMISSIONS
                if(appliedAdvanceFilter)
                    if(typeof appliedAdvanceFilter.transmission!='undefined')
                        this.mbSelTransmission = appliedAdvanceFilter.transmission.split(',');

                // SET-UP RENTAL COMPANIES
                if(appliedAdvanceFilter)
                    if(typeof appliedAdvanceFilter.rentalCompany!='undefined')
                        this.mbSelRentalCompany = appliedAdvanceFilter.rentalCompany.split(',');

                // SET-UP CAR TYPES
                // advFilterData.carType.Any = 'Any';
                // this.carTypes = advFilterData.carType;
                if(appliedAdvanceFilter)
                    if(typeof appliedAdvanceFilter.carType!='undefined')
                        this.mbSelCarType = appliedAdvanceFilter.carType.split(',');

                if(appliedAdvanceFilter)
                    if(typeof appliedAdvanceFilter.sortByField!='undefined') {

                        let makeSortBy = JSON.parse(appliedAdvanceFilter.sortByField);

                        this.sortBy = makeSortBy.sortField+'-'+makeSortBy.sortOrder;
                    }
                
            }
        },
        openAddCartPopUpForCar: function(itemId, item, engine) {
            
            let engineDetails = {
                focusedEngine: engine,
                engineItemId: itemId,
                engineItem: item
            };

            evBus.$emit('openAddCartPopUpEv', engineDetails);
        },
        openSaveTripPopUp: function(itemId, engine) {
            
            if (!this.$store.state.tripStore.tripExist) {
                evBus.$emit('openCreateTripPopUp', itemId);
                return false;
            }

            if (itemId != '' && engine == 'car')
                this.addCarToTrip(itemId, false);

            if (itemId != '' && engine == 'flight')
                this.addFlightToTrip(itemId, false);

            if (itemId != '' && engine == 'hotel')
                this.addHotelToTrip(itemId, false);

            if (itemId != '' && engine == 'villa')
                this.addVillaToTrip(itemId, false);
            
            if (itemId != '' && engine == 'activity')
                this.addActivityToTrip(itemId, false);
        },

        resetFilter() {
            this.mbSelCarType = ['Any'];
            this.mbSelTransmission = ['Any'];
            this.mbSelRentalCompany = ['Any'];
            this.sliderValue = [this.sliderMinVal, this.sliderMaxVal];
        }
    },
    computed: {
        ...mapState({
            carSearchFilters: state => state.carStore
        }),
        transmissions(){
        
            if(this.carSearchFilters.filters == undefined){
                return false;
            }
            
            let transmission = this.carSearchFilters.filters.transmission;
           
            
            if (transmission['Manual'] == undefined || (typeof transmission == 'undefined')){
                transmission['Manual'] = 0;
            }
            if (transmission['Automatic'] == undefined || (typeof transmission == 'undefined')){
                transmission['Automatic'] = 0;
            }
                transmission['Any']='Any';
            return transmission;
        },
        rentalCompanies(){
            if(this.carSearchFilters.filters == undefined){
                return false;
            }
            let rentalCompany = this.carSearchFilters.filters.rentalCompany;
           
               rentalCompany['Any']='Any';
            return rentalCompany;
        },
        carTypes(){
            if(this.carSearchFilters.filters == undefined){
                return false;
            }
            let carTypes = this.carSearchFilters.filters.carType;
            if(carTypes){
                carTypes['Any']='Any';
            return carTypes;
        }
        }
    }
};
