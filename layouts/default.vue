<template>
  <div id="wrapper">
    <!-- Sidebar -->
    <listMenuSideComponent />
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
        <navBarComponent />
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">
          <slot />
        </div>
      </div>
    </div>
  </div>
  <dialogComponent />
</template>

<script setup lang="ts">
useHead({
  link: [
    {
      href: "/css/sb-admin-2.min.css",
      rel: "stylesheet",
    },
  ],
  script: [
    {
      src: "/js/jquery.min.js",
      tagPosition: "bodyClose",
    },
    {
      src: "/js/bootstrap.bundle.min.js",
      tagPosition: "bodyClose",
    },
    {
      src: "/js/jquery.easing.min.js",
      tagPosition: "bodyClose",
    },
    {
      src: "/js/sb-admin-2.min.js",
      tagPosition: "bodyClose",
    },
  ],
});
</script>

<style scoped lang="scss"></style>
