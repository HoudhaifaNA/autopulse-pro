import { GetAllClientsResponse, GetClientTransactionResponse } from "types/api/clients";
import { GetAllLicencesResponse, GetLicencesListResponse } from "types/api/licences";
import { GetPapersResoponse } from "types/api/papers";
import { GetProcurationsResoponse } from "types/api/procurations";
import { GetAllCarsResponse, GetCarsWithPapersResponse, GetCarsBrandsResponse } from "types/api/cars";
import { GetFiatTransactionsResponse } from "types/api/transactions";
import { GetExpensesResponse, ExpenseGrouped } from "types/api/expenses";
import {
  GetStockResponse,
  GetCountsResponse,
  GetCarsStatsResponse,
  GetExpensesStatsResponse,
  GetLicencesStatsResponse,
  GetPapersStatsResponse,
  GetProcurationsStatsResponse,
  GetClientsStatsResponse,
} from "types/api/stats";

import { Resources, DefaultParms, Param, AddSecondaryUrl, ParamValue, ResourcesState } from "types/resources";
import {
  ModalFormConfig,
  WarningModalConfig,
  DeleteModalConfig,
  ModalTypes,
  AddModalPayload,
  ModalsState,
} from "types/modals";
import { SubmitStatus, SubmitFunction } from "./forms";

export type {
  GetAllClientsResponse,
  GetClientTransactionResponse,
  GetAllLicencesResponse,
  GetLicencesListResponse,
  GetAllCarsResponse,
  GetCarsWithPapersResponse,
  GetPapersResoponse,
  GetCarsBrandsResponse,
  GetExpensesResponse,
  GetProcurationsResoponse,
  ExpenseGrouped,
  GetFiatTransactionsResponse,
  GetStockResponse,
  GetCountsResponse,
  GetCarsStatsResponse,
  GetExpensesStatsResponse,
  GetLicencesStatsResponse,
  GetPapersStatsResponse,
  GetProcurationsStatsResponse,
  GetClientsStatsResponse,
  Resources,
  DefaultParms,
  Param,
  ParamValue,
  AddSecondaryUrl,
  ResourcesState,
  ModalFormConfig,
  WarningModalConfig,
  DeleteModalConfig,
  ModalTypes,
  AddModalPayload,
  ModalsState,
  SubmitStatus,
  SubmitFunction,
};
