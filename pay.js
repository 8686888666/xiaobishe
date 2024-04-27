"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      total: 0,
      tmoney: 0,
      uphone: "",
      addressFocus: false,
      address: "",
      oremark: "",
      form: {
        uname: "",
        uphone: "",
        uaddress: "",
        oremark: ""
      },
      formData: {
        unameFocus: false
      },
      validateForm: {}
    };
  },
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
      await this.initResetform();
      await this.getCartData();
      await this.getUserInfo();
    },
    //获取购物车数据
    async getCartData() {
      let buy = common_vendor.index.getStorageSync("buy");
      let total = 0;
      let tmoney = 0;
      for (let i = 0; i < buy.length; i++) {
        total += parseInt(buy[i].number);
        tmoney += buy[i].number * buy[i].price;
      }
      this.total = total;
      tmoney = tmoney.toFixed(2);
      this.tmoney = tmoney;
    },
    //得到用户信息
    async getUserInfo() {
      let params = {
        uid: common_vendor.index.getStorageSync("mid")
      };
      let res = await this.$http.get("members_List", params);
      var data = res.data;
      this.form.uname = data[0].uname;
      this.form.uphone = data[0].uphone;
      this.form.address = data[0].uaddress;
    },
    initResetform() {
      this.initform = JSON.stringify(this.form);
    },
    resetForm() {
      this.form = JSON.parse(this.initform);
    },
    async submitForm(e) {
      let param = e.detail.value;
      if (!param.uname) {
        this.showToast("请输入姓名", "none");
        return false;
      }
      if (!param.uphone) {
        this.showToast("请输入手机号码", "none");
        return false;
      }
      if (!param.uaddress) {
        this.showToast("请输入收货地址", "none");
        return false;
      }
      let url = "orders_Add";
      let buy = common_vendor.index.getStorageSync("buy");
      var by1 = "";
      var by2 = "";
      for (let i = 0; i < buy.length; i++) {
        by1 += buy[i].pid + ",";
        by2 += buy[i].number + ",";
      }
      param.mid = common_vendor.index.getStorageSync("mid");
      param.by1 = by1;
      param.by2 = by2;
      param.oamount = this.tmoney;
      let header = {};
      let res = await this.$http.post(url, param, header, "json");
      if (res == "") {
        let cart = common_vendor.index.getStorageSync("cart");
        let buy2 = common_vendor.index.getStorageSync("buy");
        for (let i = 0; i < buy2.length; i++) {
          for (let j = 0; j < cart.length; j++) {
            if (buy2[i].pid == cart[j].pid) {
              cart.splice(j, 1);
            }
          }
        }
        common_vendor.index.setStorageSync("cart", cart);
        common_vendor.index.setStorageSync("buy", []);
        this.showToast("提交成功", "success");
        setTimeout(function() {
          common_vendor.index.switchTab({
            url: "/pages/my/index"
          });
        }, 2e3);
      } else {
        this.showToast(res, "none");
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.tmoney),
    b: $data.form.uname,
    c: common_vendor.o(($event) => $data.form.uname = $event.detail.value),
    d: $data.form.uphone,
    e: common_vendor.o(($event) => $data.form.uphone = $event.detail.value),
    f: $data.form.address,
    g: common_vendor.o(($event) => $data.form.address = $event.detail.value),
    h: $data.oremark,
    i: common_vendor.o(($event) => $data.oremark = $event.detail.value),
    j: common_vendor.o((...args) => $options.submitForm && $options.submitForm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c018e67e"], ["__file", "I:/product/B3144TakeawayOrdering/TakeawayOrdering_uni/pages/pro/pay.vue"]]);
wx.createPage(MiniProgramPage);
