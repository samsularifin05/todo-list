import { ResponseLoginDto } from "@/pages";
import { getItem } from "./localStroage";
import CryptoJS from "crypto-js";
export const { VITE_APP_SECRETKEY, VITE_APP_KEY, VITE_APP_BE_URL } = import.meta
  .env;

export const timoutDelay = (time: number = 100): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const generateSignature = (timestampApp: string) => {
  const userData = getItem<ResponseLoginDto>("userdata");

  const signature = CryptoJS.SHA256(
    VITE_APP_KEY +
      VITE_APP_SECRETKEY +
      (userData?.access_token || "") +
      timestampApp
  ).toString();

  return signature;
};
export const generateSecret = () => {
  const seCret = CryptoJS.SHA256(VITE_APP_SECRETKEY).toString();

  return seCret;
};
