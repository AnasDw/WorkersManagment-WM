export function validateForm(firstName, lastName, email, password) {
  const errors = [true, true, true, true];

  if (!firstName) {
    errors[0] = 'First Name is required';
  }

  if (!lastName) {
    errors[1] = 'Last Name is required';
  }

  if (!email) {
    errors[2] = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors[2] = 'Invalid email format';
  }

  if (!password) {
    errors[3] = 'Password is required';
  } else if (password.length < 6) {
    errors[3] = 'Password must be at least 6 characters long';
  } else {
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegExp.test(password)) errors[3] = 'Week password';
  }

  return errors;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

