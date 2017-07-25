(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/* global Vue, axios */
Vue.config.devtools = true;
Vue.prototype.$http = axios;
var upload = new Vue({
  el: '#form--upload',
  data: {
    name: '',
    email: '',
    message: '',
    submitable: true,
    maxLength: 9999
  },
  mounted: function mounted() {
    if (localStorage.getItem('form--upload')) {
      var data = JSON.parse(localStorage.getItem('form--upload'));
      this.name = data.name;
      this.email = data.email;
      this.message = data.message;
    }
  },

  methods: {
    isValidName: function isValidName() {
      var valid = this.name.length > 0;
      console.log('checking for a valid name: ' + valid);
      return valid;
    },
    isValidEmail: function isValidEmail() {
      var valid = this.email.indexOf('@') > 0;
      console.log('checking for a valid email: ' + valid);
      return valid;
    },
    isValidMessage: function isValidMessage() {
      var valid = this.message.length > 0 && this.message.length < this.maxLength;
      console.log('checking for a valid message: ' + valid);
      return valid;
    },
    setLocalStorage: function setLocalStorage() {
      var tempData = {
        name: this.name,
        email: this.email,
        message: this.message
      };
      localStorage.setItem('form--upload', JSON.stringify(tempData));
    },
    onReset: function onReset() {
      console.log('reset');
      this.name = '';
      this.email = '';
      this.message = '';
      localStorage.removeItem('form--upload');
    },
    onSubmit: function onSubmit() {
      console.log('submitting...');
      if (!this.isValidEmail || !this.isValidName || !this.isValidMessage) {
        console.error('something error on submit');
        return;
      }
      if (!this.submitable) {
        console.error('not submitable');
        return;
      }
      this.submitable = false;
      this.$http.post('upload-test', {
        name: this.name,
        email: this.email,
        message: this.message
      }).then(function (res) {
        console.log('submit success', res);
      }).catch(function (err) {
        console.error(err);
      });
    }
  }
});

var composeDetail = function composeDetail(num) {};

var getDetailHeight = function getDetailHeight() {};

var setHeight = function setHeight() {
  getDetailHeight();
};

var closeDetail = function closeDetail(items) {
  items.forEach(function (item) {
    item.classList.remove('is-opened');
  });
};

var showDetail = function showDetail(item) {
  console.log('data-num: ' + item.dataset.num);
  item.classList.toggle('is-opened');
  composeDetail(item.dataset.num);
  setHeight();
};

var gridItems = document.querySelectorAll('.grid-item--grid');

gridItems.forEach(function (item) {
  item.addEventListener('click', function (e) {
    closeDetail(gridItems);
    showDetail(e.currentTarget);
  });
});

/* eslint no-unused-vars:0 */
document.addEventListener('DOMContentLoaded', function () {
  console.log('exhibition_2017');
});

})));
