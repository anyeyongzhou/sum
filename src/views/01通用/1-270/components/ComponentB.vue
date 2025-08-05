<!-- ComponentB.vue -->
<script setup>
import { useCounter } from './useCounter';
const { count, decrement } = useCounter(); // 默认值0
</script>

<template>
	<button @click="decrement">B: {{ count }}</button>
</template>
