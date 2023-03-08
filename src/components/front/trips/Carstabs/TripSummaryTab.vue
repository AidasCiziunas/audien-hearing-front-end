<template>
  <div class="extra-include-list">
    <ul>
      <li>
        <div class="text">
          <h5>Pick-up Office Details</h5>
          <p>
            {{ car.pickupOffice.Name }}<br />
            {{ car.pickupOffice.PhoneNumber }}<br />
            {{ car.pickupOffice.Address }}
            <br />
          </p>
        </div>
      </li>
      <li v-if="car.pickTimes!==undefined">
        <div class="text">
          <h5>Pick-up Date and Time</h5>
          <p>
            {{ car.pickTimes.resDate }}
            |
            {{ car.pickTimes.resTime }}
          </p>
        </div>
      </li>
    </ul>
    <ul>
      <li>
        <div class="text">
          <h5>Drop-off Office Details</h5>
          <p>
            {{ car.dropoffOffice.Name }}<br />
            {{ car.dropoffOffice.PhoneNumber }}<br />
            {{ car.dropoffOffice.Address }}
            <br />
          </p>
        </div>
      </li>
      <li v-if="car.dropTimes!==undefined">
        <div class="text">
          <h5>Drop-off Date and Time</h5>
          <p>
            {{ car.dropTimes.resDate }}
            |
            {{ car.dropTimes.resTime }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TripSummaryTab",
  props: ["car"],
};
</script>

<style></style>
