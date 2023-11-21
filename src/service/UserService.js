/* eslint-disable no-useless-catch */
import { request } from "./base";

export async function profile(token) {
  try {
    const response = await request.get('/v1/user/profile', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export async function getCurrencies(token) {
  try {
    const response = await request.get('/v1/currencies', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export async function saveProve(token, formData) {
  try {
    const response = await request.post('/v1/proof/save', formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}