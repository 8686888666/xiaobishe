"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "diy-stepper",
  props: {
    // 步进器标识符，在change回调返回
    name: {
      type: [String, Number],
      default: ""
    },
    // 用于双向绑定的值，初始化时设置设为默认min值(最小值)
    value: {
      type: [String, Number],
      default: 0
    },
    modelValue: {
      type: [Number, String],
      default: 1
    },
    // 最小值
    min: {
      type: [String, Number],
      default: 1
    },
    // 最大值
    max: {
      type: [String, Number],
      default: 100
    },
    // 加减的步长，可为小数
    step: {
      type: [String, Number],
      default: 1
    },
    // 是否只允许输入整数
    integer: {
      type: Boolean,
      default: false
    },
    // 是否禁用，包括输入框，加减按钮
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否禁用输入框
    disabledInput: {
      type: Boolean,
      default: false
    },
    // 是否开启异步变更，开启后需要手动控制输入值
    asyncChange: {
      type: Boolean,
      default: false
    },
    // 输入框宽度，单位为px
    inputWidth: {
      type: [String, Number],
      default: 40
    },
    // 是否显示减少按钮
    showMinus: {
      type: Boolean,
      default: true
    },
    // 是否显示增加按钮
    showPlus: {
      type: Boolean,
      default: true
    },
    // 显示的小数位数
    decimalLength: {
      type: [String, Number, null],
      default: 0
    },
    // 是否开启长按加减手势
    longPress: {
      type: Boolean,
      default: true
    },
    // 输入框文字和加减按钮图标的颜色
    color: {
      type: String,
      default: "#323233"
    },
    // 按钮大小，宽高等于此值，单位px，输入框高度和此值保持一致
    buttonSize: {
      type: [String, Number],
      default: 30
    },
    // 输入框和按钮的背景颜色
    bgColor: {
      type: String,
      default: "#EBECEE"
    },
    // 指定光标于键盘的距离，避免键盘遮挡输入框，单位px
    cursorSpacing: {
      type: [String, Number],
      default: 100
    },
    // 是否禁用增加按钮
    disablePlus: {
      type: Boolean,
      default: false
    },
    // 是否禁用减少按钮
    disableMinus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 输入框实际操作的值
      currentValue: "",
      // 定时器
      longPressTimer: null
    };
  },
  watch: {
    // 多个值之间，只要一个值发生变化，都要重新检查check()函数
    watchChange(n) {
      this.check();
    },
    // 监听v-mode的变化，重新初始化内部的值
    value(n) {
      if (n !== this.currentValue) {
        this.currentValue = this.format(this.value);
      }
    },
    modelValue(n) {
      if (n !== this.currentValue) {
        this.currentValue = this.format(this.modelValue);
      }
    }
  },
  computed: {
    getCursorSpacing() {
      return this.cursorSpacing * 2 + "px";
    },
    // 按钮的样式
    buttonStyle() {
      return (type) => {
        const style = {
          backgroundColor: this.bgColor,
          height: this.buttonSize * 2 + "rpx",
          color: this.color
        };
        if (this.isDisabled(type)) {
          style.backgroundColor = "#f7f8fa";
        }
        return style;
      };
    },
    // 输入框的样式
    inputStyle() {
      this.disabled || this.disabledInput;
      const style = {
        color: this.color,
        backgroundColor: this.bgColor,
        height: this.buttonSize * 2 + "rpx",
        width: this.inputWidth * 2 + "rpx"
      };
      return style;
    },
    // 用于监听多个值发生变化
    watchChange() {
      return [this.integer, this.decimalLength, this.min, this.max];
    },
    isDisabled() {
      return (type) => {
        if (type === "plus") {
          return this.disabled || this.disablePlus || this.currentValue >= this.max;
        }
        return this.disabled || this.disableMinus || this.currentValue <= this.min;
      };
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.modelValue) {
        this.currentValue = this.format(this.modelValue);
      } else {
        this.currentValue = this.format(this.value);
      }
    },
    // 格式化整理数据，限制范围
    format(value) {
      value = this.filter(value);
      value = value === "" ? 0 : +value;
      value = Math.max(Math.min(this.max, value), this.min);
      if (this.decimalLength !== null) {
        value = value.toFixed(this.decimalLength);
      }
      return value;
    },
    // 过滤非法的字符
    filter(value) {
      value = String(value).replace(/[^0-9.-]/g, "");
      if (this.integer && value.indexOf(".") !== -1) {
        value = value.split(".")[0];
      }
      return value;
    },
    check() {
      const val = this.format(this.currentValue);
      if (val !== this.currentValue) {
        this.currentValue = val;
      }
    },
    // 判断是否出于禁止操作状态
    // isDisabled(type) {
    // 	if (type === 'plus') {
    // 		// 在点击增加按钮情况下，判断整体的disabled，是否单独禁用增加按钮，以及当前值是否大于最大的允许值
    // 		return (
    // 			this.disabled ||
    // 			this.disablePlus ||
    // 			this.currentValue >= this.max
    // 		)
    // 	}
    // 	// 点击减少按钮同理
    // 	return (
    // 		this.disabled ||
    // 		this.disableMinus ||
    // 		this.currentValue <= this.min
    // 	)
    // },
    // 输入框活动焦点
    onFocus(event) {
      this.$emit("focus", {
        ...event.detail,
        name: this.name
      });
    },
    // 输入框失去焦点
    onBlur(event) {
      this.format(event.detail.value);
      this.$emit(
        "blur",
        {
          ...event.detail,
          name: this.name
        }
      );
    },
    // 输入框值发生变化
    onInput(e) {
      const {
        value = ""
      } = e.detail || {};
      if (value === "")
        return;
      let formatted = this.filter(value);
      if (this.decimalLength !== null && formatted.indexOf(".") !== -1) {
        const pair = formatted.split(".");
        formatted = `${pair[0]}.${pair[1].slice(0, this.decimalLength)}`;
      }
      formatted = this.format(formatted);
      this.emitChange(formatted);
    },
    // 发出change事件
    emitChange(value) {
      if (!this.asyncChange) {
        this.$nextTick(() => {
          this.$emit("input", value);
          this.$emit("update:modelValue", value);
          this.currentValue = value;
          this.$forceUpdate();
        });
      }
      this.$emit("change", {
        detail: {
          value,
          name: this.name
        }
      });
    },
    onChange() {
      const {
        type
      } = this;
      if (this.isDisabled(type)) {
        return this.$emit("overlimit", type);
      }
      const diff = type === "minus" ? -this.step : +this.step;
      const value = this.format(this.add(+this.currentValue, diff));
      this.emitChange(value);
      this.$emit(type);
    },
    // 对值扩大后进行四舍五入，再除以扩大因子，避免出现浮点数操作的精度问题
    add(num1, num2) {
      const cardinal = Math.pow(10, 10);
      return Math.round((num1 + num2) * cardinal) / cardinal;
    },
    // 点击加减按钮
    clickHandler(type) {
      this.type = type;
      this.onChange();
    },
    longPressStep() {
      this.clearTimeout();
      this.longPressTimer = setTimeout(() => {
        this.onChange();
        this.longPressStep();
      }, 250);
    },
    onTouchStart(type) {
      if (!this.longPress)
        return;
      this.clearTimeout();
      this.type = type;
      this.longPressTimer = setTimeout(() => {
        this.onChange();
        this.longPressStep();
      }, 600);
    },
    // 触摸结束，清除定时器，停止长按加减
    onTouchEnd() {
      if (!this.longPress)
        return;
      this.clearTimeout();
    },
    // 清除定时器
    clearTimeout() {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.clickHandler("minus")),
    b: common_vendor.o(($event) => $options.onTouchStart("minus")),
    c: common_vendor.o((...args) => $options.clearTimeout && $options.clearTimeout(...args)),
    d: $options.isDisabled("minus") ? 1 : "",
    e: common_vendor.s($options.buttonStyle("minus")),
    f: $props.disabledInput || $props.disabled,
    g: $options.getCursorSpacing,
    h: $props.disabled || $props.disabledInput ? 1 : "",
    i: common_vendor.o((...args) => $options.onBlur && $options.onBlur(...args)),
    j: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args)),
    k: common_vendor.o([($event) => $data.currentValue = $event.detail.value, (...args) => $options.onInput && $options.onInput(...args)]),
    l: common_vendor.s($options.inputStyle),
    m: $data.currentValue,
    n: $props.showPlus && _ctx.$slots.plus
  }, $props.showPlus && _ctx.$slots.plus ? {
    o: common_vendor.o(($event) => $options.clickHandler("plus")),
    p: common_vendor.o(($event) => $options.onTouchStart("plus")),
    q: common_vendor.o((...args) => $options.clearTimeout && $options.clearTimeout(...args))
  } : {}, {
    r: common_vendor.o(($event) => $options.clickHandler("plus")),
    s: common_vendor.o(($event) => $options.onTouchStart("plus")),
    t: common_vendor.o((...args) => $options.clearTimeout && $options.clearTimeout(...args)),
    v: $options.isDisabled("plus") ? 1 : "",
    w: common_vendor.s($options.buttonStyle("plus"))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1a27db1b"], ["__file", "I:/product/B3144TakeawayOrdering/TakeawayOrdering_uni/components/diy-stepper/diy-stepper.vue"]]);
wx.createComponent(Component);
