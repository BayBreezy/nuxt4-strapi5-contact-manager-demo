export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = storeToRefs(useAuthStore());
  const route = /\/admin/.test(to.path);
  if (route && !user.value) {
    return await navigateTo("/auth/login");
  }
});
