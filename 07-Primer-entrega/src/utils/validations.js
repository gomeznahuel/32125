const itemsValidate = (name, description, code, thumbnail, price, stock) => {
  if (!name || !description || !code || !thumbnail || !price || !stock)
    return { error: "Please provide all the required fields." };
  else if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof code !== "string" ||
    typeof thumbnail !== "string"
  )
    return {
      error: "The name, description, code and thumbnail must be a string.",
    };
  else if (typeof price !== "number" || typeof stock !== "number")
    return { error: "The price and stock must be a number." };
  else return { name, description, code, thumbnail, price, stock };
};

module.exports = { itemsValidate };
