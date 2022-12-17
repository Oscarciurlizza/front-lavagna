import { BASE_PATH } from "../utils/constants";

export async function getLastProductsApi(page, limit) {
  try {
    const url = `${BASE_PATH}/api/products?populate=*&pagination[start]=${page}&pagination[limit]=${limit}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductsCategoryApi(category, limit, start) {
  try {
    const url = `${BASE_PATH}/api/products?populate=*&filters[category][url][$eq]=${category}&pagination[start]=${start}&pagination[limit]=${limit}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTotalProductsCategoryApi(category) {
  try {
    const url = `${BASE_PATH}/products/`;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductByUrlApi(path) {
  try {
    const url = `${BASE_PATH}/api/products?populate=*&filters[url][$eq]=${path}`;
    const response = await fetch(url);
    const result = await response.json();
    return result.data[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
