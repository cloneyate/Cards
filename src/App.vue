<template>
  <ion-app>
    <router-view />
    <my-snackbar
      ref="mySnackbarRef"
      label_text="Deleted Successfully"
      action_text="OK"
      v-on:open="openSnackbar"
    ></my-snackbar>
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp,
  //IonRouterOutlet
} from "@ionic/vue";
import mySnackbar from "@/components/mySnackbar.vue";
import {
  defineComponent,
  provide,
  ref, //provide
} from "vue";
export default defineComponent({
  name: "App",
  components: {
    IonApp,
    mySnackbar,
    //IonRouterOutlet
  },
  setup() {
    const mySnackbarRef = ref(null);
    const openSnackbar = () => {
      try {
        mySnackbarRef.value.open();
      } catch (error) {
        console.log(error);
      }
    };

    provide("openSnackbar", openSnackbar);

  

    return {
      mySnackbarRef,
    };
  },
});
</script>