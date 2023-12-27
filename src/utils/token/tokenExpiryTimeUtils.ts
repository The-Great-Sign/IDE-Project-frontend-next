function decodeJwt(token: string) {
  const payload = token.split('.')[1];
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  const decodedPayload = atob(base64);
  return JSON.parse(decodedPayload);
}

export function getJwtExpiration(token: string) {
  const decoded = decodeJwt(token);
  return decoded.exp ? new Date(decoded.exp * 1000) : null;
}
