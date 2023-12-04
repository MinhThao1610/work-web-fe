<script>
import {
  SimpleBar
} from "simplebar-vue3";

import i18n from "../i18n";
import Swal from "sweetalert2";

/**
 * Nav-bar Component
 */
export default {
  data() {
    return {
      languages: [{
        flag: require("@/assets/images/flags/us.svg"),
        language: "en",
        title: "English",
      },
      {
        flag: require("@/assets/images/flags/french.svg"),
        language: "fr",
        title: "French",
      },
      {
        flag: require("@/assets/images/flags/spain.svg"),
        language: "sp",
        title: "Spanish",
      },
      {
        flag: require("@/assets/images/flags/china.svg"),
        language: "ch",
        title: "Chinese",
      },
      {
        flag: require("@/assets/images/flags/germany.svg"),
        language: "gr",
        title: "Deutsche",
      },
      {
        flag: require("@/assets/images/flags/russia.svg"),
        language: "ru",
        title: "русский",
      },
      ],
      lan: i18n.locale,
      text: null,
      flag: null,
      value: null,
      myVar: 1,
    };
  },
  components: {
    SimpleBar
  },

  methods: {
    toggleHamburgerMenu() {
      var windowSize = document.documentElement.clientWidth;

      if (windowSize > 767)
        document.querySelector(".hamburger-icon").classList.toggle("open");

      //For collapse horizontal menu
      if (
        document.documentElement.getAttribute("data-layout") === "horizontal"
      ) {
        document.body.classList.contains("menu") ?
          document.body.classList.remove("menu") :
          document.body.classList.add("menu");
      }

      //For collapse vertical menu
      if (document.documentElement.getAttribute("data-layout") === "vertical") {
        if (windowSize < 1025 && windowSize > 767) {
          document.body.classList.remove("vertical-sidebar-enable");
          document.documentElement.getAttribute("data-sidebar-size") == "sm" ?
            document.documentElement.setAttribute("data-sidebar-size", "") :
            document.documentElement.setAttribute("data-sidebar-size", "sm");
        } else if (windowSize > 1025) {
          document.body.classList.remove("vertical-sidebar-enable");
          document.documentElement.getAttribute("data-sidebar-size") == "lg" ?
            document.documentElement.setAttribute("data-sidebar-size", "sm") :
            document.documentElement.setAttribute("data-sidebar-size", "lg");
        } else if (windowSize <= 767) {
          document.body.classList.add("vertical-sidebar-enable");
          document.documentElement.setAttribute("data-sidebar-size", "lg");
        }
      }

      //Two column menu
      if (document.documentElement.getAttribute("data-layout") == "twocolumn") {
        document.body.classList.contains("twocolumn-panel") ?
          document.body.classList.remove("twocolumn-panel") :
          document.body.classList.add("twocolumn-panel");
      }
    },
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    toggleDarkMode() {
      if (document.documentElement.getAttribute("data-layout-mode") == "dark") {
        document.documentElement.setAttribute("data-layout-mode", "light");
      } else {
        document.documentElement.setAttribute("data-layout-mode", "dark");
      }
    },
    loguot() {
      Swal.fire({
      title: 'Cảnh báo',
      text: "Bạn sẽ đăng xuất khỏi hệ thống",
      icon: "question",
      confirmButtonColor: "#f46a6a",
      cancelButtonText: "Quay lại",
      confirmButtonText: "Đăng xuất",

      showCancelButton: true,
      allowOutsideClick: false,
    }).then(async (result) => {
    if (result.isConfirmed) {
      window.localStorage.clear();
      try {
        // gọi api logout
      } catch (e) {
        console.error("Có lỗi: %o", e);
      }
      let urlLogin = location.origin + "/login";
      window.location.replace(urlLogin);
    }
  });
    },
  },
  computed: {},
  mounted() {
    document.addEventListener("scroll", function () {
      var pageTopbar = document.getElementById("page-topbar");
      if (pageTopbar) {
        document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ? pageTopbar.classList.add(
          "topbar-shadow") : pageTopbar.classList.remove("topbar-shadow");
      }
    });
    if (document.getElementById("topnav-hamburger-icon"))
      document
        .getElementById("topnav-hamburger-icon")
        .addEventListener("click", this.toggleHamburgerMenu);

  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="layout-width">
      <div class="navbar-header">
        <div class="d-flex">
          <!-- LOGO -->
          <div class="navbar-brand-box horizontal-logo">
            <span>WM</span>
          </div>

          <button type="button" class="
              btn btn-sm
              px-3
              fs-16
              header-item
              vertical-menu-btn
              topnav-hamburger
            " id="topnav-hamburger-icon">
            <span class="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

        </div>

        <div class="d-flex align-items-center">
          <div class="dropdown d-md-none topbar-head-dropdown header-item">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="bx bx-search fs-22"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
              aria-labelledby="page-header-search-dropdown">
              <form class="p-3">
                <div class="form-group m-0">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                    <button class="btn btn-primary" type="submit">
                      <i class="mdi mdi-magnify"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div v-show="false" class="dropdown topbar-head-dropdown ms-1 header-item">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              id="page-header-cart-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="bx bx-shopping-bag fs-22"></i>
              <span class="
                  position-absolute
                  topbar-badge
                  fs-10
                  translate-middle
                  badge
                  rounded-pill
                  bg-info
                ">7<span class="visually-hidden">unread messages</span></span>
            </button>
            <div class="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0" aria-labelledby="page-header-cart-dropdown">
              <div class="
                  p-3
                  border-top-0 border-start-0 border-end-0 border-dashed border
                ">
                <div class="row align-items-center">
                  <div class="col">
                    <h6 class="m-0 fs-16 fw-semibold">My Cart</h6>
                  </div>
                  <div class="col-auto">
                    <span class="badge badge-soft-warning fs-13"> 7 items</span>
                  </div>
                </div>
              </div>
              <SimpleBar data-simplebar style="max-height: 300px">
                <div class="p-2">
                  <div class="d-block dropdown-item text-wrap px-3 py-2">

                    <div class="d-flex align-items-center">
                      <img src="@/assets/images/products/img-1.png" class="me-3 rounded-circle avatar-sm p-2 bg-light"
                        alt="user-pic" />
                      <div class="flex-1">
                        <h6 class="mt-0 mb-1 fs-14">
                          <router-link to="/ecommerce/product-details" class="text-reset">Branded T-Shirts</router-link>
                        </h6>
                        <p class="mb-0 fs-12 text-muted">
                          Quantity: <span>10 x $32</span>
                        </p>
                      </div>
                      <div class="px-2">
                        <h5 class="m-0 fw-normal">$320</h5>
                      </div>
                      <div class="ps-2">
                        <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary">
                          <i class="ri-close-fill fs-16"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="d-block dropdown-item text-wrap px-3 py-2">
                    <div class="d-flex align-items-center">
                      <img src="@/assets/images/products/img-2.png" class="me-3 rounded-circle avatar-sm p-2 bg-light"
                        alt="user-pic" />
                      <div class="flex-1">
                        <h6 class="mt-0 mb-1 fs-14">
                          <router-link to="/ecommerce/product-details" class="text-reset">Bentwood Chair</router-link>
                        </h6>
                        <p class="mb-0 fs-12 text-muted">
                          Quantity: <span>5 x $18</span>
                        </p>
                      </div>
                      <div class="px-2">
                        <h5 class="m-0 fw-normal">$89</h5>
                      </div>
                      <div class="ps-2">
                        <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary">
                          <i class="ri-close-fill fs-16"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="d-block dropdown-item text-wrap px-3 py-2">
                    <div class="d-flex align-items-center">
                      <img src="@/assets/images/products/img-3.png" class="me-3 rounded-circle avatar-sm p-2 bg-light"
                        alt="user-pic" />
                      <div class="flex-1">
                        <h6 class="mt-0 mb-1 fs-14">
                          <router-link to="/ecommerce/product-details" class="text-reset">
                            Borosil Paper Cup</router-link>
                        </h6>
                        <p class="mb-0 fs-12 text-muted">
                          Quantity: <span>3 x $250</span>
                        </p>
                      </div>
                      <div class="px-2">
                        <h5 class="m-0 fw-normal">$750</h5>
                      </div>
                      <div class="ps-2">
                        <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary">
                          <i class="ri-close-fill fs-16"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="d-block dropdown-item text-wrap px-3 py-2">
                    <div class="d-flex align-items-center">
                      <img src="@/assets/images/products/img-6.png" class="me-3 rounded-circle avatar-sm p-2 bg-light"
                        alt="user-pic" />
                      <div class="flex-1">
                        <h6 class="mt-0 mb-1 fs-14">
                          <router-link to="/ecommerce/product-details" class="text-reset">Gray Styled T-Shirt
                          </router-link>
                        </h6>
                        <p class="mb-0 fs-12 text-muted">
                          Quantity: <span>1 x $1250</span>
                        </p>
                      </div>
                      <div class="px-2">
                        <h5 class="m-0 fw-normal">$1250</h5>
                      </div>
                      <div class="ps-2">
                        <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary">
                          <i class="ri-close-fill fs-16"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="d-block dropdown-item text-wrap px-3 py-2">
                    <div class="d-flex align-items-center">
                      <img src="@/assets/images/products/img-5.png" class="me-3 rounded-circle avatar-sm p-2 bg-light"
                        alt="user-pic" />
                      <div class="flex-1">
                        <h6 class="mt-0 mb-1 fs-14">
                          <router-link to="/ecommerce/product-details" class="text-reset">Stillbird Helmet</router-link>
                        </h6>
                        <p class="mb-0 fs-12 text-muted">
                          Quantity: <span>2 x $495</span>
                        </p>
                      </div>
                      <div class="px-2">
                        <h5 class="m-0 fw-normal">$990</h5>
                      </div>
                      <div class="ps-2">
                        <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary">
                          <i class="ri-close-fill fs-16"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SimpleBar>
              <div class="p-3 border-bottom-0 border-start-0 border-end-0 border-dashed border d-grid">
                <div class="d-flex justify-content-between align-items-center pb-3">
                  <h5 class="m-0 text-muted">Total:</h5>
                  <div class="px-2">
                    <h5 class="m-0">$1258.58</h5>
                  </div>
                </div>
                <router-link to="/ecommerce/checkout" class="btn btn-success text-center"> Checkout </router-link>
              </div>
            </div>
          </div>

          <!-- <div v-show="false" class="ms-1 header-item d-none d-sm-flex">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              data-toggle="fullscreen" @click="initFullScreen">
              <i class="bx bx-fullscreen fs-22"></i>
            </button>
          </div> -->

          <!-- <div v-show="false" class="ms-1 header-item d-none d-sm-flex">
            <button type="button" class=" btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode"
              @click="toggleDarkMode">
              <i class="bx bx-moon fs-22"></i>
            </button>
          </div> -->

          <div class="dropdown topbar-head-dropdown ms-1 header-item">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              <i class="bx bx-bell fs-22"></i>
              <span class="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                3<span class="visually-hidden">unread messages</span></span>
            </button>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
              aria-labelledby="page-header-notifications-dropdown">
              <div class="dropdown-head bg-primary bg-pattern rounded-top">
                <div class="p-3">
                  <div class="row align-items-center">
                    <div class="col">
                      <h6 class="m-0 fs-16 fw-semibold text-white">
                        Notifications
                      </h6>
                    </div>
                    <div class="col-auto dropdown-tabs">
                      <span class="badge badge-soft-light fs-13"> 4 New</span>
                    </div>
                  </div>
                </div>

                <div class="px-2 pt-2">
                  <ul class="nav nav-tabs dropdown-tabs nav-tabs-custom" data-dropdown-tabs="true"
                    id="notificationItemsTab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" data-bs-toggle="tab" href="#all-noti-tab" role="tab"
                        aria-selected="false" @click.capture.stop>
                        All (4)
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" data-bs-toggle="tab" href="#messages-tab" role="tab" aria-selected="true"
                        @click.capture.stop>
                        Messages
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" data-bs-toggle="tab" href="#alerts-tab" role="tab" aria-selected="false"
                        @click.capture.stop>
                        Alerts
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="tab-content" id="notificationItemsTabContent">

                <div class="tab-pane fade py-2 ps-2 show active" id="all-noti-tab" role="tabpanel">
                  <SimpleBar data-simplebar style="max-height: 300px" class="pe-2">
                    <div class="text-reset notification-item d-block dropdown-item position-relative">
                      <div class="d-flex">
                        <div class="avatar-xs me-3">
                          <span class="avatar-title bg-soft-info text-info rounded-circle fs-16">
                            <i class="bx bx-badge-check"></i>
                          </span>
                        </div>
                        <div class="flex-1">
                          <a href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-2 lh-base">
                              Your <b>Elite</b> author Graphic Optimization
                              <span class="text-secondary">reward</span> is
                              ready!
                            </h6>
                          </a>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> Just 30 sec ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item position-relative">
                      <div class="d-flex">
                        <img src="@/assets/images/users/avatar-2.jpg" class="me-3 rounded-circle avatar-xs"
                          alt="user-pic" />
                        <div class="flex-1">
                          <a href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                              Angela Bernier
                            </h6>
                          </a>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">
                              Answered to your comment on the cash flow forecast's graph 🔔.
                            </p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 48 min ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item position-relative">
                      <div class="d-flex">
                        <div class="avatar-xs me-3">
                          <span class="avatar-title bg-soft-danger text-danger rounded-circle fs-16">
                            <i class="bx bx-message-square-dots"></i>
                          </span>
                        </div>
                        <div class="flex-1">
                          <a href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-2 fs-13 lh-base">
                              You have received <b class="text-success">20</b> new messages in the conversation
                            </h6>
                          </a>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 2 hrs
                              ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item position-relative">
                      <div class="d-flex">
                        <img src="@/assets/images/users/avatar-8.jpg" class="me-3 rounded-circle avatar-xs"
                          alt="user-pic" />
                        <div class="flex-1">
                          <a href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                              Maureen Gibson
                            </h6>
                          </a>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">
                              We talked about a project on linkedin.
                            </p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 4 hrs
                              ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="my-3 text-center">
                      <button type="button" class="btn btn-soft-success">
                        View All Notifications
                        <i class="ri-arrow-right-line align-middle"></i>
                      </button>
                    </div>
                  </SimpleBar>
                </div>

                <div class="tab-pane fade py-2 ps-2" id="messages-tab" role="tabpanel" aria-labelledby="messages-tab">
                  <SimpleBar data-simplebar style="max-height: 300px" class="pe-2">
                    <div class="text-reset notification-item d-block dropdown-item">
                      <div class="d-flex">
                        <img src="@/assets/images/users/avatar-3.jpg" class="me-3 rounded-circle avatar-xs"
                          alt="user-pic" />
                        <div class="flex-1">
                          <a href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                              James Lemire
                            </h6>
                          </a>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">
                              We talked about a project on linkedin.
                            </p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 30 min ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item">
                      <div class="d-flex">
                        <img src="@/assets/images/users/avatar-2.jpg" class="me-3 rounded-circle avatar-xs"
                          alt="user-pic" />
                        <div class="flex-1">
                          <a href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                              Angela Bernier
                            </h6>
                          </a>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">
                              Answered to your comment on the cash flow
                              forecast's graph 🔔.
                            </p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 2 hrs
                              ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item">
                      <div class="d-flex">
                        <img src="@/assets/images/users/avatar-6.jpg" class="me-3 rounded-circle avatar-xs"
                          alt="user-pic" />
                        <div class="flex-1">
                          <a href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                              Kenneth Brown
                            </h6>
                          </a>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">
                              Mentionned you in his comment on 📃 invoice
                              #12501.
                            </p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 10 hrs
                              ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="text-reset notification-item d-block dropdown-item">
                      <div class="d-flex">
                        <img src="@/assets/images/users/avatar-8.jpg" class="me-3 rounded-circle avatar-xs"
                          alt="user-pic" />
                        <div class="flex-1">
                          <a href="#!" class="stretched-link">
                            <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                              Maureen Gibson
                            </h6>
                          </a>
                          <div class="fs-13 text-muted">
                            <p class="mb-1">
                              We talked about a project on linkedin.
                            </p>
                          </div>
                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                            <span><i class="mdi mdi-clock-outline"></i> 3 days
                              ago</span>
                          </p>
                        </div>
                        <div class="px-2 fs-15">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>

                    <div class="my-3 text-center">
                      <button type="button" class="btn btn-soft-success">
                        View All Messages
                        <i class="ri-arrow-right-line align-middle"></i>
                      </button>
                    </div>
                  </SimpleBar>
                </div>

                <div class="tab-pane fade p-4" id="alerts-tab" role="tabpanel" aria-labelledby="alerts-tab">
                  <div class="w-25 w-sm-50 pt-3 mx-auto">
                    <img src="@/assets/images/svg/bell.svg" class="img-fluid" alt="user-pic" />
                  </div>
                  <div class="text-center pb-5 mt-2">
                    <h6 class="fs-18 fw-semibold lh-base">
                      Hey! You have no any notifications
                    </h6>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="dropdown ms-sm-3 header-item topbar-user">
            <button type="button" class="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <span class="d-flex align-items-center">
                <img class="rounded-circle header-profile-user" src="@/assets/images/users/avatar-1.jpg"
                  alt="Header Avatar" />
                <span class="text-start ms-xl-2">
                  <span class=" d-none d-xl-inline-block ms-1 fw-medium user-name-text">Anna Adame</span>
                  <span class="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">Founder</span>
                </span>
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <!-- item-->
              <h6 class="dropdown-header">Welcome Anna!</h6>
              <router-link class="dropdown-item" to="/pages/profile"><i
                  class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Thông tin tài khoản</span></router-link>
              <router-link class="dropdown-item" to="/pages/profile-setting"><i
                  class="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">Cài đặt</span></router-link>
              <button class="dropdown-item" @click="loguot()"><i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle" data-key="t-logout">Đăng xuất</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>