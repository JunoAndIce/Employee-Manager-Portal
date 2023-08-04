-- Add your code below and execute file in MySQL Shell --

SELECT favorite_books.book_name AS book_name, book_prices.price AS price
FROM favorite_books
JOIN book_prices  ON favorite_books.book_price = book_prices.id;
