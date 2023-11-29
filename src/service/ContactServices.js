/* eslint-disable no-useless-catch */
import { request } from "./base";

export async function contactUs(formData) {
    try {
      const response = await request.post('/v1/contact', formData, {
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