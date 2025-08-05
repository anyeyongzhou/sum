<!-- ComponentA.vue -->
<script setup>
import { useCounter } from './useCounter';
const { count, increment, decrement } = useCounter(10); // 初始化值为10
</script>

<template>
	<button @click="increment">加: {{ count }}</button>
	<button @click="decrement">减: {{ count }}</button>
</template>
