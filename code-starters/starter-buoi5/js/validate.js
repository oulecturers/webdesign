// js/validate.js — BUỔI 5, tiết 3 · Kiểm tra dữ liệu form.
//
// ============================================================================
//  NGUYÊN TẮC PHÂN VAI
//  Trình duyệt lo "ĐÚNG HAY SAI". Ta lo "NÓI CHO NGƯỜI DÙNG BIẾT SAI Ở ĐÂU".
// ============================================================================
//
//  Trình duyệt đã biết sẵn: required, type="email", pattern, minlength, min,
//  max, step. Nó biết chính xác ô nào sai và sai vì lý do gì — đọc được qua
//  field.validity. Viết lại bằng biểu thức chính quy tự nghĩ là làm lại việc
//  đã có, và làm sai hơn (thử viết regex đúng cho địa chỉ email mà xem).
//
//  Phần việc còn lại của ta có ba mảnh, và mảnh nào cũng không thay thế được:
//    1. Diễn đạt bằng tiếng Việt, có kèm CÁCH SỬA.
//    2. Đánh dấu cho trình đọc màn hình (aria-invalid).
//    3. Đưa tiêu điểm về ô sai đầu tiên.
//
//  File này dùng cho CẢ HAI form của dự án: #contact-form ở contact.html và
//  #add-form ở app.html. Vì vậy nó không được biết gì về tên trường cụ thể.
// ============================================================================

import { hienToast } from "./toast.js";

/**
 * Chọn câu thông báo cho một ô đang sai.
 *
 * Thứ tự các if có ý nghĩa: xét từ lỗi cụ thể nhất tới chung nhất. Một ô
 * vừa rỗng vừa quá ngắn thì nói "hãy điền" mới đúng, nói "quá ngắn" là vô nghĩa.
 *
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field
 * @returns {string} câu tiếng Việt, có dấu, nói được cách sửa
 */
export function messageFor(field) {
  const v = field.validity;

  // TODO 1 — Viết đủ các nhánh. Bốn cái đầu làm mẫu, phần còn lại của bạn.
  //
  //   if (v.valueMissing)    return "Vui lòng điền mục này.";
  //   if (v.typeMismatch)    return "Email chưa đúng dạng, ví dụ: chuvua@gmail.com";
  //   if (v.patternMismatch) return "Nhập 10 chữ số, bắt đầu bằng 0. Ví dụ: 0912345678";
  //   if (v.tooShort)        return `Nội dung quá ngắn, cần ít nhất ${field.minLength} ký tự.`;
  //
  // Còn thiếu: rangeUnderflow / rangeOverflow (ô number có min, max) và
  // stepMismatch. Xem field.min, field.max để câu thông báo nói được con số
  // cụ thể — "Khối lượng phải từ 1 kg trở lên" chứ không phải "Giá trị sai".
  //
  // Thang đo một câu thông báo tốt:
  //   KHÔNG ĐẠT: "Dữ liệu không hợp lệ"  ·  "Lỗi"  ·  "Sai định dạng"
  //   ĐẠT:       "Nhập 10 chữ số, bắt đầu bằng 0. Ví dụ: 0912345678"
  // Câu không nói được cách sửa thì vô dụng ngang với không có thông báo.

  return "Giá trị chưa hợp lệ.";
}

/**
 * Hiện lỗi của một ô. Phải chạm CẢ HAI lớp: lớp cho người nhìn thấy và lớp
 * cho trình đọc màn hình. Thiếu lớp nào thì một nhóm người dùng bị bỏ lại.
 *
 * @param {Element} field
 */
export function hienLoi(field) {
  // TODO 2 — Hai dòng:
  //   field.setAttribute("aria-invalid", "true");        // cho trình đọc màn hình
  //   hộp lỗi #<id>-error  ← messageFor(field)           // cho người nhìn thấy
  //
  // Hộp lỗi đã dựng sẵn từ buổi 3, quy ước tên là id của ô cộng "-error":
  //   const box = document.getElementById(`${field.id}-error`);
  // Nhớ kiểm box tồn tại trước khi gán — ô nào chưa có hộp lỗi thì chỉ mất
  // dòng chữ, không được làm cả hàm ném lỗi.
  //
  // Không cần thêm class nào cho viền đỏ: .field-input trong src/input.css
  // đã bắt aria-invalid="true" sẵn. Trạng thái chỉ khai báo ở MỘT chỗ.
}

/**
 * Xóa dấu lỗi của một ô, khi người dùng đã sửa đúng.
 * @param {Element} field
 */
