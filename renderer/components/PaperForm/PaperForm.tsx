import useSWR from "swr";

import { FormGroup } from "components/Form/Form.styled";

import Form from "components/Form/Form";
import { TypedInput, SelectInput } from "components/Input/Input";
import DateInput from "components/DateInput/DateInput";

import { fetcher } from "utils/API";

import { Values } from "components/PaperForm/types";
import handleSubmit from "./handleSubmit";
import useClients from "hooks/useClients";

const INITIAL_VALUES: Values = {
  created_at: new Date(),
  issued_date: new Date(),
  car: { id: 0, name: "" },
  seller: { id: 0, name: "" },
  price: "",
  type: "transaction",
};

interface CarsData {
  cars: any[];
}

const getCars = () => {
  const { data, isLoading } = useSWR<CarsData>("/cars", fetcher);

  let carsItems: any[] = [];

  if (data) {
    let { cars } = data;

    cars = cars.filter((car) => car.buyerId > 0);

    carsItems = cars.map((car) => {
      const { id, name, registrationNumber, serialNumber } = car;

      return {
        mainText: `${name} (${registrationNumber})`,
        secondText: serialNumber,
        relatedValues: [Number(id)],
      };
    });
  }

  return { carsItems, isLoading };
};

const PaperForm = ({ edit, data }: { edit?: boolean; data?: any }) => {
  const { carsItems, isLoading: isCarsLoading } = getCars();
  const { clientsItems, isLoading } = useClients("DA");

  return (
    <Form
      title="Ajouter un dossier"
      initials={
        edit ? { ...INITIAL_VALUES, ...data, edit: true } : INITIAL_VALUES
      }
      validation={null}
      onSubmit={handleSubmit}
      buttonText={edit ? "Modifier" : "Ajouter"}
    >
      <FormGroup>
        {!isCarsLoading && (
          <SelectInput
            name="car.name"
            label="Voiture :"
            placeholder="Nom du voiture"
            relatedFields={["car.id"]}
            items={carsItems}
            disabled={edit}
          />
        )}
        {!isLoading && (
          <SelectInput
            name="seller.name"
            label="Vendeur :"
            placeholder="Nom du vendeur"
            relatedFields={["seller.id"]}
            items={clientsItems}
            disabled={edit}
          />
        )}
      </FormGroup>
      <FormGroup>
        <DateInput name="created_at" label="Créé à" minDate="2015" />
        <DateInput name="issued_date" label="Date de dossier" minDate="2015" />
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
          placeholder="Type de dossier"
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

export default PaperForm;
