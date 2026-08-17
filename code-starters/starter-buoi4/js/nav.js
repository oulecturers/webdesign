// js/nav.js — Tính năng 1 (menu mobile), Tính năng 2 (navbar khi cuộn),
//             và bài khởi động (nút lên đầu trang).
//
// Phần tử có sẵn trong HTML, ĐÚNG TÊN NÀY, đừng đổi:
//   nút mở menu   : <button aria-expanded="false" aria-controls="nav-mobile">
//   khối menu     : #nav-mobile        (đang có class "hidden")
//   mốc cuộn      : #nav-sentinel      (thẻ rỗng cao 1px, đầu <body>)
//   nút lên đầu   : #nut-len-dau       (CSS hiện nó khi có class "is-visible")

/* ------------------------------------------------------------------ */
/* Tính năng 1 — Menu mobile                        (tiết 2)          */
/* ------------------------------------------------------------------ */
export function initNav() {
  const toggle = document.querySelector('[aria-controls="nav-mobile"]');
  const menu = document.getElementById("nav-mobile");
  if (!toggle || !menu) return;          // trang này không có menu → thoát êm

  // TODO 1 — MỘT hàm duy nhất chịu trách nhiệm đổi trạng thái menu.
  // Không nơi nào khác được sửa class hay ARIA của menu; có vậy hai thứ
  // mới không bao giờ lệch nhau. Hàm này phải chạm đủ BỐN thứ:
  //   a. menu.classList.toggle("hidden", ...)      → cho người nhìn thấy
  //   b. toggle.setAttribute("aria-expanded", ...) → cho trình đọc màn hình
  //   c. toggle.setAttribute("aria-label", ...)    → "Mở menu" / "Đóng menu"
  //   d. document.body.classList.toggle("overflow-hidden", ...) → chặn nền cuộn
  function setOpen(open) {
    // viết ở đây
  }

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  // TODO 2 — bấm nút thì đảo trạng thái.

  // TODO 3 — ba cách đóng, vì người dùng không ai giống ai:
  //   a. phím ESC — nhớ gọi toggle.focus() để trả tiêu điểm về nút,
  //      nếu không người dùng bàn phím bị "rơi" ra đầu trang.
  //   b. bấm ra ngoài vùng header — gợi ý: e.target.closest("header")
  //   c. màn hình phóng lên desktop — window.matchMedia("(min-width: 1024px)")
  //      rồi nghe sự kiện "change".
}

/* ------------------------------------------------------------------ */
/* Tính năng 2 — Navbar đổi trạng thái khi cuộn      (tiết 2)         */
/* ------------------------------------------------------------------ */
export function initHeaderOnScroll() {
  const header = document.querySelector("header");
  const sentinel = document.getElementById("nav-sentinel");
  if (!header || !sentinel) return;

  // TODO 4 — dùng IntersectionObserver theo dõi #nav-sentinel.
  // Sentinel còn trong màn hình  → đang ở đầu trang.
  // Sentinel trôi mất            → đã cuộn: thêm "shadow-sm" và "is-scrolled"
  //                                cho <header>.
  //
  // KHÔNG dùng window.addEventListener("scroll", ...): scroll bắn hàng trăm
  // lần mỗi giây, observer chỉ báo đúng hai lần — lúc ra và lúc vào lại.
}

/* ------------------------------------------------------------------ */
/* Bài khởi động — nút "Lên đầu trang"               (tiết 1)         */
/* ------------------------------------------------------------------ */
export function initToTop() {
  const btn = document.getElementById("nut-len-dau");
  const sentinel = document.getElementById("nav-sentinel");
  if (!btn || !sentinel) return;

  // rootMargin 400px: nới vùng quan sát thêm 400px về phía trên, nên sentinel
  // chỉ bị coi là "ra khỏi màn hình" sau khi đã cuộn quá 400px — đúng ngưỡng
  // đề bài yêu cầu. Dòng cấu hình này cho sẵn; phần thân là việc của bạn.
  const observer = new IntersectionObserver(
    ([entry]) => {
      // TODO 5 — sentinel KHÔNG còn trong vùng quan sát thì nút phải hiện.
      // CSS đã có sẵn: .to-top.is-visible { opacity: 1; pointer-events: auto }
    },
    { rootMargin: "400px 0px 0px 0px" }
  );
  observer.observe(sentinel);

  // TODO 6 — bấm nút thì cuộn lên đầu:
  //   window.scrollTo({ top: 0, behavior: "smooth" })
  // Hai chi tiết dễ quên:
  //   a. người bật "giảm chuyển động" thì dùng behavior: "auto"
  //      → window.matchMedia("(prefers-reduced-motion: reduce)").matches
  //   b. trả tiêu điểm về đầu trang cho người dùng bàn phím, nếu không họ
  //      cuộn lên trên mà con trỏ vẫn ở cuối trang.
}
