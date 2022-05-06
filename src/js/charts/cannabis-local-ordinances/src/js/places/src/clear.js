const button = document.querySelector(".combobox-places--button");
const input = document.querySelector(".cb_edit");
button.addEventListener("click", (e) => {
  e.preventDefault();
  input.value = "";
});
