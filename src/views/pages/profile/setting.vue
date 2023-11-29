<script>
  import Multiselect from "@vueform/multiselect";
  import "@vueform/multiselect/themes/default.css";
  import flatPickr from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  import axios from 'axios';
  import Layout from "../../../layouts/main.vue";
  import appConfig from "../../../../app.config";

  export default {
    page: {
      title: "Setting",
      meta: [{
        name: "description",
        content: appConfig.description
      }],
    },
    data() {
      return {
        title: "Setting",
        items: [{
            text: "Velzon",
            href: "/",
          },
          {
            text: "Setting",
            active: true,
          },
        ],
        value: ['javascript'],
        date: null,
      };
    },
    components: {
      Layout,
      Multiselect,
      flatPickr
    },
    methods: {
      changepass() {
        var data = {
          password: document.getElementById('oldpasswordInput').value,
          new_password: document.getElementById('newpasswordInput').value,
          confirm_password: document.getElementById('confirmpasswordInput').value
        }
        axios.patch('https://api-node.themesbrand.website/updatepassword', data).then((data) => {
          console.log(data);
        }).catch((e) => {
          console.log(e)
        })
      },
      updatedata() {
        var userid = localStorage.getItem('userid');
        var data = {
          first_name: document.getElementById('firstnameInput').value,
          last_name: document.getElementById('lastnameInput').value,
          phone: document.getElementById('phonenumberInput').value,
          email: document.getElementById('emailInput').value,
          joining_date: document.getElementById('dateinput').value,
          skills: document.getElementById('skillsinput').value,
          designation: document.getElementById('designationInput').value,
          website: document.getElementById('websiteInput1').value,
          city: document.getElementById('cityInput').value,
          country: document.getElementById('countryInput').value,
          zipcode: document.getElementById('zipcodeInput').value,
          Description: document.getElementById('exampleFormControlTextarea').value,
        }
        axios.patch('https://api-node.themesbrand.website/user/' + userid, data).then((data) => {
          console.log(data);
        }).catch((e) => {
          console.log(e)
        })
      }
    },
  };
</script>

