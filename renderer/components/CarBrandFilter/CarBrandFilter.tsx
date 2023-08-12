import { useEffect, useRef, useState, useContext } from "react";
import useSWR from "swr";

import * as S from "components/CarBrandFilter/CarBrandFilter.styled";
import { Body1, Body2 } from "styles/Typography";

import Dropdown from "components/Dropdown/Dropdown";
import Badge from "components/Badge/Badge";
import Icon from "components/Icon/Icon";

import { GlobalContext } from "pages/_app";
import useClickOutside from "hooks/useClickOutside";
import { fetcher } from "utils/API";
import slugify from "utils/slugify";
import Button from "components/Button/Button";

interface CarParams {
  brand: string;
  model?: string;
  serie?: string;
  swrOptions?: { refreshInterval: number } | {};
}

interface CarBrandFilterProps {
  setCurrCars: (cars: any) => void;
  carsNum: number;
}

const getBrandsList = (
  mounted: boolean,
  swrOptions?: { refreshInterval: number } | {}
) => {
  const url = mounted ? `/cars/brands` : null;
  let brandsList = [];

  const { data } = useSWR(url, fetcher, swrOptions);

  if (data) {
    brandsList = data.brands.map(({ brand, count }: any) => {
      return {
        mainText: brand,
        secondText: count,
        icon: slugify(brand),
      };
    });
  }

  return brandsList;
};
const getModelsList = (brand: string) => {
  const url = brand ? `cars/models?brand=${brand}` : null;
  let modelsList = [];

  const { data } = useSWR(url, fetcher);

  if (data) {
    modelsList = data.models.map((mdl: any) => {
      const { model, count } = mdl;
      return {
        mainText: model,
        secondText: count,
      };
    });
  }

  return modelsList;
};

const getCars = (param: CarParams) => {
  const { brand, model, serie, swrOptions } = param;
  let cars = [];
  let url;
  const carName = `${brand} ${model}`.trim();
  if (serie) url = `/cars/series/${serie}`;
  if (brand && !model) url = `/cars/carBrand?brand=${brand}&serie=${serie}`;
  if (model) url = `/cars/carName?name=${carName}&serie=${serie}`;

  const { data } = useSWR(url ? url : null, fetcher, swrOptions);

  if (data) cars = data.cars;

  return cars;
};

const isDropdownActive = (isActive: boolean) => {
  return isActive ? "dropdown_active" : "";
};

