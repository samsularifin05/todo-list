import { IconLayoutDashboard } from "@tabler/icons-react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon?: JSX.Element;
  sub?: NavLink[];
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Todo List",
    label: "",
    href: "/admin/todolist",
    icon: <IconLayoutDashboard size={18} />
  }
];
