<script lang="ts" setup>
import {ref} from "vue";
import DropdownPlaceholder from "./DropdownPlaceholder.vue";
import DropdownBody from "./DropdownBody.vue";
import {onClickOutside} from "@vueuse/core";
import axios, {AxiosResponse} from "axios";
import {useToast} from "vue-toastification";

const emits = defineEmits(['queryResult', 'querySend'])
const focused = ref(false)
const datasetId = ref<number>(0)
const DropdownBodyComponent = ref<{ data: string[], query: string } | null>(null)
const DropdownPlaceholderComponent = ref<{ value: string } | null>(null)
const toastId = ref()
const toast = useToast()

async function autoComplete(value: string) {
  console.log('datasetId ==>', datasetId.value)
  if (!datasetId.value) {
    toastId.value = toast.error('Select Dataset First')
    return
  }
  try {
    const response: AxiosResponse<string[]> = await axios.get(`http://localhost:8004/auto_complete/${datasetId.value}`, {
      params: {
        query: value
      }
    });
    console.log(response.data);
    storeData(response.data, value)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('There was an error with the request!', error.message);
    } else {
      console.error('There was an unexpected error!', error);
    }
  }
}


async function getQuery(query: string) {
  focused.value = false
  if (typeof DropdownPlaceholderComponent.value?.value === 'string') {
    DropdownPlaceholderComponent.value.value = query
  }
  if (!datasetId.value) {
    toastId.value = toast.error('Select Dataset First')
    return
  }
  try {
    let response: AxiosResponse<string[]>
    emits('querySend', query)
    if (modelId.value === 2) {
      response = await axios.get(`http://localhost:8005/matching_word_embedding/${datasetId.value}`, {
        params: {
          query: query
        }
      });
    } else {
      response = await axios.get(`http://localhost:8001/matching/${datasetId.value}`, {
        params: {
          query: query
        }
      });
    }

    console.log(response.data);
    emits('queryResult', response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('There was an error with the request!', error.message);
    } else {
      console.error('There was an unexpected error!', error);
    }
  }
}

function storeData(data: string[], value: string) {
  if (DropdownBodyComponent.value?.data && typeof DropdownBodyComponent.value?.query === 'string') {
    DropdownBodyComponent.value.data = data
    DropdownBodyComponent.value.query = value
  }
}

const DropdownComponent = ref(null)
onClickOutside(DropdownComponent, () => {
  focused.value = false
});

function setDataset(num: number) {
  datasetId.value = num
  toast.dismiss(toastId.value)
  toast.clear()
}

const modelId = ref(1)

function setModel(num: number) {
  modelId.value = num
}

defineExpose({setDataset, setModel})
</script>

<template>
  <div class="">
    <div class=" left-0 flex justify-center">
      <div ref="DropdownComponent"
           class="mt-16 w-[800px] rounded-3xl h-fit bg-white-light text-black-light">
        <div class="w-full px-7 py-4 ">
          <DropdownPlaceholder
              ref="DropdownPlaceholderComponent"
              @autoComplete="autoComplete"
              @focus="()=>{focused=true}"
              @selectData="getQuery"
          />
        </div>
        <div class="">
          <DropdownBody
              ref="DropdownBodyComponent"
              v-if="focused"
              @selectData="getQuery"
          />
        </div>
      </div>
    </div>
  </div>
</template>
