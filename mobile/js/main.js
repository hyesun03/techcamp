document.addEventListener("DOMContentLoaded", function(event) {
  const tabs = [... document.getElementsByClassName("tab")];
  const screenX = screen.width;
  let initX, movX;
  let initT, finalT, tmp = 0;

  document.addEventListener("touchstart", function(e) {
    initX = e.changedTouches[0].clientX;
    initT = Date.now();
  }, false);

  document.addEventListener("touchmove", function(e) {
    movX = e.changedTouches[0].clientX;
  });

  document.addEventListener("touchend", function(e) {
    movX = e.changedTouches[0].clientX;

    if(movX - initX > 0) {
      tmp = tmp >= 0 ? tmp: tmp+100;
      for(i of tabs) {
        i.style.left = parseInt(tmp) + "vw";
      }

      console.log("tmp1: ", tmp);
    }
    else {
      tmp = tmp <= -300 ? tmp : tmp-100;
      for(i of tabs) {
        i.style.left = parseInt(tmp) + "vw";
      }

      console.log("tmp2: ", tmp);
    }
  });

});
