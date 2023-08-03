<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
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
      class="nav-item mx-3"
    >
      <div class="nav-link flex justify-between">
        <span>{{ item.name }}</span>
        <span>dsad</span>
      </div>
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
</script>

<style scoped lang="scss"></style>
