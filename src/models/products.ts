export interface Product {
  id: number;
  title: string;
  imageUrl?: string;
  brand?: string;
}

export const fetchCarouselProducts = async () => {
  const response = await fetch('/api/carousel');
  const data = await response.json();
  return data;
};

export const fetchCategories = async () => {
  const response = await fetch('/api/categories');
  const data = await response.json();
  return data;
};

export const fetchAllProducts = async () => {
  const response = await fetch('/api/products');
  const data = await response.json();
  return data?.items as Product[];
};