<template>
  <Layout>
    <div class="position-relative mx-n4 mt-n4">
      <div class="profile-wid-bg profile-setting-img">
        <img src="@/assets/images/profile-bg.jpg" class="profile-wid-img" alt="" />
        <div class="overlay-content">
          <div class="text-end p-3">
            <div class="p-0 ms-auto rounded-circle profile-photo-edit">
              <input id="profile-foreground-img-file-input" type="file" class="profile-foreground-img-file-input" />
              <label for="profile-foreground-img-file-input" class="profile-photo-edit btn btn-light">
                <i class="ri-image-edit-line align-bottom me-1"></i> Change
                Cover
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xxl-3">
        <div class="card mt-n5">
          <div class="card-body p-4">
            <div class="text-center">
              <div class="
                  profile-user
                  position-relative
                  d-inline-block
                  mx-auto
                  mb-4
                ">
                <img src="@/assets/images/users/avatar-1.jpg" class="
                    rounded-circle
                    avatar-xl
                    img-thumbnail
                    user-profile-image
                  " alt="user-profile-image" />
                <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                  <input id="profile-img-file-input" type="file" class="profile-img-file-input" />
                  <label for="profile-img-file-input" class="profile-photo-edit avatar-xs">
                    <span class="avatar-title rounded-circle bg-light text-body">
                      <i class="ri-camera-fill"></i>
                    </span>
                  </label>
                </div>
              </div>
              <h5 class="fs-16 mb-1">Anna Adame</h5>
              <p class="text-muted mb-0">Lead Designer / Developer</p>
            </div>
          </div>
        </div>
        <!--end card-->
      </div>
      <!--end col-->
      <div class="col-xxl-9">
        <div class="card mt-xxl-n5">
          <div class="card-header">
            <ul class="
                nav nav-tabs-custom
                rounded
                card-header-tabs
                border-bottom-0
              " role="tablist">
              <li class="nav-item">
                <a class="nav-link active" data-bs-toggle="tab" href="#personalDetails" role="tab">
                  <i class="fas fa-home"></i>
                  Personal Details
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#changePassword" role="tab">
                  <i class="far fa-user"></i>
                  Change Password
                </a>
              </li>
              <!-- <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#experience" role="tab">
                  <i class="far fa-envelope"></i>
                  Experience
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#privacy" role="tab">
                  <i class="far fa-envelope"></i>
                  Privacy Policy
                </a>
              </li> -->
            </ul>
          </div>
          <div class="card-body p-4">
            <div class="tab-content">
              <div class="tab-pane active" id="personalDetails" role="tabpanel">
                <form action="javascript:void(0);">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="firstnameInput" class="form-label">First Name</label>
                        <input type="text" class="form-control" id="firstnameInput" placeholder="Enter your firstname"
                          value="Dave" />
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="lastnameInput" class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="lastnameInput" placeholder="Enter your lastname"
                          value="Adame" />
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="phonenumberInput" class="form-label">Phone Number</label>
                        <input type="text" class="form-control" id="phonenumberInput"
                          placeholder="Enter your phone number" value="+(1) 987 6543" />
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="emailInput" class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="emailInput" placeholder="Enter your email"
                          value="daveadame@velzon.com" />
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-12">
                      <div class="mb-3">
                        <label for="JoiningdatInput" class="form-label">Joining Date</label>

                        <flat-pickr v-model="date" id="dateinput" class="form-control"></flat-pickr>

                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-12">
                      <div class="mb-3">
                        <label for="skillsInput" class="form-label">Skills</label>
                        <Multiselect v-model="value" id="skillsinput" mode="tags" :close-on-select="false"
                          :searchable="true" :create-option="true" :options="[
                            { value: 'illustrator', label: 'Illustrator' },
                            { value: 'photoshop', label: 'Photoshop' },
                            { value: 'css', label: 'CSS' },
                            { value: 'html', label: 'HTML' },
                            { value: 'javascript', label: 'Javascript' },
                            { value: 'python', label: 'Python' },
                            { value: 'php', label: 'PHP' },
                          ]" />
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="designationInput" class="form-label">Designation</label>
                        <input type="text" class="form-control" id="designationInput" placeholder="Designation"
                          value="Lead Designer / Developer" />
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="websiteInput1" class="form-label">Website</label>
                        <input type="text" class="form-control" id="websiteInput1" placeholder="www.example.com"
                          value="www.velzon.com" />
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-4">
                      <div class="mb-3">
                        <label for="cityInput" class="form-label">City</label>
                        <input type="text" class="form-control" id="cityInput" placeholder="City" value="California" />
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-4">
                      <div class="mb-3">
                        <label for="countryInput" class="form-label">Country</label>
                        <input type="text" class="form-control" id="countryInput" placeholder="Country"
                          value="United States" />
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-4">
                      <div class="mb-3">
                        <label for="zipcodeInput" class="form-label">Zip Code</label>
                        <input type="text" class="form-control" minlength="5" maxlength="6" id="zipcodeInput"
                          placeholder="Enter zipcode" value="90011" />
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-12">
                      <div class="mb-3 pb-2">
                        <label for="exampleFormControlTextarea" class="form-label">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea"
                          placeholder="Enter your description" rows="3">
Hi I'm Anna Adame,It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family.</textarea>
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-12">
                      <div class="hstack gap-2 justify-content-end">
                        <button type="submit" class="btn btn-primary" @click="updatedata">
                          Updates
                        </button>
                        <button type="button" class="btn btn-soft-success">
                          Cancel
                        </button>
                      </div>
                    </div>
                    <!--end col-->
                  </div>
                  <!--end row-->
                </form>
              </div>
              <!--end tab-pane-->
              <div class="tab-pane" id="changePassword" role="tabpanel">
                <form action="javascript:void(0);">
                  <div class="row g-2">
                    <div class="col-lg-4">
                      <div>
                        <label for="oldpasswordInput" class="form-label">Old Password*</label>
                        <input type="password" class="form-control" id="oldpasswordInput"
                          placeholder="Enter current password" />
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-4">
                      <div>
                        <label for="newpasswordInput" class="form-label">New Password*</label>
                        <input type="password" class="form-control" id="newpasswordInput"
                          placeholder="Enter new password" />
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-4">
                      <div>
                        <label for="confirmpasswordInput" class="form-label">Confirm Password*</label>
                        <input type="password" class="form-control" id="confirmpasswordInput"
                          placeholder="Confirm password" />
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-12">
                      <div class="mb-3">
                        <a href="javascript:void(0);" class="link-primary text-decoration-underline">Forgot Password
                          ?</a>
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-12">
                      <div class="text-end">
                        <button type="submit" class="btn btn-success" @click="changepass">
                          Change Password
                        </button>
                      </div>
                    </div>
                    <!--end col-->
                  </div>
                  <!--end row-->
                </form>
              </div>
              <!--end tab-pane-->
            </div>
          </div>
        </div>
      </div>
      <!--end col-->
    </div>
    <!--end row-->
  </Layout>
</template>