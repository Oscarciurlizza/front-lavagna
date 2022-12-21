import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch"; //solo para usuarios autenticados

export async function isFavoriteApi(idUser, idProduct, logout) {
  try {
    const url = `${BASE_PATH}/api/favorites?populate=*&filters[user][id][$eq]=${idUser}&filters[product][id][$eq]=${idProduct}`;
    return await authFetch(url, null, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addFavoriteApi(idUser, idProduct, logout) {
  try {
    const dataFound = await isFavoriteApi(idUser, idProduct, logout);
    if (dataFound.data.length > 0 || !dataFound) {
      return "este juego ya lo tienes en tu lista de favoritos";
    } else {
      const url = `${BASE_PATH}/api/favorites?populate=%2A`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { user: idUser, product: idProduct } }),
      };
      console.log(params);
      const result = await authFetch(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteFavoriteApi(idUser, idProduct, logout) {
  try {
    const dataFound = await isFavoriteApi(idUser, idProduct, logout);
    const id = dataFound.data[0]?.id;
    if (dataFound.data.length > 0 || !dataFound) {
      const url = `${BASE_PATH}/api/favorites/${id}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await authFetch(url, params, logout);
      console.log(result);
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFavoriteApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/api/favorites?populate[product][populate]=%2A&filters[user][id][$eq]=${idUser}`;
    const result = await authFetch(url, null, logout);
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
