<template>
  <div>
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="mb-2 text-3xl font-semibold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground">{{ description }}</p>
      </div>
      <UiButton to="/admin/contacts/create" size="sm">Create contact</UiButton>
    </div>
    <UiDivider class="my-8" />

    <UiDatatable :options="options" :columns="columns" :data="contacts">
      <template #actions="{ cellData }: { cellData: Contact }">
        <UiButton
          @click="$router.push(`/admin/contacts/edit/${cellData.documentId}`)"
          class="h-7 text-xs"
          size="sm"
          >Edit</UiButton
        >
      </template>
      <template #image="{ cellData }: { cellData: Contact }">
        <div v-if="cellData.image && cellData.image.url">
          <UiAvatar :src="cellData.image.url" />
        </div>
        <UiAvatar class="border border-primary" v-else>
          <UiAvatarFallback>
            <UiIcon icon="lucide:user" />
          </UiAvatarFallback>
        </UiAvatar>
      </template>
    </UiDatatable>
  </div>
</template>

<script lang="ts" setup>
  import type { Config, ConfigColumns } from "datatables.net";

  definePageMeta({
    layout: "admin",
  });
  const title = "Contacts";
  const description = "Manage your contacts";
  useSeoMeta({ title, description });
  const { records: contacts } = storeToRefs(useContactStore());
  await useAsyncData(() =>
    useContactStore().get({ sort: ["createdAt:desc"], populate: ["image"] })
  );

  const columns: ConfigColumns[] = [
    {
      data: null,
      title: "Image",
      searchable: false,
      orderable: false,
      name: "image",
      render: "#image",
    },
    { data: "firstName", title: "First name", responsivePriority: 0.1 },
    { data: "lastName", title: "Last name", responsivePriority: 0.2 },
    { data: "email", title: "Email" },
    { data: "phone", title: "Phone number" },
    {
      data: "createdAt",
      title: "Created at",
      render(d) {
        return useDateFormat(d, "MMMM DD, YYYY").value;
      },
    },
    {
      data: null,
      title: "",
      className: "no-export",
      searchable: false,
      orderable: false,
      name: "actions",
      render: "#actions",
    },
  ];

  const options: Config = {
    buttons: [
      {
        extend: "colvis",
        text: "Columns",
        columns: ":not(.no-export)",
      },
      "copy",
      "excel",
      "pdf",
      "print",
      "csv",
    ],
    dom: "Q<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
    responsive: true,
    autoWidth: true,
    order: [[columns.findIndex((c) => c.data === "createdAt"), "desc"]],
  };
</script>
