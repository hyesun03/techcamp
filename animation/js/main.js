document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  const greenSquare = document.getElementById('green-square');
  const square = document.getElementsByClassName('square');
  const runButton = document.getElementById('run-btn');
  let flag = true;
  let count = 0;

  // runButton.addEventListener("click", function() {
  //   animate();
  // });
  //
  // function animate() {
  //   if(count >= 400) return;
  //   count += 10;
  //   greenSquare.style.transform = "translateX(" + count + "px)" ;
  //   requestAnimationFrame(animate);
  // }

  runButton.addEventListener("click", function() {
    if(flag == true) {
      for(e of square) {
        e.style.width = "150px";
        e.style.height = "150px";
        e.style.transform = "rotate(360deg)";
        e.style.borderRadius = "75px";
      }

      flag = false;
    }
    else {
      for(e of square) {
        e.style.width = "150px";
        e.style.height = "150px";
        e.style.transform = "rotate(0)";
        e.style.borderRadius = "0px";
      }
      flag = true;
    }
  });

});
