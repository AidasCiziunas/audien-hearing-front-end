<template>
    <section class="search-results">
        <GmapMap :center="center" :zoom="7" style="width: 100%; height: 500px">
            <GmapCluster :styles="styles">
                <GmapMarker
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="false"
                    @click="center = m.position"
                    :key="index"
                />
            </GmapCluster>
        </GmapMap>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import m1 from '../../../assets/images/m1.png';
export default {
    name: 'GoogleMap',

    data() {
        return {
            center: {},
            sizes: [53, 56, 66, 78, 90],
            imagePath: m1,
            imageExtension: 'png',
            markers: [],
            cluster_styles: [
                {
                    url: m1
                }
            ]
        };
    },

    computed: {
        ...mapState({
            StoreHotels: state => state.hotelStore
        }),

        styles() {
            var vm = this;
            return vm.sizes.map(function(value) {
                return {
                    url: m1,
                    height: value,
                    width: value,
                    anchorText: [21, 0]
                };
            });
        }
    },

    mounted() {
        this.popupData();
    },
    methods: {
        popupData() {
            let Search = this.StoreHotels.searchData;

            this.center.lat = parseFloat(Search.geoLat);
            this.center.lng = parseFloat(Search.geoLong);

            for (var i = 0; i < this.StoreHotels.hotels.length; i++) {
                this.markers.push({
                    position: {
                        lat: parseFloat(this.StoreHotels.hotels[i].lat),
                        lng: parseFloat(this.StoreHotels.hotels[i].lon)
                    }
                });
            }
        }
    }
};
</script>
