<template>
  <div class="container">
    <section @mousemove="handleMouseMove">
      <p>
        The only survivor couldn't tell us why the zimtrum sank. It seems that
        the speed of the ship's sinking is very fast. This theory can be
        supported by a lot of debris. However, the specific cause of the
        cracking could not be determined. No drastic weather changes were
        reported in the radio navigation signal area that day. Survivors'
        estimates of the weather based on their impressions are unreliable.
        Weather was at best one of the factors that led to the sinking of the
        ship. The reason may be inside the ship. The explosion of the boiler may
        be serious, but the survivors believe that there is a mechanical
        explosion. The ship has lived for 29 years (made in 1948 at erlanson and
        skank shipyards in Malmo) and was renovated in 1970. Bad weather and
        fatigue of the ship's structure may have contributed to the accident,
        but this is only speculation. There were no reports of accidents with
        other vessels in that area that day, so there was no possibility of
        collision with other vessels. There is a possibility of collision with
        the wreckage, but this cannot be confirmed.The only survivor couldn't
        tell us why the zimtrum sank. It seems that the speed of the ship's
        sinking is very fast. This theory can be supported by a lot of debris.
        However, the specific cause of the cracking could not be determined. No
        drastic weather changes were reported in the radio navigation signal
        area that day. Survivors' estimates of the weather based on their
        impressions are unreliable. Weather was at best one of the factors that
        led to the sinking of the ship. The reason may be inside the ship. The
        explosion of the boiler may be serious, but the survivors believe that
        there is a mechanical explosion. The ship has lived for 29 years (made
        in 1948 at erlanson and skank shipyards in Malmo) and was renovated in
        1970. Bad weather and fatigue of the ship's structure may have
        contributed to the accident, but this is only speculation. There were no
        reports of accidents with other vessels in that area that day, so there
        was no possibility of collision with other vessels. There is a
        possibility of collision with the wreckage, but this cannot be
        confirmed.The only survivor couldn't tell us why the zimtrum sank. It
        seems that the speed of the ship's sinking is very fast. This theory can
        be supported by a lot of debris. However, the specific cause of the
        cracking could not be determined. No drastic weather changes were
        reported in the radio navigation signal area that day. Survivors'
        estimates of the weather based on their impressions are unreliable.
        Weather was at best one of the factors that led to the sinking of the
        ship. The reason may be inside the ship. The explosion of the boiler may
        be serious, but the survivors believe that there is a mechanical
        explosion. The ship has lived for 29 years (made in 1948 at erlanson and
        skank shipyards in Malmo) and was renovated in 1970. Bad weather and
        fatigue of the ship's structure may have contributed to the accident,
        but this is only speculation. There were no reports of accidents with
        other vessels in that area that day, so there was no possibility of
        collision with other vessels. There is a possibility of collision with
        the wreckage, but this cannot be confirmed.The only survivor couldn't
        tell us why the zimtrum sank. It seems that the speed of the ship's
        sinking is very fast. This theory can be supported by a lot of debris.
        However, the specific cause of the cracking could not be determined. No
        drastic weather changes were reported in the radio navigation signal
        area that day. Survivors' estimates of the weather based on their
        impressions are unreliable. Weather was at best one of the factors that
        led to the sinking of the ship. The reason may be inside the ship. The
        explosion of the boiler may be serious, but the survivors believe that
        there is a mechanical explosion. The ship has lived for 29 years (made
        in 1948 at erlanson and skank shipyards in Malmo) and was renovated in
        1970. Bad weather and fatigue of the ship's structure may have
        contributed to the accident, but this is only speculation. There were no
        reports of accidents with other vessels in that area that day, so there
        was no possibility of collision with other vessels. There is a
        possibility of collision with the wreckage, but this cannot be
        confirmed.The only survivor couldn't tell us why the zimtrum sank. It
        seems that the speed of the ship's sinking is very fast. This theory can
        be supported by a lot of debris. However, the specific cause of the
        cracking could not be determined. No drastic weather changes were
        reported in the radio navigation signal area that day. Survivors'
        estimates of the weather based on their impressions are unreliable.
        Weather was at best one of the factors that led to the sinking of the
        ship. The reason may be inside the ship. The explosion of the boiler may
        be serious, but the survivors believe that there is a mechanical
        explosion. The ship has lived for 29 years (made in 1948 at erlanson and
        skank shipyards in Malmo) and was renovated in 1970. Bad weather and
        fatigue of the ship's structure may have contributed to the accident,
        but this is only speculation. There were no reports of accidents with
        other vessels in that area that day, so there was no possibility of
        collision with other vessels. There is a possibility of collision with
        the wreckage, but this cannot be confirmed.
      </p>
      <div id="shang" :style="{ width: `${shangWidth}px` }"></div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const shangWidth = ref(0);

const handleMouseMove = e => {
  shangWidth.value = e.clientX;
};
</script>

<style lang="scss" scoped>
$background-color: rgb(5, 5, 5);
$text-color: rgba(78, 75, 75, 0.1);
$bg-image: url(./bg.png);
$rose-image: url(/@/assets/rose/rose-2.jpg);

.container {
  width: 100%;
  height: 100%;
}
section {
  width: 100%;
  height: 50%;
  overflow: hidden;
  background-color: $background-color;
  cursor: pointer;
}

p {
  position: fixed;
  top: 0;
  left: 0;
  font-size: 20px;
  letter-spacing: -1px;
  line-height: 12px;
  background: $bg-image;
  background-size: 100%;
  -webkit-background-clip: text;
  background-clip: text;
  text-align: justify;
  color: $text-color;
}

div {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: $rose-image;
  background-size: 100%;
  background-attachment: fixed;
  filter: contrast(2);
}
</style>
