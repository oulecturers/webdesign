// js/format.js — BUỔI 5, tiết 1 · VIẾT SẴN, KHÔNG PHẢI SỬA.
//
// Đọc kỹ file này trước khi làm bài. Nó nhỏ nhưng chứa ba quyết định
// mà phần còn lại của buổi dựa lên.
//
// 1. Định dạng số và ngày là việc của TRÌNH DUYỆT, không phải của bạn.
//    Intl.NumberFormat biết dấu phân cách nghìn của tiếng Việt là dấu
//    chấm, biết ký hiệu ₫ đứng sau số, và sẽ tự đúng khi dự án đổi sang
//    ngôn ngữ khác. Hàm tự viết bằng replace(/\B(?=(\d{3})+(?!\d))/g, ".")
//    chạy được nhưng là 20 dòng nợ kỹ thuật, và sai ngay khi gặp số âm.
//
// 2. Tạo formatter MỘT LẦN ở tầng module, không tạo lại trong mỗi lần gọi.
//    Dựng một Intl.NumberFormat tốn kém hơn dùng nó nhiều lần. Render 30
//    dòng là 30 lần gọi tien(); với 3.000 dòng thì khác biệt thấy được.
//
// 3. Mỗi hàm ở đây THUẦN: cùng đầu vào cho cùng đầu ra, không đụng DOM,
//    không đụng state. Nhờ vậy đọc là hiểu và kiểm thử được.

const DINH_DANG_TIEN = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

const DINH_DANG_SO = new Intl.NumberFormat("vi-VN");

const DINH_DANG_NGAY = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

/** 37696000 → "37.696.000 ₫" */
export const tien = (n) => DINH_DANG_TIEN.format(Number(n) || 0);

/** 1178 → "1.178" */
export const so = (n) => DINH_DANG_SO.format(Number(n) || 0);

/**
 * "2026-07-26" → "26/07/2026"
 * Nối thêm "T00:00:00" để trình duyệt hiểu đây là giờ ĐỊA PHƯƠNG. Nếu
 * truyền thẳng "2026-07-26", chuẩn quy định đó là giờ UTC, và ở múi giờ
 * GMT+7 ngày sẽ lùi lại một hôm khi hiển thị. Đây là lỗi kinh điển.
 */
export const ngay = (iso) => DINH_DANG_NGAY.format(new Date(`${iso}T00:00:00`));

/**
 * Mã trạng thái trong dữ liệu → nhãn cho người đọc.
 * Dữ liệu giữ mã không dấu ("da-chot") để so sánh và lọc; màn hình hiện
 * chữ có dấu. Hai vai trò khác nhau nên không dùng lẫn.
 */
export const NHAN_TRANG_THAI = {
  "dang-can": "Đang cân",
  "da-chot": "Đã chốt",
  "da-thanh-toan": "Đã thanh toán",
};

/**
 * Gói một hàm lại để nó chỉ chạy khi người dùng đã NGỪNG gọi trong `delay` ms.
 *
 * Gõ "Nguyễn" là 6 lần sự kiện input, tức 6 lần lọc và vẽ lại toàn bảng.
 * Với 30 dòng thì không sao; với 3.000 dòng thì giao diện khựng theo từng
 * phím. Debounce biến 6 lần thành 1 lần.
 *
 * clearTimeout trước setTimeout là phần quan trọng nhất: thiếu nó thì hàm
 * vẫn chạy đủ 6 lần, chỉ là chạy muộn hơn.
 */
export function debounce(fn, delay = 300) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
}
