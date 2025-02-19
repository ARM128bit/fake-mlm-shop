<script setup lang="ts">
const route = useRoute();
const { cart, addToCart } = useCart();

const { status, data: product } = await useAPIFetch<Product>(
  `/products/${route.params.id}`
);
</script>

<template>
  <v-skeleton-loader v-if="status === 'pending' || !product" />
  <div v-else class="product">
    <v-img :src="product.image" rounded="0" class="product__img"></v-img>
    <div class="product__info">
      <h1>{{ product.title }}</h1>
      <p class="product__description">{{ product.description }}</p>
      <div class="product__price">${{ product.price }}</div>
      <div>
        <v-btn
          class="product__to-cart"
          rounded="0"
          variant="outlined"
          @click="addToCart(product.id)"
        >
          {{ cart?.has(product.id) ? "В корзине" : "Купить" }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product {
  display: grid;
  grid-template-columns: 35% 1fr;
  &__img {
    border-radius: 1px;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
  }
  &__info {
    padding-left: 10px;
  }
  &__description {
    text-align: justify;
  }
  &__price {
    font-size: 24px;
    text-align: right;
  }
  &__to-cart {
    margin-top: 10px;
    float: right;
  }
}

@media screen and (max-width: 1024px) {
  .product {
    grid-template-columns: 1fr;

    &__to-cart {
      width: 100%;
    }
  }
}
</style>
