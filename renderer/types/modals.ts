import { Resources } from ".";

import { CarInitialValues } from "page-components/cars/CarForm/types";
import { SaleInitialValues } from "page-components/cars/SaleForm/types";
import { ClientInitialValues } from "page-components/clients/ClientForm/types";
import { ExpenseIntitalValues } from "page-components/expenses/ExpenseForm/types";
import { FiatFormInitialValues } from "page-components/finances/types";
import { LicenceInitalValues } from "page-components/licences/LicenceForm/types";
import { CategoryInitalValues } from "page-components/home/CategoryForm/types";
import { PaperInitalValues } from "page-components/papers/PaperForm/types";
import { ProcurationInitalValues } from "page-components/procurations/ProcurationForm/types";
export interface ModalFormConfig {
  id: string;
  name: Resources;
  title: string;
  params?: {
    isEdit: boolean;
    document:
      | CategoryInitalValues
      | ClientInitialValues
      | LicenceInitalValues
      | CarInitialValues
      | PaperInitalValues
      | ProcurationInitalValues
      | ExpenseIntitalValues
      | FiatFormInitialValues;
    resourceId: number;
  };
}

export interface SaleModalConfig {
  id: string;
  name: "sale";
  title: string;
  params: {
    isEdit: boolean;
    document: Pick<SaleInitialValues, "has_gray_card" | "has_procuration" | "papers_type"> | SaleInitialValues;
    resourceId: number;
  };
}

export interface ExchangeRateModalConfig {
  id: string;
  name: "exchange_rate";
  title: string;
}

export interface WarningModalConfig {
  id: string;
  name: "warning";
  title: string;
  type: "logout" | "closer";
}

export interface DeleteModalConfig {
  id: string;
  name: "delete" | "cancel_sale";
  title: string;
  message: string;
  resource: Resources;
  idsToDelete: (number | string)[];
}

export type ModalTypes =
  | ModalFormConfig
  | ExchangeRateModalConfig
  | SaleModalConfig
  | WarningModalConfig
  | DeleteModalConfig;

export type AddModalPayload =
  | Omit<ModalFormConfig, "id">
  | Omit<ExchangeRateModalConfig, "id">
  | Omit<SaleModalConfig, "id">
  | Omit<WarningModalConfig, "id">
  | Omit<DeleteModalConfig, "id">;

export interface ModalsState {
  modalsList: ModalTypes[];
}
