import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/router";

import * as S from "./styles";
import Icon from "components/Icon/Icon";
import CategoryCard from "./CategoryCard";
import { Body1 } from "styles/Typography";
import { GetCarsBrandsResponse, GetCategoryCars } from "types";
import { fetcher } from "utils/API";
import { deleteParam, setParam } from "store/reducers/resourceUrls";
import { addModal } from "store/reducers/modals";
import retreiveCategoryActions from "store/actions/categories";

const CategoriesList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [categoriesItems, setCategoriesItems] = useState<GetCategoryCars["categories"]>([]);
  const [brandsItems, setBrandsItems] = useState<GetCarsBrandsResponse["cars_brand"]>([]);
  const [modelsItems, setModelsItems] = useState<GetCarsBrandsResponse["cars_name"]>([]);

  const brandAndSeriesUrl = `/cars/brandsAndSeries?name=${selectedBrand}&type=${selectedCategory}`;
  const { data: brandsAndSeriesData } = useSWR<GetCarsBrandsResponse>(brandAndSeriesUrl, fetcher);
  const { data: categoriesData } = useSWR<GetCategoryCars>("/categories/cars", fetcher);

  const toggleCategoryForm = () => dispatch(addModal({ name: "categories", title: "Ajouter une category" }));

  useEffect(() => {
    if (categoriesData) setCategoriesItems(categoriesData.categories);
    if (brandsAndSeriesData) {
      setBrandsItems(brandsAndSeriesData.cars_brand);
      setModelsItems(brandsAndSeriesData.cars_name);
    }
  }, [brandsAndSeriesData, categoriesData]);

  useEffect(() => {
    dispatch(deleteParam({ resource: "cars", paramKey: "type" }));
    dispatch(deleteParam({ resource: "cars", paramKey: "brand" }));
    dispatch(deleteParam({ resource: "cars", paramKey: "model" }));
    dispatch(deleteParam({ resource: "cars", paramKey: "name" }));
  }, []);

  const handleCategoryClick = (name: string) => {
    setSelectedCategory(name);
    dispatch(setParam({ resource: "cars", paramKey: "type", paramValue: name }));
  };

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(brand);
    dispatch(setParam({ resource: "cars", paramKey: "brand", paramValue: brand }));
  };

  const handleModelClick = (model: string) => {
    dispatch(setParam({ resource: "cars", paramKey: "model", paramValue: model }));
    dispatch(setParam({ resource: "cars", paramKey: "name", paramValue: `${selectedBrand} ${model}` }));
    router.push("/cars");
  };

  const renderPathBar = () => {
    return (
      <S.Path>
        <S.PathSegment
          onClick={() => {
            setSelectedCategory("");
            setSelectedBrand("");
          }}
        >
          <Body1>Categories</Body1>
        </S.PathSegment>
        {selectedCategory && (
          <S.PathSegment onClick={() => setSelectedBrand("")}>
            <Body1>{selectedCategory}</Body1>
          </S.PathSegment>
        )}
        {selectedBrand && (
          <S.PathSegment>
            <Body1>{selectedBrand}</Body1>
          </S.PathSegment>
        )}
      </S.Path>
    );
  };

  const renderCards = () => {
    if (!selectedCategory) {
      return categoriesItems.map((category) => {
        const { name, total_cars } = category;
        const { UPDATE, DELETE } = retreiveCategoryActions(category);

        return (
          <CategoryCard key={name} onClick={() => handleCategoryClick(name)}>
            <Body1>
              {name} ({total_cars})
            </Body1>
            <S.CardActions onClick={(e) => e.stopPropagation()}>
              <Icon icon="edit" size="2.4rem" onClick={() => dispatch(addModal(UPDATE))} />
              <Icon icon="delete" size="2.4rem" onClick={() => dispatch(addModal(DELETE))} />
            </S.CardActions>
          </CategoryCard>
        );
      });
    } else if (!selectedBrand) {
      return brandsItems.map(({ brand, total_cars }) => (
        <CategoryCard key={brand} onClick={() => handleBrandClick(brand)}>
          <Body1>
            {brand} ({total_cars})
          </Body1>
        </CategoryCard>
      ));
    } else {
      return modelsItems.map(({ model, total_cars }) => (
        <CategoryCard key={model} onClick={() => handleModelClick(model)}>
          <Body1>
            {model} ({total_cars})
          </Body1>
        </CategoryCard>
      ));
    }
  };

  return (
    <S.Main>
      <Image src="/images/zauto-logo.png" alt="zauto logo" width={0} height={120} style={{ width: "auto" }} />
      {renderPathBar()}
      <S.CardsList>
        <CategoryCard onClick={() => router.push("/cars")}>
          <Body1>Tout</Body1>
        </CategoryCard>
        {renderCards()}
        {!selectedCategory && (
          <CategoryCard onClick={toggleCategoryForm}>
            <Icon icon="add" size="4.8rem" />
          </CategoryCard>
        )}
      </S.CardsList>
    </S.Main>
  );
};

export default CategoriesList;
