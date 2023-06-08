import wilayas from "../../renderer/data/wilayas.json";

export const isValidPhoneNumber = (phoneNumber: string) => {
  const VALID_PHONE_NUMBER = /^\+?[0-9]{1,3}[0-9]{3}[0-9]{3,14}$/;

  return VALID_PHONE_NUMBER.test(phoneNumber);
};

export const validateName = (name: string) => {
  const CONSECUTIVE_WHITE_SPACES = /\s+/g;
  const VALID_NAME = /^(?!\s)([a-z ,.'-]+)$/i;

  const trimmedName = name.replace(CONSECUTIVE_WHITE_SPACES, " ").trim();
  const isValid = VALID_NAME.test(trimmedName);

  return [trimmedName, isValid] as const;
};

export const isWilaya = (wilaya: string) => {
  const wilayasNames = wilayas.map((wil) => wil.name.toLowerCase());

  return wilayasNames.includes(wilaya.toLowerCase());
};
