<script setup lang="ts">
import SuccessfulOrderDialog from "~/components/SuccessfulOrderDialog.vue";

const { cart, removeFromCart, addToCart, clearCart } = useCart();

const removedProducts = reactive<Set<Product>>(new Set());

const removeProductFromCart = (product: Product) => {
  removedProducts.add(product);
  removeFromCart(product.id);
};

const returnToCart = (product: Product) => {
  addToCart(product.id);
  removedProducts.delete(product);
};

const { data: products, status } = await useLazyAsyncData<Product[]>(
  "cart-products",
  async () => {
    const config = useRuntimeConfig();
    const requests: Promise<Product>[] = [];
    for (const id of cart) {
      requests.push(
        $fetch(`/products/${id}`, { baseURL: config.public.baseURL })
      );
    }
    const prods = await Promise.all(requests);

    return prods;
  },
  {
    watch: [cart],
  }
);

const successOrder = ref<boolean>(false);

watch(successOrder, (val) => {
  !val && clearCart();
});
</script>
<template>
  <v-sheet class="cart">
    <div v-if="products?.length === 0" class="cart__empty">
      <span>Корзина пуста</span>
    </div>
    <v-list lines="three">
      <v-skeleton-loader
        v-if="status === 'pending'"
        v-for="n in 3"
        :key="n"
        type="card"
        class="product"
      />
      <v-list-item v-else v-for="product in products" :key="product.id">
        <product-cart-card
          :key="product.id"
          :product="product"
          @remove-product="removeProductFromCart(product)"
        />
      </v-list-item>
    </v-list>
    <div class="cart__place-order">
      <v-btn
        text="Оформить заказ"
        rounded="0"
        variant="outlined"
        :disabled="cart.size === 0"
        @click="successOrder = true"
      />
    </div>
    <h2 v-if="removedProducts.size > 0" class="early-selected-title">
      Ранее выбранные
    </h2>
    <v-list v-if="removedProducts.size > 0" lines="three">
      <v-list-item v-for="product in removedProducts" :key="product.id">
        <div class="overlay"></div>
        <product-cart-card
          :key="product.id"
          :product="product"
          btn-type="return-to-cart"
          @return-to-cart="returnToCart(product)"
        />
      </v-list-item>
    </v-list>
    <successful-order-dialog v-model:visible="successOrder" />
  </v-sheet>
</template>

<style scoped lang="scss">
.cart {
  width: 100%;
  position: relative;
  &__empty {
    display: flex;
    justify-content: center;
  }
  &__place-order {
    display: flex;
    justify-content: center;
  }
}
.overlay {
  width: calc(100% - 32px);
  height: calc(100% - 32px);
  position: absolute;
  background-color: #bdbdbd;
  opacity: 0.75;
  z-index: 10;
}
.early-selected-title {
  padding-top: 16px;
  padding-left: 16px;
}
</style>
