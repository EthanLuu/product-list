export interface Product {
  id: number;
  title: string;
  imageUrl?: string;
  brand?: string;
  price?: string;
  category?: string;
}
export interface Category {
  id: number;
  name: string;
  subCategories?: Category[];
}

export const fetchCarouselProducts = async () => {
  const response = await fetch('/api/carousel');
  const data = await response.json();
  return data.items;
};

export const fetchCategories = async () => {
  const response = await fetch('/api/categories');
  const data = await response.json();
  return data.items;
};

export const fetchAllProducts = async () => {
  const response = await fetch('/api/products');
  const data = await response.json();
  return data?.items as Product[];
};
