import { evBus } from '@/services/bus';
import { mapState } from 'vuex';
import countryCodes from '@/services/data/countraycodes';
export default {
    data() {
        return {
            sortBy: 'finalPrice-asc-false',
            dotStyle: { background: '#1e255d', border: '0px' },
            railStyle: { height: '9px', background: 'white' },
            processStyle: { background: '#3d4ed7' },
            tooltipStyle: { color: 'white', background: '#3d4ed7' },
            sliderValue: [0, 10],
            sliderMinVal: 0,
            sliderMaxVal: 1000,

            timer: null,

            starRating: [],
            selstarRating: ['Any'],

            categories: ['Any'],
            selCategories: ['Any'],

            subCategories: ['Any'],
            selSubCategories: ['Any'],

            mblSliderValue: [0, 10],
            mblSliderMinVal: 0,
            mblSliderMaxVal: 1000,

            mblselStarRating: ['Any'],
            mblSelCategories: ['Any'],
            mblSelSubCategories: ['Any'],
            selActivityName: '',

            searchByName: '',
            sortOptions: [
                        {
                            title: 'Price Low to High',
                            value: 'finalPrice-asc-false',
                            icon: 'fas fa-arrow-alt-up'
                        },
                        {
                            title: 'Price High to Low',
                            value: 'finalPrice-desc-false',
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
                            title: 'Name A to Z',
                            value: 'title-asc-true',
                            icon: 'fas fa-arrow-alt-up'
                        },
                        {
                            title: 'Name Z to A',
                            value: 'title-desc-true',
                            icon: 'fas fa-arrow-alt-down'
                        }
            ],

            codes: countryCodes
        };
    },
    created: function() {
        evBus.$on('saveInTrip', (engineItemId, engine) => {
            this.openSaveTripPopUp(engineItemId, engine);
        });
    },
    methods: {
        populateAdvanceFilters: async function() {

            return new Promise((resolve, reject) => {


                if (this.Activityfilters.filters) {

                    let advFilterData = this.doCleanArray(
                        this.Activityfilters.filters
                    );
                    this.categories = advFilterData.categories;
                    if(this.Activityfilters.appliedFilter && this.Activityfilters.appliedFilter.categories){
                        this.selCategories=this.Activityfilters.appliedFilter.categories.split(',')
                    }else{
                        this.selCategories=['Any'];
                    }
                    this.subCategories = advFilterData.subCategories;
                    if(this.Activityfilters.appliedFilter && this.Activityfilters.appliedFilter.subCategories){
                        this.selSubCategories=this.Activityfilters.appliedFilter.subCategories.split(',')
                    }else{
                        this.selSubCategories=['Any'];
                    }

                    if(advFilterData.priceRange) {

                        this.sliderMinVal = Math.floor(
                            advFilterData.priceRange.minPrice
                        );
                        this.sliderMaxVal = Math.ceil(
                            advFilterData.priceRange.maxPrice
                        );
                    }

                     this.sliderValue = [
                    this.Activityfilters.appliedFilter && this.Activityfilters.appliedFilter.priceRange.min ?  Math.floor(this.Activityfilters.appliedFilter.priceRange.min) : this.sliderMinVal,
                    this.Activityfilters.appliedFilter && this.Activityfilters.appliedFilter.priceRange.max ? Math.ceil(this.Activityfilters.appliedFilter.priceRange.max) : this.sliderMaxVal
                    ];
                    let star=advFilterData.starRating

                    if(star) {
                        star.push(-1)
                        this.starRating = star.reverse();
                    }

                    if(this.Activityfilters.appliedFilter && this.Activityfilters.appliedFilter.starRating){
                      let starRating = typeof this.Activityfilters.appliedFilter.starRating==='number' ? [this.Activityfilters.appliedFilter.starRating] : this.Activityfilters.appliedFilter.starRating.split(',').map(function (x) { return parseInt(x, 10); });
                      this.selstarRating = starRating
                    }else{
                        this.selstarRating=['Any'];
                    }
                    if(this.Activityfilters.appliedFilter && this.Activityfilters.appliedFilter.sortByField){
                        this.sortBy = this.Activityfilters.appliedFilter.sortByField.sortField+"-"+this.Activityfilters.appliedFilter.sortByField.sortOrder+"-"+this.Activityfilters.appliedFilter.sortByField.sortIsString
                        // console.log('this.sortBy',this.sortBy,'this.Activityfilters:',this.Activityfilters);
                    }else{
                        // console.log('there 2');
                        this.sortBy = 'finalPrice-asc-false';    
                    }
                    
                    resolve('data set');
                }

                resolve('data set');
            });
        },

        resetFilter() {
            let advFilterData = this.doCleanArray(this.Activityfilters.filters);
            this.selstarRating = ['Any'];
            this.sliderMinVal = Math.floor(advFilterData.priceRange.minPrice);
            this.sliderMaxVal = Math.ceil(advFilterData.priceRange.maxPrice);
            this.sliderValue = [this.sliderMinVal, this.sliderMaxVal];
            this.selCategories = ['Any'];
            this.selSubCategories = ['Any'];
            this.mblSelCategories = ['Any'];
            this.mblSelSubCategories = ['Any'];
            this.mblselStarRating = ['Any'];
            this.mblSliderMinVal = Math.floor(
                advFilterData.priceRange.minPrice
            );
            this.mblSliderMaxVal = Math.ceil(advFilterData.priceRange.maxPrice);
            this.mblSliderValue = [this.mblSliderMinVal, this.mblSliderMaxVal];
        },

        populateMobileFilters() {
            if (this.Activityfilters.filters) {
                let advFilterData = this.doCleanArray(
                    this.Activityfilters.filters
                );

                this.mblSliderMinVal = Math.floor(
                    advFilterData.priceRange.minPrice
                );
                this.mblSliderMaxVal = Math.ceil(
                    advFilterData.priceRange.maxPrice
                );
                this.mblSliderValue = [
                    this.Activityfilters.appliedFilter && this.Activityfilters.appliedFilter.priceRange.min ?  Math.floor(this.Activityfilters.appliedFilter.priceRange.min) : this.sliderMinVal,
                    this.Activityfilters.appliedFilter && this.Activityfilters.appliedFilter.priceRange.max ? Math.ceil(this.Activityfilters.appliedFilter.priceRange.max) : this.sliderMaxVal
                ];
                

                // SET-UP STAR RATING
                let star=advFilterData.starRating.slice(1)
               
                    star.push(0);
                this.starRating = star.reverse();
                if(this.Activityfilters.appliedFilter && this.Activityfilters.appliedFilter.starRating){
                  let starRating = typeof this.Activityfilters.appliedFilter.starRating==='number' ? [this.Activityfilters.appliedFilter.starRating] : this.Activityfilters.appliedFilter.starRating.split(',').map(function (x) { return parseInt(x, 10); });
                  this.mblselStarRating = starRating
                }else{
                    this.mblselStarRating=['Any'];
                }
                if(this.Activityfilters.appliedFilter && this.Activityfilters.appliedFilter.categories){
                    this.mblSelCategories=this.Activityfilters.appliedFilter.categories.split(',')
                }else{
                    this.mblSelCategories=['Any'];
                }
                if(this.Activityfilters.appliedFilter && this.Activityfilters.appliedFilter.subCategories){
                    this.mblSelSubCategories=this.Activityfilters.appliedFilter.subCategories.split(',')
                }else{
                 this.mblSelSubCategories=['Any'];
                }
                
            } else {
                // console.log('Advacne/Mobile Filters Data Not Found');
            } // Ends IF FILTERS
        }
    },
    computed: {
        ...mapState({
            Activityfilters: state => state.ActivityStore
        })
    }
};
