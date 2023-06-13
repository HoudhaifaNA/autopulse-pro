import { useFormikContext } from "formik";
import useSWR from "swr";

import { FormGroup } from "components/Form/Form.styled";

import { TypedInput, SelectInput } from "components/Input/Input";

import { Values } from "components/CarForm/types";
import { fetcher } from "utils/API";

const getItems = () => {
  const licencesRes = useSWR("/licences", fetcher);
  const clientsRes = useSWR("/clients", fetcher);
  let licencesItems = [];
  let clientsItems = [];

  if (clientsRes.data) {
    clientsItems = clientsRes.data.clients.map(({ id, fullName }: any) => {
      return { mainText: fullName, relatedValues: [id] };
    });
  }

  if (licencesRes.data) {
    licencesItems = licencesRes.data.licences
      .filter(({ isValid }: any) => isValid === "true")
      .map(({ id, price, moudjahid }: any) => {
        return { mainText: moudjahid, relatedValues: [id, price] };
      });
  }

  return [clientsItems, licencesItems] as const;
};

const SellingDetails = () => {
  const { values } = useFormikContext<Values>();
  const { carType } = values;
  const [clientsItems, licencesItems] = getItems();

  return (
    <>
      <FormGroup>
        <SelectInput
          label="Vendeur :"
          name="seller.name"
          relatedFields={["seller.id"]}
          placeholder="Nom du vendeur"
          autoFocus
          items={clientsItems}
        />
        <SelectInput
          label="Licence :"
          name="licence.name"
          relatedFields={["licence.id", "licence.price"]}
          placeholder="Nom du moujahid"
          items={licencesItems}
        />
      </FormGroup>
      <FormGroup>
        {carType === "importé" ? (
          <>
            <TypedInput
              label="Prix ​​d'achat :"
              name="euroCost"
              type="number"
              addOn="€"
            />

            <TypedInput
              label="Prix ​​de €100 :"
              name="euroPrice"
              type="number"
              addOn="DZD"
            />
          </>
        ) : (
          <>
            <TypedInput
              label="Prix ​​d'achat :"
              name="purchasingPrice"
              type="number"
              addOn="DZD"
            />
          </>
        )}
      </FormGroup>
    </>
  );
};

export default SellingDetails;
