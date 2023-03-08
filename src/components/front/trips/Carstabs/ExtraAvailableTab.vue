<template>
  <div>
    <div class="extra-include-list">
      <template v-if="car.extras.length">
        <ul v-for="(ext, ind) in car.extras" :key="ind">
          <li>
            <div class="in-left">
              <p>
                {{ ext.Equipment.Title }}
              </p>
            </div>

            <div class="in-right">
              <p>{{ currencySymbol }}{{ ext.Charge.Price }}</p>
            </div>
          </li>
        </ul>
      </template>
      <template v-else-if="car.Extras.length">
        <ul v-for="(ext, ind) in car.Extras.CarExtra" :key="ind">
          <li>
            <div class="in-left">
              <p>
                {{ ext.Equipment.Title }}
              </p>
            </div>

            <div class="in-right">
              <p>{{ currencySymbol }}{{ ext.Charge.Price }}</p>
            </div>
          </li>
        </ul>
      </template>
      <template v-else>
        <p style="padding-left:15px;">Unfortunately, our supplier has not provided any extra car details.</p>
      </template>
    </div>
    <p class="align-car" style="padding-left:15px;">
      Contact the Car Rental Agency for final pricing and details.
    </p>
  </div>
</template>

<script>
export default {
  name: "ExtraAvailableTab",
  props: ["car"],
};
</script>

<style></style>
