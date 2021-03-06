const getPosition = (elem) => {
  const box = elem.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = (box.top + scrollTop) - clientTop;
  const left = (box.left + scrollLeft) - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
};

const scrollTo = (element, to, duration) => {
  if (duration <= 0) return;
  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;

  setTimeout(() => {
    element.scrollTop += perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
};

const getDetailHeight = item => item.querySelector('.grid-item__detail').offsetHeight;
const getThumbnailHeight = item => item.querySelector('.thumbnail').height;

const setHeight = (item) => {
  const targetHeight = getDetailHeight(item) + getThumbnailHeight(item);
  item.style.height = `${targetHeight + 20}px`;
  item.style.maxHeight = `${targetHeight + 20}px`;
};

const hideDetailAnim = (item) => {
  item.querySelector('.grid-item__detail').classList.add('is-fade')
  item.style.maxHeight = 0;
};

const removeHeight = (items) => {
  [].forEach.call(items, (item) => {
    if (item.classList.contains('is-opened')) {
      return;
    }
    item.style.maxHeight = '';
    item.style.height = '';
  });
};

const closeDetail = (items) => {
  [].forEach.call(items, (item) => {
    item.classList.remove('is-opened');
    item.querySelector('.grid-item__detail').classList.remove('is-fade');
    item.style.maxHeight = '';
    item.style.height = '';
  });
  removeHeight(items);
};

const showDetail = (item) => {
  const posY = getPosition(item).top;
  console.log(`data-num: ${item.dataset.num}`);
  item.classList.toggle('is-opened');
  setHeight(item);
  scrollTo(document.body, posY, 300);
};

const gridItems = document.querySelectorAll('.grid-item--grid');

const loadImage = (elem) => {
  const imgSmall = elem.querySelector('.img-full');
  const imgLarge = new Image();
  imgLarge.src = imgSmall.dataset.src;
  imgLarge.addEventListener('load', () => {
    imgLarge.classList.add('onload', 'img-full');
    setTimeout(() => {
      imgSmall.classList.add('onload');
    }, 500);
  }, false);
  imgSmall.parentNode.appendChild(imgLarge);
};

document.addEventListener('DOMContentLoaded', () => {
  const gridItemThumbnails = document.querySelectorAll('.grid-item--grid .grid-item__thumbnail');
  [].forEach.call(gridItemThumbnails, (item) => {
    item.addEventListener('click', (e) => {
      if (e.currentTarget.parentNode.classList.contains('is-opened')) {
        hideDetailAnim(e.currentTarget.parentNode);
        setTimeout(() => {
          closeDetail(gridItems);
        }, 700);
        return;
      }
      closeDetail(gridItems);
      showDetail(e.currentTarget.parentNode);
      if (!e.currentTarget.parentNode.querySelector('.img-full').classList.contains('onload')) {
        loadImage(e.currentTarget.parentNode);
      }
    });
  });
});

window.addEventListener('resize', () => {
  closeDetail(gridItems);
});
