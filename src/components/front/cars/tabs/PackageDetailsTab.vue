<template>
    <div class="extra-include-list">
        <ul class="d-block w-100">
            <template v-if="car.details.packageDetails.length">
                <li
                    class="d-block w-100"
                    v-for="(pval, pkey) in car.details.packageDetails"
                    :key="pkey"
                >
                    <h5>
                        <i class="fas fa-circle"></i>
                        {{ pval }}
                    </h5>
                </li>
            </template>
            <template v-else>
                <li class="d-block w-100">
                    Unfortunately, our supplier has not provided any Package
                    Details.
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'PackageDetailsTab',
    props: ['car']
};
</script>

<style></style>
