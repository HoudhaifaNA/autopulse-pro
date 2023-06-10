import * as S from "../statments/carStatments";
import { getLicenceById } from "../statments/licenceStatments";
import tryCatch from "../utils/tryCatch";

interface Licence {
  isValid?: string;
  price?: number;
}

export const getCars = tryCatch((req, res) => {
  const cars = S.getCars.all();

  return res.status(201).json({ status: "success", message: cars });
});

export const getCarById = tryCatch((req, res) => {
  const { carId } = req.params;

  const car = S.getCarById.get(carId);

  if (!car) throw Error("Car doesn't exist");

  return res.status(201).json({ status: "success", car });
});

export const createCar = tryCatch((req, res) => {
  const {
    type,
    brand,
    serie,
    model,
    serialNumber,
    registrationNumber,
    color,
    year,
    seller,
    licenceId,
    costInEuros,
    euroPrice,
    purchasingPrice,
    expenses,
    totalEurosAmount,
    totalCost,
  } = req.body;

  const currLicence: Licence = getLicenceById.get(licenceId);

  if (!currLicence || currLicence.isValid === "false") {
    throw Error("Invalid licence");
  }

  const { lastInsertRowid } = S.creatCar.run([
    type,
    brand,
    serie,
    model,
    serialNumber,
    registrationNumber,
    color,
    year,
    seller,
    licenceId,
    costInEuros,
    euroPrice,
    purchasingPrice,
    expenses,
    totalEurosAmount,
    totalCost,
  ]);

  const newCar = S.getCarById.get(lastInsertRowid);

  return res.status(201).json({ status: "success", car: newCar });
});

export const updateCar = tryCatch((req, res) => {
  const { carId } = req.params;
  const {
    brand,
    serie,
    model,
    serialNumber,
    registrationNumber,
    color,
    year,
    costInEuros,
    euroPrice,
    purchasingPrice,
    expenses,
    totalEurosAmount,
    totalCost,
  } = req.body;

  const { changes } = S.updateCar.run([
    brand,
    serie,
    model,
    serialNumber,
    registrationNumber,
    color,
    year,
    costInEuros,
    euroPrice,
    purchasingPrice,
    expenses,
    totalEurosAmount,
    totalCost,
    carId,
  ]);

  if (changes === 0) throw Error("Car doesn't exist");

  const updatedCar = S.getCarById.get(carId);

  return res.status(200).json({ status: "success", car: updatedCar });
});

export const sellCar = tryCatch((req, res) => {
  const { carId } = req.params;
  const { buyer, soldPrice } = req.body;

  const car = S.getCarById.get(carId);

  //@ts-ignore
  if (car.soldPrice > 0) throw Error("Car has been sold");

  if (!buyer || !soldPrice) throw Error("Bad params");

  const { changes } = S.sellCar.run([buyer, soldPrice, carId]);
  if (changes === 0) throw Error("Car doesn't exist");

  const soldCar = S.getCarById.get(carId);

  return res.status(200).json({ status: "success", car: soldCar });
});

export const deleteCarById = tryCatch((req, res) => {
  const { carId } = req.params;

  const { changes } = S.deleteCarById.run(carId);
  if (changes === 0) throw Error("Car doesn't exist");

  return res.status(204).json({ status: "success" });
});

export const deleteCars = tryCatch((req, res) => {
  S.deleteAllCars.run();

  return res.status(204).json({ status: "success" });
});
