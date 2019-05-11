window.onload=function(){
    var ul1 = document.getElementById("ul1");
    var ul2 = document.getElementsByClassName("ul2");
    var li1 = document.getElementsByClassName("li1");
    var ul3 = document.getElementsByClassName("ul3");
    var li2 = document.getElementsByClassName("li2");
   
    getItem(li1, ul2);
   
    getItem(li2, ul3);
  }

  function getItem(obj, ul) {
    for (var index = 0; index < obj.length; index++) {
      obj[index].index = index;
      obj[index].onmouseover = function() {
        ul[this.index].style.display = "block";
      }
      obj[index].onmouseout = function() {
        ul[this.index].style.display = "none";
      }
    }
  }