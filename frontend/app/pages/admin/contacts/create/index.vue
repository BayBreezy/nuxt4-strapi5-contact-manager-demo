<template>
  <div>
    <div>
      <h1 class="mb-2 text-3xl font-semibold tracking-tight">{{ title }}</h1>
      <p class="text-muted-foreground">{{ description }}</p>
    </div>
    <UiDivider class="my-8" />

    <form @submit="submit">
      <fieldset class="grid max-w-sm grid-cols-1 gap-5">
        <UiVeeInput name="firstName" label="First name" required />
        <UiVeeInput name="lastName" label="Last name" required />
        <UiVeeInput name="email" label="Email" type="email" required />
        <UiVeeInput name="phone" label="Phone number" type="tel" required />
        <UiVeeFileInput required name="image" label="Image" accept="image/*" />
        <UiButton type="submit">Create</UiButton>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  definePageMeta({
    layout: "admin",
  });
  const title = "Create Contact";
  const description = "Create a new contact";
  useSeoMeta({ title, description });

  const { handleSubmit, setValues } = useForm({
    validationSchema: toTypedSchema(ContactSchema),
  });

  const submit = handleSubmit(async (values) => {
    try {
      const res = await useContactStore().create({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
      });

      const fd = new FormData();
      fd.append("files", values.image);
      fd.append("refId", `${res.data.id}`);
      fd.append("ref", "api::contact.contact");
      fd.append("field", "image");

      const client = useStrapiClient();
      await client("upload", {
        method: "POST",
        body: fd,
      });
      useSonner.success("Contact created successfully");
      await navigateTo("/admin/contacts");
    } catch (error) {
      useSonner.error("Failed to create contact");
    }
  });

  onMounted(() => {
    if (import.meta.dev) {
      setValues({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
      });
    }
  });
</script>
