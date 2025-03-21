-- 1. Lấy ra danh sách người dùng theo thứ tự tên theo Alphabet (A->Z)
SELECT * FROM users ORDER BY user_name ASC;

-- 2. Lấy ra 07 người dùng theo thứ tự tên theo Alphabet (A->Z)
SELECT * FROM users ORDER BY user_name ASC LIMIT 7;

-- 3. Lấy ra danh sách người dùng theo thứ tự tên theo Alphabet (A->Z), trong đó tên người dùng có chữ 'a'
SELECT * FROM users WHERE user_name LIKE '%a%' ORDER BY user_name ASC;

-- 4. Lấy ra danh sách người dùng trong đó tên người dùng bắt đầu bằng chữ 'm'
SELECT * FROM users WHERE user_name LIKE 'm%';

-- 5. Lấy ra danh sách người dùng trong đó tên người dùng kết thúc bằng chữ 'i'
SELECT * FROM users WHERE user_name LIKE '%i';

-- 6. Lấy ra danh sách người dùng trong đó email người dùng là Gmail
SELECT * FROM users WHERE user_email LIKE '%@gmail.com';

-- 7. Lấy ra danh sách người dùng trong đó email là Gmail và tên bắt đầu bằng chữ 'm'
SELECT * FROM users WHERE user_email LIKE '%@gmail.com' AND user_name LIKE 'm%';

-- 8. Lấy danh sách người dùng có email Gmail, tên chứa chữ 'i' và độ dài tên > 5 ký tự
SELECT * FROM users WHERE user_email LIKE '%@gmail.com' AND user_name LIKE '%i%' AND LENGTH(user_name) > 5;

-- 9. Lấy danh sách người dùng có tên chứa 'a', độ dài 5-9 ký tự, email Gmail, trong tên email có chữ 'i'
SELECT * FROM users 
WHERE user_name LIKE '%a%' 
AND LENGTH(user_name) BETWEEN 5 AND 9 
AND user_email LIKE '%@gmail.com' 
AND SUBSTRING_INDEX(user_email, '@', 1) LIKE '%i%';

-- 10. Lấy danh sách người dùng có tên chứa 'a', độ dài 5-9 ký tự hoặc tên chứa 'i', nhỏ hơn 9 ký tự hoặc email Gmail có chữ 'i' trong tên email
SELECT * FROM users 
WHERE (user_name LIKE '%a%' AND LENGTH(user_name) BETWEEN 5 AND 9) 
   OR (user_name LIKE '%i%' AND LENGTH(user_name) < 9) 
   OR (user_email LIKE '%@gmail.com' AND SUBSTRING_INDEX(user_email, '@', 1) LIKE '%i%');
