<template>
  <div style="padding: 40px; background: #f8f8f8; min-height: 100vh">
    <CmpProgress percentage="50" />
    <CmpProgress percentage="70" status="success" :strokeWidth="10" />
    <CmpProgress percentage="40" status="exception" :strokeWidth="14" />
    <CmpProgress percentage="90" status="warning" :strokeWidth="8" />
    <CmpProgress percentage="70" :strokeWidth="26" :textInside="true" />
    <CmpProgress
      percentage="30"
      :strokeWidth="26"
      :textInside="true"
      status="success"
    />
    <CmpProgress
      percentage="50"
      :strokeWidth="26"
      :textInside="true"
      status="exception"
    />
    <CmpProgress
      percentage="80"
      :strokeWidth="26"
      :textInside="true"
      status="warning"
    />
  </div>
</template>

<script setup>
import CmpProgress from "./components/CmpProgress.vue";
</script>
