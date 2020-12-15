<template>
  <div
    class="mdc-snackbar"
    ref="snackbarRef"
  >
    <div
      class="mdc-snackbar__surface"
      role="status"
      aria-relevant="additions"
    >
      <div
        class="mdc-snackbar__label"
        aria-atomic="false"
      >
        {{label_text}}
      </div>
      <div
        class="mdc-snackbar__actions"
        aria-atomic="true"
      >
        <button
          type="button"
          class="mdc-button mdc-snackbar__action"
        >
          <div class="mdc-button__ripple"></div>
          <span class="mdc-button__label">{{action_text}}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { MDCSnackbar } from "@material/snackbar";
export default {
  name: "my-snackbar",
  props: {
    label_text: String,
    action_text: String,
  },
  setup () {
    const snackbarRef = ref(null);
    let snackbar = null;

    onMounted(() => {
      snackbar = new MDCSnackbar(snackbarRef.value);
      snackbar.timeoutMs = 4000;
    })

    const open = () => {
      snackbar.open();
    }
    return {
      snackbarRef,
      open
    }
  }
}
</script>
<style lang="scss">
</style>