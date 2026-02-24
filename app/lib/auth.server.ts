import { createCookieSessionStorage, redirect } from "react-router";

const SESSION_SECRET = process.env.SESSION_SECRET || "dev-secret-change-me";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__admin_session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    sameSite: "lax",
    secrets: [SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

export async function requireAuth(request: Request) {
  const session = await getSession(request);
  if (!session.get("authenticated")) {
    throw redirect("/admin/login");
  }
  return session;
}

export async function login(request: Request, password: string) {
  if (password !== ADMIN_PASSWORD) {
    return null;
  }
  const session = await getSession(request);
  session.set("authenticated", true);
  return sessionStorage.commitSession(session);
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return sessionStorage.destroySession(session);
}
