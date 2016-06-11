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
    "ratio": "50"
  },
  "iphone6": {
    "name": "iPhone6",
    "ratio": "30"
  },
  "xiaomi": {
    "name": "XiaoMi",
    "ratio": "10"
  },
  "huawei": {
    "name": "HuaWei",
    "ratio": "5"
  },
  "samsung": {
    "name": "Samsung",
    "ratio": "3"
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
