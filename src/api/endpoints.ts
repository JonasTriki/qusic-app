import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import config from '_config';
import {ApiResponse} from '../models/ApiResponse';

// Helper method to create endpoints to API.
async function createRequest<T>(
  method: Method,
  endpoint: string,
  data: any = {},
  multipart?: boolean,
) {
  let response: AxiosResponse<T> | undefined;
  try {
    const axiosParams: AxiosRequestConfig = {
      method,
      url: config.apiBaseUrl + endpoint,
      data: data,
      withCredentials: true,
      headers: multipart ? {'Content-Type': 'multipart/form-data'} : null,
    };

    response = await axios.request<T>(axiosParams);
  } catch (error) {
    if (error.response) {
      // Non-2xx status code received
      response = error.response;
    } else {
      // No response from server/unexpected error occurred.
      response = undefined;
    }
  }
  return response;
}

interface CreateGroupResponse {
  groupId: string;
}

export function createGroup(
  name: string,
  latitude: number,
  longitude: number,
  hostUserId: string,
  password: string | null,
) {
  return createRequest<ApiResponse<CreateGroupResponse, string>>(
    'POST',
    '/groups/create',
    {
      name,
      latitude,
      longitude,
      hostUserId,
      password,
    },
  );
}
