const socket = io();

socket.on("products", (listProds) => {
  loadProds(listProds);
});

socket.on("messages", (data) => {
  loadMessages(data);
});

function loadMessages(data) {
  const html = data.map((elem, index) => {
      return `<div class="direct-chat-info clearfix">
                <span id="chatName" class="direct-chat-name pull-right">${elem.author}</span>
                <span id= "chatDate" class="direct-chat-timestamp pull-left">${elem.date}</span>
              </div>
              
              <div id="chatText" class="direct-chat-text">${elem.msg}</div>
            `;
    }).join(" ");
    document.getElementById("messages").innerHTML = html;
}

document.getElementById("formData").addEventListener("submit", (e) => {
  e.preventDefault();
  addMessage();
});

function addMessage() {
  const newMessage = {
    author: document.getElementById("email").value,
    msg: document.getElementById("text").value,
  };
  socket.emit("newMessage", newMessage);
}

async function loadProds(listProd) {
  let htmlProd = {};
  const tableList = await fetch("views/partials/table.ejs").then((res) => res.text()
);

  if (listProd.length === 0) htmlProd = `Product list is empty`;
  else htmlProd = ejs.render(tableList, { listProd });
  
  document.getElementById("newTable").innerHTML = htmlProd;
}

document.getElementById("btn").addEventListener("click", () => {
  const product = {
    name: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("url").value,
  };
  socket.emit("newProduct", product);
});
