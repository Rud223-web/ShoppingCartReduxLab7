import axios from 'axios';
import { Product } from '../store/productsSlice';

const BASE_URL = 'https://fakestoreapi.com';

export const fetchProductsFromAPI = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${BASE_URL}/products`);
  return response.data;
};