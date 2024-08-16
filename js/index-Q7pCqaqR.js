(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const modalForm = document.querySelector(".pagecrm-modal-form");
const closeBtn = document.querySelector(".pagecrm-close-btn");
const modalSuccessMessage = document.querySelector(".pagecrm-modal-success-message");
const orderBtns = document.querySelectorAll(".pagecrm-js-order-btn");
document.addEventListener("submit", (event) => {
  const form = event.target;
  event.preventDefault();
  const data = new FormData(form);
  for (let [key, value] of data) {
    console.log(`${key} — ${value}`);
  }
  if (!modalForm.classList.contains("pagecrm-hidden")) modalForm.classList.add("pagecrm-hidden");
  modalSuccessMessage.classList.remove("pagecrm-hidden");
});
closeBtn.addEventListener("click", () => {
  modalSuccessMessage.classList.add("pagecrm-hidden");
});
function orderForm() {
  modalForm.classList.remove("pagecrm-hidden");
}
orderBtns.forEach((btn) => {
  btn.addEventListener("click", orderForm);
});
