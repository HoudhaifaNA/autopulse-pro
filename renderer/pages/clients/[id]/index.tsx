import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DetailsViewer, {
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
} from "components/DetailsViewer/DetailsViewer";
import CurrencyFilter from "./components/CurrencyFilter";
import TransactionsTable from "./components/TransactionsTable";

import useClientTransactions from "hooks/useClientTransactions";
import formatFiatValue from "utils/formatFiatValue";
import Meta from "components/Meta/Meta";
import { useDispatch } from "react-redux";
import { addSecondaryUrl } from "store/reducers/resourceUrls";
import Actions from "./components/Actions";

type TCurrencies = "DZD" | "EUR";

const ClientDetails = () => {
  const [currency, setCurrency] = useState<TCurrencies | "">("");
  const router = useRouter();
  const { id } = router.query;
  const { data } = useClientTransactions(id, currency);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addSecondaryUrl({ resource: "clients", url: `/clients/${id}/transactions?currency=${currency}` }));
  }, []);

  const renderClientInfo = () => {
    if (data?.client) {
      const { full_name, phone, email, address, eur_balance, dzd_balance } = data.client;
      const formattedDZDBalance = formatFiatValue(dzd_balance, "DZD", true);
      const formattedEURBalance = formatFiatValue(eur_balance, "EUR", true);

      return (
        <>
          <DetailSection>
            <DetailHeader title={full_name} />
            <DetailContent $columns={3}>
              <DetailItem title="№ téléphone">{phone || "--"}</DetailItem>
              <DetailItem title="Adresse">{address || "--"}</DetailItem>
              <DetailItem title="E-mail">{email || "--"}</DetailItem>
              <DetailItem title="DZD">{formattedDZDBalance}</DetailItem>
              <DetailItem title="EUR">{formattedEURBalance}</DetailItem>
            </DetailContent>
          </DetailSection>
          <CurrencyFilter selectedCurrency={currency} setCurrency={setCurrency} />
          <DetailHeader title={`ZAUTO (sortante)`} />
          <TransactionsTable transactions={data.transactions} direction="sortante" />
          <DetailHeader title={`${full_name} (entrante)`} />
          <TransactionsTable transactions={data.transactions} direction="entrante" />
        </>
      );
    }
  };

  return (
    <>
      <Meta title={data?.client ? `Document de ${data.client.full_name}` : "client"} />
      <DetailsViewer $width="120rem">
        {data?.client && <Actions client={data.client} />}
        {renderClientInfo()}
      </DetailsViewer>
    </>
  );
};

export default ClientDetails;
