import { IContactRequest, IContactResponse } from '../interfaces/ContactInterface';
import axiosInstance from '../utils/axiosInstance';

export const postContact = async (values: IContactRequest): Promise<IContactResponse> => {
  const response = await axiosInstance.post("/contact", values);
  const data: IContactResponse = response.data;
  return data;
}