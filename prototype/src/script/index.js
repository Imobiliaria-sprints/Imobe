const burger = document.querySelector("#menu");
const menuOpen = document.querySelector(".menu-open");
const menuClose = document.querySelector("#close");

burger.addEventListener("click", (event) => {
  const menuIsActive =
    event.target.className !== "active"
      ? (burger.className = "active")
      : (burger.className = "");

  if (menuIsActive === "active") {
    menuOpen.style.display = "block";
    event.target.src = "../assets/icons/close.svg";
  } else {
    menuOpen.style.display = "none";
    event.target.src = "../assets/icons/burger.svg";
  }
});
