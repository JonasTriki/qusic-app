import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import config from '_config';
import {ApiResponse} from '../models/ApiResponse';

interface RequestConfig {
  method: Method;
  endpoint: string;
  data?: any;
  headers?: any;
}

// Helper method to create endpoints to API.
async function createRequest<T>(requestConfig: RequestConfig) {
  const {method, endpoint, data, headers} = requestConfig;
  let response: AxiosResponse<T> | undefined;
  try {
    const axiosParams: AxiosRequestConfig = {
      method,
      url: config.API_BASE_URL + endpoint,
      data,
      withCredentials: true,
      headers,
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
  idToken: string,
) {
  return createRequest<ApiResponse<CreateGroupResponse, string>>({
    method: 'POST',
    endpoint: '/groups/create',
    data: {
      name,
      latitude,
      longitude,
      hostUserId,
      password,
    },
    headers: {
      Authorization: `JWT ${idToken}`,
    },
  });
}

type JoinGroupResponse = string;

export function joinGroup(
  groupId: string,
  password: string | null,
  idToken: string,
) {
  return createRequest<ApiResponse<JoinGroupResponse, string>>({
    method: 'POST',
    endpoint: '/groups/join',
    data: {
      groupId,
      password,
    },
    headers: {
      Authorization: `JWT ${idToken}`,
    },
  });
}
