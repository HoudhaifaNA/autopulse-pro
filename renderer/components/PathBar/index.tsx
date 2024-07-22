import { Body1 } from "styles/Typography";
import * as S from "./styles";
import Icon from "components/Icon/Icon";

import { deleteParam, setParam } from "store/reducers/resourceUrls";
import { useAppSelector } from "store";
import { useDispatch } from "react-redux";

const PathBar = () => {
  const dispatch = useDispatch();

  const params = useAppSelector((state) => state.resourceUrls.cars.params);

  return (
    <S.Path>
      <S.PathSegment
        onClick={() => {
          dispatch(deleteParam({ resource: "cars", paramKey: "type" }));
          dispatch(deleteParam({ resource: "cars", paramKey: "brand" }));
          dispatch(deleteParam({ resource: "cars", paramKey: "model" }));
          dispatch(deleteParam({ resource: "cars", paramKey: "name" }));
        }}
      >
        <Icon icon="home" size="2.4rem" />
      </S.PathSegment>
      {params.type && (
        <S.PathSegment
          onClick={() => {
            dispatch(deleteParam({ resource: "cars", paramKey: "brand" }));
            dispatch(deleteParam({ resource: "cars", paramKey: "model" }));
            dispatch(deleteParam({ resource: "cars", paramKey: "name" }));
          }}
        >
          <Body1>{params.type}</Body1>
        </S.PathSegment>
      )}
      {params.brand && (
        <S.PathSegment
          onClick={() => {
            dispatch(deleteParam({ resource: "cars", paramKey: "model" }));
            dispatch(setParam({ resource: "cars", paramKey: "name", paramValue: params.brand }));
          }}
        >
          <Body1>{params.brand}</Body1>
        </S.PathSegment>
      )}
      {params.model && (
        <S.PathSegment>
          <Body1>{params.model}</Body1>
        </S.PathSegment>
      )}
    </S.Path>
  );
};

export default PathBar;
