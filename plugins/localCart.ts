export default defineNuxtPlugin(() => {
  return {
    provide: {
      cart: {
        getCart(): Product["id"][] | undefined {
          if (import.meta.client) {
            return JSON.parse(localStorage.getItem('cart') ?? '[]');
          } else {
            return undefined;
          }
        },

        setCart(value: Product["id"][]) {
          if (import.meta.client) {
            return localStorage.setItem('cart', JSON.stringify(value));
          }
        },

        addToCart(value: Product["id"]) {
          if (import.meta.client) {
            const cart: Product["id"][] = JSON.parse(localStorage.getItem('cart') ?? '[]');
            if(!cart.includes(value)) {
                cart.push(value)
                localStorage.setItem('cart', JSON.stringify(cart));
            }
          }
        },

        removeFromCart(value: Product["id"]) {
          if (import.meta.client) {
            const cart: Product["id"][] = JSON.parse(localStorage.getItem('cart') ?? '[]');
            const idx = cart.findIndex((item) => item === value);
            if(idx > -1) {
                cart.splice(idx, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
            }
          }
        },
      },
    },
  };
});
