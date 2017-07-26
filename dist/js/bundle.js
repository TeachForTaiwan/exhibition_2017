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

// const composeDetail = (num) => {

// };

var getPosition = function getPosition(elem) {
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
};

var scrollTo = function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function () {
    element.scrollTop += perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
};

var getDetailImgHeight = function getDetailImgHeight(item) {
  return item.querySelector('.grid-item__detail .img-full').height;
};
var getThumbnailHeight = function getThumbnailHeight(item) {
  return item.querySelector('.thumbnail').height;
};

var setHeight = function setHeight(item) {
  var currentDetail = item;
  var targetHeight = getDetailImgHeight(item) + getThumbnailHeight(item) + 20;
  if (window.innerWidth >= 600) {
    currentDetail.style.height = targetHeight + 'px';
    currentDetail.style.maxHeight = targetHeight + 'px';
  } else {
    currentDetail.style.height = targetHeight + 300 + 'px';
    currentDetail.style.maxHeight = targetHeight + 300 + 'px';
  }
};

var removeHeight = function removeHeight(items) {
  items.forEach(function (item) {
    item.style.maxHeight = '';
    item.style.height = '';
  });
};

var closeDetail = function closeDetail(items) {
  items.forEach(function (item) {
    item.classList.remove('is-opened');
    item.style.maxHeight = '';
    item.style.height = '';
  });
  removeHeight(items);
};

var showDetail = function showDetail(item) {
  var posY = getPosition(item).top;
  console.log('data-num: ' + item.dataset.num);
  item.classList.toggle('is-opened');
  // composeDetail(item.dataset.num);
  setHeight(item);
  scrollTo(document.body, posY, 300);
};

var gridItems = document.querySelectorAll('.grid-item--grid');
var gridItemThumbnails = document.querySelectorAll('.grid-item--grid .grid-item__thumbnail');

document.addEventListener('DOMContentLoaded', function () {
  gridItemThumbnails.forEach(function (item) {
    item.addEventListener('click', function (e) {
      if (e.currentTarget.parentNode.classList.contains('is-opened')) {
        closeDetail(gridItems);
        return;
      }
      closeDetail(gridItems);
      showDetail(e.currentTarget.parentNode);
    });
  });
});

/* eslint no-unused-vars:0 */
document.addEventListener('DOMContentLoaded', function () {
  console.log('exhibition_2017');
});

})));
