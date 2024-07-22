import {
  CarsSearchResult,
  ClientsSearchResult,
  LicencesSearchResult,
  PapersSearchResult,
  ProcurationsSearchResult,
  SearchResources,
  SearchItem,
} from "types";

export const categoryToIcon = (category: SearchResources) => {
  if (category === "cars") return "car";
  if (category === "licences") return "document";
  if (category === "procurations") return "procuration";
  if (category === "papers") return "folder";
  return category;
};

export const formatSearchItemContent = (item: SearchItem, resource: SearchResources): string => {
  let content = "";
  if (resource === "clients") {
    const { full_name } = item as ClientsSearchResult;
    content = full_name;
  }
  if (resource === "cars") {
    const { name, serial_number, registration_number } = item as CarsSearchResult;
    content = `${name} (${serial_number}) (${registration_number})`;
  }
  if (resource === "licences") {
    const { moudjahid, serial_number } = item as LicencesSearchResult;
    content = `${moudjahid} (${serial_number})`;
  }
  if (resource === "procurations") {
    const { moudjahid, notary, car } = item as ProcurationsSearchResult;
    content = `${moudjahid} - ${notary} - ${car}`;
  }
  if (resource === "papers") {
    const { car } = item as PapersSearchResult;
    content = car;
  }
  return content;
};
