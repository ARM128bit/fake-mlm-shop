const cart = reactive<Set<Product["id"]>>(new Set());
export default function useCart() {
  const addToCart = (id: Product["id"]) => {
    if (import.meta.client && !cart?.has(id)) {
      cart.add(id);
      localStorage.setItem("cart", JSON.stringify(Array.from(cart)));
    }
  };

  const removeFromCart = (id: Product["id"]) => {
    if (import.meta.client) {
      cart.delete(id);
      localStorage.setItem("cart", JSON.stringify(Array.from(cart)));
    }
  };

  const getLocalCart = () => {
    cart.clear();
    const localCart: Product["id"][] = JSON.parse(localStorage.getItem("cart") ?? "[]");
    for(const id of localCart) {
      cart.add(id);
    }
  };

  const clearCart = () => {
    cart.clear();
    localStorage.setItem("cart", JSON.stringify(Array.from(cart)));
  };

  return {
    cart,
    getLocalCart,
    addToCart,
    removeFromCart,
    clearCart,
  };
}
