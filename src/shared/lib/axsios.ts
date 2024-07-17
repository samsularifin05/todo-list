/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance } from "axios";
import { getItem } from "./localStroage";
import { ResponseLoginDto } from "@/pages";
import { VITE_APP_BE_URL, generateSecret, generateSignature } from "./helper";
import { ApiResponse, ErrorResponse } from "../interface";

class ApiInstance {
  public axios: AxiosInstance;
  public datauser = getItem<ResponseLoginDto>("userdata");
  public timestamp = new Date().toISOString();
  public signature = generateSignature(this.timestamp);
  public secret = generateSecret();

  constructor() {
    this.axios = axios.create({
      baseURL: VITE_APP_BE_URL,
      // timeout: 120000,
      headers: {
        "Content-Type": "application/json",
        // timestamp: this.timestamp,
        // signature: this.signature,
        Authorization: this.datauser.token
          ? `Bearer ${this.datauser.token}`
          : undefined
      }
    });
  }
  public async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.axios.get<ApiResponse<T>>(endpoint);
      return response.data;
    } catch (error) {
      return this.handleError<T>(error);
    }
  }
  public async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.axios.put<ApiResponse<T>>(endpoint, data);
      return response.data;
    } catch (error) {
      return this.handleError<T>(error);
    }
  }
  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.axios.delete<ApiResponse<T>>(endpoint);
      return response.data;
    } catch (error) {
      return this.handleError<T>(error);
    }
  }
  public async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.axios.post<ApiResponse<T>>(endpoint, data);
      return response.data;
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  private handleError<T>(error: any): ApiResponse<T> {
    if (axios.isAxiosError(error)) {
      const errResponse = error as AxiosError<ErrorResponse>;

      if (errResponse.response) {
        const { data } = errResponse.response;
        const message = data && data.message ? data.message : "Unknown error";

        throw new Error(message);
      } else if (errResponse.request) {
        throw new Error(errResponse.message);
      } else {
        throw new Error(errResponse.message);
      }
    } else {
      throw new Error("Tidak Terhubung Ke Server");
    }
  }
}

export const apiInstance = new ApiInstance();
