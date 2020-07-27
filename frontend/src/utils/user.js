export const emptyUser = {
  name: '',
  age: '',
  email: '',
  phone: ''
}

export function isValidUser(user) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const phoneRegex = /^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/;

  if (!user.name.length || user.name.length > 99)
    return false
  if (user.age < 0 || user.age > 100)
    return false;
  if (!user.email.match(emailRegex))
    return false;
  if (!user.phone.match(phoneRegex))
    return false;

  return true;
}