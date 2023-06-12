import BasicAxios from "../lib/axios";

export const addCategory = async (category) => {
  const res = await BasicAxios.post("add-category", {
    category_name: category,
  });
  return res;
};
export const getCategories = async () => {
  const res = await BasicAxios.get("product-categories");
  return res;
};
