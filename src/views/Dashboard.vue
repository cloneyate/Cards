<template>
  <aside class="mdc-drawer mdc-drawer--modal" ref="drawerRef">
    <div class="mdc-drawer__header">
      <img
        :src="localStorage.getItem('avatar_url')"
        style="width: 64px; height: 64px; border-radius: 50%; margin-top: 24px"
      />
      <h3 class="mdc-drawer__title">{{ localStorage.getItem("nickname") }}</h3>
      <h6 class="mdc-drawer__subtitle">{{ localStorage.getItem("email") }}</h6>
    </div>
    <div class="mdc-drawer__content">
      <nav class="mdc-list">
        <router-link
          class="mdc-list-item mdc-list-item--activated"
          to="dashboard"
          aria-current="page"
          tabindex="0"
        >
          <span class="mdc-list-item__ripple"></span>
          <i class="material-icons mdc-list-item__graphic" aria-hidden="true"
            >dashboard</i
          >
          <span class="mdc-list-item__text">Dashboard</span>
        </router-link>

        <router-link class="mdc-list-item" to="settings">
          <span class="mdc-list-item__ripple"></span>
          <i class="material-icons mdc-list-item__graphic" aria-hidden="true"
            >settings</i
          >
          <span class="mdc-list-item__text">Settings</span>
        </router-link>

        <li class="mdc-list-item mdc-list-item" to="login" @click="logOutClick">
          <span class="mdc-list-item__ripple"></span>
          <i class="material-icons mdc-list-item__graphic" aria-hidden="true"
            >login</i
          >
          <span class="mdc-list-item__text">Log out</span>
        </li>
      </nav>
    </div>
  </aside>
  <div class="mdc-drawer-scrim"></div>

  <header
    class="mdc-top-app-bar mdc-top-app-bar--fixed"
    id="app-bar"
    ref="topAppBarRef"
  >
    <div class="mdc-top-app-bar__row">
      <section
        class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start"
      >
        <button
          class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
        >
          menu
        </button>
        <span class="mdc-top-app-bar__title">Cards</span>
      </section>
      <section
        class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
      >
        <button
          class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
        >
          search
        </button>
        <div class="mdc-menu-surface--anchor">
          <button
            class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
            @click="openMenu"
          >
            add
          </button>
        <div ref="menuRef" class="mdc-menu mdc-menu-surface">
          <ul
            class="mdc-list"
            role="menu"
            aria-hidden="true"
            aria-orientation="vertical"
            tabindex="-1"
          >
            <li role="menuitem" class="mdc-list-item" @click="scanQr">
              <span class="mdc-list-item__ripple"></span>
              <span
                    class="mdc-list-item__graphic material-icons"
                    >qr_code_scanner</span
                  >
                  <span class="mdc-list-item__text">Import via QR code</span>
            </li>
            <li role="menuitem" class="mdc-list-item" @click="importViaClip">
              <span class="mdc-list-item__ripple"></span>
              <span
                    class="mdc-list-item__graphic material-icons"
                    >content_paste</span
                  >
                  <span class="mdc-list-item__text">Import via clipboard</span>
            </li>
          </ul>
        </div>
        </div>
      </section>
    </div>
  </header>

  <main class="main-content" ref="mainContentRef">
    <div class="mdc-top-app-bar--fixed-adjust">
      <progress-bar
        v-if="!('cardsListData' in data)"
        style="display: block; overflow: hidden; margin: 0 auto"
      ></progress-bar>
      <cards-list
        v-else
        v-bind:cards-list-data="data['cardsListData']"
      ></cards-list>
      <span
        v-if="
          data.hasOwnProperty('cardsListData') &&
          data['cardsListData'].length == 0
        "
        >Empty Cards List</span
      >
    </div>
    <router-link :to="{ name: 'create' }">
      <button class="create-fab mdc-fab mdc-fab--extended">
        <div class="mdc-fab__ripple"></div>
        <span class="material-icons mdc-fab__icon">add</span>
        <span class="mdc-fab__label">Create</span>
      </button>
    </router-link>
  </main>
</template>

<script>
import cardsList from "@/components/cardsList.vue";
import { inject, onMounted, provide, reactive, ref } from "vue";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCDrawer } from "@material/drawer";
import { MDCMenu } from "@material/menu";
import { getCardsList } from "@/composables/endpoint";
import progressBar from "@/components/progressBar";
import router from "@/router";
import {getClipboard,scanQr} from "@/composables/useDashboard"
export default {
  name: "dashboard",
  components: {
    cardsList,
    progressBar,
  },

  setup() {
    const data = reactive({});

    const refresh = async () => {
      const output = await getCardsList();
      if (output["success"]) {
        data["cardsListData"] = [];
        console.log("Refreshed Empty", output);
      } else {
        data["cardsListData"] = output;
        console.log("Refreshed", output);
      }
    };
    provide("refresh", refresh);
    const openSnackbar = inject("openSnackbar");
    const logOutClick = () => {
      localStorage.clear();
      openSnackbar("Successfully log out");
      router.push("login");
    };

    const drawerRef = ref(null);
    let drawer = null;
    const topAppBarRef = ref(null);
    let topAppBar = null;
    const mainContentRef = ref(null);
    const menuRef=ref(null);
    let menuMdc=null;

    const openMenu = () => {
      try {
        menuMdc.open = true;
      } catch (error) {
        console.log(error);
      }
    };

    const importViaClip=async()=>{
      //剪贴板导入逻辑
      let text=await getClipboard()
      console.log(text)
    }

    onMounted(() => {
      refresh();
      topAppBar = MDCTopAppBar.attachTo(topAppBarRef.value);
      drawer = MDCDrawer.attachTo(drawerRef.value);
      topAppBar.setScrollTarget(mainContentRef.value);
      menuMdc= new MDCMenu(menuRef.value);

      topAppBar.listen("MDCTopAppBar:nav", () => {
        drawer.open = !drawer.open;
      });
      drawerRef.value.addEventListener("click", (event) => {
        drawer.open = false;
        return event;
      });
      /*document.body.addEventListener("MDCDrawer:closed", () => {
        mainContentRef.value.querySelector("input, button").focus();
      });*/
    });
    return {
      refresh,
      logOutClick,
      data,
      drawerRef,
      drawer,
      topAppBarRef,
      topAppBar,
      mainContentRef,
      localStorage,
      menuRef,
      menuMdc,
      openMenu,
      importViaClip,
      scanQr
    };
  },
};
</script>

<style lang="scss" scoped>
@use "@material/list";
@use "@material/ripple";
@use "@material/icon-button";
@use "@material/button";
@use "@material/top-app-bar/mdc-top-app-bar";
@use "@material/drawer";
@use "@material/list/mdc-list";
@use "@material/menu-surface/mdc-menu-surface";
@use "@material/menu/mdc-menu";
@use "@material/fab";
@include drawer.core-styles;
@include drawer.dismissible-core-styles;
@include drawer.modal-core-styles;
@include fab.core-styles;
@include button.core-styles;
@include icon-button.core-styles;
@include list.core-styles;

body {
  display: flex;
  height: 100vh;
}

.mdc-drawer-app-content {
  flex: auto;
  overflow: auto;
  position: relative;
}

.main-content {
  overflow: auto;
  height: 100%;
  width: 100%;
  position: absolute;
}

.app-bar {
  position: absolute;
}

.create-fab {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>