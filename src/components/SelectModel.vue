<script setup lang="ts">

import {onMounted, ref} from "vue";

const emits = defineEmits(['selectModel'])
const modelType = sessionStorage.getItem('model_id')
const selectData = ref(modelType === '2' ? 'Word Embedding' : 'TF-IDF')

onMounted(() => {
  if (modelType === '1' || modelType === '2') {
    console.log(modelType)
    emits('selectModel', parseInt(modelType))
  }
})

function select(num: number) {
  sessionStorage.setItem('dataset_id', num.toString())
  if (num === 1) {
    selectData.value = 'TF-IDF'
    emits('selectModel', 1)
  } else {
    selectData.value = 'Word Embedding'
    emits('selectModel', 2)
  }
}
</script>

<template>
  <div class="mt-16">
    <Popper :placement="'bottom-end'" offsetDistance="0"
            class="align-middle">
      <button type="button"
              class="gap-2 justify-between flex items-center btn btn-outline-success btn-lg dropdown-toggle h-fit py-4  rounded-3xl bg-white-dark text-black-light text-xl font-bold">
        {{ selectData }}
        <svg
            width="30"
            height="30"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 ltr:ml-1 rtl:mr-1 inline-block"
        >
          <path d="M19 9L12 15L5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
      </button>
      <template #content="{ close }">
        <div class="bg-black-light rounded-md mt-2 text-start w-64">
          <ul @click="close()" class="whitespace-nowrap text-lg  ">
            <li @click="select(1)" class="">TF-IDF</li>
            <li @click="select(2)" class="">Word Embedding</li>
          </ul>
        </div>
      </template>
    </Popper>
  </div>
</template>

<style scoped>
li {
  @apply px-7 py-5 cursor-pointer hover:bg-dark-header rounded-md;
}
</style>