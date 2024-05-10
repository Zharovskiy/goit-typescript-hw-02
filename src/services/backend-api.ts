import axios from "axios";
import { Image } from "../components/App/App.types";

const instance = axios.create({
  baseURL: "https://api.unsplash.com",
});

interface ImageSearchResponse {
  total: number;
  total_pages: number;
  results: Image[];
}

export const fetchImagesSearch = async (
  query: string,
  pageNumber: number,
  pagination: number
): Promise<ImageSearchResponse> => {
  try {
    const response = await instance.get("/search/photos", {
      params: {
        client_id: "q_ilJfeXbJ7aLVkUf1TArJA5EUScrQgLm08H3UJvYpI",
        query: query,
        orientation: "landscape",
        page: pageNumber,
        per_page: pagination,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Error fetching images");
  }
};
