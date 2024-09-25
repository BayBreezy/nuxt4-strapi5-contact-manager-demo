<template>
  <div
    class="grid grid-cols-1 md:grid-cols-[250px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)]"
  >
    <aside class="sticky top-0 z-20 hidden h-dvh bg-background md:block">
      <UiScrollArea class="h-dvh border-r px-3 pb-5">
        <div class="py-5 text-lg font-semibold">Welcome {{ user?.username }}</div>
        <UiDivider />

        <nav class="mt-6 flex flex-col">
          <UiButton
            exact-active-class="bg-secondary"
            variant="ghost"
            to="/admin/contacts"
            class="justify-start gap-4"
            ><Icon class="size-5 text-muted-foreground" name="lucide:users" />Contacts</UiButton
          >
        </nav>
      </UiScrollArea>
    </aside>
    <main>
      <header class="z-20 border-b">
        <UiContainer class="flex h-[68px] items-center justify-end gap-3">
          <UiButton
            @click="$colorMode.preference = $colorMode.value == 'dark' ? 'light' : 'dark'"
            size="icon-sm"
            variant="outline"
          >
            <Icon name="lucide:sun" size="18" />
          </UiButton>
          <UiButton size="icon-sm" variant="outline" @click="logout()">
            <Icon name="lucide:log-out" size="18" />
          </UiButton>
        </UiContainer>
      </header>
      <UiContainer class="py-5">
        <slot />
      </UiContainer>
    </main>
  </div>
</template>

<script lang="ts" setup>
  const { user } = storeToRefs(useAuthStore());

  const logout = () => {
    useAuthStore().logout();
    useRouter().go(0);
  };
</script>
