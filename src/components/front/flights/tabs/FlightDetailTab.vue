<template>
    <div class="flight-tab-wrapper">
        <template v-for="(item, i) in details.itinerary">
            <div class="flight-timing" :key="`heading_${i}`">
                <v-checkbox
                    v-model="checkbox"
                    :label="`${item.titleLine}  | ${item.totalTime}`"
                >
                </v-checkbox>
                <p>
                    {{ item.flightWarning }}
                </p>
            </div>
            <div
                v-for="(flight, flightIndex) in item.flightSegment"
                class="flight-tab-list"
                :key="`segment_${Math.random()}${flightIndex}`"
            >
                <div v-if="!flight.changePlane">
                    <div>
                        <h6>{{ flight.flightTime }}</h6>
                        <h6>{{ flight.flightAirports }}</h6>
                    </div>
                    <div>
                        <p>
                            {{ flight.planeDetails.airlineName
                            }}{{
                                flight.planeDetails.airlineFlNumber
                            }}
                            Opertated by:{{
                                flight.planeDetails.operatedBy
                            }}
                            AirCraft Type:{{
                                flight.planeDetails.aircraftType
                            }}
                            Terminal:{{ flight.planeDetails.destTerminal }}
                        </p>
                    </div>
                    <!--  <div class="col-sm-6">
                       <h2>{{flight.flightTime}}</h2>
                       <p>{{flight.flightAirports}}</p>
                   </div> -->
                </div>
                <div v-if="flight.changePlane">
                    <div class="flex-space-between flight-timing with-border">
                        <div>{{ flight.changePlane }}</div>
                        <div>{{ flight.layoverCity }}</div>
                    </div>
                    <div class=" flight-timing ">
                        <h5>{{ flight.flightTime }}</h5>
                        <p>{{ flight.flightAirports }}</p>
                    </div>
                    <div>
                        <p>
                            {{ flight.planeDetails.airlineName
                            }}{{
                                flight.planeDetails.airlineFlNumber
                            }}
                            Opertated by:{{
                                flight.planeDetails.operatedBy
                            }}
                            AirCraft Type:{{
                                flight.planeDetails.aircraftType
                            }}
                            Terminal:{{ flight.planeDetails.destTerminal }}
                        </p>
                    </div>
                </div>
            </div>
            <!-- <div class="flight-timing with-border" :key="`overlay_${i}`">
               <template v-for="(segment, i) in item.flightSegment">
                <h4 :key="i"> {{ segment.changePlane}}</h4>
                <p>{{ segment.layoverCity}}</p>
               </template>
            </div> -->
        </template>
    </div>
</template>

<script>
export default {
    name: 'FlightDetailTab',
    props: ['details'],
    data() {
        return {
            checkbox: ''
        };
    },
    methods: {
        depart(segments) {
            let departTime = segments[0].flightTime.split('-')[0];
            let departAirport = segments[0].flightAirports.split('—')[0];

            return `${departTime} • ${departAirport}`;
        },
        arrival(segments) {
            let arriveTime = segments[0].flightTime.split('-')[1];
            let arriveAirport = segments[0].flightAirports.split('—')[1];

            return `${arriveTime} • ${arriveAirport}`;
        }
    }
};
</script>

<style scoped>
.flex-space-between {
    display: flex;
    justify-content: space-between;
    padding-left: 2%;
    padding-right: 2%;
}
</style>
