<script setup lang="ts">

import {ref} from "vue";
import {icons} from "../../assets/icons.ts";

const emits = defineEmits(['autoComplete', 'focus', 'selectData'])


function enterClicked() {
  if (value.value) {
    emits('selectData', value.value)
  }
}

const value = ref()

async function storeValue() {
  emits('autoComplete', value.value)
}

defineExpose({value})
</script>

<template>
  <div class="w-full h-full text-xl flex items-center gap-5">
    <div class="text-2xl text-gray-700 font-bold" v-html="icons.search"/>
    <div class="w-full">
      <input
          @keyup.enter="enterClicked"
          placeholder="Write what you think about Clinical Trials or Arguments"
          style="border: none; outline: none; background-color: transparent; padding: 0; margin: 0; font: inherit; width: inherit;"
          v-model="value"
          @input="storeValue"
          @focus="emits('focus')"
      />
    </div>
  </div>
</template>

<style scoped>

</style>