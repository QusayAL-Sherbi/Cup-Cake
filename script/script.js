window.onload = show_cupcakes();

let submitBtn = document.getElementById("submit-btn");

let nameInput = document.getElementById("name-input");
let nameErrMsg = document.querySelector('.name-err-msg');

let countInput = document.getElementById('count-input');
let countErrMsg = document.querySelector('.count-err-msg');

let typeInput = document.getElementById('type-input');
let typeErrMsg = document.querySelector('.type-err-msg');

let deliverInput = document.getElementById('delivery-time');
let deliverErrMsg = document.querySelector('.delivery-err-msg');

let allergiesInput = document.getElementById('allergies');
let allergiesErrMsg = document.querySelector('.allergies-err-msg');

// let tableHeader = document.querySelector('.table-header');
let tableBody = document.getElementById('cupcake-table');

let showInfoBtn = document.querySelector('.show-info-btn');

/*
  /^[a-zA-Z0-9_$\.]{5,16}$/;

  Name Regex
*/

var cup_cakes = [
  { name: "Chocolate", calories: "high", weight: "200gm" },
  { name: "Carrot", calories: "medium", weight: "150gm" },
  { name: "Banana", calories: "high", weight: "200gm" },
  { name: "Strawberry", calories: "low", weight: "160gm" },
  { name: "Peanut", calories: "medium", weight: "200gm" },
];

function show_cupcakes() {
  fetch('script/nutritional-information.json')
    .then(response => response.json())
    .then(data => {

      for (let i = 0; i < data.length; i++) {

        let nutInfoData = `
          <tr>
            <th>${data[i].name}</th>
            <th class="calore" data-calories="${data[i].calories}">${data[i].calories}</th>
            <th>${data[i].weight}</th>
          </tr>
        `;

        tableBody.insertAdjacentHTML("afterbegin", nutInfoData);

      }

      let calorieThEl = document.querySelectorAll('.calore');

      calorieThEl.forEach(calorie => {
        if (calorie.innerHTML === "high") {
          calorie.className = "bg-danger"
        } else if (calorie.getAttribute("data-calories") === "medium") {
          calorie.className = "bg-warning"
        } else if (calorie.innerHTML === "low") {
          calorie.className = "bg-success"
        }
      })

    })
}

function validate() {

  // Input Name Field Validation
  if (nameInput.value === '') {

    nameErrMsg.style.display = 'block';
    nameErrMsg.innerHTML = "Input Name Field Can't Be Empty !"

  } else if (nameInput.value < 5 && nameInput.value > 16) {

    nameErrMsg.style.display = 'block';
    nameErrMsg.innerHTML = "Input Name Must Be Between 1 To 16 Characters"

  } else {

    nameErrMsg.style.display = 'none';
    localStorage.setItem("name", nameInput.value);

  }

  // QTY (Count) Field Validation
  if (countInput.value === '') {

    countErrMsg.style.display = 'block';
    countErrMsg.innerHTML = "Input Count Can't Be Empty"

  } else if (countInput.value < 1) {

    countErrMsg.style.display = 'block';
    countErrMsg.innerHTML = "Input Count Must Be 1 Character at Least"

  } else if (countInput.value > 15)  {

    countErrMsg.style.display = 'block';
    countErrMsg.innerHTML = "Input Count Must Be Less Than 15 Character"

  } else {

    countErrMsg.style.display = 'none';

  }

  // Type Input Validation
  for (let i = 0; i < typeInput.length; i++) {

    if (typeInput.value === "None") {

      typeErrMsg.style.display = 'block';

      typeErrMsg.innerHTML = "You Should Select Any Option";

    } else {

      typeErrMsg.style.display = 'none';

    }

  }

  // deliverInput Input Validation
  for (let i = 0; i < deliverInput.length; i++) {

    if (deliverInput.value === "None") {

      deliverErrMsg.style.display = 'block';

      deliverErrMsg.innerHTML = "You Should Select Any Option";

    } else {

      deliverErrMsg.style.display = 'none';

    }


  }

  // allergiesInput Input Validation
  for (let i = 0; i < allergiesInput.length; i++) {

    if (allergiesInput.value === "None") {

      allergiesErrMsg.style.display = 'block';

      allergiesErrMsg.innerHTML = "You Should Select Any Option";

    } else {

      allergiesErrMsg.style.display = 'none';

    }

  }

  if (typeInput.value === "Chocolate" && allergiesInput.value === "Dairy Free") {
    alert("Type Of Cake \"Chocolate\" Is Not Dairy Free")
  } else if (typeInput.value === "Pecan" && allergiesInput.value === "Not Free") {
    alert("The Pecan Cake Is Not Nut Free")
  }

  if (typeInput.value === "Chocolate" && deliverInput.value === "4:00 PM") {
    alert("Type Of Cake \"Chocolate\" Cannot Be Delivered at 4:00 PM")
  }

}

function show_storage() {
  let welcomeMsg = document.getElementById('welcome');
  if (localStorage.getItem("name") === null) {
    alert("Cannot Complete This Process Before You Sign Up")
    nameInput.focus();
  } else {
    welcomeMsg.innerHTML = `Welcome ${localStorage.getItem("name")}`;
  }
}

submitBtn.onclick = function(e) {
  e.preventDefault();
  validate();
}

