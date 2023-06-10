import * as S from "../statments/clientsStatments";
import tryCatch from "../utils/tryCatch";
import { isValidPhoneNumber, validateName } from "../utils/validations";

export const getAllClients = tryCatch((req, res) => {
  const clients = S.getClients.all();

  return res.status(200).json({ status: "success", clients });
});

export const getClientByID = tryCatch((req, res) => {
  const { id } = req.params;

  const client = S.getClientById.get(id);

  if (!client) throw Error("Client doesn't exist");

  return res.status(200).json({ status: "success", client });
});

export const createClient = tryCatch((req, res) => {
  const { fullName, phoneNumber, balance = 0 } = req.body;
  const [trimmedName, isValid] = validateName(fullName);

  if (!isValid) throw Error("Please, provide correct name");
  if (!isValidPhoneNumber(phoneNumber)) throw Error("Invalid phone number");

  const params = [trimmedName, phoneNumber, balance];

  const { lastInsertRowid } = S.createClient.run(params);
  const newClient = S.getClientById.get(lastInsertRowid);

  return res.status(201).json({ status: "success", client: newClient });
});

export const updateClient = tryCatch((req, res) => {
  const { id } = req.params;
  const { fullName, phoneNumber } = req.body;
  const [trimmedName, isValid] = validateName(fullName);

  if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
    throw Error("Invalid phone number");
  }
  if (trimmedName && !isValid) {
    throw Error("Please, provide correct name");
  }

  const params = [trimmedName, phoneNumber, id];

  const { changes } = S.updateClient.run(params);
  if (changes === 0) throw Error("No client with this id");

  const updatedClient = S.getClientById.get(id);

  return res.status(200).json({ status: "success", client: updatedClient });
});

export const updateBalance = tryCatch((req, res) => {
  const { id } = req.params;
  const { balance } = req.body;

  const { changes } = S.updateBalance.run([balance, id]);
  if (changes === 0) throw Error("No client with this id");

  const client = S.getClientById.get(id);

  return res.status(200).json({ status: "success", client });
});

export const deleteClientById = tryCatch((req, res) => {
  const { id } = req.params;

  const { changes } = S.deleteClientById.run(id);
  if (changes === 0) throw Error("Client doesn't exist");

  return res.status(204).json({ status: "success" });
});

export const deleteClients = tryCatch((req, res) => {
  S.deleteClients.run();

  return res.status(204).json({ status: "success" });
});
