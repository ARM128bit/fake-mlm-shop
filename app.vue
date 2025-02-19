<script setup lang="ts">
// Инициализируем корзину из localStorage
const { getLocalCart } = useCart();

if (import.meta.client) {
  getLocalCart();
}

// При переходе между вкладкаим браузера
// прогружаем корзину из localStorage,
// чтобы пользователь сразу видел актуальные данные
onMounted(() => {
  window.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      getLocalCart();
    }
  });
});
</script>

<template>
  <MLMHeader />
  <main>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<style scoped>
main {
  position: relative;
  width: 1024px;
  margin: 0 auto;
  padding: 15px;
}

@media screen and (max-width: 1024px) {
  main {
    width: 100%;
  }
}
</style>
<style>
*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
