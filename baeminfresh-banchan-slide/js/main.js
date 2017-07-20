document.addEventListener("DOMContentLoaded", function(event) {
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const viewPort = document.getElementById('viewport');
  const items = [...document.querySelectorAll('.foodBox')];
  let idx = items.length - 1; // idx 초기값은 배열의 마지막 꺼. 현재 배열길이는 9개. idx=9
  let prevFlag = false;

  prevBtn.addEventListener("click", function() {
    console.log("idx: ", idx);
    movePrevFourItems(idx, items);

    setTimeout(function() {
      console.log("두번째 settimeout 들어옴");
      for(item of items) {
        item.style.transition = "none";
        item.style.transform = "translateX(-800px)";
      }
    }, 1000);

    // setTimeout(function() {
    //   console.log("두번째 settimeout 들어옴");
    //   for(item of items) {
    //     item.style.transition = ".5s";
    //     item.style.transform = "translateX(0px)"
    //     // item.style.transform = "translateX(800px)";
    //   }
    // }, 1000);

    idx = getPositiveIdx(idx, 4);
  });

  nextBtn.addEventListener("click", function() {
    for(item of items) {
      item.style.transition = ".5s";
      item.style.transform = "translateX(-800px)";
    }

    items[items.length-1].addEventListener("transitionend", function() {
      moveNextFourItems((idx+5) % 9, items);
      for(item of items) {
        item.style.transition = "none";
        item.style.transform = "translateX(0px)";
      }
    });

    idx = getPositiveIdx(idx, 5);
  });
});

function getPositiveIdx(idx, num){
  return idx<num ? idx+9-num : idx-num;
}

function movePrevFourItems(idx, arr) {
  arr[idx].parentNode.insertBefore(arr[idx], arr[getPositiveIdx(idx, 8)]);
  arr[idx].parentNode.insertBefore(arr[getPositiveIdx(idx, 1)], arr[idx % 9]);
  arr[idx].parentNode.insertBefore(arr[getPositiveIdx(idx, 2)], arr[getPositiveIdx(idx, 1) % 9]);
  arr[idx].parentNode.insertBefore(arr[getPositiveIdx(idx, 3)], arr[getPositiveIdx(idx, 2) % 9]);
}

function moveNextFourItems(idx, arr) {
  arr[idx].parentNode.insertBefore(arr[getPositiveIdx(idx, 8)], arr[idx].nextSibiling);
  arr[idx].parentNode.insertBefore(arr[getPositiveIdx(idx, 7)], arr[getPositiveIdx(idx, 8)].nextSibiling);
  arr[idx].parentNode.insertBefore(arr[getPositiveIdx(idx, 6)], arr[getPositiveIdx(idx, 7)].nextSibiling);
  arr[idx].parentNode.insertBefore(arr[getPositiveIdx(idx, 5)], arr[getPositiveIdx(idx, 6)].nextSibiling);
}
