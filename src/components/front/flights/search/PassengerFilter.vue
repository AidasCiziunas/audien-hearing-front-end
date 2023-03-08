<template>
    <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
        <template v-slot:activator="{ on, attrs }">
            <a class="w-40" v-bind="attrs" v-on="on">
                <small>Passenger</small>
                {{ passenger }}
                <i class="fas fa-caret-down"></i>
            </a>
        </template>
        <v-card class="pass-dropdown">
            <div class="outer-div">
                <div>
                    <strong>Adults</strong>
                    <small>( 12yrs - 65yrs )</small>
                </div>
                <div class="counter-div">
                    <button @click="removeCount('adult')">-</button>
                    <p>{{ adults }}</p>
                    <button @click="addCount('adult')">+</button>
                </div>
            </div>
            <div class="outer-div">
                <div>
                    <strong>Seniors </strong>
                    <small>( 65+ yrs )</small>
                </div>
                <div class="counter-div">
                    <button @click="removeCount('seniors')">-</button>
                    <p>{{ seniors }}</p>
                    <button @click="addCount('seniors')">+</button>
                </div>
            </div>
            <div class="outer-div">
                <div>
                    <strong>Children</strong>
                    <small>( Below 12 yrs )</small>
                </div>
                <div class="counter-div">
                    <button @click="removeCount('child')">-</button>
                    <p>{{ child }}</p>
                    <button @click="addCount('child')">+</button>
                </div>
            </div>

            <div class="outer-div">
                <div>
                    <strong>Lap Infants</strong>
                    <small>( Below 2 yrs )</small>
                </div>
                <div class="counter-div">
                    <button @click="removeCount('infants')">-</button>
                    <p>{{ infants }}</p>
                    <button @click="addCount('infants')">+</button>
                </div>
            </div>
        </v-card>
    </v-menu>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'PassengerFilter',
    data() {
        return {
            child: 0,
            adults: 0,
            infants: 0,
            seniors: 0
        };
    },
    updated() {
        let data = {
            child: this.child,
            adults: this.adults,
            infants: this.infants,
            seniors: this.seniors
        };
        this.$emit('onFilterChange', data);
    },
    mounted() {
        let { adults, child, infants, seniors } = this.flightStore;
        this.adults = Number(adults);
        this.child = Number(child);
        this.infants = Number(infants);
        this.seniors = Number(seniors);
    },
    methods: {
        addCount(type) {
            if (type == 'child') {
                this.child = 1 + this.child;
            }
            if (type == 'adult') {
                this.adults = 1 + this.adults;
            }
            if (type == 'infants') {
                this.infants = 1 + this.infants;
            }
            if (type == 'seniors') {
                this.seniors = 1 + this.seniors;
            }
        },
        removeCount(type) {
            if (type == 'child') {
                let count = this.child - 1;
                this.child = count >= 0 ? count : 0;
            }
            if (type == 'adult') {
                let count = this.adults - 1;
                this.adults = count >= 0 ? count : 0;
            }
            if (type == 'infants') {
                let count = this.infants - 1;
                this.infants = count >= 0 ? count : 0;
            }
            if (type == 'seniors') {
                let count = this.seniors - 1;
                this.seniors = count >= 0 ? count : 0;
            }
        }
    },
    computed: {
        ...mapState({
            flightStore: state => state.flightStore.searchData
        }),
        passenger() {
            let passenger =
                this.adults + this.child + this.infants + this.seniors;
            return passenger;
        }
    }
};
</script>

<style></style>
