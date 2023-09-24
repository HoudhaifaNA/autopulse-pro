import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import DetailsViewer, { DetailContent, DetailHeader, DetailItem, DetailSection } from "components/DetailsViewer";
import CurrencyFilter from "page-components/clients/CurrencyFilter";
import TransactionsTable from "page-components/clients/TransactionsTable";
import ClientActions from "page-components/clients/ClientActions";
import Meta from "components/Meta/Meta";

import useClientTransactions from "hooks/useClientTransactions";
import { addSecondaryUrl } from "store/reducers/resourceUrls";
import formatFiatValue from "utils/formatFiatValue";

type TCurrencies = "DZD" | "EUR";

const ClientDetails = () => {
  const [currency, setCurrency] = useState<TCurrencies | "">("");
  const router = useRouter();
  const { id } = router.query;
  const { data } = useClientTransactions(`${id}`, currency);
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
              <DetailItem title="№ téléphone" blurrable>
                {phone || "--"}
              </DetailItem>
              <DetailItem title="Adresse" blurrable>
                {address || "--"}
              </DetailItem>
              <DetailItem title="E-mail" blurrable>
                {email || "--"}
              </DetailItem>
              <DetailItem title="DZD" blurrable>
                {formattedDZDBalance}
              </DetailItem>
              <DetailItem title="EUR" blurrable>
                {formattedEURBalance}
              </DetailItem>
            </DetailContent>
          </DetailSection>

          <CurrencyFilter selectedCurrency={currency} setCurrency={setCurrency} />
          <DetailSection>
            <DetailHeader title={`ZAUTO (sortante)`} />
            <TransactionsTable transactions={data.transactions} direction="sortante" />
          </DetailSection>
          <DetailSection>
            <DetailHeader title={`${full_name} (entrante)`} />
            <TransactionsTable transactions={data.transactions} direction="entrante" />
          </DetailSection>
        </>
      );
    }
  };

  return (
    <>
      <Meta title={data?.client ? `Document de ${data.client.full_name}` : "client"} />
      <DetailsViewer $width="120rem">
        {data?.client && <ClientActions client={data.client} />}
        {renderClientInfo()}
      </DetailsViewer>
    </>
  );
};

export default ClientDetails;