export function xoaLoi(field) {
  // TODO 3 — Ngược lại của hienLoi:
  //   field.removeAttribute("aria-invalid");   ← REMOVE, không phải gán "false"
  //   hộp lỗi ← ""                             (.field-error có empty:hidden nên tự ẩn)
  //
  // Vì sao remove chứ không gán "false": aria-invalid="false" là một khẳng
  // định "ô này đã được kiểm và hợp lệ" — khác với "chưa kiểm". Sạch hơn, và
  // CSS cũng chỉ bắt aria-invalid="true".
}

/**
 * Kiểm tra cả form. Dùng cho cả #contact-form và #add-form.
 *
 * @param {HTMLFormElement} form
 * @returns {boolean} true nếu mọi ô đều hợp lệ
 */
export function kiemTraForm(form) {
  // TODO 4 — Bốn bước:
  //
  //   const fields = [...form.elements].filter((el) => el.willValidate);
  //   const sai = fields.filter((el) => !el.checkValidity());
  //   fields.forEach(xoaLoi);       // xóa dấu lỗi cũ TRƯỚC, kể cả ô nay đã đúng
  //   sai.forEach(hienLoi);
  //   if (sai.length) { sai[0].focus(); return false; }
  //   return true;
  //
  // Ba điểm dễ trượt:
  //   · willValidate lọc ra đúng những ô trình duyệt chịu kiểm — bỏ qua nút
  //     bấm, ô disabled, input hidden. Đừng querySelectorAll("input") rồi tự lọc.
  //   · Phải xóa dấu lỗi cũ trước khi đánh dấu lại, nếu không ô đã sửa đúng
  //     vẫn còn viền đỏ của lần submit trước.
  //   · sai[0].focus() quan trọng hơn vẻ ngoài của nó: trên form dài, người
  //     dùng đang ở cuối trang và KHÔNG THẤY ô lỗi nằm trên đầu. Không có
  //     dòng này thì họ bấm Gửi, không có gì xảy ra, và bỏ đi.
  return true;
}

/**
 * Giả lập gửi form lên máy chủ. VIẾT SẴN.
 * Dự án này không có backend, nhưng độ trễ là thật: người dùng phải thấy nút
 * đổi trạng thái, nếu không họ bấm Gửi ba lần và tạo ba yêu cầu.
 */
const doiMotChut = (ms = 800) => new Promise((r) => setTimeout(r, ms));

/**
 * Điểm vào của contact.html.
 * Trang nào không có #contact-form thì thoát êm ở dòng đầu.
 */
export function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  // TODO 5 — Tắt bong bóng mặc định của trình duyệt:
  //   form.setAttribute("novalidate", "");
  //
  // Đặt bằng JavaScript, KHÔNG viết sẵn trong HTML. Lý do là cải tiến tiệm
  // tiến: nếu JavaScript lỗi hoặc bị chặn, thuộc tính này không được gắn, và
  // trình duyệt vẫn kiểm tra hộ bằng bong bóng tiếng Anh. Có tiếng Anh vẫn
  // hơn là form gửi đi dữ liệu rỗng.
  //
  // novalidate tắt CÁI GÌ: bong bóng mặc định, tiếng Anh, không style được.
  // KHÔNG tắt cái gì: checkValidity() và field.validity vẫn hoạt động đủ.
  // Đây là câu hỏi vấn đáp cuối kỳ số 4.

  // TODO 6 — Xóa dấu lỗi ngay khi người dùng sửa đúng, không đợi bấm Gửi lần nữa:
  //   form.addEventListener("input", (e) => {
  //     const field = e.target;
  //     if (field.willValidate && field.checkValidity()) xoaLoi(field);
  //   });
  //
  // Một listener trên form thay cho tám listener trên tám ô — sự kiện input
  // nổi bọt lên form. Đó là uỷ quyền sự kiện (event delegation).

  // TODO 7 — Xử lý submit:
  //   · e.preventDefault()   — chặn trình duyệt tải lại trang
  //   · if (!kiemTraForm(form)) → hiện dòng tóm tắt #form-summary rồi return.
  //     Dòng tóm tắt là việc thứ ba của "làm đủ ba việc khi submit hỏng":
  //     ví dụ `Còn ${n} mục chưa đúng. Kiểm tra lại các ô được tô đỏ.`
  //   · Hợp lệ thì: xóa dòng tóm tắt, KHÓA nút gửi và đổi chữ thành
  //     "Đang gửi…", await doiMotChut(), rồi mở lại nút, đặt lại chữ cũ,
  //     form.reset(), và hienToast("Đã nhận yêu cầu…").
  //
  // Nhớ đặt lại nút trong cả nhánh lỗi (try/finally), nếu không một lần
  // hỏng là nút khóa vĩnh viễn.
  //
  // Cả form.reset() cũng phải kèm xóa mọi dấu lỗi còn sót: reset trả giá trị
  // về mặc định nhưng KHÔNG xóa aria-invalid mà mình tự gắn.
}
