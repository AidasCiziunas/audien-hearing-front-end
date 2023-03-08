<template>
    <section class="search-results">
        <GmapMap :center="center" :zoom="7" style="width: 100%; height: 500px">
            <GmapCluster :styles="styles">
                <GmapMarker
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="false"
                    :key="index"
                    @click="openInfoWindowTemplate(index)"
                />
            </GmapCluster>

            <gmap-info-window
                :options="{
                    maxWidth: 300,
                    pixelOffset: { width: 0, height: -35 }
                }"
                :position="infoWindow.position"
                :opened="infoWindow.open"
                @closeclick="infoWindow.open = false"
            >
                <div v-html="infoWindow.template"></div>
            </gmap-info-window>
        </GmapMap>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import m1 from '../../../assets/images/m1.png';
export default {
    name: 'GoogleMap',
    props: [
    'FilterHotelName',
  ],
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
            ],

            infoWindow: {
                position: { lat: 0, lng: 0 },
                open: false,
                template: ''
            }
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
        },

        loadedDealers() {
            return this.getDealers;
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
        },

        openInfoWindowTemplate(index) {

            const {
                lat,
                lon,
                displayName,
                address,
                cityName
            } = this.StoreHotels.hotels[index];
            this.infoWindow.position = {
                lat: parseFloat(lat),
                lng: parseFloat(lon)
            };
            this.FilterHotelName(displayName);
            this.infoWindow.template = `<b>${displayName}</b> &nbsp; ${address} &nbsp;, ${cityName}<br>`;
            this.infoWindow.open = true;
            
        }
    }
};
</script>
