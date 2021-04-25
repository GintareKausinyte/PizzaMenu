const form = document.querySelector('form')
const table = document.getElementById('pizzaList')

let sortBy = null;
let sortOrder = {
    pizzaName: null,
    heat: null,
    price: null,
}

let pizzaList = [];

loadTable(pizzaList)

function readPizzaForm() {
    let pizzaData = {};
    pizzaData['pizzaName'] = document.getElementById('pizzaName').value
    pizzaData['price'] = document.getElementById('price').value
    pizzaData['heat'] = document.getElementById('heat').value
    pizzaData['topping'] = document.getElementById('toppings').value
    pizzaData['image'] = document.getElementById('image').value
    return pizzaData;
}

function loadTable(pizzaList) {

    if (pizzaList.length > 0) {
        for (i = 0; i < pizzaList.length; i++) {
            table.innerHTML = `<tr>
            <th id="sortName">Name</th>
            <th id="sortPrice">Price</th>
            <th id="sortHeat">Heat</th>
            <th>Toppings</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
          `
            pizzaList.forEach(pizza => {
                table.innerHTML += `
              <tr>
              <td id="pizzaData">${pizza.pizzaName}</td>
              <td>${pizza.price}</td>
              <td>${pizza.heat}</td>
              <td>${pizza.topping}</td>
              <td><img class="imgMenu" src="${pizza.image}"></td>
            <td><button type="submit" id="deletePizza" onClick="deleteRecord(i)"</button>Delete</td>
            </tr>
              `
            });
        }

        const headerPizzaName = document.getElementById("sortName")
        const headerPizzaPrice = document.getElementById("sortPrice")
        const headerPizzaHeat = document.getElementById("sortHeat")
        headerPizzaName.addEventListener("click", sortByName);
        headerPizzaHeat.addEventListener("click", sortByHeat);
        headerPizzaPrice.addEventListener("click", sortByPrice);


        switch (sortBy) {

            case 'price':
                pizzaList.sort((a, b) => (Number(a.price) - Number(b.price)) * (sortOrder.id == 'asc' ? 1 : -1));
                headerPizzaPrice.classList.add(sortOrder.price);
                break;

            case 'pizzaName':
                pizzaList.sort((a, b) => (a.pizzaName > b.pizzaName ? 1 : a.pizzaName == b.pizzaName ? 0 : -1) * (sortOrder.pizzaName == 'asc' ? 1 : -1));
                headerPizzaName.classList.add(sortOrder.pizzaName);
                break;

            case 'heat':
                pizzaList.sort((a, b) => (a.heat > b.heat ? 1 : a.heat == b.heat ? 0 : -1) * (sortOrder.heat == 'asc' ? 1 : -1));
                headerPizzaHeat.classList.add(sortOrder.heat);
                break;
        }


        function sortByName() {
            sortBy = 'pizzaName';
            if (sortOrder.pizzaName == 'asc') sortOrder.pizzaName = 'desc';
            else sortOrder.pizzaName = 'asc';
            loadTable(pizzaList)
        }

        function sortByHeat() {
            sortBy = 'heat';
            if (sortOrder.heat == 'asc') sortOrder.heat = 'desc';
            else sortOrder.heat = 'asc';
            loadTable(pizzaList);

        }
        function sortByPrice() {
            sortBy = 'price';
            if (sortOrder.price == 'asc') sortOrder.price = 'desc';
            else sortOrder.price = 'asc'
            loadTable(pizzaList);

        }
    } else {
        table.innerHTML = `<h3>List is empty:( Please add a pizza.</h3>`
    }

}


form.addEventListener('submit', event => {
    event.preventDefault();
    let value = readPizzaForm();
    pizzaList.push(value);
    resetForm();
    loadTable(pizzaList)
    sessionStorage.setItem('pizzaList', JSON.stringify(pizzaList))


})

form.addEventListener('reset', event => {
    resetForm();
})

function resetForm() {
    document.getElementById('pizzaName').value = ""
    document.getElementById('price').value = ""
    document.getElementById('heat').value = ""
    document.getElementById('toppings').value = ""
    document.getElementById('image').value = ""
}


function deleteRecord(item) {
    if (confirm("Are you sure you want to delete this record?")) {
        pizzaList.splice((item - 1), 1);
        loadTable(pizzaList);
        sessionStorage.setItem('pizzaList', JSON.stringify(pizzaList))

    }
}
