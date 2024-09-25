import type { Strapi4RequestParams } from "@nuxtjs/strapi";

export const useContactStore = defineStore("Contact", () => {
  const client = useStrapiClient();
  const endpoint = "contacts";
  const records = ref<Contact[]>([]);

  const get = async (opts: Strapi4RequestParams = {}) => {
    const res = await client<FindMany<Contact>>(endpoint, {
      method: "GET",
      params: opts,
    });
    records.value = res.data;
    return res;
  };

  const create = async (data: Partial<Contact>) => {
    const res = await client<FindOne<Contact>>(endpoint, {
      body: { data },
      method: "POST",
    });
    return res;
  };

  const getById = async (id: string, opt: Strapi4RequestParams = { populate: ["image"] }) => {
    const res = await client<FindOne<Contact>>(`${endpoint}/${id}`, {
      method: "GET",
      params: opt,
    });
    return res;
  };

  const update = async (id: string, data: Partial<Contact>) => {
    const res = await client<FindOne<Contact>>(`${endpoint}/${id}`, {
      body: { data },
      method: "PUT",
    });
    return res;
  };
  return {
    get,
    records,
    create,
    getById,
    update,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContactStore, import.meta.hot));
}
