// js/pricing.js — Tính năng 5: công tắc giá Tháng / Năm.
//
// Số tiền nằm trong HTML (data-monthly / data-yearly), không nằm trong JS.
// Người sửa giá là người làm nội dung, không phải lập trình viên.

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

  render(sw.getAttribute("aria-checked") === "true");

  // role="switch" + aria-checked là đúng vai trò của một công tắc hai trạng thái.
  // CSS bắt được trạng thái đó qua aria-checked:, không cần class riêng.
  sw.addEventListener("click", () => {
    render(sw.getAttribute("aria-checked") !== "true");
  });

  // Bàn phím: Space và Enter đều phải bật/tắt được (button đã lo Enter,
  // nhưng ghi rõ ra để người đọc thấy đã cân nhắc).
  sw.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      render(sw.getAttribute("aria-checked") !== "true");
    }
  });

  function render(yearly) {
    sw.setAttribute("aria-checked", String(yearly));
    prices.forEach((el) => {
      const value = Number(yearly ? el.dataset.yearly : el.dataset.monthly);
      el.textContent = dong.format(value);
    });
    units.forEach((el) => { el.textContent = yearly ? "/năm" : "/tháng"; });
  }
}
