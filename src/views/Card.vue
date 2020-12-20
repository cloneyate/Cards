<template>
  <Suspense>
    <template #default>
      <my-card :_id="cid"></my-card>
    </template>
    <template #fallbcak>
      <div>LoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoadingLoading</div>
    </template>
  </Suspense>
</template>

<script>
import { ref } from 'vue'
import myCard from '../components/myCard'
//import { getCard } from "../composables/endpoint"


export default {
  name: "card",
  components: { myCard },
  props: {
    cid: {
      type: String,
      require: true
    }
  },

  setup (props) {
    console.log(props.cid)
    const cardData = ref({})
    //cardData.value = await getCard(props.cid)
    console.log({ "setup": cardData.value })
    return {
      cardData
    }
  }
}
</script>