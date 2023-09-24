import { Ref, forwardRef, useEffect } from "react";
import * as S from "./styles";

import useClientTransactions from "hooks/useClientTransactions";
import TransactionsTable from "../TransactionsTable";

interface ClientPrintedProps {
  id: string | number;
}

const ClientPrinted = forwardRef(({ id }: ClientPrintedProps, ref: Ref<HTMLDivElement>) => {
  const { data } = useClientTransactions(id);

  return (
    <S.DocumentWrapper ref={ref} id="content">
      {data && <TransactionsTable transactions={data.transactions} />}
      <div className="page-number"></div>
    </S.DocumentWrapper>
  );
});

export default ClientPrinted;
