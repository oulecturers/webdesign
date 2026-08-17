// js/faq.js — Tính năng 3: accordion câu hỏi thường gặp.   (tiết 3)
//
// Phần tử có sẵn trong HTML:
//   khu vực   : #cau-hoi
//   nút hỏi   : <button data-faq-trigger aria-expanded="false" aria-controls="faq-p1">
//   khối đáp  : <div id="faq-p1" hidden>
// Năm cặp trigger/panel đã đánh số faq-t1..t5 và faq-p1..p5.

export function initFaq() {
  const root = document.getElementById("cau-hoi");
  if (!root) return;

  const triggers = [...root.querySelectorAll("[data-faq-trigger]")];
  if (triggers.length === 0) return;

  // TODO 1 — hàm đổi trạng thái MỘT mục. Hai việc, luôn đi cùng nhau:
  //   a. trigger.setAttribute("aria-expanded", String(open))
  //   b. panel.hidden = !open
  // Tìm panel bằng chính ARIA đã có: trigger.getAttribute("aria-controls")
  // rồi document.getElementById(...). Không cần đặt thêm data-* nào nữa.
  function setOpen(trigger, open) {
    // viết ở đây
  }

  // TODO 2 — MỘT listener cho cả nhóm (event delegation), không phải mỗi nút
  // một listener. Đặt trên `root`:
  //
  //   const trigger = e.target.closest("[data-faq-trigger]");
  //   if (!trigger) return;
  //
  // Vì sao closest(): người dùng hay bấm trúng icon <svg> bên trong nút, khi đó
  // e.target là <svg> chứ không phải <button>; closest leo ngược lên tìm đúng nút.
  //
  // Thuật toán mở "mỗi lúc chỉ một mục" — ba dòng, không cần biến trạng thái:
  //   1. đọc trước xem mục vừa bấm SẼ mở hay SẼ đóng
  //   2. đóng hết tất cả
  //   3. nếu là "sẽ mở" thì mở lại đúng cái vừa bấm

  // TODO 3 (mở rộng, cắt được nếu tiết 3 trôi chậm) — mũi tên Lên/Xuống,
  // phím Home/End chuyển tiêu điểm giữa các câu hỏi. Nhớ e.preventDefault()
  // để trang không cuộn theo.

  // TODO 4 — trạng thái ban đầu: đóng hết. Gọi setOpen(t, false) cho mọi trigger.
  // Đừng dựa vào thuộc tính `hidden` viết sẵn trong HTML — JavaScript phải là
  // nguồn sự thật duy nhất, nếu không hai bên sẽ lệch nhau sau vài lần bấm.
}
