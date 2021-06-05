window.addEventListener("load", () => {
  const all_information = document.querySelectorAll(".information section");
  const all_feedback = document.querySelector("#all_feedback");
  const button = document.querySelector("form button");

  all_information.forEach((element) => {
    element.addEventListener("click", () => {
      let value = element.children[1].children[0];
      let getImage = element.children[0].children[1];
      let isOpen = element.children[0];
      let toggle;

      if (isOpen.className === "close") {
        toggle = isOpen.className = "open";
        getImage.src = "../assets/icons/arrow-up.svg";
      } else {
        toggle = isOpen.className = "close";
        getImage.src = "../assets/icons/arrow-down.svg";
      }

      toggle === "close"
        ? (element.children[1].style.height = `0px`)
        : (element.children[1].style.height = `${value.clientHeight * 1.1}px`);
    });
  });

  button.addEventListener("click", (e) => {
    const name = document.querySelector("#name").value;
    const description = document.querySelector("#description").value;
    const feedback = document.querySelector("#feedback").value;

    const value_feedback = JSON.stringify({ name, description, feedback });

    window.localStorage.setItem("feedback_imobe_flex", value_feedback);
  });

  function delete_post() {
    window.localStorage.removeItem("feedback_imobe_flex");
  }

  function createFeedback() {
    const item = window.localStorage.getItem("feedback_imobe_flex");
    let { name, description, feedback } = JSON.parse(item);

    all_feedback.innerHTML = `
    <h3>${name}</h3>
    <span>${description} <p>${feedback} ✩</p></span>

    ${
      window.localStorage.getItem("feedback_imobe_flex") !== ""
        ? ` <button onclick='${delete_post()}'>X</button>`
        : "<p>Nenhum feedback</p>"
    }   

  `;
  }

  all_feedback.addEventListener("load", createFeedback());
});
