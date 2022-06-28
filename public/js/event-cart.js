const buttonMin = document.querySelectorAll(".button-min");
const valueProduct = document.querySelectorAll(".value-product");
const buttonPlus = document.querySelectorAll(".button-plus");
const totalPrice = document.querySelectorAll(".total-price");
const bgColor = document.querySelectorAll(".circle");
const textColor = document.querySelectorAll(".text-color");
const inputHide = document.querySelectorAll(".input-hide");
const total = document.querySelector(".total-order");
const deleteButton = document.querySelectorAll(".delete-button");
let temp = 0;
let tempTotal = 0;
// buttonMin.addEventListener("click", function () {
//   const hargaSatuan =
//     Number(totalPrice[i].textContent.substring(1)) / Number(valueProduct.value);
//   if (temp <= 1) {
//     totalPrice.textContent = "" + hargaSatuan;
//     temp = 1;
//     valueProduct.value = temp;
//   } else {
//     temp--;
//     tempTotal = hargaSatuan * temp;
//     valueProduct.value = temp;
//     totalPrice.textContent = tempTotal;
//   }
// });

// buttonMin.forEach(function (el, i) {
//   el.addEventListener("click", function () {
//     const hargaSatuan =
//       Number(totalPrice[i].textContent.substring(1)) /
//       Number(valueProduct[i].value);
//     temp = Number(valueProduct[i].value);
//     if (temp <= 1) {
//       totalPrice[i].textContent = "" + hargaSatuan;
//       temp = 1;
//       valueProduct[i].value = temp;
//     } else {
//       temp--;
//       valueProduct[i].value = temp;
//       totalPrice[i].textContent = Number(hargaSatuan * valueProduct[i].value);
//     }
//   });
// });

buttonMin.forEach(function (el, i) {
  el.addEventListener("click", function () {
    let temp = Number(valueProduct[i].value) - 1;
    if (temp <= 1) {
      valueProduct[i].value = 1;
      totalPrice[i].textContent =
        "$" + Number(inputHide[i].value * valueProduct[i].value);
      getTotal();
    } else {
      valueProduct[i].value -= 1;
      totalPrice[i].textContent =
        "$" + Number(inputHide[i].value * valueProduct[i].value);
      getTotal(0);
    }
  });
});

buttonPlus.forEach(function (el, i) {
  el.addEventListener("click", function () {
    let temp = Number(valueProduct[i].value) + 1;
    valueProduct[i].value = temp;
    totalPrice[i].textContent =
      "$" + Number(inputHide[i].value * valueProduct[i].value);
    getTotal(0);
  });
});

for (let i = 0; i < bgColor.length; i++) {
  bgColor[i].style.fill = textColor[i].textContent;
}

function getTotal(hargaAwal) {
  let number = 0;
  for (let i = 0; i < totalPrice.length; i++) {
    number = number + Number(totalPrice[i].textContent.substring(1));
  }

  total.value = number;
}

getTotal(0);
