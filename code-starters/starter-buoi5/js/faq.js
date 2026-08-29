// js/faq.js — Tính năng 3: accordion câu hỏi thường gặp, mỗi lúc chỉ mở một mục.

export function initFaq() {
  const root = document.getElementById("cau-hoi");
  if (!root) return;

  const triggers = [...root.querySelectorAll("[data-faq-trigger]")];
  if (triggers.length === 0) return;

  function setOpen(trigger, open) {
    const panel = document.getElementById(trigger.getAttribute("aria-controls"));
    trigger.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
  }

  // Event delegation: MỘT listener cho cả nhóm, không phải mỗi nút một listener.
  root.addEventListener("click", (e) => {
    // closest() xử lý luôn trường hợp bấm trúng icon SVG bên trong nút:
    // khi đó e.target là <svg>, closest leo ngược lên tìm đúng <button>.
    const trigger = e.target.closest("[data-faq-trigger]");
    if (!trigger) return;

    const willOpen = trigger.getAttribute("aria-expanded") !== "true";
    triggers.forEach((t) => setOpen(t, false));   // đóng hết
    if (willOpen) setOpen(trigger, true);         // rồi mở đúng cái vừa bấm
  });

  // Mũi tên lên/xuống chuyển giữa các câu hỏi — chuẩn ARIA cho nhóm nút dạng này.
  root.addEventListener("keydown", (e) => {
    const trigger = e.target.closest("[data-faq-trigger]");
    if (!trigger) return;
    const i = triggers.indexOf(trigger);
    let next = null;
    if (e.key === "ArrowDown") next = triggers[(i + 1) % triggers.length];
    if (e.key === "ArrowUp") next = triggers[(i - 1 + triggers.length) % triggers.length];
    if (e.key === "Home") next = triggers[0];
    if (e.key === "End") next = triggers[triggers.length - 1];
    if (!next) return;
    e.preventDefault();
    next.focus();
  });

  triggers.forEach((t) => setOpen(t, false));     // trạng thái đầu: đóng hết
}
