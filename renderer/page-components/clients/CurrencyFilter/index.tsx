import { CategoryFilterWrapper, CategoryFilterList, CategoryFilterOption } from "components/CategoryFilter/styles";
import { Body2 } from "styles/Typography";

interface CurrencyFilterProps {
  selectedCurrency: "EUR" | "DZD" | undefined;
  setCurrency: (currency: "EUR" | "DZD" | undefined) => void;
}

const CURRENCIES = ["EUR", "DZD"] as const;

const CurrencyFilter = ({ selectedCurrency, setCurrency }: CurrencyFilterProps) => {
  const renderCurrencies = () => {
    return CURRENCIES.map((currency) => {
      const isSelected = selectedCurrency === currency;
      const toggleCurrency = () => {
        if (isSelected) {
          setCurrency(undefined);
        } else {
          setCurrency(currency);
        }
      };
      return (
        <CategoryFilterOption onClick={toggleCurrency} $isSelected={isSelected} key={currency}>
          <Body2>{currency}</Body2>
        </CategoryFilterOption>
      );
    });
  };

  return (
    <CategoryFilterWrapper>
      <CategoryFilterList>{renderCurrencies()}</CategoryFilterList>
    </CategoryFilterWrapper>
  );
};

export default CurrencyFilter;
