<script setup lang="ts">

import {ref} from "vue";
import {router} from "../router";

defineProps({
  datasetId: {type: Number, required: true},
  data: {type: Array, default: []}
})

const loading = ref(true)

function getFirstWords(text: string, num: number) {
  const words = text.split(/\s+/);
  const firstWords = words.slice(0, num);
  return firstWords.join(' ');
}

function goToContent(doc: any) {
  localStorage.clear();
  localStorage.setItem(doc.doc_id, JSON.stringify(doc))

  router.push({name: 'doc_content', query: {doc_id: doc.doc_id}})
}

defineExpose({loading})
</script>

<template>
  <div class="mt-10 text-start">
    <div v-if="loading" v-for="_ in 10" class="loading-animation-dark my-7 w-full h-52 rounded-3xl"/>
    <div v-else-if="data.length>0">
      <div class="mx-10 mt-5 mb-10  border-gray-600 pt-5 " v-for="(doc,index) in data" :key="index">
        <div @click="goToContent(doc)" class="cursor-pointer hover:text-blue-500 text-xl font-bold text-gray-500">
          {{ '*    ' + doc.title }}
        </div>
        <div class="px-5">{{ (datasetId === 1) ? doc.summary : getFirstWords(doc.description, 50) }}</div>
      </div>
    </div>
    <div v-else class="flex justify-center">
      No data available
    </div>
  </div>
</template>

<style scoped>
.loading-animation-dark {
  position: relative;
  background: linear-gradient(90deg, #1c232f 25%, #252f41 50%, #1c232f 75%);
  background-size: 200% 100%;
  animation: wave 2s infinite;
}

@keyframes wave {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

</style>