const buttonMinus = document.querySelector(".button-min");
const amount = document.querySelector(".amount");
const buttonAdd = document.querySelector(".button-add");
const buttonConfirm = document.querySelector(".button-confirm");
const checkMark = document.querySelectorAll('input[name="radio-color"]');
const productTitle = document.querySelector(".product-title");
const price = document.querySelector(".price");
const username = document.querySelector(".username");
const imageProduct = document.querySelector(".image-product");

let radioColor = "red";
buttonMinus.addEventListener("click", function () {
  let temp = Number(amount.value);

  temp -= 1;
  if (temp <= 1) {
    amount.value = 1;
  } else {
    amount.value = "" + temp;
  }
});

checkMark.forEach(function (element) {
  checkMark[0].removeAttribute("checked");
  element.addEventListener("click", function (e) {
    radioColor = element.value;
  });
});

buttonAdd.addEventListener("click", function () {
  let temp = Number(amount.value);

  temp += 1;

  amount.value = "" + temp;
});

buttonConfirm.addEventListener("click", function (e) {
  e.preventDefault();

  $.ajax({
    url: "http://localhost:3000/product/mycart",
    type: "GET",
    contentType: "application/json",
    data: {
      username: username.textContent.split(" ")[1],
      product_title: productTitle.textContent,
      price: "" + Number(price.textContent.substring(1)),
      quantity: amount.value,
      color: radioColor,
      image: imageProduct.src,
    },
    success: function (result) {},
  });

  buttonConfirm.textContent = "Success!";
});
