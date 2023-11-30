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

export async function saveTransfer(token, formData) {
  try {
    const response = await request.post('/v1/transfer/save', formData, {
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

export async function getOptionsBalance(token) {
  try {
    const response = await request.get('/v1/user/options', {
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

export async function startTrade(token, formData) {
  try {
    const response = await request.post('/v1/trade/save', formData, {
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

export async function getTradeHistory(token){
  try{
    const response = await request.get('/v1/trade/history', {
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

export async function withdraw(token, formData){
  try {
    const response = await request.post('/v1/user/withdraw', formData, {
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

export async function completeTrade(token, formData, id){
    try {
      const response = await request.post(`/v1/trade/${id}/complete`, formData, {
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

export async function getTransactionHistory(token){
  try{
    const response = await request.get('/v1/user/transactions', {
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