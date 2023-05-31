export interface Values {
  username: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordInputProps {
  label: string;
  name: string;
  placeholder: string;
}
