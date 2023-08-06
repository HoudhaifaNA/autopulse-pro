import { useContext, useState } from "react";
import useSWR from "swr";
import { FormikProps } from "formik";

import { FormGroup } from "components/Form/Form.styled";

import Form from "components/Form/Form";
import { TypedInput, SelectInput } from "components/Input/Input";
import DateInput from "components/DateInput/DateInput";

import { fetcher } from "utils/API";

import { Values } from "components/ProcurationForm/types";
import handleSubmit from "./handleSubmit";

const INITIAL_VALUES: Values = {
  created_at: new Date(),
  issued_date: new Date(),
  car: { licenceId: 0, name: "" },
  price: "",
  type: "transaction",
};

interface CarsData {
  cars: any[];
}

const getCars = () => {
  const { data } = useSWR<CarsData>("/cars", fetcher);

  let carsItems: any[] = [];

  if (data) {
    let { cars } = data;

    cars = cars.filter(
      (car) =>
        car.ownerId > 0 &&
        car.procuration === "true" &&
        car.hasProcuration === "false"
    );

    carsItems = cars.map((car) => {
      const { ownerId, name, serialNumber } = car;

      return {
        mainText: name,
        secondText: serialNumber,
        relatedValues: [Number(ownerId)],
      };
    });
  }

  return carsItems;
};

const ProcurationForm = ({ edit, data }: { edit?: boolean; data?: any }) => {
  const carsList = getCars();

  return (
    <Form
      title="Ajouter une procuration"
      initials={
        edit ? { ...INITIAL_VALUES, ...data, edit: true } : INITIAL_VALUES
      }
      validation={null}
      onSubmit={handleSubmit}
      buttonText={edit ? "Modifier" : "Ajouter"}
    >
      <FormGroup>
        <SelectInput
          name="car.name"
          label="Voiture :"
          placeholder="Nom du voiture"
          relatedFields={["car.licenceId"]}
          items={carsList}
          disabled={edit}
        />
      </FormGroup>
      <FormGroup>
        <DateInput name="created_at" label="Créé à" minDate="2015" />
        <DateInput
          name="issued_date"
          label="Date de procuration"
          minDate="2015"
        />
      </FormGroup>
      <FormGroup>
        <TypedInput
          name="price"
          type="number"
          label="Prix :"
          placeholder="0"
          addOn="DA"
        />
        <SelectInput
          name="type"
          label="Type :"
          placeholder="Type de procuration"
          items={[{ mainText: "transaction" }, { mainText: "dépense" }]}
          elementAs="div"
          disabled={edit}
        />
        {data && data.received_date && (
          <DateInput
            name="received_date"
            label="Date de réception"
            minDate="2015"
          />
        )}
      </FormGroup>
    </Form>
  );
};

export default ProcurationForm;
