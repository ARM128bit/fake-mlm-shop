type ProductRating = {
  rate: number;
  count: number;
};

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: ProductRating;
};

type Categories =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";
