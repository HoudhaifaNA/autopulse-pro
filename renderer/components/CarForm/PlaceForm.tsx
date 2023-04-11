import React from "react";
import styled from "styled-components";

import { setFieldValue } from "components/CarForm/types";
import { Body1 } from "styles/Typography";
import Icon from "components/Icon/Icon";

const PlaceFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7rem;
  height: 20rem;
`;
export const PlaceItem = styled.div<{ $selected: boolean }>`
  width: 19rem;
  height: 12.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-transform: capitalize;
  border: 0.2rem solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.primary[500] : theme.colors.neutral[300]};
  border-radius: 0.4rem;
  user-select: none;
  cursor: pointer;
`;

interface PlaceFormProps {
  carType: string;
  setFieldValue: setFieldValue;
}

const places = ["importé", "locale"];

const PlaceForm = ({ carType, setFieldValue }: PlaceFormProps) => {
  return (
    <PlaceFormWrapper>
      {places.map((place) => {
        return (
          <PlaceItem
            key={place}
            $selected={carType === place}
            onClick={() => setFieldValue("carType", place)}
          >
            <Icon icon={place} size="4.8rem" />
            <Body1>{place}</Body1>
          </PlaceItem>
        );
      })}
    </PlaceFormWrapper>
  );
};

export default PlaceForm;
