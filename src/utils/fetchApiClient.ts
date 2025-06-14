import amplifyOutputs from '../../amplify_outputs.json';

const baseUrl = amplifyOutputs.custom.API.MyBlogV3.endpoint;

export async function fetchApi(path: string, method: string, body?: any) {
  const requestUrl = new URL(baseUrl + path);
  const requestOptions: RequestInit = {
    method,
  };

  if (body !== undefined) {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(requestUrl, requestOptions);
  return response;
}