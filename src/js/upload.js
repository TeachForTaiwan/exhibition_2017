/* global Vue, axios */
Vue.config.devtools = true;
Vue.prototype.$http = axios;
const upload = new Vue({
  el: '#form--upload',
  data: {
    name: '',
    email: '',
    message: '',
    submitable: true,
    maxLength: 9999,
  },
  mounted() {
    if (localStorage.getItem('form--upload')) {
      const data = JSON.parse(localStorage.getItem('form--upload'));
      this.name = data.name;
      this.email = data.email;
      this.message = data.message;
    }
  },
  methods: {
    isValidName() {
      const valid = this.name.length > 0;
      console.log(`checking for a valid name: ${valid}`);
      return valid;
    },
    isValidEmail() {
      const valid = this.email.indexOf('@') > 0;
      console.log(`checking for a valid email: ${valid}`);
      return valid;
    },
    isValidMessage() {
      const valid = (this.message.length > 0) &&
        (this.message.length < this.maxLength);
      console.log(`checking for a valid message: ${valid}`);
      return valid;
    },
    setLocalStorage() {
      const tempData = {
        name: this.name,
        email: this.email,
        message: this.message,
      };
      localStorage.setItem('form--upload', JSON.stringify(tempData));
    },
    onReset() {
      console.log('reset');
      this.name = '';
      this.email = '';
      this.message = '';
      localStorage.removeItem('form--upload');
    },
    onSubmit() {
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
        message: this.message,
      })
        .then((res) => {
          console.log('submit success', res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});

export default { upload };
