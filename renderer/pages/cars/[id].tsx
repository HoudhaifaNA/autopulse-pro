import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import DetailsViewer, { DetailContent, DetailHeader, DetailItem, DetailSection } from "components/DetailsViewer";
import Button from "components/Button/Button";
import Meta from "components/Meta/Meta";
import Actions from "page-components/cars/CarActions";
import * as S from "styles/cars/CarId.styles";
import { Body1, Heading5, LabelText } from "styles/Typography";

import { fetcher } from "utils/API";
import formatFiatValue from "utils/formatFiatValue";
import formatDate from "utils/formatDate";
import { addSecondaryUrl } from "store/reducers/resourceUrls";
import { Expense } from "page-components/cars/CarForm/types";
import { Car } from "interfaces";

export interface GetCarResponse {
  car: Car;
}

const CarDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<GetCarResponse>(`/cars/${id}`, fetcher);
  const [isExpanded, toggleExpand] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addSecondaryUrl({ resource: "cars", url: `/cars/${id}` }));
  }, [id, dispatch]);

  const renderClientInfo = () => {
    if (data?.car) {
      const {
        type,
        purchased_at,
        name,
        serial_number,
        registration_number,
        second_registration_number,
        color,
        production_year,
        mileage,
        keys,
        is_exchange,
        exchange_types,
        has_procuration,
        has_gray_card,
        papers_type,
        features,
        owner_id,
        owner_name,
        purchase_price_eur,
        eur_exchange_rate,
        purchase_price_dzd,
        seller_id,
        seller,
        licence_price,
        expenses,
        total_cost,
        sold_at,
        buyer_id,
        buyer,
        given_keys,
        procuration_received,
        gray_card_received,
        selling_details,
        sold_price,
        profit,
      } = data.car;

      const formattedPurchasedDate = formatDate(purchased_at);
      const formattedLicencePrice = formatFiatValue(licence_price, "DZD");
      const formattedPurchaseEURPrice = formatFiatValue(purchase_price_eur, "EUR");
      const formattedExchangeRate = formatFiatValue(eur_exchange_rate, "DZD");
      const formattedPurchaseDZDPrice = formatFiatValue(purchase_price_dzd, "DZD");
      const formattedTotalCost = formatFiatValue(total_cost, "DZD");
      const formattedSoldPrice = sold_price ? formatFiatValue(sold_price, "DZD") : "--";
      const formattedProfit = profit ? formatFiatValue(profit, "DZD", true) : "--";
      const formattedPurchasedPrice = type === "locale" ? formattedPurchaseDZDPrice : formattedPurchaseEURPrice;
      const expensesList = JSON.parse(expenses) as Expense[];

      const renderExpensesList = () => {
        return expensesList.map(({ type, raison, cost_in_eur, cost_in_dzd }) => {
          return (
            <DetailContent $columns={3}>
              {type !== "locale" && (
                <DetailItem title={raison} blurrable>
                  {formatFiatValue(cost_in_eur, "EUR")}
                </DetailItem>
              )}
              <DetailItem title={`${raison} en DZD`} blurrable>
                {formatFiatValue(cost_in_dzd, "DZD")}
              </DetailItem>
            </DetailContent>
          );
        });
      };

      const DocumentHeader = () => {
        return (
          <>
            <div>
              <Heading5>{name} :</Heading5>
              <Heading5>({production_year})</Heading5>
            </div>
            {owner_id ? (
              <Link href={`/licences/${owner_id}`}>
                <Heading5>{owner_name}</Heading5>
              </Link>
            ) : (
              <Heading5>{owner_name}</Heading5>
            )}
          </>
        );
      };

      return (
        <>
          <DetailSection>
            <DetailHeader title={<DocumentHeader />} />
            <DetailContent $columns={3}>
              <DetailItem title="numéro de châssis">{serial_number}</DetailItem>
              <DetailItem title="matricule">{registration_number}</DetailItem>
              <DetailItem title="Deuxième matricule">{second_registration_number || "--"}</DetailItem>
            </DetailContent>
            <DetailContent $columns={3}>
              <DetailItem title="couleur">{color}</DetailItem>
              <DetailItem title="kilométrage">{mileage}</DetailItem>
              <DetailItem title="clés">{keys}</DetailItem>
            </DetailContent>
            <DetailContent $columns={3}>
              <DetailItem title="Procuration">{has_procuration ? "Oui" : "Non"}</DetailItem>
              <DetailItem title="Cart grise">{has_gray_card ? "Oui" : "Non"}</DetailItem>
              <DetailItem title="Dossier">{papers_type || "--"}</DetailItem>
            </DetailContent>
            <DetailContent $columns={3}>
              <DetailItem title="Type">{type}</DetailItem>
              <DetailItem title="Échanger">{is_exchange ? "Oui" : "Non"}</DetailItem>
              <DetailItem title="types de change">
                {typeof exchange_types === "string" ? JSON.parse(exchange_types)?.join(", ") : "--"}
              </DetailItem>
            </DetailContent>
            <DetailContent $columns={3}>
              <DetailItem title="date d'achat">{formattedPurchasedDate}</DetailItem>
              <DetailItem title="vendeur" blurrable>
                <Link href={`/clients/${seller_id}`}>
                  <LabelText>{seller}</LabelText>
                </Link>
              </DetailItem>
            </DetailContent>
            {buyer_id && (
              <DetailContent $columns={3}>
                <DetailItem title="Date de vente">{sold_at ? formatDate(sold_at) : "--"}</DetailItem>
                <DetailItem title="Acheteur" blurrable>
                  <Link href={`/clients/${buyer_id}`}>
                    <LabelText>{buyer}</LabelText>
                  </Link>
                </DetailItem>
              </DetailContent>
            )}
          </DetailSection>
          {features && (
            <DetailSection>
              <DetailHeader title="Caractéristiques de la voiture" />
              <DetailContent $columns={1}>
                <Body1 style={{ width: "40%" }}>{features}</Body1>
              </DetailContent>
            </DetailSection>
          )}

          <DetailSection>
            <DetailHeader title="Totaux" />
            <DetailContent $columns={3}>
              <DetailItem title="Coût total" blurrable>
                {formattedTotalCost}
              </DetailItem>
              <DetailItem title="Prix de vente" blurrable>
                {formattedSoldPrice}
              </DetailItem>
              <DetailItem title="intérêt" blurrable>
                {formattedProfit}
              </DetailItem>
            </DetailContent>
          </DetailSection>
          {buyer_id && (
            <DetailSection>
              <DetailHeader title="Détails de vente" />
              <DetailContent $columns={3}>
                <DetailItem title="Clés données">{given_keys || "--"}</DetailItem>
                <DetailItem title="Procuration donné">{procuration_received ? "Oui" : "Non"}</DetailItem>
                <DetailItem title="Cart grise donné">{gray_card_received ? "Oui" : "Non"}</DetailItem>
              </DetailContent>
            </DetailSection>
          )}
          {selling_details && (
            <DetailSection>
              <DetailHeader title="Descriptif de vente" />
              <DetailContent $columns={1}>
                <Body1 style={{ width: "40%" }}>{selling_details}</Body1>
              </DetailContent>
            </DetailSection>
          )}
          <S.ExpandWrapper $isExpanded={isExpanded}>
            <Button variant="secondary" icon="expand" iconPostition="right" onClick={() => toggleExpand(!isExpanded)}>
              Montrer {isExpanded ? "moins" : "plus"}
            </Button>
          </S.ExpandWrapper>

          {isExpanded && (
            <DetailSection>
              <DetailHeader title="Frais" />
              <DetailContent $columns={3}>
                <DetailItem title="prix ​​de 100 €" blurrable>
                  {formattedExchangeRate}
                </DetailItem>
              </DetailContent>
              <DetailContent $columns={3}>
                <DetailItem title="prix d'achat" blurrable>
                  {formattedPurchasedPrice}
                </DetailItem>
              </DetailContent>
              <DetailContent $columns={3}>
                <DetailItem title="Prix de la licence" blurrable>
                  {formattedLicencePrice}
                </DetailItem>
              </DetailContent>
              {renderExpensesList()}
            </DetailSection>
          )}
        </>
      );
    }
  };

  return (
    <>
      <Meta title={data?.car ? `Document de ${data.car.name}` : "Voiture"} />
      <DetailsViewer $width="110rem">
        {data?.car && <Actions car={data.car} />}
        {renderClientInfo()}
      </DetailsViewer>
    </>
  );
};

export default CarDetails;
