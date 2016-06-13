var browsers = {
  "meituan": {
    "name": "美团",
    "ratio": 50
  },
  "dianping": {
    "name": "点评",
    "ratio": 30
  },
  "weichat": {
    "name": "微信",
    "ratio": 20
  },
  "qq": {
    "name": "QQ",
    "ratio": 10
  },
  "default": {
    "name": "原生",
    "ratio": 5
  }
};

var devices = {
  "iphone5": {
    "name": "iPhone5",
    "ratio": 50
  },
  "iphone6": {
    "name": "iPhone6",
    "ratio": 30
  },
  "xiaomi": {
    "name": "小米",
    "ratio": 10
  },
  "huawei": {
    "name": "华为",
    "ratio": 5
  },
  "samsung": {
    "name": "Samsung",
    "ratio": 3
  }
};

var tableData = {};

var caseData = {
  "probability": -1
}

var init = function (caseData) {
  var i, j;

  for (i in devices) {
    tableData[i] = {}

    for (j in browsers) {
      tableData[i][j] = caseData;
    }
  }
};

init(caseData);

export {
  browsers, devices, tableData
}
