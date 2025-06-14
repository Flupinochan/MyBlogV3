import { IBlogVersion } from "../interfaces/BlogVersionInterface";
import { fetchApi } from "../utils/fetchApiClient";

export const getBlogVersion = async (): Promise<IBlogVersion[]> => {
  const response = await fetchApi("/blog-version", "GET");
  const data: IBlogVersion[] = await response.json();
  return data;
}