<template>
    <div class="extra-include-list">
        
        <ul class="d-block w-100">
            <li class="d-block w-100" >
               <h5>Fair Family</h5>
                <p> {{flight.cabinClass}} </p>
            </li>
            <li class="d-block w-100" v-for="(item, i) in details" :key="i">
                <h5>{{ i }}</h5>
                <p v-html="item"></p>
            </li>
        </ul>
        <span
            class="alert alert-warning details-tab"
            v-if="details.length == 0"
        >
            <i class="fas fa-exclamation-triangle" style="color: #856404"></i>
            Unfortunately, our supplier has not provided any fare rule details.
        </span>
    </div>
</template>

<script>
export default {
    name: 'FareDisclamierTab',
    props: ['flight','details'],
    data() {
        return {};
    },

    mounted() {
        // console.log(this.details.length);
    }
};
</script>

<style></style>
