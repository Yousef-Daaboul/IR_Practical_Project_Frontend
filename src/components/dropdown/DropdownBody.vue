<script setup lang="ts">
import {onMounted, ref} from "vue";


const emits = defineEmits(['selectData'])

onMounted(async () => {
  await getData()
})
const data = ref<string[]>([])
const query = ref<string>('')

async function getData() {

}

function itemClicked(data: string) {
  emits('selectData', data)
}

function highlightedString(str: string) {
  if (!query.value) return str;

  const regex = new RegExp(`(${escapeRegExp(query.value)})`, 'gi');
  return str.replace(regex, '<span class="highlight">$1</span>');
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function selectData(data: string) {
  emits('selectData', data)
}

defineExpose({data, query})
</script>

<template>
  <div :class="{'py-2 pb-5':data.length>0}" class=" text-start">
    <div v-for="(str,i) in data" :key="i">
      <div @click="selectData(str)"
           class="px-5 py-2 hover:bg-gray-400 rounded-r-full mr-2 text-black-light cursor-pointer"
           v-html="highlightedString(str)">
      </div>
    </div>
  </div>
</template>

<style>
.highlight {
  @apply bg-white-dark px-1 p-0.5 rounded-[2px] font-bold;
}
</style>