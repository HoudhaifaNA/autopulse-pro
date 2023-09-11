import { Resources } from ".";
import { LicenceInitalValues } from "pages/licences/components/LicenceForm/types";
import { ClientInitialValues } from "pages/clients/components/ClientForm/types";
import { CarInitialValues } from "pages/cars/components/CarForm/types";
import { SaleInitialValues } from "pages/cars/components/SaleForm/types";
import { FiatFormInitialValues } from "pages/finances/types";
import { ExpenseIntitalValues } from "pages/expenses/components/ExpenseForm/types";
import { PaperInitalValues } from "pages/papers/components/PaperForm/types";
import { ProcurationInitalValues } from "pages/procurations/components/ProcurationForm/types";

export interface ModalFormConfig {
  id: string;
  name: Resources;
  title: string;
  params?: {
    isEdit: boolean;
    document:
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
  idsToDelete: number[];
}

export type ModalTypes = ModalFormConfig | SaleModalConfig | WarningModalConfig | DeleteModalConfig;

export type AddModalPayload =
  | Omit<ModalFormConfig, "id">
  | Omit<SaleModalConfig, "id">
  | Omit<WarningModalConfig, "id">
  | Omit<DeleteModalConfig, "id">;

export interface ModalsState {
  modalsList: ModalTypes[];
}
