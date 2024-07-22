import { useEffect, useState } from "react";
import { getCarsBrandsAndModelsList } from "./constants";
import * as S from "./styles";
import Dropdown from "components/Dropdown/Dropdown";
import { Body2, LabelText } from "styles/Typography";
import Icon from "components/Icon/Icon";
import { useDispatch } from "react-redux";
import { deleteParam, setParam } from "store/reducers/resourceUrls";
import { useAppSelector } from "store";
import Button from "components/Button/Button";

const BrandsFilter = () => {
  const carsCurrentFilter = useAppSelector((state) => state.resourceUrls.cars.params);
  const dispatch = useDispatch();
  const [brandsDropdown, toggleBrandsDropdown] = useState(false);
  const [modelsDropdown, toggleModelsDropdown] = useState(false);
  const selectedBrand = typeof carsCurrentFilter.brand === "string" ? carsCurrentFilter.brand : "";
  const selectedModel = typeof carsCurrentFilter.model === "string" ? carsCurrentFilter.model : "";
  const { brands, models, brandsCount, modelsCount } = getCarsBrandsAndModelsList(selectedBrand, carsCurrentFilter);

  let modelsHeaderText = "Model";
  if (selectedBrand && !selectedModel) {
    modelsHeaderText = `${selectedBrand} - Marque`;
  }
  if (typeof selectedModel === "string" && selectedModel) {
    modelsHeaderText = selectedModel;
  }

  const selectBrand = (brand: string) => dispatch(setParam({ resource: "cars", paramKey: "brand", paramValue: brand }));
  const selectModel = (model: string) => dispatch(setParam({ resource: "cars", paramKey: "model", paramValue: model }));

  useEffect(() => {
    if (brandsDropdown) toggleModelsDropdown(false);
    if (modelsDropdown) toggleBrandsDropdown(false);
  }, [brandsDropdown, modelsDropdown]);

  const selectCarName = (name: string, type: "brand" | "model") => {
    let carNameQuery = ``;

    if (type === "brand") {
      selectBrand(name);
      selectModel("");
      toggleBrandsDropdown(false);
      carNameQuery = name;
    }
    if (type === "model") {
      selectModel(name);
      toggleModelsDropdown(false);
      carNameQuery = `${selectedBrand} ${name}`;
    }

    dispatch(setParam({ resource: "cars", paramKey: "name", paramValue: carNameQuery }));
  };

  const clearFilter = (type: "brand" | "model") => {
    if (type === "brand") {
      dispatch(deleteParam({ resource: "cars", paramKey: "brand" }));
      dispatch(deleteParam({ resource: "cars", paramKey: "model" }));
      dispatch(deleteParam({ resource: "cars", paramKey: "name" }));
    } else if (type === "model") {
      dispatch(deleteParam({ resource: "cars", paramKey: "model" }));
      dispatch(setParam({ resource: "cars", paramKey: "name", paramValue: selectedBrand }));
    }
  };

  return (
    <S.BrandsFilterWrapper>
      <LabelText>Voiture marque et model :</LabelText>
      <S.DropdownWrapper $isExpanded={brandsDropdown}>
        {selectedBrand && (
          <Button variant="ghost" onClick={() => clearFilter("brand")}>
            Effacer
          </Button>
        )}
        <S.DropdownHeader onClick={() => toggleBrandsDropdown(!brandsDropdown)}>
          <Body2>{selectedBrand || "Marque"}</Body2>
          {selectedBrand && <Body2>{brandsCount[selectedBrand]}</Body2>}
          <Icon icon="expand" size="1.8rem" />
        </S.DropdownHeader>
        {brandsDropdown && (
          <Dropdown $width="30rem" items={brands} iconSize="l" onItemClick={(brand) => selectCarName(brand, "brand")} />
        )}
      </S.DropdownWrapper>
      <S.DropdownWrapper $isExpanded={modelsDropdown}>
        {selectedModel && (
          <Button variant="ghost" onClick={() => clearFilter("model")}>
            Effacer
          </Button>
        )}
        <S.DropdownHeader onClick={() => toggleModelsDropdown(!modelsDropdown)}>
          <Body2>{modelsHeaderText}</Body2>
          {selectedModel && <Body2>{modelsCount[selectedModel]}</Body2>}
          <Icon icon="expand" size="1.8rem" />
        </S.DropdownHeader>
        {modelsDropdown && (
          <Dropdown $width="30rem" items={models} iconSize="l" onItemClick={(model) => selectCarName(model, "model")} />
        )}
      </S.DropdownWrapper>
    </S.BrandsFilterWrapper>
  );
};

export default BrandsFilter;
