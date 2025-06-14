import { IContactRequest } from '../interfaces/ContactInterface';
import { fetchApi } from '../utils/fetchApiClient';

export const postContact = async (values: IContactRequest): Promise<Response> => {
  const response = await fetchApi("/contact", "POST", values);
  return response;
}