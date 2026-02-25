import { createCookie } from "react-router";

const toastCookie = createCookie("__admin_toast", {
  maxAge: 10,
  path: "/admin",
});

export type ToastType = "success" | "error";

interface ToastData {
  message: string;
  type: ToastType;
}

export async function setToast(message: string, type: ToastType = "success"): Promise<string> {
  return await toastCookie.serialize({ message, type });
}

export async function getToast(request: Request): Promise<ToastData | null> {
  const cookieHeader = request.headers.get("Cookie");
  const data = await toastCookie.parse(cookieHeader);
  if (!data?.message) return null;
  return data as ToastData;
}

export async function clearToastHeader(): Promise<string> {
  return await toastCookie.serialize(null, { maxAge: 0 });
}
