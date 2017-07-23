class BanchanSlide {
  constructor() {
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.viewPort = document.getElementById('banchan-viewport');
    this.items = [...document.querySelectorAll('.food_box')];
    this.idx = this.items.length - 1; // idx 초기값은 배열의 마지막 꺼. 현재 배열길이는 9개. idx=9
    this.onEvent();
  }

  onEvent() {
    this.prevBtn.addEventListener("click", this.prevBtnEventHandler.bind(this), false);
    this.nextBtn.addEventListener("click", this.nextBtnEventHandler.bind(this), false);
  }

  prevBtnEventHandler(e) {
    this.movePrevFourItems(this.idx, this.items);
    const that = this;

    for(let i = 0; i < that.items.length; i++) {
      that.items[i].style.transition = "none";
      that.items[i].style.left = "-800px";
    }

    setTimeout(function() {
      for(let i = 0; i < that.items.length; i++) {
        that.items[i].style.transition = ".5s";
        that.items[i].style.left = "0px"
      }
    }, 50);

    this.idx = this.getPositiveIdx(this.idx, 4);
  }

  nextBtnEventHandler(e) {
    for(let i = 0; i < this.items.length; i++) {
      this.items[i].style.transition = ".5s";
      this.items[i].style.transform = "translateX(-800px)";
    }
    const that = this;

    this.items[this.items.length-1].addEventListener("transitionend", function() {
      that.moveNextFourItems((that.idx+5) % 9, that.items);

      for(let i = 0; i < that.items.length; i++) {
        that.items[i].style.transition = "none";
        that.items[i].style.transform = "translateX(0px)";
      }
    });

    this.idx = this.getPositiveIdx(this.idx, 5);
  }

  getPositiveIdx(idx, num) {
    return idx<num ? idx+9-num : idx-num;
  }

  movePrevFourItems(idx, arr) {
    arr[idx].parentNode.insertBefore(arr[idx], arr[this.getPositiveIdx(idx, 8)]);
    arr[idx].parentNode.insertBefore(arr[this.getPositiveIdx(idx, 1)], arr[idx % 9]);
    arr[idx].parentNode.insertBefore(arr[this.getPositiveIdx(idx, 2)], arr[this.getPositiveIdx(idx, 1) % 9]);
    arr[idx].parentNode.insertBefore(arr[this.getPositiveIdx(idx, 3)], arr[this.getPositiveIdx(idx, 2) % 9]);
  }

  moveNextFourItems(idx, arr) {
    arr[idx].parentNode.insertBefore(arr[this.getPositiveIdx(idx, 8)], arr[idx].nextSibiling);
    arr[idx].parentNode.insertBefore(arr[this.getPositiveIdx(idx, 7)], arr[this.getPositiveIdx(idx, 8)].nextSibiling);
    arr[idx].parentNode.insertBefore(arr[this.getPositiveIdx(idx, 6)], arr[this.getPositiveIdx(idx, 7)].nextSibiling);
    arr[idx].parentNode.insertBefore(arr[this.getPositiveIdx(idx, 5)], arr[this.getPositiveIdx(idx, 6)].nextSibiling);
  }
}
