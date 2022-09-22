const itemsValidate = (title, price, thumbnail) => {
  if (!title || !price || !thumbnail) return { error: 'Please provide all the required fields.'};  
  else return { title, price, thumbnail };
};

module.exports = { itemsValidate };