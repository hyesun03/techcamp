document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  const pagination = document.querySelector('.slides_pagination');
  const prevBtn = document.querySelector('.slides_prev');
  const nextBtn = document.querySelector('.slides_next');
  let prevImg = document.getElementsByClassName('s11')[0];
  let currentImg = document.getElementsByClassName('s11')[0];

  pagination.addEventListener("click", function(e) {
    init();

    e.target.style.opacity = 1;
    const pageId = +(e.target.innerText) + 1;
    currentImg = document.getElementsByClassName('s' + pageId)[0];

    currentImg.style.display = "block";
    prevImg.style.display = "block";

    fadeIn(currentImg);
    currentImg.style.zIndex = 50;

    prevImg = currentImg;
  });

  prevBtn.addEventListener("click", function() {
    let gotoImg;
    const currentImgId = currentImg.className.replace(/[^0-9]/g,'');

    if(currentImgId == 1) {
      gotoImg = document.getElementsByClassName('s12')[0];
    }
    else {
      gotoImg = currentImg.previousElementSibling;
    }

    init();
    let tmp = currentImgId - 2 >= 0 ? (currentImgId - 2) % 12 : 11;
    fillDot(tmp);

    currentImg.style.display = "block";
    gotoImg.style.display = "block";

    fadeIn(gotoImg);
    gotoImg.style.zIndex = 50;
    currentImg = gotoImg;
  });

  nextBtn.addEventListener("click", nextEvent);

  function nextEvent() {
    let gotoImg;
    const currentImgId = currentImg.className.replace(/[^0-9]/g,'');

    if(currentImgId == 12) {
      gotoImg = document.getElementsByClassName('s1')[0];
    }
    else {
      gotoImg = currentImg.nextElementSibling;
    }

    init();
    fillDot(currentImgId % 12);

    currentImg.style.display = "block";
    gotoImg.style.display = "block";

    fadeIn(gotoImg);

    gotoImg.style.zIndex = 50;
    currentImg = gotoImg;
  }

  function autoSlide() {
      const interval = window.setInterval(()=> {
        nextEvent();
      },5000);

  }

  autoSlide();
});


function init() {
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

function fadeIn(img) {
  img.style.opacity = 0;

  (function fade(){
    if(img.style.opacity < 1) {
      img.style.opacity = parseFloat(img.style.opacity) + 0.02;
    }
    else return;
    requestAnimationFrame(fade);
  })();
}

function fillDot(id) {
  let dots = document.querySelectorAll(".slides_pagination a");
  dots[id].style.opacity = 1;
}
