import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function createAddressApi(address, logout) {
  try {
    const url = `${BASE_PATH}/api/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: address }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAddressApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/api/addresses?filters[user][id][$eq]=${idUser}`;
    const result = await authFetch(url, null, logout);
    if (result.statusCode === 500) throw "Error del servidor";
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteAddressApi(idAddress, logout) {
  try {
    const url = `${BASE_PATH}/api/addresses/${idAddress}}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await authFetch(url, params, logout);
    if (result.status === 500) throw "Error del servidor";
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateAddressApi(idAddress, address, logout) {
  try {
    const url = `${BASE_PATH}/api/addresses/${idAddress}}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: address }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
