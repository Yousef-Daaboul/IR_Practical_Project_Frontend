<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const doc = ref<{ title: string; description: string, summary: string | null, conclusion: string | null } | null>(null);

onMounted(() => {
  const docId = router.currentRoute.value.query.doc_id;
  const storedDoc = localStorage.getItem(typeof docId === 'string' ? docId : '');

  if (storedDoc) {
    try {
      doc.value = JSON.parse(storedDoc);
    } catch (e) {
      console.error('Failed to parse document from localStorage', e);
    }
  }
});
</script>

<template>
  <div v-if="doc" class="justify-text">
    <div class="text-3xl font-bold text-gray-400 ">{{ doc.title }}</div>
    <div class="pt-10 px-5">
      <div class="font-extrabold text-primary">Description</div>
      <div class=" text-lg py-3 px-5 line-height  w-full">{{ doc.description }}</div>
    </div>
    <div v-if="doc.summary" class="py-10 px-5">
      <div class="font-extrabold text-primary">Summary</div>
      <div class=" text-lg py-3 px-5 line-height  w-full">{{ doc.summary }}</div>
    </div>
    <div v-if="doc.conclusion" class="py-10 px-5">
      <div class="font-extrabold text-primary">Conclusion</div>
      <div class=" text-lg py-3 px-5 line-height  w-full">{{ doc.conclusion }}</div>
    </div>
  </div>
</template>

<style scoped>
.line-height {
  line-height: 2;
}

.justify-text {
  text-align: justify;
  text-justify: inter-word; /* Optional, for better spacing between words */
}
</style>