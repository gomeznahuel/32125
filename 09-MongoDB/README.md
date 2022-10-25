```
use ecommerce
```

```
db.createCollection("products")
db.createCollection("messages")
```

```
const messagesData = [
    {
        id: 1,
        email: "email01@coder.com,
        message: "Hola, me gustaría saber más sobre el curso de React",
        time: "2021-05-01 10:00:00"
    },
    {
        id: 2,
        email: "email02@coder.com,
        message: "Hola, me gustaría saber más sobre el curso de React",
        time: "2021-05-01 10:00:00"
    },
    {
        id: 3,
        email: "email03@coder.com,
        message: "Hola, me gustaría saber más sobre el curso de React",
        time: "2021-05-01 10:00:00"
    },
    {
        id: 4,
        email: "email04@coder.com,
        message: "Hola, me gustaría saber más sobre el curso de React",
        time: "2021-05-01 10:00:00"
    },
    {
        id: 5,
        email: "email05@coder.com,
        message: "Hola, me gustaría saber más sobre el curso de React",
        time: "2021-05-01 10:00:00"
    },
    {
        id: 6,
        email: "email06@coder.com,
        message: "Hola, me gustaría saber más sobre el curso de React",
        time: "2021-05-01 10:00:00"
    },
    {
        id: 7,
        email: "email07@coder.com,
        message: "Hola, me gustaría saber más sobre el curso de React",
        time: "2021-05-01 10:00:00"
    },
    {
        id: 8,
        email: "email08@coder.com,
        message: "Hola, me gustaría saber más sobre el curso de React",
        time: "2021-05-01 10:00:00"
    },
    {
        id: 9,
        email: "email09@coder.com,
        message: "Hola, me gustaría saber más sobre el curso de React",
        time: "2021-05-01 10:00:00"
    },
    {
        id: 10,
        email: "email10@coder.com,
        message: "Hola, me gustaría saber más sobre el curso de React",
        time: "2021-05-01 10:00:00"
    }
]
```

```
const productsData = [
    {
        id: 1,
        title: "Producto 1",
        price: 100,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        stock: 10
    },
    {
        id: 2,
        title: "Producto 2",
        price: 200,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        stock: 20
    },
    {
        id: 3,
        title: "Producto 3",
        price: 300,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        stock: 30
    },
    {
        id: 4,
        title: "Producto 4",
        price: 400,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        stock: 40
    },
    {
        id: 5,
        title: "Producto 5",
        price: 500,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        stock: 50
    },
    {
        id: 6,
        title: "Producto 6",
        price: 600,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        stock: 60
    },
    {
        id: 7,
        title: "Producto 7",
        price: 700,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        stock: 70
    },
    {
        id: 8,
        title: "Producto 8",
        price: 800,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        stock: 80
    },
    {
        id: 9,
        title: "Producto 9",
        price: 900,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        stock: 90
    },
    {
        id: 10,
        title: "Producto 10",
        price: 1000,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        stock: 100
    }
]
```

```
db.messages.insertMany(messagesData)
db.products.insertMany(productsData)
```

```
db.messages.find()
db.products.find()
```

```
db.messages.estimatedDocumentCount()
db.products.estimatedDocumentCount()
```

```
db.products.insertOne({
    title: "Producto 11",
    price: 1100,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    stock: 110
})
```

```
 db.products.find({price:{$gte:1000,$lte:3000}})
 db.products.find({price:{$gt:3000}})
 db.products.find().skip(2).limit(1).sort({price:1});
```

```
db.products.updateMany({}, {$set:{stock:100}})
db.products.updateMany({price:{$gt:4000}},{$set:{stock:0}})
db.products.deleteMany({price:{$lt:1000}})
```

```
db.createUser({ user:"pepe", pwd:"asd456", roles:[{role:"read", db:"ecommerce" }] })
```

```
use ecommerce
```

```
db.products.find()
```