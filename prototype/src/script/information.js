const all_information = document.querySelectorAll(".information section");

all_information.forEach((element) => {
  element.addEventListener("click", () => {
    let value = element.children[1].children[0];
    let getImage = element.children[0].children[1];
    let toggle;

    if (element.children[0].className === "close") {
      toggle = element.children[0].className = "open";
      getImage.src = "../assets/icons/arrow-up.svg";
    } else {
      toggle = element.children[0].className = "close";
      getImage.src = "../assets/icons/arrow-down.svg";
    }

    toggle === "close"
      ? (element.children[1].style.height = `0px`)
      : (element.children[1].style.height = `${value.clientHeight * 1.1}px`);
  });
});
console.log(all_information);
