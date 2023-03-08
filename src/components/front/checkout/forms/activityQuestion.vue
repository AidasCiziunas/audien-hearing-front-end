<template>
    <div v-show="(hasVisibleQuestions == true)">
        <div class="step2-payment-information">
            <h3>Traveler Questions</h3>
        </div>
        <div class="setmargin">
            <div class="row ml-0 mr-o mt-2 align-center">
                <div v-for="(QST, qstIndex) in compQuestions" v-bind:class="getClassOfQuestion(qstIndex, totalRecords)">
                    
                    <!--Case For String or Text Field-->
                    <div v-if="QST.type == 'STRING'" v-show="QST.visibility == true">
                        <div class="add-travel-input" v-if="QST.required == 'MANDATORY'">

                            <label class="input-label">{{ QST.label }} *</label>
                            <v-text-field :placeholder="QST.label" v-model="QST.answer"
                                @input="makeSetQuestionAnswer(QST)" :rules="[
                                    v => !!v || 'This field is required.'
                                ]" :maxlength="parseInt(QST.maxlength)"></v-text-field>
                        </div>

                        <div class="add-travel-input" v-if="QST.required != 'MANDATORY'">
                            <label class="input-label">{{ QST.label }} </label>
                            <v-text-field :placeholder="QST.label" v-model="QST.answer"
                                @input="makeSetQuestionAnswer(QST)" :maxlength="parseInt(QST.maxlength)"></v-text-field>
                        </div>
                    </div>


                    <!--Case For String or Text Field-->
                    <div v-if="QST.type == 'LOCATION_REF_OR_FREE_TEXT'">
                        <div class="add-travel-input" v-if="QST.required == 'MANDATORY'">

                            <label class="input-label">{{ QST.label }} *</label>
                            <v-text-field :placeholder="QST.label" v-model="QST.answer"
                                maxlength="parseInt(QST.maxlength)" @input="makeSetQuestionAnswer(QST)" :rules="[
                                    v => !!v || 'This field is required.'
                                ]" hint="QST.hint" :maxlength="parseInt(QST.maxlength)"></v-text-field>
                        </div>

                        <div class="add-travel-input" v-if="QST.required != 'MANDATORY'">
                            <label class="input-label">{{ QST.label }} </label>
                            <v-text-field :placeholder="QST.label" v-model="QST.answer"
                                maxlength="parseInt(QST.maxlength)" @input="makeSetQuestionAnswer(QST)" hint="QST.hint"
                                :maxlength="parseInt(QST.maxlength)">
                            </v-text-field>
                        </div>
                    </div>


                    <!--Case For Date Field-->
                    <div v-if="QST.type == 'DATE' && QST.visibility == true">
                        <div class="add-travel-input">
                            <date-question :QST="QST"></date-question>
                        </div>
                    </div>

                    <!--Case For Time Field-->
                    <div v-if="QST.type == 'TIME'">
                        <div class="add-travel-input">
                            <div class="add-travel-input" v-if="QST.required != 'OPTIONAL'">
                                <v-text-field :label="QST.label" :placeholder="QST.label" v-model="QST.answer" :rules="[
                                    v =>
                                        !!v ||
                                        QST.Message
                                ]" :hint="QST.hint" :maxlength="parseInt(QST.maxlength)" placeholder="HH:mm" outlined
                                    @input="makeSetQuestionAnswer(QST)"></v-text-field>
                            </div>
                            <div class="add-travel-input" v-if="QST.required == 'OPTIONAL'">
                                <v-text-field :label="QST.label" :placeholder="QST.label" v-model="QST.answer"
                                    :hint="QST.hint" :maxlength="parseInt(QST.maxlength)" placeholder="HH:mm" outlined
                                    @input="makeSetQuestionAnswer(QST)"></v-text-field>
                            </div>
                        </div>
                    </div>

                    <!--Case For NUMBER Field-->
                    <div v-if="QST.type == 'NUMBER'">
                        <div class="add-travel-input" v-if="QST.required == 'MANDATORY'">
                            <label class="input-label">{{ QST.label }}</label>
                            <v-text-field type="number" v-model="QST.answer" :placeholder="QST.label" :rules="[
                                v => !!v || 'This field is required.'
                            ]" @input="makeSetQuestionAnswer(QST)"></v-text-field>
                        </div>

                        <div class="add-travel-input" v-if="QST.required != 'MANDATORY'">
                            <label class="input-label">{{ QST.label }} </label>
                            <v-text-field type="number" :placeholder="QST.label" v-model="QST.answer"
                                @input="makeSetQuestionAnswer(QST)"></v-text-field>
                        </div>
                    </div>

                    <!--Case For NUMBER_AND_UNIT Field-->
                    <div v-if="QST.type == 'NUMBER_AND_UNIT'">
                        <div class="add-travel-input" v-if="QST.required == 'MANDATORY'">

                            <label class="input-label">{{ QST.label }}</label>

                            <v-text-field type="number" v-model="QST.answer" :placeholder="QST.label" :rules="[
                                v => !!v || 'This field is required.'
                            ]" style="width: 50%!important; float:left;" @input="makeSetQuestionAnswer(QST)">
                            </v-text-field>

                            <v-select :items="QST.units" v-model="QST.unit" :maxlength="parseInt(QST.maxlength)"
                                style="width: 20%!important; float:left; margin-left: 10px;" label="Unit"
                                @input="makeSetQuestionAnswerUnit(QST)"></v-select>
                        </div>

                        <div class="add-travel-input" v-if="QST.required != 'MANDATORY'">
                            <label class="input-label">{{ QST.label }}</label>

                            <v-text-field type="number" v-model="QST.answer" :placeholder="QST.label" :rules="[
                                v =>
                                    !!v ||
                                    QST.Message
                            ]" style="width: 50%!important; float:left;" :maxlength="parseInt(QST.maxlength)">
                            </v-text-field>

                            <v-select :items="QST.units" v-model="QST.unit"
                                style="width: 20%!important; float:left; margin-left: 10px;" label="Unit"
                                @input="makeSetQuestionAnswerUnit(QST)"></v-select>
                        </div>
                    </div>
                </div>
                <!--LAST DIV-->
            </div>
        </div>

    </div>

