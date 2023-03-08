<template>
    <div class="listing-right-sidebar">
        <label id="trip-summary">
            <div class="listing-sidebar-head">
                <h4>Trip Summary</h4>
                <i class="fas fa-info-circle"></i>
            </div>
            <input class="d-none" type="checkbox" id="trip-summary-toggle" />
            <div class="listing-sidebar-body">
                <div class="sidebar-content">
                    <div class="in-top">
                        <div class="in-left">
                            <img
                                src="@/assets/images/car-small-icon.png"
                                alt="img"
                            />
                        </div>
                        <div class="in-right">
                            <h5>
                                Total Amount: $284.97
                                <i class="fas fa-angle-down"></i>
                            </h5>
                        </div>
                    </div>
                    <div class="in-bottom">
                        <ul>
                            <li>Ace</li>
                            <li>
                                Las Vegas
                                <span>(07/30/2020 05:30 PM)</span>
                                <img
                                    src="@/assets/images/small-reverse-arrow.png"
                                    alt="img"
                                />
                                San Francisco
                                <span>(07/31/2020 12:00 AM)</span>
                            </li>
                            <li>Status:</li>
                        </ul>
                        <div class="time-left">
                            <small>Time Left:</small>
                            <h4>
                                <img
                                    src="@/assets/images/clock-small.png"
                                    alt="img"
                                />
                                4:45 min
                            </h4>
                        </div>
                        <div class="time-buttons">
                            <v-btn color="primary" dark>Save To Later</v-btn>
                            <v-btn color="primary" dark>Not Booked</v-btn>
                        </div>
                    </div>
                </div>
                <div class="sidebar-content">
                    <div class="in-top">
                        <div class="in-left">
                            <img
                                src="@/assets/images/small-plane.png"
                                alt="img"
                            />
                        </div>
                        <div class="in-right">
                            <h5>
                                Total Amount: $124.72
                                <i class="fas fa-angle-down"></i>
                            </h5>
                        </div>
                    </div>
                    <div class="in-bottom">
                        <ul>
                            <li>2, Economy, Frontier Airlines</li>
                            <li>
                                San Diego
                                <span>(30/07/2020, 05:30 PM)</span>
                                <img
                                    src="@/assets/images/small-reverse-arrow.png"
                                    alt="img"
                                />
                                San Francisco
                                <span>(31/07/2020, 12:00 AM)</span>
                            </li>
                            <li>Status:</li>
                        </ul>
                        <div class="time-left">
                            <small>Time Left:</small>
                            <h4>
                                <img
                                    src="@/assets/images/clock-small.png"
                                    alt="img"
                                />
                                4:45 min
                            </h4>
                        </div>
                        <div class="time-buttons">
                            <v-btn color="primary" dark>Save To Later</v-btn>
                            <v-btn color="primary" dark>Not Booked</v-btn>
                        </div>
                    </div>
                </div>
                <div class="sidebar-content">
                    <div class="text-center">
                        <v-btn color="error" dark class="w-100">Checkout</v-btn>
                    </div>
                </div>
            </div>
        </label>
    </div>
</template>

<script>
export default {
    name: 'FlightTripSummary'
};
</script>

<style></style>
