<script setup>
import { useSharedState } from './useSharedState';
const { globalState } = useSharedState(); // 读取同一状态
</script>

<template>
	<div>D: {{ globalState.count }}</div>
</template>
