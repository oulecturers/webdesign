// js/nav.js — menu mobile, navbar phản ứng khi cuộn, nút lên đầu trang.

/* ------------------------------------------------------------------ */
/* Tính năng 1 — Menu mobile                                           */
/* ------------------------------------------------------------------ */
export function initNav() {
  const toggle = document.querySelector('[aria-controls="nav-mobile"]');
  const menu = document.getElementById("nav-mobile");
  if (!toggle || !menu) return;          // trang này không có menu → thoát êm

  // Một hàm duy nhất chịu trách nhiệm đổi trạng thái. Không nơi nào khác được
  // sửa class hay ARIA của menu — có vậy mới không bao giờ lệch nhau.
  function setOpen(open) {
    menu.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    document.body.classList.toggle("overflow-hidden", open);
  }

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  toggle.addEventListener("click", () => setOpen(!isOpen()));

  // Cách đóng 1 — phím ESC. Phải trả tiêu điểm về nút, nếu không người dùng
  // bàn phím bị "rơi" ra đầu trang.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Cách đóng 2 — bấm ra ngoài vùng header.
  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    if (e.target.closest("header")) return;
    setOpen(false);
  });

  // Cách đóng 3 — màn hình phóng lên desktop thì menu mobile vô nghĩa.
  const desktop = window.matchMedia("(min-width: 1024px)");
  desktop.addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });

  // Bấm một mục trong menu thì đóng luôn, không để menu che nội dung vừa nhảy tới.
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });
}

/* ------------------------------------------------------------------ */
/* Tính năng 2 — Navbar đổi trạng thái khi cuộn                        */
/* ------------------------------------------------------------------ */
export function initHeaderOnScroll() {
  const header = document.querySelector("header");
  const sentinel = document.getElementById("nav-sentinel");
  if (!header || !sentinel) return;

  // Dùng IntersectionObserver thay cho sự kiện scroll: scroll bắn hàng trăm lần
  // mỗi giây, observer chỉ báo đúng hai lần — lúc sentinel ra và lúc vào lại.
  const observer = new IntersectionObserver(([entry]) => {
    const scrolled = !entry.isIntersecting;
    header.classList.toggle("shadow-sm", scrolled);
    header.classList.toggle("is-scrolled", scrolled);
  });
  observer.observe(sentinel);
}

/* ------------------------------------------------------------------ */
/* Bài khởi động — nút "Lên đầu trang"                                 */
/* ------------------------------------------------------------------ */
export function initToTop() {
  const btn = document.getElementById("nut-len-dau");
  const sentinel = document.getElementById("nav-sentinel");
  if (!btn || !sentinel) return;

  // rootMargin âm 400px: sentinel chỉ bị coi là "ra khỏi màn hình" sau khi đã
  // cuộn quá 400px, đúng ngưỡng đề bài yêu cầu.
  const observer = new IntersectionObserver(
    ([entry]) => btn.classList.toggle("is-visible", !entry.isIntersecting),
    { rootMargin: "400px 0px 0px 0px" }
  );
  observer.observe(sentinel);

  btn.addEventListener("click", () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // Trả tiêu điểm về đầu trang cho người dùng bàn phím.
    document.querySelector("header a, header button")?.focus();
  });
}
