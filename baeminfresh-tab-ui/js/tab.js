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
