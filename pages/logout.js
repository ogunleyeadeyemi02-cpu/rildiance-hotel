
export default function Logout() {
  // clear cookie by setting expired cookie
  if (typeof window !== 'undefined') {
    document.cookie = 'admin=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/login';
  }
  return null;
}
