
const composeDetail = (num) => {

};

const getDetailHeight = () => {

};

const setHeight = () => {
  getDetailHeight();
};

const showDetail = (item) => {
  console.log(`data-num: ${item.dataset.num}`);
  item.classList.toggle('is-opened');
  composeDetail(item.dataset.num);
  setHeight();
};

const gridItems = document.querySelectorAll('.grid-item--grid');

gridItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    showDetail(e.currentTarget);
  });
});
