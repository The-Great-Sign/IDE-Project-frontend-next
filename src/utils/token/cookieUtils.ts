export function getCookie(name: string) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export function setCookie(name: string, value: string, hours: number) {
  let expires = '';
  if (hours) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000); // 시간을 밀리초로 변환
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export function deleteCookie(name: string) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
