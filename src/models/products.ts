export interface Product {
  id: number;
  title: string;
  imageUrl?: string;
  brand?: string;
  price: number;
  category?: string;
}
export interface Category {
  id: number;
  name: string;
  subCategories?: Category[];
}

export interface Brand {
  id: number;
  name: string;
}

export const fetchCarouselProducts = async () => {
  const response = await fetch('/api/carousel');
  const data = await response.json();
  return data.items as Product[];
};

export const fetchCategories = async () => {
  const response = await fetch('/api/categories');
  const data = await response.json();
  return data.items as Category[];
};

export const fetchBrands = async () => {
  const response = await fetch('/api/brands');
  const data = await response.json();
  return data.items as Brand[];
};

export const fetchAllProducts = async () => {
  const response = await fetch('/api/products');
  const data = await response.json();
  return data?.items as Product[];
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
