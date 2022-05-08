import cookie from "js-cookie";

const cookie_key = "token";

function getToken(): string | undefined {
  return cookie.get(cookie_key);
}

function setToken(val: string): void {
  cookie.set(cookie_key, val);
}

function delToken(): void {
  cookie.remove(cookie_key);
}

export { getToken, setToken, delToken };
