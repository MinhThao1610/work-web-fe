<script>
import { authMethods } from "@/state/helpers";
import appConfig from "../../../app.config";

import { required, email, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Lottie from "@/components/widgets/lottie.vue";

import animationData from "@/components/widgets/rhvddzym.json";
export default {
  components: { lottie: Lottie },
  setup() {
    return { v$: useVuelidate() };
  },
  validations: {
    email: {
      required: helpers.withMessage("Vui lòng nhập email", required),
      email: helpers.withMessage("Vui lòng nhập email hợp lệ", email),
    },
  },
  page: {
    title: "Forgot Password",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      email: "",
      submitted: false,
      error: null,
      tryingToReset: false,
      isResetError: false,
      defaultOptions: { animationData: animationData },
    };
  },
  methods: {
    ...authMethods,
    // Try to register the user in with the email, fullname
    // and password they provided.
    tryToReset() {
      this.submitted = true;
      // stop here if form is invalid
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      } else {
        
			this.$router.push({
				name: 'resetpassword',
			});
        // if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
        //   this.tryingToReset = true;
        //   // Reset the authError if it existed.
        //   this.error = null;
        //   return (
        //     this.resetPassword({
        //       email: this.email,
        //     })
        //       // eslint-disable-next-line no-unused-vars
        //       .then((token) => {
        //         this.tryingToReset = false;
        //         this.isResetError = false;
        //       })
        //       .catch((error) => {
        //         this.tryingToReset = false;
        //         this.error = error ? error : "";
        //         this.isResetError = true;
        //       })
        //   );
        // }
      }
    },
  },
};
</script>

<template>
  <div class="auth-page-wrapper pt-5">
    <!-- auth page bg -->
    <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
      <div class="bg-overlay"></div>

      <div class="shape">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 120"
        >
          <path
            d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"
          ></path>
        </svg>
      </div>
    </div>

    <!-- auth page content -->
    <div class="auth-page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center mt-sm-5 mb-4 text-white-50">
              <h3 style="color: #fff;">
                Workflow Management
              </h3>
              <p class="mt-3 fs-15 fw-medium">
                Truyền cảm hứng cho ngày làm việc của bạn
              </p>
            </div>
          </div>
        </div>
        <!-- end row -->

        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card mt-4">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Quên mật khẩu?</h5>
                  <p class="text-muted">Đặt lại mật khẩu bằng email</p>

                   <lottie
                    class="avatar-xl"
                      colors="primary:#0ab39c,secondary:#405189"
                      :options="defaultOptions"
                      :height="120"
                      :width="120"
                    />
                  
                </div>

                <div class="p-2">
                  <b-alert
                    v-model="isResetError"
                    class="mb-4"
                    variant="danger"
                    dismissible
                    >{{ error }}</b-alert
                  >
                  <form @submit.prevent="tryToReset">
                    <div class="mb-4">
                      <label class="form-label">Email</label>
                      <input
                        type="email"
                        v-model="email"
                        class="form-control"
                        id="email"
                        :class="{ 'is-invalid': submitted && v$.email.$errors }"
                        placeholder="Nhập Email"
                      />
                      <div
                        v-for="(item, index) in v$.email.$errors"
                        :key="index"
                        class="invalid-feedback"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
                      </div>
                    </div>

                    <div class="text-center mt-4">
                      <button class="btn btn-success w-100" type="submit">
                        Gửi yêu cầu
                      </button>
                    </div>
                  </form>
                  <!-- end form -->
                </div>
              </div>
              <!-- end card body -->
            </div>
            <!-- end card -->
          </div>
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
    <!-- end auth page content -->
  </div>
  <!-- end auth-page-wrapper -->
</template>
