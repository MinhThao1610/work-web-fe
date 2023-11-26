<script>
  import {
    required,
    email,
    helpers
  } from "@vuelidate/validators";
  import appConfig from "../../../app.config";
  // import { postDataApi } from "../../api/fetchAPI";
import { authenticationMethods, authenticationComputed } from "@/state/helpers";

  export default {
    page: {
      title: "Login",
      meta: [{
        name: "description",
        content: appConfig.description,
      }, ],
    },
    data() {
      return {
        email: "admin@themesbrand.com",
        password: "123456",
        submitted: false,
        authError: null,
        tryingToLogIn: false,
        isAuthError: false,
      };
    },
    validations: {
      email: {
        required: helpers.withMessage("Email is required", required),
        email: helpers.withMessage("Please enter valid email", email),
      },
      password: {
        required: helpers.withMessage("Password is required", required),
      },
    },
    computed: {
      ...authenticationComputed,
    },
    methods: {
      ...authenticationMethods,
      async login() {
        this.fetchAuthen({
            email: this.email,
            password: this.password
        });

        setTimeout(() => {
          console.log(this.$store.state)
        }, 10000)
        // const result = await postDataApi('auth/login', {
        //   email: this.email,
        //   password: this.password
        // })
        // if (result.data.status == 'errors') {
        //   return this.authError = result.data.data;
        // }
        // localStorage.setItem('token', result.data.access_token);
        // console.log('result.data ', result.data)
        // this.$router.push({
        //   path: '/mywork'
        // });
      }
    },
  };
</script>

<template>
  <div class="auth-page-wrapper pt-5">
    <!-- auth page bg -->
    <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
      <div class="bg-overlay"></div>

      <div class="shape">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 120">
          <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8
            1440,40L1440 140L0 140z"></path>
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
                Tên ứng dụng (nghĩ sau)
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
                  <h5 class="text-primary">Đăng nhập</h5>
                </div>
                <div class="p-2 mt-4">
                  <b-alert v-model="authError" variant="danger" class="mt-3" dismissible>{{ authError }}</b-alert>

                  <div>

                  </div>

                  <form @submit.prevent="tryToLogIn">
                    <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <input type="email" class="form-control" id="email" placeholder="Enter email" v-model="email" />
                      <div class="invalid-feedback">
                        <span></span>
                      </div>
                    </div>

                    <div class="mb-3">
                      <div class="float-end">
                        <router-link to="/forgot-password" class="text-muted">Quên mật khẩu?</router-link>
                      </div>
                      <label class="form-label" for="password-input">Mật khẩu</label>
                      <div class="position-relative auth-pass-inputgroup mb-3">
                        <input type="password" v-model="password" class="form-control pe-5" placeholder="Enter password"
                          id="password-input" />
                        <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                          type="button" id="password-addon">
                          <i class="ri-eye-fill align-middle"></i>
                        </button>
                        <div class="invalid-feedback">
                          <span></span>
                        </div>
                      </div>
                    </div>

                    <div class="mt-4">
                      <button class="btn btn-success w-100" type="submit" @click="login">
                        Đăng nhập
                      </button>
                    </div>

                    <!-- <div class="mt-4 text-center">
                      <div class="signin-other-title">
                        <h5 class="fs-13 mb-4 title">Sign In with</h5>
                      </div>
                      <div>
                        <button type="button" class="btn btn-primary btn-icon
                          waves-effect waves-light">
                          <i class="ri-facebook-fill fs-16"></i>
                        </button>
                        <button type="button" class="btn btn-danger btn-icon
                          waves-effect waves-light
                          ms-1">
                          <i class="ri-google-fill fs-16"></i>
                        </button>
                        <button type="button" class="btn btn-dark btn-icon
                          waves-effect waves-light
                          ms-1">
                          <i class="ri-github-fill fs-16"></i>
                        </button>
                        <button type="button" class="btn btn-info btn-icon
                          waves-effect waves-light
                          ms-1">
                          <i class="ri-twitter-fill fs-16"></i>
                        </button>
                      </div>
                    </div> -->
                  </form>
                </div>
              </div>
              <!-- end card body -->
            </div>
            <!-- end card -->

            <!-- <div class="mt-4 text-center">
              <p class="mb-0">
                Don't have an account ?
                <router-link to="/register" class="fw-semibold text-primary
                  text-decoration-underline">
                  Signup
                </router-link>
              </p>
            </div> -->
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