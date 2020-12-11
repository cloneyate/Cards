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
          @click="saveDialogRef.open()"
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
      <div id="page">
        <template v-if="cover_url">
          <div id="cover_wrapper">
            <img
              id="cover"
              :src="cover_url"
              style="margin:0 auto;"
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
        </template>
        <button
          v-else
          class="mdc-button mdc-button--raised custom-raised-button"
          style="max-width:160px;"
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
        <div style="padding:16px">
          <input
            type="text"
            v-model="title"
            id="title-input"
            placeholder="Title"
          />
          <div id="toolbar">
          </div>
          <div id="editor">
          </div>
        </div>
      </div>
    </div>
  </main>
  <my-dialog
    title="Save?"
    ref="saveDialogRef"
    @confirm-click="saveCard"
  >
  </my-dialog>
  <my-dialog
    title="Search logo"
    ref="logoDialogRef"
    @confirm-click="logoDialogConfirm"
  >
    <template v-slot>
      <logo-selector ref="logoSelectorRef"></logo-selector>
    </template>
  </my-dialog>
</template>

<script>
import { onMounted, ref, inject } from "vue";
import { MDCTopAppBar } from "@material/top-app-bar";
import router from "@/router";
//import { createCard } from "@/composables/endpoint";
import myDialog from "@/components/myDialog.vue";
import logoSelector from "@/components/logoSelector.vue";
import Quill from 'quill'
import 'quill/dist/quill.snow.css'


export default {
  name: "create",
  components: { myDialog, logoSelector },
  props: {
    cid: String,
  },
  setup () {
    const BASEURL = "https://api.callet.tk/";
    const cover_url = ref("");
    const title = ref("");
    const topAppBarRef = ref(null);
    let topAppBarMdc = null;
    const mainContentRef = ref(null);
    const add_cover_btn = ref(null);
    const saveDialogRef = ref(null);
    const logoDialogRef = ref(null);
    const logoSelectorRef = ref(null);
    let editor = null;
    var quill_options = {
      debug: "error",
      modules: {
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'header': [1, 2, 3, false] }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image'],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['clean'],
            ['logo']
          ],
          handlers: {
            logo: () => {
              logoDialogRef.value.open()
            }
          }
        }
      },
      placeholder: "Let's start here",
      theme: 'snow'
    }
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
      router.push('dashboard')
      openSnackbar("Successfully created")
    }

    function logoDialogConfirm () {
      alert(logoSelectorRef.value.selectedSvg)
    }

    onMounted(() => {
      topAppBarMdc = MDCTopAppBar.attachTo(topAppBarRef.value);
      topAppBarMdc.setScrollTarget(mainContentRef.value);
      editor = new Quill('#editor', quill_options);
      let logoButton = document.querySelector('.ql-logo')
      //logoButton.classList.add('material-icons', 'mdc-icon-button')
      logoButton.textContent = "Logo"
    });

    return {
      BASEURL,
      saveCard,
      topAppBarRef,
      topAppBarMdc,
      mainContentRef,
      cover_url,
      add_cover_btn,
      add_cover,
      title,
      saveDialogRef,
      logoDialogRef,
      editor,

      logoDialogConfirm,
      logoSelectorRef
    };
  },
};
</script>
<style lang="scss">
@use "@material/icon-button";
@use "@material/top-app-bar/mdc-top-app-bar";
@use "@material/dialog";
@use "@material/button";

@include button.core-styles;
@include dialog.core-styles;

@include icon-button.core-styles;

#page {
  display: flex;
  max-width: 1200px;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
}

#title-input {
  outline: 0;
  border-width: 0;
  font-weight: 100;
  font-size: xx-large;
}

#cover_wrapper {
  max-height: 300px;
  overflow: hidden;
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