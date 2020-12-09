<template>
    <router-view />
    <my-snackbar
      ref="mySnackbarRef"
      :label_text="snack_label_text"
      :action_text="snack_action_text"
      v-on:open="openSnackbar"
    ></my-snackbar>
</template>

<script>

import mySnackbar from "./components/mySnackbar.vue";
import {
  defineComponent,
  provide,
  ref,
} from "vue";
export default defineComponent({
  name: "App",
  components: {
    mySnackbar,
  },
  setup() {
    const snack_label_text=ref("Deleted Successfully");
    const snack_action_text=ref("OK")
    const mySnackbarRef = ref(null);
    const openSnackbar = (label_text="Deleted Successfully",action_text="OK") => {
      try {
        snack_label_text.value=label_text
        snack_action_text.value=action_text
        mySnackbarRef.value.open();
      } catch (error) {
        console.log(error);
      }
    };

    provide("openSnackbar", openSnackbar);

  

    return {
      mySnackbarRef,
      snack_label_text,
      snack_action_text
    };
  },
});
</script>