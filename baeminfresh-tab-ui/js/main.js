document.addEventListener("DOMContentLoaded", function(event) {
  const baseurl = "http://52.78.212.27:8080/";
  const category = [17011200, 17011000, 17011100, 17010200, 17010300, 17011400];
  const tab = document.getElementsByClassName('best_tab_list')[0];
  const pagination = document.querySelector('.slides_pagination');

  const bestTab = new Tab(baseurl, category, tab);
  const mainBanner = new Banner(pagination);
});

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
    this.init();

    e.target.style.opacity = 1;
    const pageId = e.target.innerText;
    this.currentImg = document.getElementsByClassName('s' + pageId)[0];

    this.currentImg.style.display = "block";
    this.prevImg.style.display = "block";

    this.fadeIn(this.currentImg);
    this.currentImg.style.zIndex = 50;

    this.prevImg = this.currentImg;
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


class Tab {
  constructor(baseurl, category, tab) {
    this.baseurl = baseurl;
    this.categoryArr = category;
    this.cache = [];
    this.tab = tab;
    this.addEvent();
    this.getTabContent(0);
    this.currentTab = document.getElementById("t0");
    this.prevTab = document.getElementById("t0");
  }

  addEvent() {
    this.tab.addEventListener("click", this.tabEventHandler.bind(this), false);
  }

  tabEventHandler(e) {
    this.currentTab = e.target;
    const currentTabId = this.currentTab.id.replace(/[^0-9]/g,'');

    this.prevTab.classList.remove('now');
    this.currentTab.classList.add('now');
    this.prevTab = this.currentTab;

    this.getTabContent(currentTabId);
  }

  getTabContent(id) {
    const that = this;
    const oReq = new XMLHttpRequest();

    oReq.addEventListener("load", function(e) {
      const htData = JSON.parse(oReq.responseText);
      document.getElementById("best-container").innerHTML = "";  //지우기..
      that.setTabContent(htData.items);
    });

    oReq.open("GET", this.baseurl + "woowa/best/" +this.categoryArr[id]);
    oReq.send();
  }

  setTabContent(data) {
    const source = document.getElementById("tab-content-template").innerHTML;
  	const template = Handlebars.compile(source);

  	document.getElementById("best-container").innerHTML += template(data);
  }

}
