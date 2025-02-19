<script setup lang="ts">
interface DefaultProps {
  product: Product;
  btnType?: "return-to-cart" | "remove";
}

withDefaults(defineProps<DefaultProps>(), {
  btnType: "remove",
});
const emit = defineEmits([
  "remove-product",
  "return-to-cart",
  "update:product",
]);
</script>

<template>
  <v-sheet class="product">
    <v-img :src="product?.image" height="125" class="product__img" />
    <div class="product__info">
      <h3>{{ product?.title }}</h3>
      <p class="product__description">{{ product?.description }}</p>
      <p class="product__price">${{ product?.price }}</p>
    </div>
    <v-btn
      v-if="btnType === 'remove'"
      class="product__trash"
      icon="mdi-trash-can"
      rounded="0"
      color="red"
      @click="emit('remove-product')"
    ></v-btn>
    <v-btn
      v-if="btnType === 'return-to-cart'"
      class="product__return-to-cart"
      icon="mdi-arrow-up-bold"
      rounded="0"
      color="green"
      @click="emit('return-to-cart')"
    ></v-btn>
  </v-sheet>
</template>

<style scoped lang="scss">
.product {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr) 100px;
  // border-bottom: 1px solid #000;
  &__img {
    align-self: center;
  }
  &__description {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__trash,
  &__return-to-cart {
    align-self: center;
    justify-self: flex-end;
  }
  &__return-to-cart {
    z-index: 20;
  }
}

@media screen and (max-width: 1024px) {
  .product {
    grid-template-columns: 1fr;
    &__img {
      width: 100%;
    }
  }
}
</style>
