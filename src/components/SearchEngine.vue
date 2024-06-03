<script setup lang="ts">
import Dropdown from "./dropdown/Dropdown.vue";
import SelectDataset from "./SelectDataset.vue";
import {ref} from "vue";
import QueryResult from "./QueryResult.vue";
import QuerySuccessQuestion from "./QuerySuccessQuestion.vue";
import SelectModel from "./SelectModel.vue";

const DropdownComponent = ref<{ setDataset: Function, setModel: Function } | null>(null)
const QueryResultComponent = ref<{ loading: boolean } | null>(null)

const datasetId = ref(0)

function selectDatasetId(num: number) {
  datasetId.value = num
  if (typeof DropdownComponent.value?.setDataset === "function") {
    DropdownComponent.value.setDataset(num)
  }
  isQuerySend.value = false
}

const modelId = ref(1)

function selectModelId(num: number) {
  modelId.value = num
  if (typeof DropdownComponent.value?.setModel === "function") {
    DropdownComponent.value.setModel(num)
  }
  isQuerySend.value = false
}

const data = ref<object[]>([])
const queryId = ref<number | undefined>(undefined)

function getQueryResult(result: { query_id: number | undefined, data: object[] }) {
  data.value = result.data

  if (typeof result.query_id === "number") {
    showQuestion.value = true
    queryId.value = result.query_id
  }

  if (typeof QueryResultComponent.value?.loading === 'boolean') {
    QueryResultComponent.value.loading = false
  }
}

const isQuerySend = ref(false)

function querySend() {
  isQuerySend.value = true

  if (typeof QueryResultComponent.value?.loading === 'boolean') {
    QueryResultComponent.value.loading = true
  }
}

const showQuestion = ref(false)

function hiddenQueryQuestion() {
  showQuestion.value = false
}


</script>

<template>
  <div class="h-screen w-full ">
    <div class="flex flex-col items-center w-full">
      <div v-if="!isQuerySend">
        <h1 class="mt-28 text-white-light">Search Engine</h1>
        <h2 class="mt-5 font-bold text-3xl text-white-light/70">For Clinical Trials and Arguments</h2>
      </div>
      <div :class="{'-mt-12 absolute z-50':isQuerySend}" class="flex gap-5 ">
        <Dropdown ref="DropdownComponent" @queryResult="getQueryResult" @querySend="querySend"/>
        <SelectDataset @selectDataset="selectDatasetId"/>
        <SelectModel @select-model="selectModelId"/>
      </div>
      <div class="mt-28 w-full" v-if="isQuerySend">
        <QueryResult ref="QueryResultComponent" :data="data" :dataset-id="datasetId"/>
      </div>
    </div>
  </div>
  <QuerySuccessQuestion
      @save="hiddenQueryQuestion" @cancel="hiddenQueryQuestion" v-if="isQuerySend &&showQuestion &&data.length>0"
      :query-id="queryId" :dataset-id="datasetId"
  />
</template>

<style scoped>

</style>