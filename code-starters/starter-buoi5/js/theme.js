// js/theme.js — Tính năng 4: công tắc nền sáng / nền tối.
//
// LƯU Ý: việc BẬT nền tối lúc tải trang KHÔNG nằm ở đây mà ở đoạn script inline
// trong <head>. Lý do: file này nạp ở cuối <body>, lúc đó trình duyệt đã vẽ nền
// trắng rồi, người dùng sẽ thấy một cú chớp trắng mỗi lần tải.
// File này chỉ lo phần bấm nút để ĐỔI.

const KEY = "theme";

export function initTheme() {
  const btn = document.getElementById("nut-nen-toi");
  if (!btn) return;

  const root = document.documentElement;
  const isDark = () => root.classList.contains("dark");

  // Đồng bộ nút với trạng thái mà script inline đã đặt sẵn.
  sync();

  btn.addEventListener("click", () => {
    root.classList.toggle("dark");
    localStorage.setItem(KEY, isDark() ? "dark" : "light");
    sync();
  });

  // Người dùng đổi cài đặt hệ điều hành khi đang mở trang: chỉ nghe theo nếu
  // họ CHƯA từng tự chọn. Lựa chọn của người dùng luôn thắng cài đặt máy.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (localStorage.getItem(KEY)) return;
    root.classList.toggle("dark", e.matches);
    sync();
  });

  function sync() {
    btn.setAttribute("aria-pressed", String(isDark()));
    btn.setAttribute("aria-label", isDark() ? "Chuyển sang nền sáng" : "Chuyển sang nền tối");
  }
}
