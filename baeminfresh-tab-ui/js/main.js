document.addEventListener("DOMContentLoaded", function(event) {
  const baseurl = "http://52.78.212.27:8080/";
  const category = [17011200, 17011000, 17011100, 17010200, 17010300, 17011400];
  const tab = document.getElementsByClassName('best_tab_list')[0];
  const pagination = document.querySelector('.slides_pagination');

  const bestTab = new Tab(baseurl, category, tab);
  const mainBanner = new Banner(pagination);
  const banchanSlide = new BanchanSlide();
});
