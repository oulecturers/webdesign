// js/toast.js — BUỔI 5 · VIẾT SẴN, KHÔNG PHẢI SỬA.
//
// Một dòng thông báo ngắn hiện ở đáy trang rồi tự tắt. Dùng ở cả app.html
// (thêm/xóa phiếu) và contact.html (gửi form thành công).
//
// Ba chi tiết đáng để ý:
//
// 1. textContent, không phải innerHTML. Thông báo có thể chứa tên do người
//    dùng gõ ("Đã xóa phiếu của <tên>"). Đây là cùng một lỗ hổng XSS với
//    bảng dữ liệu, và cùng một cách chặn.
//
// 2. Ô #toast-box có role="status" aria-live="polite" đặt sẵn trong HTML.
//    Vùng aria-live phải TỒN TẠI TRÊN TRANG TỪ ĐẦU rồi mới được đổi nội
//    dung; nếu tạo cả khối rồi chèn vào, trình đọc màn hình thường không
//    đọc. Đây là lý do ô này rỗng nhưng vẫn nằm trong HTML.
//
// 3. Biến `hen` nằm ngoài hàm nên hai thông báo liên tiếp không tranh nhau:
//    lần sau hủy hẹn của lần trước. Cùng một cái bẫy setInterval của slider
//    ở buổi 4.

let hen;

/**
 * @param {string} loiNhan nội dung, tiếng Việt, nói rõ việc gì vừa xảy ra
 * @param {number} giay số giây hiện trên màn hình
 */
export function hienToast(loiNhan, giay = 3) {
  const box = document.getElementById("toast-box");
  if (!box) return;

  box.textContent = loiNhan;
  box.classList.add("is-visible");

  clearTimeout(hen);
  hen = setTimeout(() => box.classList.remove("is-visible"), giay * 1000);
}
