"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const common_Page = require("./common/Page.js");
const common_Tools = require("./common/Tools.js");
const common_HttpService = require("./common/HttpService.js");
const common_Session = require("./common/Session.js");
const common_Auth = require("./common/Auth.js");
require("./common/Validate.js");
require("./siteinfo.js");
require("./common/ServiceBase.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/my/index.js";
  "./pages/pro/list.js";
  "./pages/my/ly.js";
  "./pages/gg/list.js";
  "./pages/index/index.js";
  "./pages/my/edit.js";
  "./pages/my/lyAdd.js";
  "./pages/gg/View.js";
  "./pages/my/od.js";
  "./pages/my/odView.js";
  "./pages/pro/proView.js";
  "./pages/pro/cart.js";
  "./pages/pro/pay.js";
  "./pages/my/sc.js";
  "./pages/webview.js";
}
const _sfc_main = {
  globalData: {
    userInfo: null,
    tabBar: ["/pages/index/index", "/pages/gg/list", "/pages/index/index", "/pages/index/index", "/pages/my/index"],
    homePage: "/pages/index/index",
    pages: ["/pages/index/index", "/pages/login/login", "/pages/my/index", "/pages/my/edit", "/pages/my/ly", "/pages/my/lyAdd", "/pages/gg/View", "/pages/gg/list", "/pages/my/od", "/pages/my/odView", "/pages/pro/list", "/pages/pro/proView", "/pages/pro/cart", "/pages/pro/pay", "/pages/my/sc"]
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "I:/product/B3144TakeawayOrdering/TakeawayOrdering_uni/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.config.globalProperties.$tools = new common_Tools.Tools();
  app.config.globalProperties.$http = new common_HttpService.Service();
  app.config.globalProperties.$session = common_Session.Session;
  app.config.globalProperties.$auth = common_Auth.Auth;
  common_vendor.index.getSystemInfo({
    success: function(e) {
      app.config.globalProperties.StatusBar = e.statusBarHeight;
      let custom = common_vendor.wx$1.getMenuButtonBoundingClientRect();
      app.config.globalProperties.Custom = custom;
      app.config.globalProperties.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
    }
  });
  app.mixin({
    methods: {
      setCurrentPage: common_Page.setCurrentPage,
      Validate: common_Page.Validate,
      setData: common_Page.setData,
      navigateTo: common_Page.navigateTo,
      showModal: common_Page.showModal,
      showToast: common_Page.showToast,
      getPickerChildren: common_Page.getPickerChildren,
      uploadImage: common_Page.uploadImage,
      getOption: common_Page.getOption,
      setAuthorize: common_Page.setAuthorize
    }
  });
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
