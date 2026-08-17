// js/theme.js — Tính năng 4: công tắc nền sáng / nền tối.   (tiết 3)
//
// Phần tử có sẵn: nút #nut-nen-toi trong navbar.
//
// LƯU Ý QUAN TRỌNG: việc BẬT nền tối lúc tải trang KHÔNG nằm ở file này mà ở
// đoạn script inline trong <head> (xem TODO trong index.html). File này nạp ở
// cuối <body>, lúc đó trình duyệt đã vẽ nền trắng rồi — đặt ở đây thì người
// dùng thấy một cú chớp trắng mỗi lần tải trang.
// File này chỉ lo phần BẤM NÚT ĐỂ ĐỔI.

const KEY = "theme";

export function initTheme() {
  const btn = document.getElementById("nut-nen-toi");
  if (!btn) return;

  const root = document.documentElement;
  const isDark = () => root.classList.contains("dark");

  // TODO 1 — đồng bộ nút với trạng thái mà script inline đã đặt sẵn.
  // Gọi sync() một lần ngay tại đây, trước khi gắn listener.

  // TODO 2 — bấm nút thì làm ba việc, đúng thứ tự này:
  //   a. root.classList.toggle("dark")
  //   b. localStorage.setItem(KEY, ...)   → nhớ lựa chọn cho lần sau
  //   c. sync()                            → cập nhật ARIA của nút

  // TODO 3 (mở rộng, làm nếu còn giờ) — người dùng đổi cài đặt hệ điều hành
  // trong lúc đang mở trang. Nghe sự kiện:
  //   window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ...)
  // Nguyên tắc: chỉ nghe theo hệ điều hành khi người dùng CHƯA từng tự chọn.
  // Lựa chọn của người dùng luôn thắng cài đặt máy.

  function sync() {
    // TODO 4 — nút này là một công tắc hai trạng thái, nên phải mang trạng thái
    // đó trong ARIA, không chỉ trong hình vẽ:
    //   btn.setAttribute("aria-pressed", ...)
    //   btn.setAttribute("aria-label", ...)   → "Chuyển sang nền sáng" / "... tối"
  }
}
