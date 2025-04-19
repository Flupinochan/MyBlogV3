import { BranchInfoMap } from "../interfaces/BlogVersionInterface";
import axiosInstance from "../utils/axiosInstance";

export const getBlogVersion = async (): Promise<BranchInfoMap[]> => {
  const response = await axiosInstance.get("/blog-version");
  const data: BranchInfoMap[] = response.data;
  return data;
}