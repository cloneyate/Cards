<template>
  <aside class="mdc-drawer mdc-drawer--modal" ref="drawerRef">
    <div class="mdc-drawer__header">
      <img
        src="assets/images/apex.png"
        style="width: 64px; height: 64px; border-radius: 50%; margin-top: 24px"
      />
      <h3 class="mdc-drawer__title">Username</h3>
      <h6 class="mdc-drawer__subtitle">example@gmail.com</h6>
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
        <button
          @click="scanQr()"
          class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
        >
          qr_code_scanner
        </button>
      </section>
    </div>
  </header>

  <main class="main-content" id="main-content" ref="mainContentRef">
    <div class="mdc-top-app-bar--fixed-adjust">
      <cards-list v-bind:cards-list-data="data['cardsListData']"></cards-list>
    </div>
    <router-link  :to="{ name: 'create'}">
      <button class="create-fab mdc-fab mdc-fab--extended">
        <div class="mdc-fab__ripple"></div>
        <span class="material-icons mdc-fab__icon">add</span>
        <span class="mdc-fab__label">Create</span>
      </button>
    </router-link>
  </main>

  <!--<ion-router-outlet id="mu-content"></ion-router-outlet>-->
</template>

<script>
import { appsSharp, settingsSharp, add } from "ionicons/icons";
import { useDashboard } from "@/composables/useDashboard";
import cardsList from "@/components/cardsList.vue";
import { onMounted, reactive, ref } from "vue";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCDrawer } from "@material/drawer";


export default {
  name: "dashboard",
  components: {
    cardsList,
  },

  setup() {
    const { scanQr } = useDashboard();
    const data = reactive({
      cardsListData: [],
    });

    const refresh = () => {
      const url = "http://127.0.0.1:5000/cards";
      fetch(url, {
        method: "GET",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((myJson) => {
          data["cardsListData"] = myJson["cardsListData"];
        });
    };

    refresh();

    const drawerRef = ref(null);
    let drawer = null;
    const topAppBarRef = ref(null);
    let topAppBar = null;
    const mainContentRef = ref(null);

    onMounted(() => {
      topAppBar = MDCTopAppBar.attachTo(topAppBarRef.value);
      drawer = MDCDrawer.attachTo(drawerRef.value);
      topAppBar.setScrollTarget(mainContentRef.value);

      topAppBar.listen("MDCTopAppBar:nav", () => {
        drawer.open = !drawer.open;
      });
      drawerRef.value.addEventListener("click", (event) => {
        drawer.open = false;
        console.log(event);
      });
      /*document.body.addEventListener("MDCDrawer:closed", () => {
        mainContentRef.value.querySelector("input, button").focus();
      });*/
    });
    return {
      scanQr,
      appsSharp,
      settingsSharp,
      add,
      refresh,
      data,

      drawerRef,
      drawer,
      topAppBarRef,
      topAppBar,
      mainContentRef,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "@material/list";
@use "@material/ripple";
@use "@material/icon-button";
@use "@material/top-app-bar/mdc-top-app-bar";
@use "@material/drawer";
@use "@material/fab";
@include drawer.core-styles;
@include drawer.dismissible-core-styles;
@include drawer.modal-core-styles;
@include list.core-styles;

@include fab.core-styles;

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