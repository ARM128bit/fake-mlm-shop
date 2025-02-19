<script setup lang="ts">
interface DefaultProps {
  product: Product;
}

defineProps<DefaultProps>();

const { cart, addToCart } = useCart();
</script>

<template>
  <v-card class="product-list__item">
    <NuxtLink :to="`/product/${product.id}`">
      <v-card-title>
        {{ product.title }}
      </v-card-title>
      <div class="d-flex py-3 justify-space-between align-end">
        <v-img :src="product.image" max-height="125" />
        <v-list-item>
          <v-list-item-subtitle>${{ product.price }}</v-list-item-subtitle>
        </v-list-item>
      </div>
    </NuxtLink>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="medium-emphasis"
        rounded="0"
        variant="outlined"
        size="small"
        @click="addToCart(product.id)"
      >
        {{ cart?.has(product.id) ? "В корзине" : "Купить" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
