// Load header & footer vào các trang
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("header")) {
        fetch("header.html")
            .then(res => res.text())
            .then(data => document.getElementById("header").innerHTML = data);
    }
    if (document.getElementById("footer")) {
        fetch("footer.html")
            .then(res => res.text())
            .then(data => document.getElementById("footer").innerHTML = data);
    }
});

// Lấy danh sách người dùng từ localStorage hoặc dữ liệu mặc định
let users = JSON.parse(localStorage.getItem("users")) || [
    { id: 1, username: "user1", email: "user1@example.com", password: "123" },
    { id: 2, username: "user2", email: "user2@example.com", password: "123" },
    { id: 3, username: "user3", email: "user3@example.com", password: "123" }
];

// Xử lý đăng ký người dùng
document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirmPassword").value.trim();
            const email = document.getElementById("email").value.trim();

            if (!username || !password || !confirmPassword || !email) {
                alert("Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            if (password !== confirmPassword) {
                alert("Mật khẩu nhập lại không khớp!");
                return;
            }

            if (users.some(user => user.username === username)) {
                alert("Tên người dùng đã tồn tại!");
                return;
            }

            const newUser = { id: users.length + 1, username, password, email };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            alert("Đăng ký thành công! Chuyển hướng đến danh sách người dùng.");
            window.location.href = "list.html";
        });
    }
});

// Xử lý đăng nhập
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let username = document.getElementById("loginUsername").value.trim();
            let password = document.getElementById("loginPassword").value.trim();
            let user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                alert("Đăng nhập thành công!");
                window.location.href = "list.html";
            } else {
                alert("Sai tài khoản hoặc mật khẩu!");
            }
        });
    }
});

// Xử lý đăng xuất
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("currentUser");
            window.location.href = "login.html";
        });
    }
});

// Hiển thị danh sách người dùng
const itemsPerPage = 5;
let currentPage = 1;

function renderUsers() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedUsers = users.slice(start, end);
    
    document.getElementById("userList").innerHTML = paginatedUsers.map((user, index) => `
        <tr>
            <td>${start + index + 1}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <a href="view.html" onclick="setUser(${user.id})">View</a> |
                <a href="update.html" onclick="setEditUser(${user.id})">Edit</a> |
                <a href="#" onclick="deleteUser(${user.id})">Delete</a>
                
        </tr>
    `).join("");
    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(users.length / itemsPerPage);
    let paginationHtml = "<div class='pagination-container'>";
    if (currentPage > 1) {
        paginationHtml += `<button class="pagination-btn" onclick="changePage(${currentPage - 1})"><<</button>`;
    }
    paginationHtml += `<div class='pagination-buttons'>`;
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }
    paginationHtml += `</div>`;
    if (currentPage < totalPages) {
        paginationHtml += `<button class="pagination-btn" onclick="changePage(${currentPage + 1})">>></button>`;
    }
    paginationHtml += "</div>";
    document.getElementById("pagination").innerHTML = paginationHtml;
}

function changePage(page) {
    currentPage = page;
    renderUsers();
}

if (document.getElementById("userList")) renderUsers();
// Xóa người dùng khỏi danh sách
function deleteUser(userId) {
    if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
        users = users.filter(user => user.id !== userId);
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
    }
}

// Cập nhật lại chức năng đăng nhập để ngăn đăng nhập bằng tài khoản đã bị xóa
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let username = document.getElementById("loginUsername").value.trim();
            let password = document.getElementById("loginPassword").value.trim();
            
            // Lấy danh sách người dùng từ localStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];

            let user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                alert("Đăng nhập thành công!");
                window.location.href = "list.html";
            } else {
                alert("Sai tài khoản hoặc tài khoản không tồn tại!");
            }
        });
    }
});
// Lưu thông tin người dùng vào localStorage khi nhấn "View"
function setUser(userId) {
    const user = users.find(user => user.id === userId);
    if (user) {
        localStorage.setItem("viewUser", JSON.stringify(user));
        window.location.href = "view.html";
    }
}

// Hiển thị thông tin người dùng trên view.html
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("view.html")) {
        const user = JSON.parse(localStorage.getItem("viewUser"));
        if (user) {
            document.getElementById("username").textContent = user.username;
            document.getElementById("email").textContent = user.email;

            // Gán sự kiện cho nút chỉnh sửa
            document.getElementById("editUser").addEventListener("click", function () {
                localStorage.setItem("editUser", JSON.stringify(user));
                window.location.href = "update.html";
            });
        } else {
            document.body.innerHTML = "<h2>Không tìm thấy thông tin người dùng!</h2>";
        }
    }
});

// Xử lý chuyển dữ liệu sang update.html
function setEditUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        localStorage.setItem("editUser", JSON.stringify(user));
        window.location.href = "update.html";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("editUser"));
    if (user) {
        document.getElementById("username").value = user.username;
        document.getElementById("email").value = user.email;
        document.getElementById("password").value = user.password;
        document.getElementById("confirmPassword").value = user.password;
    }
});


document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("update.html")) {
        const user = JSON.parse(localStorage.getItem("editUser"));
        if (user) {
            document.getElementById("username").value = user.username;
            document.getElementById("email").value = user.email;
            document.getElementById("password").value = user.password;
            document.getElementById("confirmPassword").value = user.password;
        } else {
            alert("Không tìm thấy thông tin người dùng!");
            window.location.href = "list.html"; // Quay lại danh sách nếu không có dữ liệu
        }
    }
});
