// fetch issues

const testAccessibility = async (e) => {
  e.preventDefault();

  const url = document.querySelector("#url").value;
  console.log(url);
  if (!url) {
    alert("Please enter a url");
    return;
  }
  setLoading();
  const response = await fetch(`/api/test?url=${url}`);
  setLoading(false);

  if (response.status !== 200) {
    alert("Something went wrong");
  } else {
    const { issues } = await response.json();
    addIssuesToDOM(issues);
  }
};

// add issues to DOM
const addIssuesToDOM = (issues) => {
  const issuesList = document.querySelector(".issues__list");
  console.log(issuesList);
  issuesList.innerHTML = "";

  if (issuesList.length === 0)
    issuesList.innerHTML = "<h4>No issues found</h4>";
  else {
    issues.forEach((issue) => {
      issuesList.insertAdjacentHTML(
        "beforeend",
        `
      <div class="card">
        <h4 class="card__title">${issue.message}</h4>
        <div class="card__body">
            <p class="card__content">${escapeHTML(issue.context)}</p>
            <p>CODE: ${issue.code}</p>
        </div>
      </div>`
      );
    });
  }
};

// setloading

const setLoading = (isLoading = true) => {
  const loader = document.querySelector("#loader");
  if (isLoading) loader.style.display = "block";
  else loader.style.display = "none";
};

//escapte html
function escapeHTML(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document
  .querySelector(".header__form")
  .addEventListener("submit", testAccessibility);
