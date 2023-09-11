import { NavbarItem } from "./types";

export const NAVBAR_ITEMS: NavbarItem[] = [
  { name: "Tableau de bord", icon: "dashboard", link: "/dashboard" },
  { name: "Voitures", icon: "car", link: "/cars" },
  { name: "Clients", icon: "clients", link: "/clients" },
  { name: "Licences", icon: "document", link: "/licences" },
  { name: "Dossiers", icon: "folder", link: "/papers" },
  { name: "Procurations", icon: "procuration", link: "/procurations" },
  { name: "Dépenses", icon: "shopping", link: "/expenses" },
  { name: "Euro", icon: "euro", link: "/finances/euro" },
  { name: "Dinar", icon: "dinar", link: "/finances/dinar" },
  { name: "Stock", icon: "stock", link: "/stock" },
  // { name: "Paramètres", icon: "account_settings", link: "/profile" },
];
