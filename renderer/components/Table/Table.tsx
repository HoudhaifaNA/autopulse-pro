import Badge from "components/Badge/Badge";
import Icon from "components/Icon/Icon";
import * as S from "components/Table/Table.styled";
import { Body2 } from "styles/Typography";

const Table = () => {
  return (
    <S.TableWrapper>
      <S.TableHeader>
        <S.TableContent>
          <input type="checkbox" />
        </S.TableContent>
        <S.TableContent>
          <Body2>Date créée</Body2>
          <Icon icon="expand" size="1.6rem" />
        </S.TableContent>
        <S.TableContent>
          <Body2>Nom</Body2>
          <Icon icon="expand" size="1.6rem" />
        </S.TableContent>
        <S.TableContent>
          <Body2>Dette</Body2>
          <Icon icon="expand" size="1.6rem" />
        </S.TableContent>
        <S.TableContent>
          <Body2>Status de payment</Body2>
        </S.TableContent>
        <S.TableContent>
          <Body2>Dernière transaction</Body2>
          <Icon icon="expand" size="1.6rem" />
        </S.TableContent>
        <S.TableContent>
          <Icon icon="more_vert" size="1.6rem" />
        </S.TableContent>
      </S.TableHeader>
      <S.TableItem>
        <S.TableContent>
          <input type="checkbox" />
        </S.TableContent>

        <S.TableContent>
          <Body2>15/07/2021</Body2>
        </S.TableContent>
        <S.TableContent>
          <Body2>Houdhaifa Lebbad</Body2>
        </S.TableContent>
        <S.TableContent>
          <Body2>1500000.00</Body2>
        </S.TableContent>
        <S.TableContent>
          <Badge type="error">Endetté</Badge>
        </S.TableContent>
        <S.TableContent>
          <Body2>19/08/2022</Body2>
        </S.TableContent>
        <S.TableContent>
          <Icon icon="more_vert" size="1.6rem" />
        </S.TableContent>
      </S.TableItem>
    </S.TableWrapper>
  );
};

export default Table;
