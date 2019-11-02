class Slider {
  constructor(slider) {
    this.slider = slider;
    this.slides = [...slider.querySelectorAll('.slider__item')];
    this.dots = [...slider.querySelectorAll('.slider__dot')];
    this.arrows = [...slider.querySelectorAll('.slider__arrow')];
    this.countCurrent = slider.querySelector('.slider__num');
    this.countAll = slider.querySelector('.slider__count');
    this.slider.addEventListener('mouseenter', this.enterSlider.bind(this));
    this.slider.addEventListener('mouseleave', this.leaveSlider.bind(this));
    this.slider.addEventListener('touchstart', this.touchstart.bind(this));
    document.addEventListener('touchend', this.touchend.bind(this));
    this.length = this.slides.length - 1;
    this.current = 0;
    this.next = this.current + 1;
    this.prev = this.length;
    this.mobile = window.innerWidth < 768;
    this.init();
  }

  init() {
    if (this.length) {
      this.slides[this.prev].classList.add('prev');
      this.slides[this.next].classList.add('next');
    }
    if (!this.mobile && this.length) {
      this.start();
    }
    this.slides[this.current].classList.add('active');
    this.dots[this.current].classList.add('active');
    if (this.countCurrent && this.countAll) {
      this.countAll.innerText = this.slides.length < 10 ? `0${this.slides.length}` : `${this.slides.length}`;
      this.countCurrent.innerText = this.current < 10 ? `0${this.current + 1}` : `${this.current + 1}`;
    }
  }

  start() {
    this.interval = setInterval(this.arrowsHandler.bind(this, 1), 4500);
  }

  enterSlider() {
    clearTimeout(this.interval);
  }

  leaveSlider() {
    if (this.length) {
      this.start();
    }
  }

  touchstart(e) {
    this.startPos = e.targetTouches[0].pageX;
  }

  touchend(e) {
    if (this.startPos) {
      this.endPos = e.changedTouches[0].pageX;
      this.diff = this.startPos - this.endPos;
      if (this.diff < 0) this.arrowsHandler(0);
      else if (this.diff > 0) this.arrowsHandler(1);
      this.startPos = null;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sliders = [...document.querySelectorAll('.todo-list')];
  if (sliders) {
    sliders.forEach((item) => new Slider(item));
  }
});
