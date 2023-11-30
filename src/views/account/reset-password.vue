<script>
import { authMethods } from "@/state/helpers";
import appConfig from "../../../app.config";

import { required, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
// import VOtpInput from "vue3-otp-input";

import animationData from "@/components/widgets/rhvddzym.json";
export default {
    setup() {
        return { v$: useVuelidate() };
    },
    validations: {
        otp: {
            required: helpers.withMessage("Nhập OTP", required),
        },
    },
    page: {
        title: "Reset Password",
        meta: [
            {
                name: "description",
                content: appConfig.description,
            },
        ],
    },
    data() {
        return {
            otp: "",
            submitted: false,
            error: null,
            tryingToReset: false,
            isResetError: false,
            defaultOptions: { animationData: animationData },
            bindModal: ""
        };
    },
    methods: {
        ...authMethods,
        // Try to register the user in with the otp, fullname
        // and password they provided.
        tryToReset() {
            this.submitted = true;
            // stop here if form is invalid
            this.v$.$touch();

            if (this.v$.$invalid) {
                return;
            } else {
                console.log('reset')
            }
        },

        handleOnComplete(value) {
            console.log('OTP completed: ', value);
        },
        handleOnChange(value) {
            console.log('OTP changed: ', value);
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
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 1440 120">
                    <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
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
                                    <h5 class="text-primary">Reset Password?</h5>
                                    <p class="text-muted">6 ô để nhập số bên dưới</p>

                                </div>

                                <div class="p-2">
                                    <b-alert v-model="isResetError" class="mb-4" variant="danger" dismissible>{{ error
                                    }}</b-alert>
                                    <form @submit.prevent="tryToReset">
                                        <v-otp-input
                                            ref="otpInput"
                                            v-model:value="bindModal"
                                            input-classes="otp-input"
                                            separator="-"
                                            :num-inputs="6"
                                            :should-auto-focus="true"
                                            input-type="letter-numeric"
                                            :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
                                            @on-change="handleOnChange"
                                            @on-complete="handleOnComplete"
                                        />
                                        <!-- <div class="mb-4">
                                            <label class="form-label">OTP</label>
                                            <input type="otp" v-model="otp" class="form-control" id="otp"
                                                :class="{ 'is-invalid': submitted && v$.otp.$errors }" />
                                            <div v-for="(item, index) in v$.otp.$errors" :key="index"
                                                class="invalid-feedback">
                                                <span v-if="item.$message">{{ item.$message }}</span>
                                            </div>
                                        </div> -->

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

        <!-- footer -->
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-center">
                            <p class="mb-0 text-muted">
                                &copy; {{ new Date().getFullYear() }} Velzon. Crafted with
                                <i class="mdi mdi-heart text-danger"></i> by Themesbrand
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <!-- end Footer -->
    </div>
    <!-- end auth-page-wrapper -->
</template>
<style>
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
</style>