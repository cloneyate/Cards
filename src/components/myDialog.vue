<template>
  <div
    class="mdc-dialog"
    ref="dialogRef"
  >
    <div class="mdc-dialog__container">
      <div
        class="mdc-dialog__surface"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="my-dialog-title"
        aria-describedby="my-dialog-content"
      >
        <div
          class="mdc-dialog__title"
          id="my-dialog-title"
        >{{title}}</div>
        <div class="mdc-dialog__content">
          <slot></slot>
        </div>
        <div class="mdc-dialog__actions">
          <button
            type="button"
            class="mdc-button mdc-dialog__button"
            data-mdc-dialog-action="cancel"
          >
            <div class="mdc-button__ripple"></div>
            <span class="mdc-button__label">Cancel</span>
          </button>
          <button
            type="button"
            class="mdc-button mdc-dialog__button"
            data-mdc-dialog-action="discard"
            @click="$emit('confirm-click')"
          >
            <div class="mdc-button__ripple"></div>
            <span class="mdc-button__label">OK</span>
          </button>
        </div>
      </div>
    </div>
    <div class="mdc-dialog__scrim"></div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { MDCDialog } from "@material/dialog";

export default {
  name: "my-dialog",
  props: {
    title: String
  },
  setup () {
    const dialogRef = ref(null)
    const dialogMdc = computed(() => {
      return new MDCDialog(dialogRef.value)
    })
    const open = () => {
      dialogMdc.value.open()
    }

    return {
      dialogRef,
      dialogMdc,
      open
    }
  }
}
</script>
<style lang="scss" scoped>
@use "@material/dialog";
@use "@material/button";
@use "@material/icon-button";
@include button.core-styles;
@include dialog.core-styles;
@include icon-button.core-styles;
</style>