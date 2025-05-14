<template>
  <div>
    <div class="loading loading1">
      <div class="text">Loading...</div>
      <div class="box"></div>
    </div>

    <div class="loading loading2">
      <div class="box">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="text">
        <span>Loading</span>
        <span>Loading</span>
        <span>Loading</span>
        <span>Loading</span>
        <span>Loading</span>
        <span>Loading</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for this loading animations component
</script>

<style scoped>
.loading {
  position: relative;
  width: 200px !important;
  height: 200px;
  margin: 50px;
  font-size: 28px;
}

.loading1 .text {
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: text1 2s ease-in-out infinite;
}

.loading1 .box {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -80px;
  margin-top: -80px;
  width: 160px;
  height: 160px;
  background-color: #db2f00;
  animation: changeShape 2s ease-in-out infinite;
}

@keyframes changeShape {
  0% {
    border-radius: 0%;
    transform: scale(1) rotate(0deg);
    background-color: #db2f00;
  }
  50% {
    border-radius: 50%;
    transform: scale(0.5) rotate(360deg);
    background-color: #13a3a5;
  }
  100% {
    border-radius: 0%;
    transform: scale(1) rotate(720deg);
    background-color: #db2f00;
  }
}

@keyframes text1 {
  0% {
    font-size: 24px;
  }
  50% {
    font-size: 15px;
  }
  100% {
    font-size: 24px;
  }
}

.loading2 {
  text-align: center;
}

.loading2 .text {
  position: absolute;
  line-height: 200px;
  z-index: 99;
  color: #333;
}

.loading2 .text span {
  display: inline-block;
  font-weight: 900;
  font-size: 30px;
  animation: bigger 1.2s ease-in-out infinite;
}

.loading2 .text span:nth-child(2) {
  animation-delay: 0.1s;
}
.loading2 .text span:nth-child(3) {
  animation-delay: 0.2s;
}
.loading2 .text span:nth-child(4) {
  animation-delay: 0.3s;
}
.loading2 .text span:nth-child(5) {
  animation-delay: 0.4s;
}
.loading2 .text span:nth-child(6) {
  animation-delay: 0.5s;
}

.loading2 .box {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  background-color: #fff;
  transform: rotate(45deg);
  overflow: hidden;
  border: 1px solid green;
}

.loading2 .box span {
  display: inline-block;
  position: absolute;
  width: 5px;
  height: 100%;
  background-color: #db2f00;
}

.loading2 .box span:nth-child(1) {
  top: 5px;
  left: 0;
  transform-origin: top left;
  transform: rotate(-90deg);
  background-color: #13a3a5;
  animation: changeT 1.5s ease-in-out infinite;
}

.loading2 .box span:nth-child(2) {
  top: 0;
  right: 0;
  background-color: #db2f00;
  animation: changeR 1.5s ease-in-out infinite;
}

.loading2 .box span:nth-child(3) {
  bottom: 5px;
  right: 0;
  transform-origin: bottom right;
  transform: rotate(-90deg);
  background-color: #13a3a5;
  animation: changeB 1.5s ease-in-out infinite;
}

.loading2 .box span:nth-child(4) {
  top: 0;
  left: 0;
  background-color: #db2f00;
  animation: changeL 1.5s ease-in-out infinite;
}

@keyframes changeT {
  0% {
    left: 200px;
  }
  50% {
    left: 0px;
  }
  100% {
    left: -200px;
  }
}

@keyframes changeR {
  0% {
    top: 200px;
  }
  50% {
    top: 0px;
  }
  100% {
    top: -200px;
  }
}

@keyframes changeB {
  0% {
    right: 200px;
  }
  50% {
    right: 0px;
  }
  100% {
    right: -200px;
  }
}

@keyframes changeL {
  0% {
    top: -200px;
  }
  50% {
    top: 0px;
  }
  100% {
    top: 200px;
  }
}

/* Text scale animation */
@keyframes bigger {
  0% {
    transform: scale(1.1);
  }
  40% {
    transform: scale(1.4);
  }
  70%,
  100% {
    transform: scale(1.1);
  }
}
</style>