const CarBrandFilter = ({ setCurrCars, carsNum }: CarBrandFilterProps) => {
  const { currCarType, currModal, setCurrCar, modalDelete } =
    useContext(GlobalContext);
  const { data } = useSWR("/cars/series", fetcher);
  const [mounted, setMounted] = useState(false);
  const [brandItems, setBrandItems] = useState([]);
  const [modelItems, setModelItems] = useState([]);
  const serieRef = useRef(null);
  const brandRef = useRef(null);
  const modelRef = useRef(null);
  const [isSeriesShown, toggleSeries] = useClickOutside(serieRef);
  const [isBrandsShown, toggleBrands] = useClickOutside(brandRef);
  const [isModelsShown, toggleModels] = useClickOutside(modelRef);
  const [swrOptions, setSWROptions] = useState({});

  const { brand, model, serie } = currCarType;
  const brands = getBrandsList(mounted, swrOptions);
  const models = getModelsList(brand);
  const cars = getCars({ brand, model, serie, swrOptions });
  const currBrand = brandItems.find((br: any) => br.mainText === brand);
  let carSeries = [];
  if (data) {
    carSeries = data.series.map((serie: any) => {
      return {
        mainText: serie.serie,
        secondText: serie.count,
      };
    });
  }
  useEffect(() => {
    setSWROptions({ refreshInterval: 100 });

    const swrTimeOut = setTimeout(() => {
      setSWROptions({});
    }, 1000);

    return () => clearTimeout(swrTimeOut);
  }, [JSON.stringify(modalDelete), JSON.stringify(currModal)]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setBrandItems(brands);
  }, [JSON.stringify(brands)]);

  useEffect(() => {
    setModelItems(models);
  }, [JSON.stringify(models)]);

  // TODO NEED TO RENAME THIS FUNCTION
  useEffect(() => {
    setCurrCars(cars);
  }, [JSON.stringify(cars)]);

  useEffect(() => {
    if (cars.length === 0 && (serie || brand || model)) {
      setCurrCars(null);
    }
  }, [cars]);

  // TODO NEED TO RENAME THIS FUNCTION
  useEffect(() => {
    setCurrCar({ ...currCarType, model: "" });
  }, [brand]);

  return (
    <S.FilterWrapper style={{ marginRight: "auto" }}>
      {/* <S.FilterField
        onClick={() => {
          setCurrCars(
            cars.filter((cr: any) => cr.fields_status === "Missing fields")
          );
        }}
      >
         <div
          style={{ marginLeft: "auto", zIndex: 15000 }}
          onClick={() => {
          }}
        >
          <Icon icon="close" size="1.8rem" />
        </div>
        <Body1>Incomplète</Body1>
      </S.FilterField> */}
      <S.FilterField
        ref={serieRef}
        className={isDropdownActive(isSeriesShown)}
        style={{
          backgroundColor: "#0045E5",
          color: "#fff",
          border: "none",
          minWidth: "12rem",
        }}
      >
        <Body1>{serie ? serie : "Serie"}</Body1>
        {isSeriesShown && (
          <Dropdown
            $width="100%"
            $top="4rem"
            $left="0"
            items={carSeries}
            onItemClick={(it) => {
              setCurrCar({ ...currCarType, serie: it });
            }}
          />
        )}

        <div
          style={{ marginLeft: "auto", zIndex: 15000 }}
          onClick={() => {
            toggleSeries(false);
            setCurrCar({ ...currCarType, serie: "" });
          }}
        >
          <Icon icon="close" size="1.8rem" />
        </div>
        <div onClick={() => toggleSeries(!isSeriesShown)}>
          <Icon icon="expand" size="1.8rem" />
        </div>
      </S.FilterField>
      <S.FilterField
        ref={brandRef}
        onClick={() => toggleBrands(!isBrandsShown)}
        className={isDropdownActive(isBrandsShown)}
      >
        <Body1>{brand ? brand : "Vehicules"}</Body1>
        {isBrandsShown && (
          <Dropdown
            $width="100%"
            $top="4rem"
            $left="0"
            items={brandItems}
            onItemClick={(it) => setCurrCar({ ...currCarType, brand: it })}
            iconSize="l"
          />
        )}
        <Body2 style={{ marginLeft: "auto" }}>
          {brand && currBrand && !serie ? currBrand["secondText"] : carsNum}
        </Body2>
        <Icon icon="expand" size="1.8rem" />
      </S.FilterField>
      <S.FilterField
        ref={modelRef}
        onClick={() => toggleModels(!isModelsShown)}
        className={isDropdownActive(isModelsShown)}
      >
        <Body1>{model ? model : "Model"}</Body1>
        {isModelsShown && (
          <Dropdown
            $width="100%"
            $top="4rem"
            $left="0"
            items={modelItems}
            onItemClick={(it) => setCurrCar({ ...currCarType, model: it })}
          />
        )}
        {model && <Body2 style={{ marginLeft: "auto" }}>{cars.length}</Body2>}

        <Icon icon="expand" size="1.8rem" />
      </S.FilterField>

      <Button
        variant="danger"
        onClick={() => {
          setCurrCar({ brand: "", model: "", serie: "" });
          setCurrCars([]);
        }}
      >
        Effacer
      </Button>
    </S.FilterWrapper>
  );
};

export default CarBrandFilter;
