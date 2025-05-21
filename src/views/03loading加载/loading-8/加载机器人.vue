<template>
  <div>
    <div>
      <h2 class="monsterText">Hello <br />There</h2>
      <h3 class="opText">Ahhhh We’ll eat you</h3>
    </div>
    <div class="monster">
      <div class="eye">
        <div class="eyeball"></div>
      </div>
      <div class="mouth"></div>
    </div>
    <div class="monster blue">
      <div class="eye">
        <div class="eyeball"></div>
      </div>
      <div class="mouth"></div>
    </div>
    <div class="pageLoading" :class="{ complete: loadingComplete }">
      <div class="monster">
        <div class="eye">
          <div class="eyeball"></div>
        </div>
        <div class="mouth"></div>
      </div>
      <div class="loading">
        <div class="bar" :style="{ width: loadingWidth + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const loadingWidth = ref(0);
const loadingComplete = ref(false);

onMounted(() => {
  const timer = setInterval(() => {
    loadingWidth.value += 1;
    if (loadingWidth.value > 100) {
      loadingComplete.value = true;
      setTimeout(() => {
        document.querySelector(".monsterText").innerHTML =
          "We are<br>SQUARE<br>MONSTER!";
      }, 3000);
      clearInterval(timer);
    }
  }, 30);
});
</script>

<style scoped>
.monster {
  width: 110px !important;
  height: 100px;
  background-color: #e55a54;
  border-radius: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  flex-direction: column;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  animation: jumping 0.8s infinite alternate;
}

.monster .eye {
  width: 40%;
  height: 40%;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.monster .eyeball {
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background-color: #0c4475;
  animation: eyemove 1.6s infinite alternate;
}

.monster .mouth {
  width: 32%;
  height: 12px;
  border-radius: 12px;
  background-color: white;
  margin-top: 15%;
}

.monster:before,
.monster:after {
  content: "";
  display: block;
  width: 20%;
  height: 10px;
  position: absolute;
  left: 50%;
  top: -10px;
  background-color: #fff;
  border-radius: 10px;
}

.monster:before {
  transform: translateX(-70%) rotate(45deg);
}

.monster:after {
  transform: translateX(-30%) rotate(-45deg);
}

.monster.blue {
  background-color: #0c4475;
  animation-delay: 0.5s;
}

.monster.blue .mouth,
.monster.blue .eyeball {
  background-color: #e55a54;
}

@keyframes jumping {
  50% {
    top: 0;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
  100% {
    top: -50px;
    box-shadow: 0px 120px 50px rgba(0, 0, 0, 0.2);
  }
}

@keyframes eyemove {
  0%,
  10% {
    transform: translate(50%);
  }
  90%,
  100% {
    transform: translate(-50%);
  }
}

h2 {
  color: white;
  font-size: 40px;
  margin-right: 50px;
}

h3 {
  margin-top: 0;
  opacity: 0.5;
  color: white;
}

.pageLoading {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0c4475;
  flex-direction: column;
  transition: opacity 0.5s 0.5s;
}

.pageLoading.complete {
  opacity: 0;
}

.pageLoading.complete .monster {
  transition: 0.5s;
  transform: scale(0.01) rotate(360deg);
}

.loading {
  width: 200px;
  height: 8px;
  margin-top: 80px;
  border-radius: 5px;
  background-color: #fff;
  overflow: hidden;
  transition: 0.5s;
}

.loading .bar {
  background-color: #e55a54;
  width: 0%;
  height: 100%;
}
</style>
