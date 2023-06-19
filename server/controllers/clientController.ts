import * as S from "../statments/clientStatments";
import AppError from "../utils/AppError";
import tryCatch from "../utils/tryCatch";
import { isValidPhoneNumber, validateName } from "../utils/validations";

export const getAllClients = tryCatch((req, res) => {
  const clients = S.getClients.all();

  return res
    .status(200)
    .json({ status: "success", results: clients.length, clients });
});

export const getClientByID = tryCatch((req, res, next) => {
  const { id } = req.params;

  const client = S.getClientById.get(id);

  if (!client) return next(new AppError("Client n'existe pas", 404));

  return res.status(200).json({ status: "success", client });
});

export const createClient = tryCatch((req, res, next) => {
  const { fullName, phoneNumber, balance = 0, created_at } = req.body;
  const [trimmedName, isValid] = validateName(fullName);

  if (!isValid) return next(new AppError("Nom incorrect", 400));
  if (!isValidPhoneNumber(phoneNumber))
    return next(new AppError("Numéro de téléphone invalide", 400));

  const params = [trimmedName, phoneNumber, balance, created_at];

  const { lastInsertRowid } = S.createClient.run(params);
  const newClient = S.getClientById.get(lastInsertRowid);

  return res.status(201).json({ status: "success", client: newClient });
});

export const updateClient = tryCatch((req, res, next) => {
  const { id } = req.params;
  const { fullName, phoneNumber } = req.body;
  const [trimmedName, isValid] = validateName(fullName);

  if (trimmedName && !isValid) {
    return next(new AppError("Please, provide correct name", 400));
  }

  if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
    return next(new AppError("Numéro de téléphone invalide", 400));
  }

  const params = [trimmedName, phoneNumber, id];

  const { changes } = S.updateClient.run(params);
  if (changes === 0) return next(new AppError("Client n'existe pas", 404));

  const updatedClient = S.getClientById.get(id);

  return res.status(200).json({ status: "success", client: updatedClient });
});

export const updateBalance = tryCatch((req, res, next) => {
  const { id } = req.params;
  const { balance } = req.body;

  const { changes } = S.updateBalance.run([balance, id]);
  if (changes === 0) return next(new AppError("Client n'existe pas", 404));

  const client = S.getClientById.get(id);

  return res.status(200).json({ status: "success", client });
});

export const deleteClientById = tryCatch((req, res, next) => {
  const { id } = req.params;

  const { changes } = S.deleteClientById.run(id);
  if (changes === 0) return next(new AppError("Client n'existe pas", 404));

  return res.status(204).json({ status: "success" });
});

export const deleteClients = tryCatch((req, res) => {
  S.deleteClients.run();

  return res.status(204).json({ status: "success" });
});
