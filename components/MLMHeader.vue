<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/">
            <v-btn variant="text" size="large" rounded="0">
              {{
                route.name === "index" ? "Список товаров" : "К списку товаров"
              }}
            </v-btn>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/cart">
            <v-btn variant="text" size="large" rounded="0">
              <v-icon icon="mdi-cart-variant"></v-icon>
              Корзина
            </v-btn>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  position: fixed;
  width: 100%;
  background-color: rgb(245, 245, 245);
  margin-bottom: 10px;
  box-shadow: 0px 5px 5px 0px #eaeaea;
  z-index: 100;
  nav {
    position: relative;
    width: max-content;
    height: 44px;
    margin: 0 auto;
    ul li {
      display: inline;
    }
  }
}
</style>
