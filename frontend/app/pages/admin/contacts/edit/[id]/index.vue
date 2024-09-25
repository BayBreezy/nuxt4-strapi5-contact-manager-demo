<template>
  <div>
    <div>
      <h1 class="mb-2 text-3xl font-semibold tracking-tight">{{ title }}</h1>
      <p class="text-muted-foreground">{{ description }}</p>
    </div>
    <UiDivider class="my-8" />

    <div v-if="contact?.data.image && contact.data.image.url">
      <UiAvatar class="size-20" :src="contact.data.image.url" />
    </div>
    <div v-else>
      <UiAvatar class="size-20">
        <UiAvatarFallback>
          <UiIcon class="size-8" icon="lucide:user" />
        </UiAvatarFallback>
      </UiAvatar>
    </div>
    <form @submit="submit" class="mt-8">
      <fieldset class="grid max-w-sm grid-cols-1 gap-5">
        <UiVeeInput name="firstName" label="First name" required />
        <UiVeeInput name="lastName" label="Last name" required />
        <UiVeeInput name="email" label="Email" type="email" required />
        <UiVeeInput name="phone" label="Phone number" type="tel" required />
        <UiVeeFileInput name="image" label="New Image" accept="image/*" ref="imageInput" />
        <UiButton type="submit">Update</UiButton>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: "admin",
  });
  const title = "Edit Contact";
  const description = "Edit this contact";
  useSeoMeta({ title, description });
  const route = useRoute("admin-contacts-edit-id");
  const imageInput = ref<HTMLInputElement | null>(null);

  const { data: contact, refresh } = await useAsyncData(() =>
    useContactStore().getById(route.params.id)
  );

  const { handleSubmit, setValues } = useForm({
    validationSchema: toTypedSchema(UpdateContactSchema),
    initialValues: contact.value?.data,
  });

  const submit = handleSubmit(async (values) => {
    try {
      const res = await useContactStore().update(route.params.id, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
      });

      if (values.image) {
        if (values.image instanceof File) {
          if (contact.value?.data.image) {
            await useStrapiClient()(`upload/files/${contact.value.data.image.id}`, {
              method: "DELETE",
            });
          }

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
        }
      }

      useSonner.success("Contact created successfully");
      await refresh();
      imageInput.value!.value = "";
      setValues(contact.value?.data || {});
    } catch (error) {
      useSonner.error("Failed to create contact");
    }
  });
</script>
