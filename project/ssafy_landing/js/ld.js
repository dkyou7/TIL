if (typeof ssafy === "undefined") {
    ssafy = {};
}

ssafy.ld = {
  init: function() {
    ssafy.ld.scrollAnimation();
  },

  // 헤더 스크롤 애니메이션
  scrollAnimation: function() {
    $(window).scroll(function() {
      let windowScrollY = $(window).scrollTop();
      let header = document.querySelector(".header-wrapper");

      if (windowScrollY > 10) {
        header.classList.add("active");
      } else {
        header.classList.remove("active");
      }

      ssafy.ld.onPage();
    });
  },
  // 해당 페이지 도착 시
  onPage: function() {
    let windowScrollY = $(window).scrollTop();
    let pages = document.querySelectorAll(".section");

    // 스크롤
    for (let i = 0; i < pages.length; i++) {
      let itemsOffset = pages[i].offsetTop;
      let windowHeight = document.body.offsetHeight;

      if (windowScrollY > itemsOffset - windowHeight * 0.65) {
        pages[i].classList.add("active");
      }
    }
  },
  // 해당 페이지로 스크롤
  goPage: function(n) {
    let pages = document.querySelectorAll(".section");
    let body = $("html, body");
    let headerHeight = document.querySelector(".header-wrapper");
    let itemsOffset = pages[n].offsetTop + headerHeight.offsetHeight;

    body.stop().animate({ scrollTop: itemsOffset - 78 }, 500, "swing");
  },
};
