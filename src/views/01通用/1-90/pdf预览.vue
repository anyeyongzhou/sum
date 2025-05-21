<template>
	<div class="home">
		<div class="containers">
			<VuePdfEmbed annotation-layer text-layer :source="pdfSource" />
		</div>
	</div>
</template>

<script setup>
import VuePdfEmbed from 'vue-pdf-embed';
import aaa from './aaa.pdf';

// optional styles
import 'vue-pdf-embed/dist/styles/annotationLayer.css';
import 'vue-pdf-embed/dist/styles/textLayer.css';

// either URL, Base64, binary, or document proxy
const pdfSource = aaa;
</script>

<style lang="scss" scoped>
.home {
	height: 100%;
	width: 100%;
	background-color: #fff;
	position: relative;
	overflow-y: scroll;

	.containers {
		width: 100%;
		height: 100%;
		padding: 10px;
		border: 1px solid black;
	}
}
</style>
