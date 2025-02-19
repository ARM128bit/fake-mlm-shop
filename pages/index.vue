<script setup lang="ts">
const selectedCategory = ref<Categories>();

const productsURL = computed(() => {
  return selectedCategory.value
    ? `/products/category/${selectedCategory.value}`
    : "/products";
});

const { status, data: products } = await useAPIFetch<Product[]>(productsURL, {
  watch: [selectedCategory],
});

const { data: categories } = await useAPIFetch<Categories[]>("/products/categories")
</script>

<template>
  <!-- Категории, как фильтр  -->
  <!-- При нажатии на категорию, нужно фильтровать список товаров по выбранной категории-->
  <div class="categories">
    <v-btn
      v-for="category in categories"
      :key="category"
      :variant="selectedCategory === category ? 'elevated' : 'tonal'"
      :loading="status === 'pending'"
      @click="
        selectedCategory === category
          ? (selectedCategory = undefined)
          : (selectedCategory = category)
      "
    >
      {{ category }}
    </v-btn>
  </div>
  <!-- Список товаров -->
  <div class="product-list">
    <template v-if="status === 'pending'">
      <v-skeleton-loader
        v-for="n in 3"
        :key="n"
        type="card"
        class="product-list__item"
      ></v-skeleton-loader>
    </template>
    <template v-else>
      <product-card v-for="item in products" :key="item.id" :product="item" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.categories {
  display: flex;
  padding: 5px 0;
  flex-wrap: nowrap;
  gap: 10px;
}
.product-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  padding: 10px 0;
  &__item {
    width: 100%;
  }
}

@media screen and (max-width: 1024px) {
  .categories {
    flex-wrap: wrap;
  }
  .product-list {
    grid-template-columns: 1fr;
  }
}
</style>
