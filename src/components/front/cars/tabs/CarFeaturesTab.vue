<template>
    <div class="cartab-specs-content">
        <ul>
            <li v-if="domain == 'us'">
                <i class="fas fa-gas-pump"></i>
                Gasoline
            </li>
            <li v-if="domain != 'us'">
                <i class="fas fa-gas-pump"></i>
                Petrol
            </li>
            <li>
                <i class="fas fa-cog"></i>
                Automatic
            </li>
            <li>
                <i class="fas fa-dharmachakra"></i>
                2WD
            </li>
            <li>
                <i class="fas fa-stroopwafel"></i>
                Air Conditioning
            </li>
            <li>
                <i class="fas fa-stroopwafel"></i>
                Airbag
            </li>
            <li>
                <i class="fas fa-stroopwafel"></i>
                FM Radio
            </li>
            <li>
                <i class="fas fa-stroopwafel"></i>
                Sensor
            </li>
            <li>
                <i class="fas fa-stroopwafel"></i>
                Power Windows
            </li>
            <li>
                <i class="fas fa-stroopwafel" v-if="domain == 'us'"></i>
                Speed MPH
            </li>
            <li>
                <i class="fas fa-stroopwafel"></i>
                Enhanced Cleaning
            </li>
            <li v-if="domain != 'us'">
                <i class="fas fa-stroopwafel"></i>
                Speed MPH
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'CarFeatures'
};
</script>
