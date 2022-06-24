<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  created() {},
};
</script>

<style lang="less">
:root {
  --main--color: #2483ff;
  --main-test-color: rgb(177, 177, 177);
  --icon-size: 0.5rem;
}

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
>

<style lang="less">
html {
  height: 100%;
  overflow-y: auto;
  width: 100wv;
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.Vue-Toastification__container.top-center .Vue-Toastification__toast {
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
}
.Vue-Toastification__container.bottom-right .Vue-Toastification__toast {
  margin-left: auto;
}

.Vue-Toastification__toast-body {
  line-height: 100% !important ;
  font-size: 0.35rem !important;
}

.Vue-Toastification__close-button {
  font-size: 0.5rem !important;
}
.Vue-Toastification__toast {
  align-items: center !important;
}
.Vue-Toastification__icon {
  width: 0.8rem !important;
}
.bottom-right {
  .Vue-Toastification__toast {
    width: 55% !important;
  }
}

.toast {
  display: flex;
  align-items: center;
  .vue-loading {
    width: 40px;
    margin-right: 25px;
  }
  .main {
    flex: 1;
    font-size: 0.35rem;
    line-height: 40px;
  }
}
</style>
