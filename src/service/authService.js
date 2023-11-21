/* eslint-disable no-useless-catch */
import { request } from "./base";

// const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// Function to send registration data to the server
export async function register(formData) {
  try {
    const response = await request.post('/v1/register', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'X-CSRF-TOKEN': data,
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function login(formData) {
  try {
    const response = await request.post('/v1/login', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'X-CSRF-TOKEN': data,
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


