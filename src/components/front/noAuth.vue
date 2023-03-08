<template>
    <div class="v-main v-main__wrap" style="display: block !important;">
        <app-navigation />

        <main class="back-office-page buttom">
            <section class="back-office-heading">
                <div class="backoffice-heading text-center">
                    <h1>Sorry! Unauthorised Access</h1>
                    <h1>
                        Unfortunately, there might something wrong. Please try
                        login again!
                    </h1>
                </div>
            </section>
        </main>

        <app-footer />

        <app-info-box />
    </div>
</template>

<script>
export default {
    name: 'NoAuth'
};
</script>
<style>
.top-main-banner {
    display: none !important;
}

.buttom {
    padding-bottom: 130px;
}

.back-office-heading h1 {
    color: #fff;
    font-size: 36px;
    text-transform: capitalize;
    font-weight: 600;
    text-shadow: 0px 0px 3px #000;
    margin-bottom: 10px;
    padding: 0px 15px;
   /* font-family: serif;*/
    letter-spacing: 1px;
}
</style>
