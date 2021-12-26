export interface Product {
  id: number;
  title: string;
  imageUrl?: string;
  brand?: string;
  price: number;
  category?: string;
  inCarousel?: boolean;
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

const api =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:233'
    : 'https://shopapi.ethanloo.cn';

export const fetchCarouselProducts = async () => {
  const products = await fetchAllProducts();
  return products.filter((x) => x.inCarousel);
};

export const fetchCategories = async () => {
  const response = await fetch(`${api}/products/categories`);
  const data = await response.json();
  return data.items as string[];
};

export const fetchBrands = async () => {
  const response = await fetch(`${api}/products/brands`);
  const data = await response.json();
  return data.items as string[];
};

export const fetchCategoryMap = async () => {
  const response = await fetch(`${api}/products/categorymap`);
  const data = await response.json();
  return data.items;
};

export const fetchAllProducts = async () => {
  const response = await fetch(`${api}/products/`);
  const data = await response.json();
  const products: Product[] = [];
  if (data.items) {
    data.items.map((p: any) => products.push({ ...p.fields, id: p.pk }));
  }
  return products;
};

export const fetchOneProduct = async (id: number) => {
  const response = await fetch(`${api}/products/${id}`);
  const data = await response.json();
  if (data.item) {
    return JSON.parse(data.item) as Product;
  }
  return data.msg as string;
};

export const addProduct = async (body: any) => {
  const response = await fetch(`${api}/products/`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return response;
};

export const editProduct = async (body: any, id: number) => {
  const response = await fetch(`${api}/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  return response;
};

export const delProduct = async (id: number) => {
  const response = await fetch(`${api}/products/`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
  return response;
};

export const filterProductsByKey = (all: Product[], key?: string | null) => {
  if (!key) {
    return all;
  }
  return (
    all?.filter((product) => {
      const { brand: b, category: c, title: t } = product;
      return (
        (key && b?.includes(key)) ||
        (key && c?.includes(key)) ||
        (key && t?.includes(key))
      );
    }) || []
  );
};

export const filterProductsByBrandAndCategory = (
  all: Product[],
  brand?: string | null,
  category?: string | null,
) => {
  if (!category && !brand) {
    return all;
  }
  return (
    all?.filter((product) => {
      const { brand: b, category: c } = product;
      if (brand && category) {
        return b == brand && c == category;
      } else {
        return b == brand || c == category;
      }
    }) || []
  );
};
