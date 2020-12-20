<template>
  <ui-skeleton></ui-skeleton>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
    };
  },
  methods: {
    showModal () {
      this.visible = true;
    },
    handleOk (e) {
      console.log(e);
      this.visible = false;
    },
  },
};
</script>
