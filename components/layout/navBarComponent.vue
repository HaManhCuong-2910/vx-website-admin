<template>
  <nav
    class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
  >
    <!-- Sidebar Toggle (Topbar) -->
    <button
      id="sidebarToggleTop"
      class="btn btn-link d-md-none rounded-circle mr-3"
    >
      <!-- <i class="fa fa-bars"></i> -->
    </button>

    <!-- Topbar Navbar -->
    <ul class="navbar-nav ml-auto">
      <!-- Nav Item - User Information -->
      <li class="nav-item dropdown no-arrow">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{
            user?.username
          }}</span>
        </a>
        <!-- Dropdown - User Information -->
        <div
          class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="userDropdown"
        >
          <a
            class="dropdown-item cursor-pointer"
            @click="handleLogout"
            data-toggle="modal"
            data-target="#logoutModal"
          >
            <font-awesome-icon
              :icon="['fas', 'right-from-bracket']"
              class="mr-2"
            />
            Đăng xuất
          </a>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../store/auth";
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const router = useRouter();
const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style scoped></style>
