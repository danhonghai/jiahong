'use strict';
angular.module('starter').config(['$validationProvider', function($validationProvider) {
  var expression = {
    phone: /^[1][3456789][0-9]{9}$/,
    QQ:/^[1-9][0-9]{4,9}$/,
    password:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/,
    idCard:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    bankCard:/^(\d{16}|\d{19})$/,
    repassword: function(value, scope, element, attrs) {
      return value === attrs.value;
    },
    required: function(value) {
      return !!value;
    }
  };
  var defaultMsg = {
    phone: {
      success: '',
      error: '手机号码不规范'
    },
    password: {
      success: '',
      error: '密码必须6到15为数字字母组合'
    },
    repassword: {
      success: '',
      error: '两次密码不一致'
    },
    QQ: {
      success: '',
      error: 'QQ号码不规范'
    },
    idCard: {
      success: '',
      error: '身份证号码不规范'
    },
    bankCard: {
      success: '',
      error: '银行卡号不规范'
    },
    required: {
      success: '',
      error: '不能为空'
    }
  };
  $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);
