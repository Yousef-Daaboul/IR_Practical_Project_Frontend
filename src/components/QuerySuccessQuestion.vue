<script setup lang="ts">

import axios from "axios";

const props = defineProps({
  queryId: {type: Number},
  datasetId: {type: Number},
})

const emits = defineEmits(['cancel', 'save'])

async function save() {
  console.log(props.datasetId, props.queryId)

  try {
    const response = await axios.post('http://localhost:8004/successful_query', {
      query_id: props.queryId,
      dataset_id: props.datasetId
    });
    console.log(response.data);
    emits('save');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('There was an error with the request!', error.message);
    } else {
      console.error('There was an unexpected error!', error);
    }
  }
}

function cancel() {
  emits('cancel')
}
</script>

<template>
  <div class=" bottom-4 right-10 fixed">
    <div class="bg-dark/90 py-5 px-7 rounded-xl ">
      <div class="text-lg">Was the query useful?</div>
      <div class="flex justify-between items-center pt-5 ">
        <div @click="save"
             class="bg-primary px-4 py-1.5 rounded-md cursor-pointer shadow-md hover:shadow-none text-md ">
          Yes
        </div>
        <div @click="cancel"
             class="bg-danger px-4 py-1.5 rounded-md cursor-pointer shadow-md hover:shadow-none text-md">
          No
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>