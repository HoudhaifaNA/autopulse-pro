import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { useRouter } from "next/router";

import * as S from "./styles";
import Icon from "components/Icon/Icon";
import CategoryCard from "./CategoryCard";
import { Body2 } from "styles/Typography";
import { GetCarsBrandsResponse, GetCategoryCars } from "types";
import { fetcher } from "utils/API";
import { deleteParam, setParam } from "store/reducers/resourceUrls";
import { addModal } from "store/reducers/modals";
import retreiveCategoryActions from "store/actions/categories";
import { useAppSelector } from "store";
import PathBar from "components/PathBar";

const CategoriesList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const params = useAppSelector((state) => state.resourceUrls.cars.params);
  const [categoriesItems, setCategoriesItems] = useState<GetCategoryCars["categories"]>([]);
  const [brandsItems, setBrandsItems] = useState<GetCarsBrandsResponse["cars_brand"]>([]);
  const [modelsItems, setModelsItems] = useState<GetCarsBrandsResponse["cars_name"]>([]);

  const brandAndSeriesUrl = `/cars/brandsAndSeries?name=${params.name}&type=${params.type}`;
  const { data: brandsAndSeriesData } = useSWR<GetCarsBrandsResponse>(brandAndSeriesUrl, fetcher);
  const { data: categoriesData } = useSWR<GetCategoryCars>("/categories/cars", fetcher);

  const handleAdding = () => {
    if (!params.type) {
      dispatch(addModal({ name: "categories", title: "Ajouter une category" }));
    } else if (params.type) {
      dispatch(addModal({ name: "cars", title: "Ajouter une voiture" }));
    }
  };

  useEffect(() => {
    if (categoriesData) setCategoriesItems(categoriesData.categories);
    if (brandsAndSeriesData) {
      setBrandsItems(brandsAndSeriesData.cars_brand);
      setModelsItems(brandsAndSeriesData.cars_name);
    }
  }, [brandsAndSeriesData, categoriesData]);

  // useEffect(() => {
  //   dispatch(deleteParam({ resource: "cars", paramKey: "type" }));
  //   dispatch(deleteParam({ resource: "cars", paramKey: "brand" }));
  //   dispatch(deleteParam({ resource: "cars", paramKey: "model" }));
  //   dispatch(deleteParam({ resource: "cars", paramKey: "name" }));
  // }, []);

  const handleCategoryClick = (name: string) => {
    dispatch(setParam({ resource: "cars", paramKey: "type", paramValue: name }));
  };

  const handleBrandClick = (brand: string) => {
    dispatch(setParam({ resource: "cars", paramKey: "brand", paramValue: brand }));
    dispatch(setParam({ resource: "cars", paramKey: "name", paramValue: brand }));
  };

  const handleModelClick = (model: string) => {
    dispatch(setParam({ resource: "cars", paramKey: "model", paramValue: model }));
    dispatch(setParam({ resource: "cars", paramKey: "name", paramValue: `${params.brand} ${model}` }));
    router.push("/cars");
  };

  const renderCards = () => {
    if (!params.type) {
      return categoriesItems.map((category) => {
        const { name, total_cars } = category;
        const { UPDATE, DELETE } = retreiveCategoryActions(category);

        return (
          <CategoryCard key={name} onDoubleClick={() => handleCategoryClick(name)}>
            <Body2>
              {name} ({total_cars})
            </Body2>
            <S.CardActions onClick={(e) => e.stopPropagation()}>
              <Icon icon="edit" size="1.8rem" onClick={() => dispatch(addModal(UPDATE))} />
              <Icon icon="delete" size="1.8rem" onClick={() => dispatch(addModal(DELETE))} />
            </S.CardActions>
          </CategoryCard>
        );
      });
    } else if (!params.brand) {
      return brandsItems.map(({ brand, total_cars }) => {
        if (total_cars > 0) {
          return (
            <CategoryCard key={brand} onDoubleClick={() => handleBrandClick(brand)}>
              <Body2>
                {brand} ({total_cars})
              </Body2>
            </CategoryCard>
          );
        }
      });
    } else {
      return modelsItems.map(({ model, total_cars }) => {
        if (total_cars > 0) {
          return (
            <CategoryCard key={model} onDoubleClick={() => handleModelClick(model)}>
              <Body2>
                {model} ({total_cars})
              </Body2>
            </CategoryCard>
          );
        }
      });
    }
  };

  return (
    <S.Main>
      {<PathBar />}
      <S.CardsList>
        <CategoryCard onDoubleClick={() => router.push("/cars")}>
          <Body2>Tout</Body2>
        </CategoryCard>
        {renderCards()}
        <CategoryCard onClick={handleAdding}>
          <Icon icon="add" size="4.8rem" />
        </CategoryCard>
      </S.CardsList>
    </S.Main>
  );
};

export default CategoriesList;
