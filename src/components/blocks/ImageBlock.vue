<template>
  <div class="block-root">
    <block-action
      :index="index"
      v-if="!readOnly"
    >
    </block-action>

    <div v-if="data.src">
      <img
        :src="data.src"
        alt="Invalid link"
        style="object-fit:contain;max-width:100%"
      >
    </div>
    <div
      v-else-if="readOnly===false"
      class="menuBlock"
      @click="dialogOpen=true"
    >
      <span class="material-icons md-36px">insert_photo</span>
      <span style="line-height:36px">Click to add image</span>
    </div>
    <ui-dialog v-model="dialogOpen">
      <ui-dialog-content>
        <ui-grid>
          <ui-grid-cell columns="6">
            <ui-radio
              :id="'radio'+index"
              :name="'radio'+index"
              v-model="picked"
              label="Embed link"
              value="Embed link"
            ></ui-radio>
            <input
              style="display:block"
              placeholder="Paste image link"
              class="should-focus"
              @input="$emit('update:data',{src:$event.target.value})"
              :disabled="picked!='Embed link'"
            >
          </ui-grid-cell>
          <ui-grid-cell columns="6">
            <ui-radio
              :id="'radio'+index"
              :name="'radio'+index"
              v-model="picked"
              label="Upload"
              value="Upload"
            ></ui-radio>
            <input
              ref="imageRef"
              type="file"
              accept="image/jpg,image/jpeg,image/png,image/gif"
              @change="uploadClick"
              :disabled="picked!='Upload'"
            >
          </ui-grid-cell>
        </ui-grid>
      </ui-dialog-content>
      <ui-dialog-actions>
        <ui-button
          @click="dialogOpen=false"
          isDefault
        >Dismiss</ui-button>
        <ui-button @click="dialogOpen=false">Confirm</ui-button>
      </ui-dialog-actions>
    </ui-dialog>
  </div>
</template>
<script>
import { ref } from 'vue'
import BlockAction from '../BlockAction.vue'
export default {
  components: { BlockAction },
  name: 'base-block',
  emits: ["update:data", "keydown"],
  props: {
    readOnly: { type: Boolean, default: false },
    index: Number,
    data: {
      src: String,
    }

  },
  setup (props, context) {
    const addMenuOpen = ref(false)
    const moreMenuOpen = ref(false)
    const dialogOpen = ref(false)
    const imageRef = ref(null);
    const picked = ref("Embed link")
    const uploadClick = () => {
      const files = imageRef.value.files;

      const reader = new FileReader();
      reader.readAsDataURL(files["0"]);
      reader.onload = function () {
        context.emit('update:data', { src: this.result })
        dialogOpen.value = false
      };

    }
    return {
      moreMenuOpen,
      addMenuOpen,
      dialogOpen,
      picked,
      imageRef,
      uploadClick,
    }
  }

}

</script>
<style>
.material-icons.md-24px {
  font-size: 24px;
}
.material-icons.md-36px {
  font-size: 36px;
}
.material-icons.md-48px {
  font-size: 48px;
}
</style>