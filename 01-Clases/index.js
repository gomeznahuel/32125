class User {
  constructor(name, surname, books, pets) {
    this.name = name;
    this.surname = surname;
    this.books = books;
    this.pets = pets;
  }

  getFullName() {
    return `${this.name} ${this.surname}`;
  }

  addPet(pet) {
    this.pets.push(pet);
  }

  countPets() {
    return this.pets.length;
  }

  addBook(title, author) {
    this.books.push({
      title: title,
      author: author,
    });
  }

  getBookNames() {
    return this.books.map((book) => book.title);
  }
}

const user = new User('John', 'Doe', [{ title: 'Book 1', author: 'Author 1' }, { title: 'Book 2', author: 'Author 2' }], ['Cat', 'Dog']);