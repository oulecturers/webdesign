// js/slider.js — Tính năng 6: slider cảm nhận, tự viết, không thư viện.
//
// Ý tưởng: xếp các slide thành một dải ngang, mỗi slide rộng đúng 100% khung
// nhìn, rồi dịch cả dải sang trái bằng translateX.

const TU_CHAY = 6000;   // ms

export function initSlider() {
  const root = document.getElementById("slider-camnhan");
  if (!root) return;

  const track = root.querySelector("[data-slider-track]");
  const slides = [...root.querySelectorAll("[data-slide]")];
  const dotsBox = root.querySelector("[data-slider-dots]");
  const prev = root.querySelector("[data-slider-prev]");
  const next = root.querySelector("[data-slider-next]");
  if (!track || slides.length === 0) return;

  let index = 0;
  let timer = null;

  // Chấm chỉ dẫn SINH BẰNG JS từ số slide thật, không viết cứng trong HTML —
  // thêm hay bớt một cảm nhận thì không phải sửa hai chỗ.
  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "slider-dot";
    b.setAttribute("aria-label", `Xem cảm nhận ${i + 1} trên ${slides.length}`);
    b.addEventListener("click", () => { go(i); restart(); });
    dotsBox?.append(b);
    return b;
  });

  function go(next_) {
    // Một dòng lo cả hai đầu: từ slide 0 bấm lùi ra -1, cộng length thành
    // length-1 → slide cuối. Không cần if.
    index = (next_ + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;

    slides.forEach((s, i) => {
      // inert: slide đang ẩn không được nhận tiêu điểm. Thiếu dòng này thì
      // người dùng nhấn Tab sẽ rơi vào slide vô hình nằm ngoài màn hình —
      // lỗi tiếp cận phổ biến nhất của mọi slider.
      s.toggleAttribute("inert", i !== index);
      s.setAttribute("aria-hidden", String(i !== index));
    });
    dots.forEach((d, i) => d.setAttribute("aria-current", String(i === index)));
  }

  function start() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stop();                                  // LUÔN clear trước khi đặt cái mới,
    timer = setInterval(() => go(index + 1), TU_CHAY);   // nếu không sẽ chạy chồng lớp
  }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  prev?.addEventListener("click", () => { go(index - 1); restart(); });
  next?.addEventListener("click", () => { go(index + 1); restart(); });

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { go(index - 1); restart(); }
    if (e.key === "ArrowRight") { go(index + 1); restart(); }
  });

  // Dừng khi người dùng đang xem. Cặp focusin/focusout là thứ hay bị quên nhất:
  // người dùng bàn phím không rê chuột, chỉ có tiêu điểm.
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  go(0);
  start();
}
