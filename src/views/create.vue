<template>
  <header
    class="mdc-top-app-bar mdc-top-app-bar--fixed"
    ref="topAppBarRef"
  >
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <router-link to="dashboard">
          <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button">
            arrow_back
          </button>
        </router-link>
        <span class="mdc-top-app-bar__title">Create</span>
      </section>
      <section
        class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
        role="toolbar"
      >
        <button
          @click="saveCard"
          class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
          aria-label="Save"
        >
          save_alt
        </button>
      </section>
    </div>
  </header>

  <main
    class="main-content"
    id="main-content"
    ref="mainContentRef"
  >
    <div class="mdc-top-app-bar--fixed-adjust">
      <div
        id="cover-wrapper"
        v-if="cover_url"
      >
        <img
          id="cover"
          :src="cover_url"
          style="max-height:300px"
        />
        <button
          class="mdc-button mdc-button--raised custom-raised-button"
          style="position: absolute; right: 15px; bottom: 15px"
          @click="add_cover_btn.click()"
        >
          <div class="mdc-button__ripple"></div>
          <i
            class="material-icons mdc-button__icon"
            aria-hidden="true"
          >edit</i>
          <span class="mdc-button__label">Change cover</span>
        </button>
      </div>
      <button
        v-else
        class="mdc-button mdc-button--raised custom-raised-button"
        style="left:50%;transform:translateX(-50%)"
        @click="add_cover_btn.click()"
      >
        <div class="mdc-button__ripple"></div>
        <i
          class="material-icons mdc-button__icon"
          aria-hidden="true"
        >add</i>
        <span class="mdc-button__label">Add cover</span>
      </button>
      <input
        type="file"
        @change="add_cover()"
        accept="image/jpg,image/jpeg,image/png,image/gif"
        ref="add_cover_btn"
        style="display: none"
      />
      <div id="editor-wrapper">
        <input
          type="text"
          v-model="title"
          id="title-input"
          placeholder="Title"
        />
        <block-editor ref="editorRef"></block-editor>
      </div>

    </div>
  </main>
</template>

<script>
import { onMounted, ref, inject } from "vue";
import { MDCTopAppBar } from "@material/top-app-bar";
import router from "@/router";
import { createCard } from "@/composables/endpoint";
import BlockEditor from "@/components/BlockEditor.vue";




export default {
  name: "create",
  components: { BlockEditor },
  props: {
    cid: String,
  },
  setup () {
    const cover_url = ref("");
    const title = ref("");
    const topAppBarRef = ref(null);
    let topAppBarMdc = null;
    const mainContentRef = ref(null);
    const add_cover_btn = ref(null);
    const editorRef = ref(null);
    const saveDialogOpen = ref(false)
    function add_cover () {
      const files = add_cover_btn.value.files;

      const reader = new FileReader();
      reader.readAsDataURL(files["0"]);
      reader.onload = function () {
        cover_url.value = this.result;
      };
    }

    const openSnackbar = inject("openSnackbar");
    function saveCard () {
      let json = {
        title: title.value,
        cover_url: cover_url.value,
        blocks: editorRef.value.getBlocks(),
      }
      createCard(json).then((output) => {
        if (output["ok"] == 1) {
          router.push('dashboard')
          openSnackbar("Successfully created")
        }
        else {
          openSnackbar('Something went wrong`(*>﹏<*)′')
        }
      })
      console.log(json)
    }

    onMounted(() => {
      topAppBarMdc = MDCTopAppBar.attachTo(topAppBarRef.value);
      topAppBarMdc.setScrollTarget(mainContentRef.value);
    });


    return {
      saveCard,
      topAppBarRef,
      topAppBarMdc,
      mainContentRef,
      cover_url,
      add_cover_btn,
      add_cover,
      title,
      editorRef,
      saveDialogOpen
    };
  },
};
</script>
<style lang="scss">
@use "@material/button";

#title-input {
  outline: 0;
  border-width: 0;
  font-weight: 100;
  font-size: xx-large;
  box-sizing: border-box;
  width: 95%;
  padding-left: 48px;
}

#cover-wrapper {
  display: flex;
  justify-content: center;
  position: relative;
}

#editor-wrapper {
  width: calc(100vw);
  padding-right: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.custom-text-button,
.custom-outlined-button {
  @include button.ink-color(#3b3738);
}

.custom-raised-button {
  --mdc-theme-primary: #bbb6b5;
  --mdc-theme-on-primary: #ffffff;
}

.logo-container {
  display: flex;
}
</style>