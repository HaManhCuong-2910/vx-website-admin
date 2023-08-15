<template>
  <!-- Outer Row -->
  <div
    class="row justify-content-center h-full items-center"
    style="width: 80%; margin: auto"
  >
    <div class="col-xl-10 col-lg-12 col-md-9">
      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          <!-- Nested Row within Card Body -->
          <div class="row" style="height: 500px">
            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
            <div
              class="col-lg-6"
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
              "
            >
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-gray-900 mb-4">CMS VX WEBSITE</h1>
                </div>
                <el-form
                  label-position="top"
                  ref="formLoginRef"
                  :model="formLogin"
                  :rules="rules"
                  :require-asterisk-position="'right'"
                  size="large"
                >
                  <el-form-item label="Username" prop="username">
                    <el-input
                      class="custom-input-filter"
                      v-model="formLogin.username"
                      placeholder="Nhập username"
                      autocomplete="off"
                    />
                  </el-form-item>
                  <el-form-item label="Password" prop="password">
                    <el-input
                      class="custom-input-filter"
                      v-model="formLogin.password"
                      placeholder="Nhập password"
                      type="password"
                      autocomplete="new-password"
                      show-password
                    />
                  </el-form-item>

                  <div class="w-full flex justify-center items-center">
                    <el-button
                      :loading="isLoading"
                      class="m-auto"
                      size="large"
                      :icon="SwitchButton"
                      round
                      type="danger"
                      @click="onSubmit"
                      >Đăng nhập
                    </el-button>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SwitchButton } from "@element-plus/icons-vue";
import { FormRules, ElMessage } from "element-plus";
import { useAuthStore } from "../../store/auth";
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
const isLoading = ref<boolean>(false);
const router = useRouter();
const authStore = useAuthStore();
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: "Vui lòng nhập username",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "Vui lòng nhập password",
      trigger: "change",
    },
  ],
});

const formLogin = ref<any>({
  username: "",
  password: "",
});

const formLoginRef = ref<any>(null);

const onSubmit = async () => {
  await formLoginRef.value.validate(async (valid: any, fields: any) => {
    if (valid) {
      try {
        isLoading.value = true;
        const res: any = await useBaseFetch("/auth/login", {
          method: "POST",
          body: formLogin.value,
        });
        isLoading.value = false;
        if (res.status === 200) {
          authStore.setAccessToken(res.access_token);
          authStore.setDataUser(res.user);
          ElMessage({
            message: "Đăng nhập thành công",
            type: "success",
            duration: 800,
          });
          router.push("/");
        }
      } catch (error: any) {
        ElMessage({
          message: error.data.message,
          type: "error",
          duration: 800,
        });
        isLoading.value = false;
      }
    }
  });
};
</script>

<style scoped lang="scss"></style>
