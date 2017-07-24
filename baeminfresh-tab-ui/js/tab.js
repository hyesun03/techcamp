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
    this.products = [];
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

    oReq.open("GET", this.baseurl + "woowa/best/" + this.categoryArr[id]);
    oReq.send();
  }

  setTabContent(data) {
    const source = document.getElementById("tab-content-template").innerHTML;
  	const template = Handlebars.compile(source);

  	document.getElementById("best-container").innerHTML += template(data);

    this.productEventListener();
  }

  productEventListener() {
    this.products = [...document.getElementsByClassName('product_area')];
    const modal = document.getElementById("best-product-modal");
    const modalClose = document.getElementById("modal-close");

    const that = this;

    modalClose.addEventListener("click", function() {
      document.getElementsByTagName("body")[0].style.overflow = "visible";
      modal.style.display = "none";
    })

    this.products[0].addEventListener("click", function() {
      const currentTitle = this.childNodes[5].childNodes[1].innerHTML;
      const current_n_price = this.childNodes[5].childNodes[5].childNodes[1].innerHTML;
      const current_s_price = this.childNodes[5].childNodes[5].childNodes[3].innerHTML;
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      modal.style.display = "block";
      that.getModalContent(this.id, currentTitle, current_n_price, current_s_price);
    });
    this.products[1].addEventListener("click", function() {
      const currentTitle = this.childNodes[5].childNodes[1].innerHTML;
      const current_n_price = this.childNodes[5].childNodes[5].childNodes[1].innerHTML;
      const current_s_price = this.childNodes[5].childNodes[5].childNodes[3].innerHTML;
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      modal.style.display = "block";
      that.getModalContent(this.id, currentTitle, current_n_price, current_s_price);
    });
    this.products[2].addEventListener("click", function() {
      const currentTitle = this.childNodes[5].childNodes[1].innerHTML;
      const current_n_price = this.childNodes[5].childNodes[5].childNodes[1].innerHTML;
      const current_s_price = this.childNodes[5].childNodes[5].childNodes[3].innerHTML;
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      modal.style.display = "block";
      that.getModalContent(this.id, currentTitle, current_n_price, current_s_price);
    });

  }

  getModalContent(productId, title, np, sp) {
    const that = this;
    const oReq = new XMLHttpRequest();

    oReq.addEventListener("load", function(e) {
      const htData = JSON.parse(oReq.responseText);
      that.setModalContent(htData.data, title, np, sp);
    });

    oReq.open("GET", this.baseurl + "woowa/detail/" + productId);
    oReq.send();
  }

  setModalContent(data, title, n_price, s_price) {
    document.getElementById("top-image").style.backgroundImage = "url(" + data.top_image + ")";
    document.getElementById("mod1").style.backgroundImage = (data.thumb_images[0] != undefined) ? "url(" + data.thumb_images[0] + ")" : "";
    document.getElementById("mod2").style.backgroundImage = (data.thumb_images[1] != undefined) ? "url(" + data.thumb_images[1] + ")" : "";
    document.getElementById("mod3").style.backgroundImage = (data.thumb_images[2] != undefined) ? "url(" + data.thumb_images[2] + ")" : "";
    document.getElementById("mod4").style.backgroundImage = (data.thumb_images[3] != undefined) ? "url(" + data.thumb_images[3] + ")" : "";
    document.getElementById("mod5").style.backgroundImage = (data.thumb_images[4] != undefined) ? "url(" + data.thumb_images[4] + ")" : "";
    document.getElementById("modal-title").innerHTML = title;
    document.getElementById("modal-desc").innerHTML = data.product_description;

    document.querySelector("#modal-point span.value").innerHTML = data.point;
    document.querySelector("#modal-delivery-info span.value").innerHTML = data.delivery_info;
    document.querySelector("#modal-delivery-fee span.value").innerHTML = data.delivery_fee;

    if(!!s_price) {
      document.getElementById('modal-n-price').innerHTML = n_price;
      document.getElementById('modal-s-price').innerHTML = s_price;
    }
    else {
      document.getElementById('modal-n-price').innerHTML = n_price;
      document.getElementById('modal-s-price').innerHTML = "";
    }

    const source = document.getElementById("modal-temp-template").innerHTML;
  	const template = Handlebars.compile(source);

  	document.getElementById("modal-detail-info").innerHTML += template(data);

  }

}
