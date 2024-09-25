import type { StrapiUser } from "@nuxtjs/strapi";

export type User = StrapiUser & {
  role: Role;
};

export type Role = {
  id: number;
  documentId: string;
  name: string;
  description: string;
  type: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export interface Contact {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  image?: Media;
}

export interface Media {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: { thumbnail: MediaFormat; small: MediaFormat; medium: MediaFormat; large: MediaFormat };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string;
  url: string;
}
