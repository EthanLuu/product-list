export const fetchCarouselProducts = async () => {
  const response = await fetch('/api/carousel');
  const data = await response.json();
  return data;
};
