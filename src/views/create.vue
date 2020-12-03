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
        <span class="mdc-top-app-bar__title">Editor</span>
      </section>
      <section
        class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
        role="toolbar"
      >
        <button
          @click="openSaveDialog()"
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
              @click="
                () => {
                  return add_cover_btn.click();
                }
              "
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
          @click="
            () => {
              return add_cover_btn.click();
            }
          "
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
      <div id="editorjs"></div>
    </div>
  </main>

  <div class="mdc-dialog" ref="saveDialogRef">
    <div class="mdc-dialog__container">
      <div
        class="mdc-dialog__surface"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="my-dialog-title"
        aria-describedby="my-dialog-content"
      >
        <div class="mdc-dialog__title" id="my-dialog-title">Save Card?</div>
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
            @click="saveCard()"
          >
            <div class="mdc-button__ripple"></div>
            <span class="mdc-button__label">Save</span>
          </button>
        </div>
      </div>
    </div>
    <div class="mdc-dialog__scrim"></div>
  </div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import Link from "@editorjs/link";
import { onMounted, ref } from "vue";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCDialog } from "@material/dialog";
import router from "@/router";
//import {getCard} from "@/composables/card";

export default {
  name: "create",
  components: {},
  props: {
    cid: String,
  },
  setup() {
    const BASEURL = "http://localhost:5000/";
    const cover_url = ref("");
    const title = ref("");

    const topAppBarRef = ref(null);
    let topAppBar = null;
    const mainContentRef = ref(null);
    const saveDialogRef = ref(null);
    let saveDialog = null;
    const add_cover_btn = ref(null);

    var predata = {};

    function add_cover() {
      const files = add_cover_btn.value.files;

      const reader = new FileReader();
      reader.readAsDataURL(files["0"]);
      reader.onload = function () {
        cover_url.value = this.result;
      };
    }

    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        image: {
          class: Image,
          config: {
            endpoints: {
              byFile: BASEURL + "uploadFile/",
              byUrl: BASEURL + "fetchUrl/",
            },
          },
        },
        link: {
          class: Link,
          config: {
            endpoint: BASEURL + "fetchUrl/",
          },
        },
      },
      data: predata,
    });

    function saveCard() {
      editor
        .save()
        .then((outputData) => {
          outputData["cover_url"] = cover_url.value;
          outputData["title"] = title.value;
          //console.log(outputData);
          const url = BASEURL + "/api/cards/";
          fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(outputData),
          }).then(() => router.push("dashboard"));
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }

    onMounted(() => {
      topAppBar = MDCTopAppBar.attachTo(topAppBarRef.value);
      topAppBar.setScrollTarget(mainContentRef.value);
      saveDialog = new MDCDialog(saveDialogRef.value);
    });

    function openSaveDialog() {
      saveDialog.open();
    }
    return {
      BASEURL,
      editor,
      saveCard,
      close,
      topAppBarRef,
      topAppBar,
      mainContentRef,
      saveDialogRef,
      saveDialog,
      openSaveDialog,
      cover_url,
      add_cover_btn,
      add_cover,
      title,
      predata,
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