// js/reveal.js — Tính năng 7: hiệu ứng lộ dần khi cuộn tới.

export function initReveal() {
  const items = [...document.querySelectorAll("[data-reveal]")];
  if (items.length === 0) return;

  // Người bị rối loạn tiền đình có thể chóng mặt thật sự vì hiệu ứng trượt.
  // Hệ điều hành có sẵn công tắc, việc của mình là nghe theo: hiện luôn, không animate.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);   // hiện rồi thì thôi, đừng theo dõi nữa
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
}
