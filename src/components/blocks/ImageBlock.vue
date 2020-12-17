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
    <mcw-dialog v-model="dialogOpen">
      <mcw-dialog-content>
        <mcw-layout-grid>
          <mcw-layout-cell
            desktop="6"
            phone="6"
          >
            <mcw-radio
              :id="'radio'+index"
              :name="'radio'+index"
              v-model="picked"
              label="Embed link"
              value="Embed link"
            ></mcw-radio>
            <input
              placeholder="Paste image link"
              class="should-focus"
              @input="$emit('update:data',{src:$event.target.value})"
              :disabled="picked!='Embed link'"
            >
          </mcw-layout-cell>
          <mcw-layout-cell
            desktop="6"
            phone="6"
          >
            <mcw-radio
              :id="'radio'+index"
              :name="'radio'+index"
              v-model="picked"
              label="Upload"
              value="Upload"
            ></mcw-radio>
            <input
              type="file"
              :disabled="picked!='Upload'"
            >
          </mcw-layout-cell>
        </mcw-layout-grid>
      </mcw-dialog-content>
      <mcw-dialog-footer>
        <mcw-dialog-button
          action="dismiss"
          isDefault
        >Dismiss</mcw-dialog-button>
        <mcw-dialog-button action="accept">Confirm</mcw-dialog-button>
      </mcw-dialog-footer>
    </mcw-dialog>
  </div>
</template>
<script>
import { ref } from 'vue'
import BlockAction from '../BlockAction.vue'
export default {
  components: { BlockAction },
  name: 'base-block',
  props: {
    readOnly: { type: Boolean, default: false },
    index: Number,
    data: {
      src: String,
    }

  },
  setup () {
    const addMenuOpen = ref(false)
    const moreMenuOpen = ref(false)
    const dialogOpen = ref(false)
    const picked = ref("Embed link")
    return {
      moreMenuOpen,
      addMenuOpen,
      dialogOpen,
      picked
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