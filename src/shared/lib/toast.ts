/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";

export const ToastNotificationSuccess = (message: string) => {
  toast.success(message || "Terjadi Kesalahan Saat Mengirim Data", {
    icon: "✅"
  });
};

export const ToastNotificationError = (message: string) => {
  toast.error(message || "Terjadi Kesalahan Saat Mengirim Data", {
    icon: "❌"
  });
};

export const ToastNotificationInfo = (message: string) => {
  toast(message || "Terjadi Kesalahan Saat Mengirim Data", {
    icon: "ℹ️"
  });
};

export const ToastNotificationPromise = (
  promise: Promise<any>,
  messages: { loading: string; success: string; error: string }
) => {
  toast.promise(promise, {
    loading: messages.loading,
    success: messages.success || "Berhasil mengirim data",
    error: messages.error || "Terjadi kesalahan saat mengirim data"
  });
};
