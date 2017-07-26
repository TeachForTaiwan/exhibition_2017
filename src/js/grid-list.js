
// const composeDetail = (num) => {

// };

const getDetailImgHeight = item => item.querySelector('.grid-item__detail .img-full').height;
const getThumbnailHeight = item => item.querySelector('.thumbnail').height;

const setHeight = (item) => {
  const currentDetail = item;
  const targetHeight = getDetailImgHeight(item) + getThumbnailHeight(item) + 20;
  if (window.innerWidth >= 600) {
    currentDetail.style.height = `${targetHeight}px`;
    currentDetail.style.maxHeight = `${targetHeight}px`;
  } else {
    currentDetail.style.height = `${targetHeight + 300}px`;
    currentDetail.style.maxHeight = `${targetHeight + 300}px`;
  }
};

const removeHeight = (items) => {
  items.forEach((item) => {
    item.style.maxHeight = '';
    item.style.height = '';
  });
};

const closeDetail = (items) => {
  items.forEach((item) => {
    item.classList.remove('is-opened');
    item.style.maxHeight = '';
    item.style.height = '';
  });
  removeHeight(items);
};

const showDetail = (item) => {
  console.log(`data-num: ${item.dataset.num}`);
  item.classList.toggle('is-opened');
  // composeDetail(item.dataset.num);
  setHeight(item);
};

const gridItems = document.querySelectorAll('.grid-item--grid');
const gridItemThumbnails = document.querySelectorAll('.grid-item--grid .grid-item__thumbnail');

document.addEventListener('DOMContentLoaded', () => {
  gridItemThumbnails.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.currentTarget.parentNode.classList.contains('is-opened')) {
        closeDetail(gridItems);
        return;
      }
      closeDetail(gridItems);
      showDetail(e.currentTarget.parentNode);
    });
  });
});