</template>

<script>
var moment = require('moment');

import { evBus } from '@/services/bus.js';
import dobFlight from '@/components/common/widgets/dobActivity.vue';
import PhoneNumSelect from '@/components/common/widgets/PhoneNumSelect.vue';
import dateQuestion from './dateQuestion.vue';
export default {
    name: 'ActivityQuestion',
    props: [
        'trvQuestions',
        'objTraveler'
    ],
    components: {
        PhoneNumSelect,
        dobFlight,
        dateQuestion
    },
    data() {
        return {
            questions: [],
            totalRecords: 0,
            totalRows: 0,
            lastRowBySix: true,
            hasVisibleQuestions:false,
            handeledFieldTypes: [
                "DATE",
                "STRING",
                "NUMBER_AND_UNIT",
                "NUMBER",
                "LOCATION_REF_OR_FREE_TEXT",
                "TIME"
            ],
            QST: false
        };
    },

    created: function () {

        this.questions = this.doCleanArray(this.trvQuestions);

        this.totalRecords = parseInt(this.questions.length);

        this.totalRows = Math.ceil(this.totalRecords / 2) - 1;

        this.lastRowBySix = (parseInt(this.totalRecords) % 2 == 0) ? true : false;

        this.totalRecords = parseInt(this.questions.length) - 1;

        this.checkIsFieldHandeled();
    },

    computed: {
        compQuestions() {
            let questions = this.doCleanArray(this.questions);
            this.hasVisibleQuestions = false;
            questions.map((question, i) => {
                questions[i] = this.getQuestionAnswer(question);
                if (question.visibility == true) {
                    this.hasVisibleQuestions = true;
                }
            });
            return questions;
        },
    },
    methods: {
        update(QST) {
            if (QST.year != null && QST.month != null && QST.day != null) {
                QST.answer = QST.year + '-' + QST.month + '-' + QST.day;
            }
            else {
                QST.answer = null;
            }
            this.makeSetQuestionAnswer(QST);
        },
        makeSetQuestionAnswer(Question) {
            this.$emit('answered', Question);
        },
        makeSetQuestionAnswerUnit(Question) {
            this.$emit('answeredUnit', Question);
        },
        getClassOfQuestion(qstIndex, totalRecords) {

            if (qstIndex == totalRecords && this.lastRowBySix == false)
                return 'col-md-12 col-sm-12';

            return 'col-md-6 col-sm-6';
        },
        checkIsFieldHandeled() {

            let _allQuestions = this.questions;
            let _fieldTypeNotHandeled = [];

            _allQuestions.forEach(element => {

                if (!this.handeledFieldTypes.includes(element.type))
                    _fieldTypeNotHandeled.push(element.type);
            });

            console.info(
                'Field Types Handeled To Display Question Of Types: ',
                this.handeledFieldTypes.toString(', ')
            );

            console.info(
                'Field Types Not Handeled: ',
                (_fieldTypeNotHandeled.length) ? 'Nothing' : _fieldTypeNotHandeled.toString(', ')
            );

        } // Ends func()

    }

};
</script>