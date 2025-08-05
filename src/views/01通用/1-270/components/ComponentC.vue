<script setup>
import { useSharedState } from './useSharedState';
const { globalState, increment } = useSharedState();
</script>

<template>
	<button @click="increment">C: {{ globalState.count }}</button>
</template>
