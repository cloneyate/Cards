<template>
  <div class="block-root">
    <button
      class="hover-button"
      @click="$emit('remove')"
    ><span class="material-icons">clear</span></button>
    <button
      class="hover-button"
      @click="dialogOpen=true"
    ><span class="material-icons">more_vert</span></button>

    <div v-if="confirmed">
      <img
        :src="data.src"
        alt=""
      >
    </div>
    <div
      v-else
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
              id="upload"
              name="imageWay"
              v-model="picked"
              label="Upload"
              value="Upload"
            ></mcw-radio>
            <input
              type="file"
              :disabled="picked!='Upload'"
            >
          </mcw-layout-cell>
          <mcw-layout-cell
            desktop="6"
            phone="6"
          >
            <mcw-radio
              id="link"
              name="imageWay"
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
export default {
  name: 'base-block',
  props: {
    index: Number,
    data: {
      src: String,
    }

  },
  setup () {
    const confirmed = ref(false)
    const dialogOpen = ref(false)
    const picked = ref("Upload")
    return {
      confirmed,
      dialogOpen,
      picked
    }
  }

}

</script>
<style scoped>
.material-icons.md-24px {
  font-size: 24px;
}
.material-icons.md-36px {
  font-size: 36px;
}
.material-icons.md-48px {
  font-size: 48px;
}

.menuBlock {
  display: flex;
  background: #edece9;
  color: rgba(55, 53, 47, 0.6);
  border-radius: 4px;
  padding-left: 24px;
  padding-top: 6px;
  padding-bottom: 6px;
  height: 36px;
}
</style>