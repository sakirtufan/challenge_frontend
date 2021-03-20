import axios from "axios";
const apiEndpoint = "http://localhost:8000/products/";

export const fetchProducts = async () => await axios.get(apiEndpoint);

export const fetchSingleProduct = async (id) =>
  await axios.get(`${apiEndpoint}${id}`);

export const createProduct = async (product) => await axios.post(apiEndpoint, product);

export const updateProduct = async (id, updatedProduct) =>
  await axios.patch(`${apiEndpoint}${id}`, updatedProduct);

export const deleteProduct = async (id) =>
  await axios.delete(`${apiEndpoint}${id}`);
