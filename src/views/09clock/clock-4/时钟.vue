<template>
  <div>
    <div class="clock" id="clock">
      <div class="hours" ref="hoursNode">
        <img src="./images/hourHand.png" alt="Hour Hand" />
      </div>
      <div class="minute" ref="minuteNode">
        <img src="./images/minuteHand.png" alt="Minute Hand" />
      </div>
      <div class="second" ref="secNode">
        <img src="./images/secondHand.png" alt="Second Hand" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const hoursNode = ref(null);
const minuteNode = ref(null);
const secNode = ref(null);

const updateClock = () => {
  setInterval(update, 1000);
  update();
};

const update = () => {
  const date = new Date();
  let h = date.getHours() % 12; // 12-hour format
  const min = date.getMinutes();
  const sec = date.getSeconds();

  const sec_deg = sec * 6;
  const min_deg = min * 6 + sec * 0.1; // Adding seconds to minute hand
  const hours_deg = h * 30 + min * 0.5; // Adding minutes to hour hand
  hoursNode.value.style.transform = `rotate(${hours_deg}deg)`;
  minuteNode.value.style.transform = `rotate(${min_deg}deg)`;
  secNode.value.style.transform = `rotate(${sec_deg}deg)`;
};

onMounted(() => {
  nextTick(() => {
    updateClock();
  });
});
</script>

<style scoped>
.clock {
  position: relative;
  width: 378px !important;
  height: 378px;
  margin: 100px auto;
  background: url(./images/clockFace.png) no-repeat;
}

.clock div {
  position: absolute;
}

.clock div.hours img,
.clock div.minute img,
.clock div.second img {
  transition: transform 0.5s linear;
}
</style>
