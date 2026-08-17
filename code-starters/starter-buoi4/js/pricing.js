// js/pricing.js — Tính năng 5: công tắc giá Tháng / Năm.   (tiết 4)
//
// Phần tử có sẵn trong HTML:
//   công tắc   : #cong-tac-gia  — <button role="switch" aria-checked="false">
//   số tiền    : <span data-price data-monthly="390000" data-yearly="3744000">
//   nhãn kỳ hạn: <span data-price-unit>/tháng</span>
//
// Số tiền nằm trong HTML, KHÔNG nằm trong JavaScript. Người sửa giá là người
// làm nội dung, không phải lập trình viên: sửa giá không được đụng tới file này.

// Cho sẵn — đây là cú pháp tra tài liệu chứ không phải bài học của buổi.
// Đừng tự viết hàm chèn dấu chấm: hàm tự viết luôn sai ở số âm và số lẻ.
const dong = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export function initPricing() {
  const sw = document.getElementById("cong-tac-gia");
  if (!sw) return;

  const prices = [...document.querySelectorAll("[data-price]")];
  const units = [...document.querySelectorAll("[data-price-unit]")];
  if (prices.length === 0) return;

  // TODO 1 — vẽ lần đầu theo trạng thái đang có trong HTML:
  //   render(sw.getAttribute("aria-checked") === "true")

  // TODO 2 — bấm công tắc thì đảo trạng thái rồi gọi render().

  // TODO 3 — bàn phím: phím Space và Enter đều phải bật/tắt được.
  // <button> đã tự lo Enter, nhưng viết rõ ra để người đọc thấy bạn đã cân nhắc.
  // Nhớ e.preventDefault() với phím Space, nếu không trang sẽ cuộn xuống.

  function render(yearly) {
    // TODO 4 — ba việc:
    //   a. sw.setAttribute("aria-checked", String(yearly))
    //      → trạng thái nằm ở ARIA, CSS tự đọc qua .cong-tac[aria-checked="true"],
    //        nên KHÔNG cần thêm class riêng nào cả.
    //   b. mỗi phần tử trong `prices`: đọc el.dataset.yearly hoặc el.dataset.monthly,
    //      đổi sang số, rồi el.textContent = dong.format(...)
    //      Dùng textContent chứ không innerHTML — buổi 5 sẽ nói kỹ vì sao.
    //   c. mỗi phần tử trong `units`: "/năm" hoặc "/tháng".
  }
}
