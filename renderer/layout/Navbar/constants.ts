import { NavbarItem } from "./types";

export const NAVBAR_ITEMS: NavbarItem[] = [
  { name: "Accueil", icon: "home", link: "/home" },
  { name: "Voitures", icon: "car", link: "/cars" },
  { name: "Clients", icon: "clients", link: "/clients" },
  { name: "Licences", icon: "document", link: "/licences" },
  { name: "Dossiers", icon: "folder", link: "/papers" },
  { name: "Procurations", icon: "procuration", link: "/procurations" },
  { name: "Dépenses", icon: "shopping", link: "/expenses" },
  { name: "Finance", icon: "finance", link: "" },
  { name: "Tableau de bord", icon: "dashboard", link: "/dashboard" },
  { name: "Stock", icon: "stock", link: "/stock" },
  { name: "Paramètres", icon: "account_settings", link: "/profile" },
];
