import { HomeIcon } from "@heroicons/vue/24/outline";

type Where = "home" | "profile";

type Navigation = {
  name: string;
  to: string;
  icon: any;
};

export function getNavigation(where: Where): Navigation[] {
  switch (where) {
    case "home":
      return [
        { name: "Home", to: "/", icon: HomeIcon },
        { name: "Films", to: "/films", icon: HomeIcon },
        { name: "Series", to: "/series", icon: HomeIcon },
      ];
    case "profile":
      return [
        { name: "Profile", to: "/profile/account", icon: HomeIcon },
        { name: "Settings", to: "/profile/settings", icon: HomeIcon}
      ];
    default:
      return [
        { name: "Home", to: "/", icon: HomeIcon },
      ];
  }
}
