import Filter from "components/Filter";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";
import { useAppSelector } from "store";
import { useDispatch } from "react-redux";
import { deleteParam, setParam } from "store/reducers/resourceUrls";
import CurrencyFilter from "page-components/clients/CurrencyFilter";

const TransactionsStatsFilter = () => {
  const { params } = useAppSelector((state) => state.resourceUrls.dailyStats);
  const dispatch = useDispatch();

  const setCurrency = (currency?: "EUR" | "DZD") => {
    if (currency) {
      dispatch(setParam({ resource: "dailyStats", paramKey: "currency", paramValue: currency }));
    } else {
      dispatch(deleteParam({ resource: "dailyStats", paramKey: "currency" }));
    }
  };
  return (
    <Filter>
      <DateRangePicker
        rangeParam="transaction_date"
        resource="dailyStats"
        label="Date d. transaction"
        clearable={false}
      />
      <CurrencyFilter selectedCurrency={params.currency as any} setCurrency={setCurrency} />
    </Filter>
  );
};

export default TransactionsStatsFilter;
