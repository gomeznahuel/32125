const socket = io.connect();

const title = document.querySelector("#title");
const price = document.querySelector("#price");
const thumbnail = document.querySelector("#thumbnail");
const button = document.querySelector("#send");

button.addEventListener("click", () => {
  socket.emit("product", title.value, price.value, thumbnail.value);
});

socket.on("products", (products) => {
  makeHtmlTable(products).then((html) => {
    document.querySelector("#products").innerHTML = html;
  });
});

async function makeHtmlTable(products) {
  const response = await fetch("products.hbs");
  const template = await response.text();

  return template.replace("{{#products}}",
      products.map((product) => {
        return `
          <tr>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td><img src="${product.thumbnail}" alt=""></td>
          </tr>`;
    }).join("")
  )
};

let date = {
  day: new Date().getDate(),
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear()
}

let time = {
  hour: new Date().getHours(),
  minute: new Date().getMinutes(),
  seconds : new Date().getSeconds()
}

function addMessage(e) {
  const mensaje = {
      author: document.getElementById('email').value,
      text: document.getElementById('messageChat').value
  };
  socket.emit('new-message', mensaje);
  return false;
}

function render(data) {
  const html = data.map((elem) => {
      return(`
      <div>
          <strong class='text-primary'>${elem.author}</strong> 
          <span class='text-dark'>[${date.day}/${date.month}/${date.year} ${time.hour}:${time.minute}:${time.seconds}]<span> :
          <em class='text-success'>${elem.text}</em> 
      </div>`)
  }).join(" ");
  document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) { render(data); });