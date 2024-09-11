<script setup lang='ts'>
import { computed, onMounted, reactive, ref } from 'vue';
import { api } from '/@/api/common';
const emit = defineEmits(['change'])
const {getDictItems} = api()
const props = defineProps({
	typeStr: {
		type: Boolean
	},
	placeholder: {
		type: String
	},
	disabled: {
		type: Boolean
	},
	dictCode: {
		type: String
	},
	value:[String,Number]
})

const getValue = computed(()=>{
	return props.value != null?props.value.toString() : undefined
})
onMounted(()=>{
	init()
})
let dictOption = ref([])
const init = ()=>{
	getDictItems(props.dictCode).then(res=>{
		if(res.success){
			dictOption.value = [...res.result]
		}
	})
}
const handleSelect = (e)=>{
	emit('change', e)
}
</script>
<template>
	<el-select :placeholder='props.placeholder' :value='getValue' size="default" clearable>
		<el-option v-for='(item,key) in dictOption' :key='key'
											:value='item.value' :label='item.title' @change='handleSelect'></el-option>
	</el-select>
</template>
<style scoped>

</style>
