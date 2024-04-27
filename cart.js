"use strict";
const common_vendor = require("../../common/vendor.js");
const siteinfo = require("../../siteinfo.js");
const _sfc_main = {
  data() {
    return {
      url: siteinfo.siteinfo.fileBasePath,
      globalData: { totalPrice: 0, totalSelected: "0" },
      cart: {
        code: 0,
        msg: "",
        rows: [
          {
            title: "",
            selected: 0,
            number: 0,
            price: 0,
            img: ""
          }
        ]
      },
      item: {
        number: 1
      }
    };
  },
  computed: {},
  onShow() {
    this.init();
  },
  onLoad(option) {
    this.setCurrentPage(this);
    if (option) {
      this.setData({
        globalOption: this.getOption(option)
      });
    }
  },
  methods: {
    async init() {
      this.getMsgs1();
    },
    //从缓存中猎取购物车数据
    async getMsgs1() {
      const msgs1 = common_vendor.index.getStorageSync("cart");
      var total = 0;
      for (var i = 0; i < msgs1.length; i++) {
        if (msgs1[i].selected) {
          total += msgs1[i].num;
        }
      }
      this.cart.rows = msgs1;
      this.totalPriceFunction();
    },
    // 计算总价 自定义方法
    async totalPriceFunction(param) {
      let total = 0;
      let checked = 1;
      this.cart.rows.forEach((item) => {
        if (item.selected == 1) {
          total = total + item.price * item.number;
        } else {
          checked = 0;
        }
      });
      this.globalData.totalPrice = Number(total.toFixed(2));
      this.globalData.totalSelected = checked;
    },
    // 选择全部或取消选择 自定义方法
    async selectAllFunction(param) {
      this.globalData.totalSelected = this.globalData.totalSelected == "1" ? "0" : "1";
      this.cart.rows.forEach((item) => {
        item.selected = this.globalData.totalSelected;
      });
      this.totalPriceFunction();
    },
    // 选择或取消选择 自定义方法
    async selectOneFunction(param) {
      let thiz = this;
      param && (param.index || param.index == 0) ? param.index : thiz.index || "";
      this.cart.rows[param.index].selected = this.cart.rows[param.index].selected == "1" ? "0" : "1";
      this.totalPriceFunction();
    },
    changeItemNumber(evt, index, item) {
      let number = evt.detail.value;
      this.item.number = number;
      this.navigateTo({ foritem: item, forindex: index, type: "totalPriceFunction" });
    },
    //删除
    dele(pid) {
      let thiz = this;
      let cart = thiz.cart.rows;
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].pid == pid) {
          cart.splice(i, 1);
          break;
        }
      }
      thiz.cart.rows = cart;
      this.totalPriceFunction();
      common_vendor.index.setStorageSync("cart", cart);
    },
    //立即购买
    gobuy() {
      let thiz = this;
      let cart = thiz.cart.rows;
      let buy = [];
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].selected == 1) {
          buy.push(cart[i]);
        }
      }
      if (buy.length == 0) {
        common_vendor.index.showToast({
          title: "请选择菜品",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      common_vendor.index.setStorageSync("buy", buy);
      common_vendor.index.navigateTo({
        url: "/pages/pro/pay"
      });
    }
  }
};
if (!Array) {
  const _easycom_diy_stepper2 = common_vendor.resolveComponent("diy-stepper");
  _easycom_diy_stepper2();
}
const _easycom_diy_stepper = () => "../../components/diy-stepper/diy-stepper.js";
if (!Math) {
  _easycom_diy_stepper();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.cart.rows, (item, index, i0) => {
      return common_vendor.e({
        a: item.selected == 1
      }, item.selected == 1 ? {
        b: common_vendor.o((...args) => _ctx.navigateTo && _ctx.navigateTo(...args), index),
        c: index
      } : {}, {
        d: item.selected == 0
      }, item.selected == 0 ? {
        e: common_vendor.o((...args) => _ctx.navigateTo && _ctx.navigateTo(...args), index),
        f: index
      } : {}, {
        g: $data.url + item.img,
        h: common_vendor.t(item.title),
        i: common_vendor.o(($event) => $options.dele(item.pid), index),
        j: common_vendor.t(item.price),
        k: common_vendor.o(($event) => $options.changeItemNumber($event, index, item), index),
        l: "7adf34c1-0-" + i0,
        m: common_vendor.o(($event) => item.number = $event, index),
        n: common_vendor.p({
          name: "number",
          bgColor: "#EBECEE",
          color: "#323233",
          min: 1,
          max: 100,
          step: 1,
          modelValue: item.number
        }),
        o: index
      });
    }),
    b: $data.globalData.totalSelected == "1"
  }, $data.globalData.totalSelected == "1" ? {} : {}, {
    c: $data.globalData.totalSelected != "1"
  }, $data.globalData.totalSelected != "1" ? {} : {}, {
    d: common_vendor.t($data.globalData.totalPrice),
    e: common_vendor.o((...args) => _ctx.navigateTo && _ctx.navigateTo(...args)),
    f: common_vendor.o((...args) => $options.gobuy && $options.gobuy(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7adf34c1"], ["__file", "I:/product/B3144TakeawayOrdering/TakeawayOrdering_uni/pages/pro/cart.vue"]]);
wx.createPage(MiniProgramPage);
