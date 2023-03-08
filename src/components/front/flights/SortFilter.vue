<template>
    <div>
        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            style="z-index: 10000"
            transition="dialog-bottom-transition"
        >
            <v-card class="filter-main-popup">
                <v-toolbar light>
                    <v-btn icon @click="dialog = false">
                        <v-icon style="color: #fff !important"
                            >mdi-close</v-icon
                        >
                    </v-btn>
                    <v-spacer></v-spacer>
                    <h6 style="color: #fff !important">SortBy</h6>
                    <v-spacer></v-spacer>
                </v-toolbar>

                <div class="filter-popup-body">
                    <div class="filter-popup-body-inner">
                        <div class="filter-list">
                            <div class="filter-title">
                                <h5>SortBy</h5>
                            </div>
                            <ul class="filter-item-list">
                                <v-radio-group v-model="sortBy">
                                    <li
                                        v-for="(sort, index) in options"
                                        :key="index"
                                    >
                                        <div class="in-left">
                                            <p>{{ sort.title }}</p>
                                        </div>
                                        <div class="in-right">
                                            <v-row class="price-label">
                                                <v-radio
                                                    :value="sort.value"
                                                    color="primary"
                                                ></v-radio>
                                            </v-row>
                                        </div>
                                    </li>
                                </v-radio-group>
                            </ul>
                        </div>
                    </div>
                    <v-btn
                        color="primary"
                        class="filter-popup-fix-btn"
                        @click="search"
                    >
                        <img
                            src="@/assets/images/car-filter-btn-img.png"
                            alt="img"
                        />
                        Search
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import flightHelper from '@/helper/flightHelper.js';

export default {
    name: 'Filters',
    mixins: [flightHelper],
    props: {
        value: {
            type: Boolean
        },
        search: {
            type: Function
        },
        options: {
            type: Array,
            default() {
                return [
                    {
                        value: 'totalPrice-asc-false',
                        title: 'Price Low To High ↓'
                    },
                    {
                        value: 'totalPrice-desc-false',
                        title: 'Price High to Low ↑'
                    },
                    {
                        value: 'airlineName-asc-true',
                        title: 'Name A to Z ↓'
                    },
                    {
                        value: 'airlineName-desc-true',
                        title: 'Name Z to A ↑'
                    }
                ];
            }
        }
    },
    data() {
        return {
            sortBy: 'totalPrice-asc-false'
        };
    },
    updated() {
        this.$emit('onSortData', this.sortBy);
    },
    computed: {
        dialog: {
            get: function() {
                if (this.value) this.setDefaults();
                return this.value;
            },
            set: function(val) {
                this.$emit('input', val);
            }
        }
    }
};
</script>

<style scoped>
.right-padding {
    padding-right: 30px;
}
.price-label {
    justify-content: center;
    align-items: center;
}
.price-label .value {
    padding-right: 5px;
    font-size: 14px;
}
</style>
