// ハンバーガーメニュー

if ($(window).width() <= 768) {
  $(".__cat-ttl").click(function () {
    const answer = $(this).parent(".__sade-cat").children(".__cat-body");
    const icon = $(this)
      .parents(".__sade-cat")
      .children(".__item-collapse__mark");
    if (answer.css("max-height") === "0px") {
      answer.css("max-height", answer.prop("scrollHeight") + "px");
      answer.css("padding-top", "16px");
      icon.addClass("open");
    } else {
      answer.css("max-height", "0");
      answer.css("padding-top", "0");
      icon.removeClass("open");
    }
  });
}

$(function () {
  $(".hamburger-menu-icon-wrap").click(function () {
    $(".hamburger-menu-line").toggleClass("open");
    $(".hamburger-menu").toggleClass("no-display");

    if ($(".hamburger-menu-line").hasClass("open")) {
      bodyFixedOn();
      $(".header-search-wrap").toggleClass("hidden");
    } else {
      bodyFixedOff();
      $(".header-search-wrap").toggleClass("hidden");
    }
  });
});

$(function () {
  $(".modal-close").click(function () {
    $(".hamburger-menu-line").removeClass("open");
    $(".hamburger-menu").addClass("no-display");
    $(".header-search-menu-wrap").addClass("no-display");
    $(".header-menu-wrap").removeClass("no-display");
    $(".modal-mask").addClass("no-display");
    bodyFixedOff();
  });
});

$(function () {
  $(".open-modal-btn").click(function () {
    $(".header-search-menu-wrap").toggleClass("no-display");
    $(".hamburger-menu").toggleClass("hidden");
    $(".hamburger-menu").removeClass("no-display");

    if (!$(".header-search-menu-wrap").hasClass("no-display")) {
      bodyFixedOn();
      $(".header-menu-wrap").addClass("no-display");
      $(".modal-mask").removeClass("no-display");
    } else {
      bodyFixedOff();
      $(".header-menu-wrap").removeClass("no-display");
      $(".modal-mask").addClass("no-display");
    }
  });
});

$(document).ready(function () {
  // Initialize the slider
  $(".__main-slider").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000, // Autoscroll every second
    responsive: [
      {
        breakpoint: 768, // At 768px or greater
        settings: {
          slidesToShow: 2, // Show only one slide
          slidesToScroll: 1, // Ensure scrolling only one slide
        },
      },
    ],
  });

  // Custom next button for Slick slider
  $(".__slider-next").on("click", function (e) {
    e.preventDefault(); // Prevent the default anchor click behavior
    $(".__main-slider").slick("slickNext"); // Move to the next slide
  });
  // Custom next button for Slick slider
  $(".__slider-before").on("click", function (e) {
    e.preventDefault(); // Prevent the default anchor click behavior
    $(".__main-slider").slick("slickPrev"); // Move to the previous slide
  });
});

$(document).ready(function () {
  function initSlick() {
    if (
      $(window).width() <= 768 &&
      !$(".badge-slider").hasClass("slick-initialized")
    ) {
      $(".badge-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 1000, // Autoscroll every second
      });
    } else if (
      $(window).width() > 768 &&
      $(".badge-slider").hasClass("slick-initialized")
    ) {
      $(".badge-slider").slick("unslick");
    }
  }

  // Initialize or destroy Slick based on the window size
  initSlick();

  // Recheck on window resize
  $(window).resize(initSlick);


  var swiper = new Swiper(".swiper-container", {
    spaceBetween: 10, // Reduce space between slides
    slidesPerView: 1.5, // Show one slide at a time
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // Optional: Add effect for smoother transitions
    effect: "slide",
    speed: 300, // Control speed of transition
  });
});

// Write your JavaScript code here
document.addEventListener("DOMContentLoaded", () => {
  const countContainer = document.querySelector(".count");
  const prevBtn = document.querySelector(".prevBtn");
  const nextBtn = document.querySelector(".nextBtn");
  const activeBtn = document.querySelector(".activeBtn");
  const leftContainer = document.querySelector(".leftContainer");
  const rightContainer = document.querySelector(".rightContainer");
  const btns = document.querySelector(".containerBtns");

  // Get the count of items dynamically
  const items = document.querySelectorAll(".__newsmain-item");
  const countPage = items.length; // Use the length of __newsmain-item elements

  const changeActiveBtn = (value) => {
    activeBtn.textContent = value;
    activeBtn.disabled = true;
  };

  const init = () => {
    countContainer.textContent = countPage + " items";
    changeActiveBtn(1);
    updatePaginate(1);
    updateBlockBtn(1);
  };

  const handlePrevBtn = () => {
    const curActive = Number(activeBtn.textContent) - 1;
    updatePaginate(curActive);
  };

  const handleNextBtn = () => {
    const curActive = Number(activeBtn.textContent) + 1;
    updatePaginate(curActive);
  };

  const updatePaginate = (value) => {
    changeActiveBtn(value);
    updateBlockBtn(value);
    updateLeftContainer(value);
    updateRightContainer(value);
  };

  const handleBtnNumbers = (e) => {
    const target = e.target.closest(".numberBtn")?.textContent;

    if (target) updatePaginate(Number(target));
  };

  const updateBlockBtn = (value) => {
    prevBtn.disabled = value === 1;
    nextBtn.disabled = value === countPage; // Disable next button if on last page
  };

  const createButton = (text, classNames = [], disabled = false) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add(...classNames);
    button.disabled = disabled;
    return button;
  };

  const updateContainer = (container, array, disabledIndexes = []) => {
    container.textContent = "";
    for (let i = 0; i < array.length; i++) {
      const text = disabledIndexes.includes(i) ? "..." : array[i];
      const button = createButton(
        text,
        ["w-7", "h-7", "mx-2", "numberBtn", "w-32"],
        disabledIndexes.includes(i)
      );
      container.appendChild(button);
    }
  };

  const updateLeftContainer = (value) => {
    const pages = [];
    for (let i = 1; i <= Math.min(5, countPage); i++) {
      pages.push(i);
    }

    // Add ellipsis if there's more than 5 pages
    if (value > 5) {
      pages.push("...");
    }
    
    updateContainer(leftContainer, pages);
  };

  const updateRightContainer = (value) => {
    const pages = [];
    
    // If we're near the end, show the last pages
    if (value < countPage - 5) {
      for (let i = value + 1; i <= value + 4; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(countPage);
    } else {
      for (let i = Math.max(countPage - 5, 1); i <= countPage; i++) {
        pages.push(i);
      }
    }
    
    updateContainer(rightContainer, pages);
  };

  prevBtn.addEventListener("click", handlePrevBtn);
  nextBtn.addEventListener("click", handleNextBtn);
  btns.addEventListener("click", handleBtnNumbers);

  init();
});


