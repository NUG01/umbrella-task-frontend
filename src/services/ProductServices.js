import MediaAxios from "../lib/axios/MediaAxios";

export const addProduct = async (data) => {
  const res = await MediaAxios.post("add-product", {
    data,
  });
  return res;
};
