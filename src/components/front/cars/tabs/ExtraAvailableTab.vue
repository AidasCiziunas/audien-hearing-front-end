<template>
    <div>
        <div class="extra-include-list">
         
            <template v-if="car.details.extras.length">
                 <ul class="d-block w-100">
            <li
                class="d-block w-100 ml-0"
              v-for="(ext, ind) in car.details.extras"
                :key="ind"
               
            >
                <h5 style="display: block">
                    {{ ext.Equipment.Title }}
                </h5>
                
                <p   >
                    {{ ext.Equipment.Description }}
                </p>
            </li>
        </ul>
                
            </template>
            <template v-else>
                <p style="padding-left:15px;">
                    No Extras Available
                </p>
            </template>
        </div>
        <p class="align-car" style="padding-left:15px;">
            Contact the Car Rental Agency for final pricing and details.
        </p>
    </div>
</template>

<script>
export default {
    name: 'ExtraAvailableTab',
    props: ['car']
};
</script>

<style></style>
