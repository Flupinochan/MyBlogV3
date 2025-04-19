import { IBlogVersion } from "../interfaces/BlogVersionInterface";
import axiosInstance from "../utils/axiosInstance";

export const getBlogVersion = async (): Promise<IBlogVersion[]> => {
  const response = await axiosInstance.get("/blog-version");
  const data: IBlogVersion[] = response.data;
  return data;
}