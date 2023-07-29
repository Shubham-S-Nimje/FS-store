//set data to local storage
selectElement = document.querySelector("#selectcat");
async function getData(event) {
  event.preventDefault();
  var name = event.target.name.value;
  var description = event.target.description.value;
  var amount = event.target.amount.value;
  var quantity = event.target.quantity.value;

  var obj = {
    name,
    description,
    amount,
    quantity,
  };

  console.log(obj);
  showUserOnScreen(obj);
  try {
    const response = await fetch("http://localhost:3000/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (!response.ok) {
      console.error(error);
    } else {
      const res = await response.json();
      console.log(res);
      // showUserOnScreen(obj);
    }
  } catch (err) {
    console.error(err.message);
  }

  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("quantity").value = "";
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/get-product");
    if (!response.ok) {
      console.error(error);
    }
    const data = await response.json();
    for (var i = 0; i < data.length; i++) {
      showUserOnScreen(data[i]);
    }
    console.log("products fetchting completed", data);
  } catch (error) {
    console.error(`Fetchting error: ${error.message}`);
  }
});

function showUserOnScreen(obj) {
  var parentElem = document.getElementById("expencedata");
  var childEle = document.createElement("li");
  childEle.textContent =
    obj.name +
    " " +
    obj.description +
    " " +
    obj.amount +
    "Rs. " +
    obj.quantity +
    "Qty ";

  //buyone button
  var buyone = document.createElement("input");
  buyone.setAttribute("class", "editbtn");
  buyone.type = "button";
  buyone.value = "buyone";
  buyone.onclick = async () => {
    obj.quantity = obj.quantity - 1;
    try {
      const response = await fetch(`http://localhost:3000/product/${obj.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      const res = await response.json();
      // console.log(res);
      // console.log(obj);
      parentElem.removeChild(childEle);
      showUserOnScreen(obj);
    } catch (err) {
      console.log(err);
    }
  };
  childEle.appendChild(buyone);
  parentElem.appendChild(childEle);

  //buyTwo button
  var buyTwo = document.createElement("input");
  buyTwo.setAttribute("class", "editbtn");
  buyTwo.type = "button";
  buyTwo.value = "buyTwo";

  buyTwo.onclick = async () => {
    obj.quantity = obj.quantity - 2;
    try {
      const response = await fetch(`http://localhost:3000/product/${obj.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      const res = await response.json();
      // console.log(res);
      // console.log(obj);
      parentElem.removeChild(childEle);
      showUserOnScreen(obj);
    } catch (err) {
      console.log(err);
    }
  };
  childEle.appendChild(buyTwo);
  parentElem.appendChild(childEle);

  //buyThree button
  var buyThree = document.createElement("input");
  buyThree.setAttribute("class", "editbtn");
  buyThree.type = "button";
  buyThree.value = "buyThree";
  buyThree.onclick = async () => {
    obj.quantity = obj.quantity - 3;
    try {
      const response = await fetch(`http://localhost:3000/product/${obj.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      const res = await response.json();
      // console.log(res);
      // console.log(obj);
      parentElem.removeChild(childEle);
      showUserOnScreen(obj);
    } catch (err) {
      console.log(err);
    }
  };
  childEle.appendChild(buyThree);
  parentElem.appendChild(childEle);
}
