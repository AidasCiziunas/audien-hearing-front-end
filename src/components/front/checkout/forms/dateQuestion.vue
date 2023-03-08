<template>

    <div class="add-travel-input">
        <label class="input-label">{{ QST.label }}</label>
        <div class="add-travel-input" v-if="QST.required != 'OPTIONAL'">
            <v-row>
                <div class="col-4">
                    <v-select :items="months" :rules="[
                        v => !!v || ''
                    ]" v-model="QST.month" class="month" @click="setMonths()" @change="update(QST)" label="Month">
                    </v-select>

                </div>
                <div class="col-4">
                    <v-select :items="days" :rules="[
                        v => !!v || ''
                    ]" v-model="QST.day" @click="setDays()" @change="update(QST)" label="Day">
                    </v-select>
                </div>
                <div class="col-4">
                    <v-select :items="years" v-model="QST.year" :rules="[
                        v => !!v || ''
                    ]" @click="setYears()" @change="update(QST)" label="Year"></v-select>
                </div>
            </v-row>
        </div>
        <div class="add-travel-input" v-if="QST.required == 'OPTIONAL'">
            <v-row>
                <div class="col-4">
                    <v-select :items="months" v-model="QST.month" class="month" @click="setMonths()"
                        @change="update(QST)" label="Month">
                    </v-select>

                </div>

                <div class="col-4">

                    <v-select :items="days" v-model="QST.day" @click="setDays()" @change="update(QST)" label="Day">
                    </v-select>
                </div>

                <div class="col-4">
                    <v-select :items="years" v-model="QST.year" @click="setYears()" @change="update(QST)" label="Year">
                    </v-select>
                </div>
            </v-row>
        </div>
    </div>
</template>
<script>
var moment = require('moment');
export default {
    name: 'dateQuestion',
    props: [
        'QST'
    ],
    data() {
        return {
            changed: 0,
            years: [],
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            days: []
        }
    },
    mounted() {
        this.filterQuestionAnswer();
    },
    methods: {
        update(QST1) {
            this.QST = QST1;
            this.$parent.update(QST1);
        },
        setYears() {
            let currentYear = moment(Date.now()).format("yyyy");
            if ((this.QST && this.QST.id != 'DATE_OF_BIRTH')) {
                currentYear = parseInt(currentYear);
                let formated_years = [];
                for(let i=1;i <= 100;i++){
                    formated_years.push(parseInt(currentYear)+parseInt(i));
                }
                this.years = formated_years;
            }
            else{
                let hundardYearBack = parseInt(currentYear) - parseInt(100);
                let formated_years = [];
                for (var i = hundardYearBack; i <= currentYear; i++) {
                    formated_years.push(i);
                }
                this.years = formated_years.reverse();
            }
            
        },
        setMonths() {
            let loaded_months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            if ((this.QST && this.QST.id == 'DATE_OF_BIRTH')) {
                let currentYear = moment(Date.now()).format("yyyy");
                let currentMonth = moment(Date.now()).format("M");
                if (this.QST.year < currentYear) {
                    this.months = loaded_months;
                }
                else {
                    this.months = loaded_months.filter((month) => month <= currentMonth);
                }
            }
            else {
                this.months = loaded_months;
            }
        },
        setDays() {
            const startOfMonth = 1;
            var endOfMonth = moment(Date.now()).clone().endOf('month').format('DD');
            if (this.QST.month || this.changed > 0) {
                endOfMonth = moment(this.QST.month, 'M').clone().endOf('month').format('DD');
            }

            let formated_days = [];
            for (var i = startOfMonth; i <= endOfMonth; i++) {
                if (i == '01') {
                    formated_days.push(1);
                } else {
                    formated_days.push(i);
                }
            }
            this.days = formated_days;
        },
        filterQuestionAnswer() {
            //console.log('QST:',this.QST,'question:',this.$store.getters.tripSummary.trip_bookings);
            // this.$store.getters.tripSummary.trip_bookings.forEach((booking) => {
            //     console.log('booking 12: ', booking);
            //     if (booking.travellerInfo) {
            //         booking.travellerInfo.map((traveller) => {
            //             console.log('traveller 12: ', traveller);
            //             if (traveller.bookingQuestionAnswers) {
            //                 traveller.bookingQuestionAnswers.map((question) => {
            //                     console.log('question 13:', question, 'QST13:', this.QST);
            //                     if ((question.question == this.QST.id) && (question.travelerNum == this.QST.travelerNum)) {
            //                         console.log('QST 14:', this.QST, 'question 14:', question);
            //                     }
            //                 })
            //             }
            //         })
            //     }

            // })
        }
    }
}
</script>