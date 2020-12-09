<template>
  <header class="mdc-top-app-bar mdc-top-app-bar--fixed" ref="topAppBarRef">
    <div class="mdc-top-app-bar__row">
      <section
        class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start"
      >
        <router-link to="dashboard">
          <button
            class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
          >
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
          @click="saveDialogRef.open"
          class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
          aria-label="Save"
        >
          save_alt
        </button>
      </section>
    </div>
  </header>

  <main class="main-content" id="main-content" ref="mainContentRef">
    <div class="mdc-top-app-bar--fixed-adjust">
      <div align="center">
        <template v-if="cover_url">
          <div id="cover_wrapper">
            <img id="cover" :src="cover_url" />
            <button
              class="mdc-button mdc-button--raised custom-raised-button"
              style="position: absolute; left: 15px; bottom: 15px"
              @click="add_cover_btn.click()"
            >
              <div class="mdc-button__ripple"></div>
              <i class="material-icons mdc-button__icon" aria-hidden="true"
                >edit</i
              >
              <span class="mdc-button__label">Change cover</span>
            </button>
          </div>
        </template>
        <button
          v-else
          class="mdc-button mdc-button--raised custom-raised-button"
          style="margin: 8px"
          @click="add_cover_btn.click()"
        >
          <div class="mdc-button__ripple"></div>
          <i class="material-icons mdc-button__icon" aria-hidden="true">add</i>
          <span class="mdc-button__label">Add cover</span>
        </button>
        <input
          type="file"
          @change="add_cover()"
          accept="image/jpg,image/jpeg,image/png,image/gif"
          ref="add_cover_btn"
          style="display: none"
        />
        <p></p>
        <input
          type="text"
          v-model="title"
          id="title-input"
          placeholder="Title"
        />
      </div>
      
    </div>
  </main>

  <my-dialog title="Save?" ref="saveDialogRef" @confirm-click="saveCard">
  </my-dialog>
</template>

<script>
import { onMounted, ref, inject } from "vue";
import { MDCTopAppBar } from "@material/top-app-bar";
import router from "@/router";
//import { createCard } from "@/composables/endpoint";
import myDialog from "@/components/myDialog.vue";

export default {
  name: "create",
  components: { myDialog },
  props: {
    cid: String,
  },
  setup() {
    const BASEURL = "https://api.callet.tk/";
    const cover_url = ref("");
    const title = ref("");
    const topAppBarRef = ref(null);
    let topAppBarMdc = null;
    const mainContentRef = ref(null);
    const add_cover_btn = ref(null);
    const saveDialogRef = ref(null);
    var predata = {};

    function add_cover() {
      const files = add_cover_btn.value.files;

      const reader = new FileReader();
      reader.readAsDataURL(files["0"]);
      reader.onload = function () {
        cover_url.value = this.result;
      };
    }

    const openSnackbar = inject("openSnackbar");
    function saveCard() {
      router.push('dashboard')
      openSnackbar("Successfully created")
    }

    onMounted(() => {
      topAppBarMdc = MDCTopAppBar.attachTo(topAppBarRef.value);
      topAppBarMdc.setScrollTarget(mainContentRef.value);
    });

    return {
      BASEURL,
      saveCard,
      close,
      topAppBarRef,
      topAppBarMdc,
      mainContentRef,
      cover_url,
      add_cover_btn,
      add_cover,
      title,
      predata,
      saveDialogRef,
    };
  },
};
</script>
<style lang="scss" scoped>
@use "@material/icon-button";
@use "@material/top-app-bar/mdc-top-app-bar";
@use "@material/dialog";
@use "@material/button";

@include button.core-styles;
@include dialog.core-styles;

@include icon-button.core-styles;

#title-input {
  outline: 0;
  border-width: 0;
  font-weight: 100;
  font-size: xx-large;
}

#cover_wrapper {
  max-height: 300px;
  overflow: hidden;
  vertical-align: middle;
  position: relative;
}

.custom-text-button,
.custom-outlined-button {
  @include button.ink-color(#3b3738);
}

.custom-raised-button {
  --mdc-theme-primary: #bbb6b5;
  --mdc-theme-on-primary: #ffffff;
}
</style>