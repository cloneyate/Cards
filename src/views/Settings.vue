<template>
  <header class="mdc-top-app-bar mdc-top-app-bar--fixed">
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <router-link to="/dashboard">
          <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button">
            arrow_back
          </button>
        </router-link>
        <span class="mdc-top-app-bar__title">Setting</span>
      </section>
      <section
        class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
        role="toolbar"
      >
      </section>
    </div>
  </header>

  <main
    class="main-content"
    id="main-content"
    ref="mainContentRef"
  >
    <div class="mdc-top-app-bar--fixed-adjust">
      <div class="setting-content">
        <div class="setting-section">
          <div class="sub-section">
            <label class="section-first">Avatar</label>
            <figure style="width:60px;height:60px;margin:0">
              <img
                style="height:100%"
                :src="profile.avatar_url"
              >
            </figure>
          </div>
          <ui-divider></ui-divider>
          <div class="sub-section">
            <label class="section-first">Username</label>
            <label v-text="profile.username"></label>
            <ui-icon>navigate_next</ui-icon>
          </div>
          <ui-divider></ui-divider>
          <div
            class="sub-section"
            v-ripple
            @click="passDialogOpen=true"
          >
            <label class="section-first">Password</label>
            <label>********</label>
            <ui-icon>navigate_next</ui-icon>
          </div>
          <ui-divider></ui-divider>
          <div class="sub-section">
            <label class="section-first">Nickname</label>
            <label v-text="profile.nickname"></label>
            <ui-icon>navigate_next</ui-icon>
          </div>
          <ui-divider></ui-divider>
          <div class="sub-section">
            <label class="section-first">Email</label>
            <label v-text="profile.email"></label>
            <ui-icon>navigate_next</ui-icon>
          </div>
        </div>
      </div>
      <ui-dialog v-model="passDialogOpen">
        <ui-dialog-title>Change Password</ui-dialog-title>
        <ui-dialog-content>
          <ui-form
            class="cp-form"
            nowrap
            label-width="120"
          >
            <template #default="{ actionClass }">
              <ui-form-field>
                <label>Old password</label>
                <ui-textfield
                  input-type="password"
                  required
                ></ui-textfield>
              </ui-form-field>
              <ui-form-field>
                <label>New password</label>
                <ui-textfield
                  input-type="password"
                  required
                  helper-text-id="pw-validation-msg"
                  pattern=".{8,}"
                ></ui-textfield>
              </ui-form-field>
              <ui-textfield-helper
                id="pw-validation-msg"
                visible
                validMsg
              >
                Must be at least 8 characters long
              </ui-textfield-helper>
              <ui-form-field>
                <label>New password</label>
                <ui-textfield
                  input-type="password"
                  required
                  pattern=".{8,}"
                ></ui-textfield>
              </ui-form-field>
              <ui-form-field :class="actionClass">
                <ui-button
                  outlined
                  @click="passDialogOpen=false"
                >Cancel</ui-button>
                <ui-button raised>Submit</ui-button>

              </ui-form-field>
            </template>
          </ui-form>
        </ui-dialog-content>
      </ui-dialog>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'
import { getProfile } from "../composables/endpoint"
export default {
  name: 'setting',
  setup () {
    const profile = ref({})
    getProfile().then((output) => { profile.value = output })
    const passDialogOpen = ref(false)
    return {
      profile,
      passDialogOpen
    }
  }
}
</script>
<style lang="scss">
.setting-content {
  padding-top: 16px;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
}

.setting-section {
  width: calc(100% - 80px);
  border-radius: 16px;
  border: 1px solid rgba($color: #000000, $alpha: 0.2);
  padding-left: 16px;
  padding-right: 16px;
}

.sub-section {
  display: flex;
  flex-grow: 1;
  padding-top: 16px;
  padding-bottom: 16px;
  color: rgba($color: #000000, $alpha: 0.8);
}

.section-first {
  flex: 1 1 auto;
}

.section-second {
  flex: 1 1 auto;
}

.cp-form > .mdc-form-field {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
