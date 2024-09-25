import type { Strapi4ResponseMeta } from "@nuxtjs/strapi";

export {};

declare global {
  interface FindMany<T> {
    data: T[];
    meta: Strapi4ResponseMeta;
  }
  interface FindOne<T> {
    data: T;
    meta: Strapi4ResponseMeta;
  }
}
