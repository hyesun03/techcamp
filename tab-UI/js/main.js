document.addEventListener("DOMContentLoaded", function(event) {
  const myTab = new Tab("http://jsonplaceholder.typicode.com/posts/");
  const myBlog = new Blog("http://localhost:8000/data.json");
});

class Tab {
  constructor(url) {
    this.url = url;
    this.nav = document.querySelector("#wrapper nav");
    this.onEvent();
  }

  onEvent() {
    this.nav.addEventListener("click", this.tabEventHandler.bind(this), false);
  }

  getTabContent(id) {
    const that = this;
    const oReq = new XMLHttpRequest();

    oReq.addEventListener("load", function(e) {
      const htData = JSON.parse(oReq.responseText);
      document.getElementById("tab-content").innerHTML = "";
      that.setTabContent(htData);
    });

    oReq.open("GET", this.url + id);
    oReq.send();
  }

  setTabContent(data) {
    const source = document.getElementById("tab-content-template").innerHTML;
  	const template = Handlebars.compile(source);

  	document.getElementById("tab-content").innerHTML += template(data);
  }

  tabEventHandler(e) {
    let currentTabId = "";
    const tabList = ["aboutme", "friend", "theme", "news"];
    const selectedTab = document.getElementsByClassName('selectedTab')[0];
    selectedTab.classList.remove('selectedTab');

    if(e.target && e.target.tagName === "DIV") {
      e.target.classList.add('selectedTab');
      currentTabId = e.target.id;
    }
    else {
      e.target.parentNode.classList.add('selectedTab');
      currentTabId = e.target.parentNode.id;
    }
    this.getTabContent(tabList.indexOf(currentTabId) + 1);
  }
}

class Blog {
  constructor(url) {
    this.url = url;
    this.blogButton = document.getElementById("blog-btn");
    this.onEvent();
  }

  onEvent() {
    this.blogButton.addEventListener("click", this.blogEventHandler.bind(this), false);
  }

  getBlogList() {
    const that = this;
  	const oReq = new XMLHttpRequest();

  	oReq.addEventListener("load", function(e) {
  	  const htData = JSON.parse(oReq.responseText);
  		document.querySelector("#blog-list ul").innerHTML = "";
  		that.setBlogList(htData);
  	});

  	oReq.open("GET", this.url);
  	oReq.send();
  }

  setBlogList(data) {
  	const source = document.getElementById("blog-list-template").innerHTML;
  	const template = Handlebars.compile(source);

  	document.querySelector("#blog-list ul").innerHTML += template(data);
  }

  blogEventHandler(e) {
    this.getBlogList();
  }
}
