export const listMenu = [
  {
    name: "Dashboard",
    link: "/",
  },
  {
    name: "Tin tức",
    link: "/news",
  },
];

export const indexMethod = (
  index: number,
  currentPage: number,
  limit?: number
) => {
  return (currentPage - 1) * (limit || 10) + index + 1;
};
