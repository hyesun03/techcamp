class Banner {
  constructor(pagination) {
    this.pagination = pagination;
    this.prevBtn = document.querySelector('.slides_prev');
    this.nextBtn = document.querySelector('.slides_next');
    this.currentImg = document.getElementsByClassName('s11')[0];
    this.prevImg = document.getElementsByClassName('s11')[0];
    this.onEvent();
  }

  onEvent() {
    this.pagination.addEventListener("click", this.paginationEventHandler.bind(this), false);
    this.prevBtn.addEventListener("click", this.prevBtnEventHandler.bind(this), false);
    this.nextBtn.addEventListener("click", this.nextBtnEventHandler.bind(this), false);
  }

  paginationEventHandler(e) {
    const pageId = e.target.innerText;
    this.currentImg = document.getElementsByClassName('s' + pageId)[0];

    if(this.currentImg == this.prevImg) return;
    else {
      this.init();

      e.target.style.opacity = 1;
      this.currentImg.style.display = "block";
      this.prevImg.style.display = "block";

      this.fadeIn(this.currentImg);
      this.currentImg.style.zIndex = 50;

      this.prevImg = this.currentImg;
    }
  }

  prevBtnEventHandler(e) {
    let gotoImg;
    const currentImgId = this.currentImg.className.replace(/[^0-9]/g,'');

    if(currentImgId == 1) {
      gotoImg = document.getElementsByClassName('s12')[0];
    }
    else {
      gotoImg = this.currentImg.previousElementSibling;
    }

    this.init();
    let tmp = currentImgId - 2 >= 0 ? (currentImgId - 2) % 12 : 11;
    this.fillDot(tmp);

    this.currentImg.style.display = "block";
    gotoImg.style.display = "block";

    this.fadeIn(gotoImg);
    gotoImg.style.zIndex = 50;
    this.currentImg = gotoImg;
  }

  nextBtnEventHandler(e) {
    let gotoImg;
    const currentImgId = this.currentImg.className.replace(/[^0-9]/g,'');

    if(currentImgId == 12) {
      gotoImg = document.getElementsByClassName('s1')[0];
    }
    else {
      gotoImg = this.currentImg.nextElementSibling;
    }

    this.init();
    this.fillDot(currentImgId % 12);

    this.currentImg.style.display = "block";
    gotoImg.style.display = "block";

    this.fadeIn(gotoImg);

    gotoImg.style.zIndex = 50;
    this.currentImg = gotoImg;
  }

  init() {
    const allOfScreen = document.querySelectorAll('div.bx-wrapper li');
    const dots = document.querySelectorAll('ul.slides_pagination li a');

    allOfScreen.forEach(function(e) {
      e.style.zIndex = 0;
      e.style.display = "none";
    });

    dots.forEach(function(e) {
      e.style.opacity = 0.6;
    });
  }

  fadeIn(img) {
    img.style.opacity = 0;

    (function fade(){
      if(img.style.opacity < 1) {
        img.style.opacity = parseFloat(img.style.opacity) + 0.02;
      }
      else return;
      requestAnimationFrame(fade);
    })();
  }

  fillDot(id) {
    let dots = document.querySelectorAll(".slides_pagination a");
    dots[id].style.opacity = 1;
  }
}
