export async function getCategories() {
  const fetchApi = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const result = await fetchApi.json();
  return result;
}

export async function getProductsFromCategoryAndQuery(category, query) {
  const fetchApi = await fetch(` https://api.mercadolibre.com/sites/MLB/search?category=${category}_ID&q=${query}`);
  const result = await fetchApi.json();
  return result;
}
