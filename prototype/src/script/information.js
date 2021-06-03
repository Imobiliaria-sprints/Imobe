const all_information = document.querySelectorAll(".information section");
const block_information = document.querySelector(".content-info");
const block_information_p = document.querySelector(".content-info p");
const open = document.querySelector(".close");
const open_img = document.querySelector(".close img");

let value = block_information.clientHeight;

all_information.forEach((element, index) => {
  element.addEventListener("click", (e) => {
    let block_information = element.querySelector(".content-info");
    let open = element.querySelector(".close");

    let isOpen = "";
    isOpen =
      open.className === "close"
        ? (open.className = "open")
        : (open.className = "close");

    open.className === "close"
      ? (open_img.src = "../assets/icons/arrow-up.svg")
      : (open_img.src = "../assets/icons/arrow-down.svg");

    isOpen === "open"
      ? (element.children[0].style.height = `${value}px`)
      : (block_information.style.height = `${
          block_information_p.clientHeight * 1.1
        }px`);

    console.log(open);
  });
});

console.log(all_information);
