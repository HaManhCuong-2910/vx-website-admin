<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion relative"
    id="accordionSidebar"
  >
    <span
      class="sudo-active-link"
      v-if="topSpace"
      :style="`top: ${topSpace}`"
    ></span>
    <nuxt-link
      :to="'/'"
      class="sidebar-brand d-flex align-items-center justify-content-center"
      ><div class="sidebar-brand-text mx-3">CMS VX</div></nuxt-link
    >

    <hr class="sidebar-divider my-0" />
    <nuxt-link
      :to="item.link"
      v-for="item in listMenu"
      :key="item.name"
      custom
      v-slot="{ isActive, href, navigate }"
    >
      <a
        :href="href"
        @click="navigate"
        ref="ElNuxLink"
        :class="[isActive && 'router-link-active', 'nav-item mx-3 my-2']"
      >
        <div class="nav-link flex justify-center">
          <span>{{ item.name }}</span>
        </div>
      </a>
    </nuxt-link>

    <!-- <li class="nav-item">
        <a
          class="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <span>Components</span>
        </a>
        <div
          id="collapseTwo"
          class="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="buttons.html">Buttons</a>
            <a class="collapse-item" href="cards.html">Cards</a>
          </div>
        </div>
      </li> -->
  </ul>
</template>

<script setup lang="ts">
import { listMenu } from "@/constant/index";
const route = useRoute();
const ElNuxLink = ref<any>(null);
const topSpace = ref<string>("");
const handleSetAnimationLink = () => {
  ElNuxLink.value.forEach((element: HTMLElement) => {
    if (element.classList.contains("router-link-active")) {
      const currentPosition = element.getBoundingClientRect();
      console.log("element", currentPosition.top);
      topSpace.value = `${currentPosition.top}px`;
    }
  });
};

watch(
  () => route.fullPath,
  () => {
    setTimeout(() => {
      handleSetAnimationLink();
    }, 10);
  }
);

onMounted(() => {
  handleSetAnimationLink();
});
</script>

<style scoped lang="scss">
.sudo-active-link {
  position: absolute;
  display: block;
  width: 100%;
  height: 56px;
  background-color: #fff;
  transition: 0.3s;
}
</style>
