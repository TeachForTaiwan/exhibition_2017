
const composeDetail = (num) => {

};

const getDetailHeight = () => {

};

const setHeight = () => {
  getDetailHeight();
};

const closeDetail = (items) => {
  items.forEach((item) => {
    item.classList.remove('is-opened');
  });
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
    closeDetail(gridItems);
    showDetail(e.currentTarget);
  });
});
