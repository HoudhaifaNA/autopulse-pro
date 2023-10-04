import { Car } from "interfaces";
import * as S from "./styles";

interface IncompleteFieldsMarksProps
  extends Pick<
    Car,
    "is_licence_incomplete" | "is_expense_cost_incomplete" | "is_purchase_price_incomplete" | "is_sold_price_incomplete"
  > {}

const IncompleteFieldsMarks = (props: IncompleteFieldsMarksProps) => {
  const { is_licence_incomplete, is_expense_cost_incomplete, is_purchase_price_incomplete, is_sold_price_incomplete } =
    props;

  return (
    <S.MarksWrapper>
      {is_licence_incomplete ? <S.Mark $color="#00d8d6" title="Licence" /> : ""}
      {is_expense_cost_incomplete ? <S.Mark $color="#f53b57" title="Dépenses" /> : ""}
      {is_purchase_price_incomplete ? <S.Mark $color="#ffa801" title="Total" /> : ""}
      {is_sold_price_incomplete ? <S.Mark $color="#000000" title="Pr. vente" /> : ""}
    </S.MarksWrapper>
  );
};

export default IncompleteFieldsMarks;
