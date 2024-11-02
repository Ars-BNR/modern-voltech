import $api from "./http-service";

const catalogEndpoint = "/catalog";
const catalogInfoEquipmentpoint = "/equipment";
const catalogBrandEndpoint = "catalog/brands";

const catalogService = {
  get: async (queryParams: object) => {
    const { data } = await $api.get(catalogEndpoint, {
      params: queryParams,
    });
    return data;
  },
  getBrands: async (category: string) => {
    const { data } = await $api.get(catalogBrandEndpoint, {
      params: { category },
    });
    return data;
  },
  getInfoEquipment: async (id: number) => {
    const { data } = await $api.get(`${catalogInfoEquipmentpoint}/${id}`);
    return data;
  },
};

export default catalogService;
