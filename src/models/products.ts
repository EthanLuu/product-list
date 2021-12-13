export interface Product {
  id: number;
  title: string;
  imageUrl?: string;
  brand?: string;
  price: number;
  category?: string;
}
export interface CategoryMapItem {
  category: string;
  brands: string[];
}

export interface Brand {
  id: number;
  name: string;
}

export enum ResponseMessage {
  success = 'success',
  error = 'error',
}

const local = 'http://localhost:8000';

export const fetchCarouselProducts = async () => {
  const response = await fetch('/api/carousel');
  const data = await response.json();
  return data.items as Product[];
};

export const fetchCategories = async () => {
  const response = await fetch(`${local}/products/categories`);
  const data = await response.json();
  return data.items as string[];
};

export const fetchBrands = async () => {
  const response = await fetch(`${local}/products/brands`);
  const data = await response.json();
  return data.items as string[];
};

export const fetchCategoryMap = async () => {
  const response = await fetch(`${local}/products/categorymap`);
  const data = await response.json();
  return data.items;
};

export const fetchAllProducts = async () => {
  const response = await fetch(`${local}/products/`);
  const data = await response.json();
  const products: Product[] = [];
  if (data.items) {
    data.items.map((p: any) => products.push({ ...p.fields, id: p.pk }));
  }
  return products;
};

export const fetchOneProduct = async (id: number) => {
  const response = await fetch(`${local}/products/${id}`);
  const data = await response.json();
  if (data.item) {
    return JSON.parse(data.item) as Product;
  }
  return data.msg as string;
};

export const addProduct = async (body: any) => {
  const response = await fetch(`${local}/products/`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return response;
};

export const delProduct = async (id: number) => {
  const response = await fetch(`${local}/products/`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
  return response;
};

export const filterProducts = (
  all: Product[],
  key?: string | null,
  category?: string | null,
  brand?: string | null,
) => {
  if (!key && !category && !brand) {
    return all;
  }
  return (
    all?.filter((product) => {
      const { brand: b, category: c, title: t } = product;
      return (
        (key && b?.includes(key)) ||
        (key && c?.includes(key)) ||
        (key && t?.includes(key)) ||
        (brand && b?.includes(brand)) ||
        (category && c?.includes(category))
      );
    }) || []
  );
};
