import { BRIDGE_PAGE_ENABLED } from "./constants"

export const NAV_LINKS = (() => {
  const links = [
    {
      link: "/",
      title: "Strategies",
    },
    {
      link: "/bridge",
      title: "Bridge",
    },
    {
      link: "https://www.sommelier.finance/",
      title: "About",
    },
  ]
  if (!BRIDGE_PAGE_ENABLED) {
    return links.filter((item) => item.title !== "Bridge")
  }
  return links
})()
