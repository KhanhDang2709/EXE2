-- 1. Liệt kê các hóa đơn của khách hàng (mã user, tên user, mã hóa đơn)
SELECT users.user_id, users.user_name, orders.order_id 
FROM users 
JOIN orders ON users.user_id = orders.user_id;

-- 2. Liệt kê số lượng đơn hàng của mỗi khách hàng
SELECT users.user_id, users.user_name, COUNT(orders.order_id) AS total_orders
FROM users 
LEFT JOIN orders ON users.user_id = orders.user_id
GROUP BY users.user_id, users.user_name;

-- 3. Liệt kê thông tin hóa đơn: mã đơn hàng, số sản phẩm
SELECT orders.order_id, COUNT(order_details.product_id) AS total_products
FROM orders 
JOIN order_details ON orders.order_id = order_details.order_id
GROUP BY orders.order_id;

-- 4. Liệt kê thông tin mua hàng của người dùng (gom nhóm theo đơn hàng)
SELECT users.user_id, users.user_name, orders.order_id, products.product_name
FROM users
JOIN orders ON users.user_id = orders.user_id
JOIN order_details ON orders.order_id = order_details.order_id
JOIN products ON order_details.product_id = products.product_id
ORDER BY orders.order_id;

-- 5. Liệt kê 7 khách hàng có số lượng đơn hàng nhiều nhất
SELECT users.user_id, users.user_name, COUNT(orders.order_id) AS total_orders
FROM users 
JOIN orders ON users.user_id = orders.user_id
GROUP BY users.user_id, users.user_name
ORDER BY total_orders DESC
LIMIT 7;

-- 6. Liệt kê 7 khách hàng mua sản phẩm có tên chứa 'Samsung' hoặc 'Apple'
SELECT DISTINCT users.user_id, users.user_name, orders.order_id, products.product_name
FROM users
JOIN orders ON users.user_id = orders.user_id
JOIN order_details ON orders.order_id = order_details.order_id
JOIN products ON order_details.product_id = products.product_id
WHERE products.product_name LIKE '%Samsung%' OR products.product_name LIKE '%Apple%'
LIMIT 7;

-- 7. Liệt kê danh sách mua hàng của user, tổng tiền mỗi đơn hàng
SELECT users.user_id, users.user_name, orders.order_id, SUM(products.product_price) AS total_price
FROM users
JOIN orders ON users.user_id = orders.user_id
JOIN order_details ON orders.order_id = order_details.order_id
JOIN products ON order_details.product_id = products.product_id
GROUP BY users.user_id, users.user_name, orders.order_id;

-- 8. Liệt kê mỗi user chỉ có 1 đơn hàng có giá trị cao nhất
SELECT users.user_id, users.user_name, orders.order_id, MAX(total_price) AS highest_order_value
FROM (
    SELECT users.user_id, users.user_name, orders.order_id, SUM(products.product_price) AS total_price
    FROM users
    JOIN orders ON users.user_id = orders.user_id
    JOIN order_details ON orders.order_id = order_details.order_id
    JOIN products ON order_details.product_id = products.product_id
    GROUP BY users.user_id, users.user_name, orders.order_id
) AS user_orders
GROUP BY users.user_id, users.user_name;

-- 9. Liệt kê mỗi user chỉ có 1 đơn hàng có giá trị thấp nhất
SELECT users.user_id, users.user_name, orders.order_id, MIN(total_price) AS lowest_order_value
FROM (
    SELECT users.user_id, users.user_name, orders.order_id, SUM(products.product_price) AS total_price
    FROM users
    JOIN orders ON users.user_id = orders.user_id
    JOIN order_details ON orders.order_id = order_details.order_id
    JOIN products ON order_details.product_id = products.product_id
    GROUP BY users.user_id, users.user_name, orders.order_id
) AS user_orders
GROUP BY users.user_id, users.user_name;

-- 10. Liệt kê mỗi user chỉ có 1 đơn hàng có số sản phẩm nhiều nhất
SELECT users.user_id, users.user_name, orders.order_id, MAX(total_products) AS max_products
FROM (
    SELECT users.user_id, users.user_name, orders.order_id, COUNT(order_details.prod
