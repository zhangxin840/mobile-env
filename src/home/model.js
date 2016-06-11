var browsers = {
  "meituan": {
    "name": "Meituan"
  },
  "dianping": {
    "name": "Dianping"
  },
  "weichat": {
    "name": "Weichat"
  },
  "qq": {
    "name": "QQ"
  },
  "default": {
    "name": "Default"
  }
};

var devices = {
  "iphone5": {
    "name": "iPhone5",
  },
  "iphone6": {
    "name": "iPhone6",
  },
  "xiaomi": {
    "name": "XiaoMi",
  },
  "huawei": {
    "name": "HuaWei",
  },
  "samsung": {
    "name": "Samsung",
  }
};

var rows = {};

var init = function () {
  var key, key2;
  var cases;

  for (key in devices) {
    cases = {}

    for (key2 in browsers) {
      cases[key2] = {
        "probability": -1
      }
    }

    rows[key] = {
      "name": devices[key].name,
      "cases": cases
    }
  }
};

init();

export {
  browsers, devices, rows
}
