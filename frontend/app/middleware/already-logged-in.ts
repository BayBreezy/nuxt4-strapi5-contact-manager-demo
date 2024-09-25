export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = storeToRefs(useAuthStore());

  if (user.value) {
    return await navigateTo("/admin/contacts");
  }
});
