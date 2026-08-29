// js/app.js — BUỔI 5, tiết 1–2 · Trang sổ phiếu cân (app.html).
//
// ============================================================================
//  MÔ HÌNH state → render  —  ý tưởng quan trọng nhất của cả môn học
// ============================================================================
//
//        state ───► render() ───► DOM
//          ▲                       │
//          └──── sự kiện người dùng ┘
//
//  Nguyên tắc: mọi thao tác của người dùng chỉ SỬA state rồi gọi render()
//  MỘT LẦN. Tuyệt đối không có chỗ nào sửa DOM lắt nhắt ở giữa chừng.
//
//  Vì sao đáng công: cách viết "bấm nút nào thì sửa chỗ đó" hỏng ngay khi có
//  hai bộ lọc cùng bật — lọc theo nhóm hàng xong lọc theo trạng thái thì bộ
//  lọc trước bị mất, vì lần sửa DOM sau không biết gì về lần trước. Với mô
//  hình này, thêm bộ lọc thứ ba chỉ là thêm một dòng vào visibleRecords().
//
//  Kiểm bài của mình bằng một câu hỏi: ngoài render(), còn hàm nào chạm vào
//  DOM của bảng nữa không? Nếu có, đó là chỗ sẽ sinh lỗi.
// ============================================================================

import { napDuLieu, luuVaoMay, khoiPhucMau } from "./store.js";
import { tien, so, ngay, NHAN_TRANG_THAI, debounce } from "./format.js";
import { hienToast } from "./toast.js";
import { kiemTraForm } from "./validate.js";

/**
 * NGUỒN SỰ THẬT DUY NHẤT của trang này.
 * Bảy trường, không hơn. Nếu lúc làm bạn thấy cần thêm một biến toàn cục
 * nữa để render() chạy đúng, nghĩa là state đang thiếu một trường — thêm
 * vào đây, đừng khai một biến rời bên ngoài.
 */
const state = {
  records: [],        // toàn bộ dữ liệu, KHÔNG phải phần đang hiện
  query: "",          // chữ trong ô tìm kiếm
  category: "all",    // "all" hoặc tên nhóm hàng
  status: "all",      // "all" hoặc mã trạng thái
  sort: "date-desc",  // trùng đúng value của <option> trong #sort
  loading: true,      // đang chờ dữ liệu về
  error: null,        // chuỗi lỗi, hoặc null khi không có lỗi
};

/**
 * BẢNG TRA thay cho chuỗi if/else. Khóa trùng ĐÚNG value của <option> trong
 * #sort, nên chỉ cần sorters[state.sort] — không cần hàm ánh xạ nào ở giữa.
 * Đặt tên trùng nhau ở hai nơi là một quyết định thiết kế, không phải trùng hợp.
 *
 * localeCompare cho chuỗi ngày dạng YYYY-MM-DD cho kết quả đúng vì định dạng
 * này sắp xếp theo thứ tự từ điển trùng với thứ tự thời gian. Đây là lý do
 * hợp đồng dữ liệu bắt buộc YYYY-MM-DD chứ không phải DD/MM/YYYY.
 */
const sorters = {
  "date-desc": (a, b) => b.date.localeCompare(a.date),

  // TODO 1 — Viết bốn dòng còn lại. Khóa phải trùng value trong #sort của
  // app.html: "date-asc", "amount-desc", "amount-asc", "trader-asc".
  // Gợi ý: tiền là số nên trừ nhau; tên là chữ nên localeCompare("vi").
};

/** Các phần tử tra một lần lúc khởi động. VIẾT SẴN. */
const el = {};

function traPhanTu() {
  el.tbody = document.getElementById("record-body");
  el.table = document.getElementById("record-table");
  el.loading = document.getElementById("state-loading");
  el.empty = document.getElementById("state-empty");
  el.error = document.getElementById("state-error");
  el.errorMessage = document.getElementById("state-error-message");
  el.template = document.getElementById("row-template");
  el.search = document.getElementById("search");
  el.category = document.getElementById("filter-category");
  el.status = document.getElementById("filter-status");
  el.sort = document.getElementById("sort");
  el.clear = document.getElementById("clear-filters");
  el.statCount = document.getElementById("stat-count");
  el.statAmount = document.getElementById("stat-amount");
  el.addForm = document.getElementById("add-form");
  el.restore = document.getElementById("nut-khoi-phuc");
  el.retry = document.getElementById("nut-thu-lai");
}

/**
 * Phần dữ liệu đang được thấy trên màn hình, sau khi lọc và sắp xếp.
 *
 * Hàm này THUẦN: nhận state, trả về một mảng mới, KHÔNG đụng DOM. Nhờ vậy
 * kiểm thử được, và đọc là hiểu ngay bảng đang hiện cái gì.
 *
 * @returns {object[]}
 */
function visibleRecords() {
  const q = state.query.trim().toLowerCase();

  // TODO 2 — Nối chuỗi ba bộ lọc rồi sắp xếp, theo đúng mẫu trong lab:
  //
  //   return state.records
  //     .filter((r) => state.category === "all" || r.category === state.category)
  //     .filter(... trạng thái ...)
  //     .filter(... !q hoặc tên thương lái chứa q ...)
  //     .sort(sorters[state.sort]);
  //
  // Hai điều dễ sai:
  //   · Phải có nhánh "all" trong mỗi bộ lọc, nếu không bật một bộ lọc là
  //     mất sạch dữ liệu.
  //   · .sort() sửa TRỰC TIẾP mảng nó nhận. Ở đây an toàn vì .filter() đã
  //     trả về mảng mới; nhưng gọi state.records.sort(...) thì bạn vừa xáo
  //     trộn nguồn sự thật của mình.
  return state.records;
}

/**
 * Dựng MỘT dòng <tr> từ một bản ghi.
 *
 * KHÔNG nối chuỗi HTML. Nhân bản <template> rồi gán textContent cho từng ô.
 * Lý do rất cụ thể: tên thương lái do người dùng gõ vào. Nếu ai đó gõ
 * <img src=x onerror=alert(1)> và mình nối chuỗi đó vào innerHTML thì đoạn
 * mã ấy CHẠY THẬT — đó là lỗ hổng XSS. textContent coi mọi thứ là chữ,
 * không bao giờ là mã.
 *
 * @param {object} record
 * @returns {HTMLTableRowElement}
 */
function buildRow(record) {
  const row = el.template.content.firstElementChild.cloneNode(true);

  // TODO 3 — Gắn mã phiếu vào chính dòng đó: row.dataset.id = record.id;
  // Vì sao cần: nút xóa nằm trong dòng, nhưng hàm xóa cần biết xóa BẢN GHI
  // NÀO. Dòng này là sợi dây duy nhất nối phần tử DOM về lại dữ liệu.

  // TODO 4 — Gán bảy ô. Ba ô đầu làm mẫu, bốn ô còn lại của bạn:
  //
  //   row.querySelector("[data-cell='id']").textContent = record.id;
  //   row.querySelector("[data-cell='trader']").textContent = record.trader;
  //   row.querySelector("[data-cell='category']").textContent = record.category;
  //
  //   weight  → so(record.weight)          (1.178, không phải 1178)
  //   amount  → tien(record.amount)        (37.696.000 ₫)
  //   date    → ngay(record.date)          (26/07/2026)
  //   status  → NHAN_TRANG_THAI[record.status]   ("Đã chốt")
  //
  // Đừng tự viết hàm chèn dấu chấm vào số. Các hàm trong js/format.js đã
  // làm đúng cho tiếng Việt; đọc file đó nếu chưa rõ vì sao.

  // TODO 5 — Ô trạng thái còn cần MỘT thuộc tính nữa để CSS tô màu được:
  //   [data-cell='status'] phải có data-status = mã trạng thái (record.status).
  // Xem khối .tbl [data-status="…"] trong src/input.css. Đây đúng là bài học
  // của buổi 4 nhắc lại: trạng thái do thuộc tính mang, CSS chỉ đọc.

  // TODO 6 — Nút xóa của dòng này:
  //   · Gán aria-label nói rõ xóa phiếu của ai, ví dụ
  //     `Xóa phiếu ${record.id} của ${record.trader}`.
  //     Mười nút chỉ ghi "Xóa" thì với trình đọc màn hình là mười nút giống
  //     nhau, không biết bấm cái nào.
  //   · addEventListener("click", …) gọi xoaPhieu(record.id).
  //     Theo mô hình state → render, nút xóa KHÔNG được tự gỡ dòng khỏi DOM.

  return row;
}

/**
 * Vẽ lại toàn bộ phần thay đổi được của trang, từ state.
 * Đây là hàm DUY NHẤT được phép chạm vào DOM của bảng.
 */
function render() {
  const list = visibleRecords();

  // TODO 7 — Bốn khối trạng thái. Mỗi dòng chỉ dùng state.loading,
  // state.error và list.length — không cần biến nào khác. Nếu bạn thấy mình
  // cần thêm một biến nữa, nghĩa là state đang thiếu một trường.
  //
  //   el.loading.hidden = ...   // chỉ hiện khi đang tải
  //   el.error.hidden   = ...   // chỉ hiện khi có lỗi
  //   el.empty.hidden   = ...   // hiện khi tải xong, không lỗi, và rỗng
  //   el.table.hidden   = ...   // hiện khi tải xong, không lỗi, và CÓ dòng
  //
  // Bốn khối phải LOẠI TRỪ nhau: không bao giờ có hai khối cùng hiện.

  // TODO 8 — Đổ dòng vào bảng bằng MỘT lần chạm DOM:
  //   el.tbody.replaceChildren(...list.map(buildRow));
  // replaceChildren thay sạch nội dung cũ, nên không cần xóa tay trước, và
  // cũng không còn listener mồ côi của dòng cũ.

  // TODO 9 — Hai con số thống kê, tính từ `list` (phần ĐANG HIỆN), không
  // phải từ state.records:
  //   el.statCount.textContent  = số dòng
  //   el.statAmount.textContent = tổng tiền, đưa qua tien()
  // Gợi ý tổng tiền: list.reduce((tong, r) => tong + r.amount, 0)

  // TODO 10 — Thông báo lỗi cho người dùng: el.errorMessage.textContent =
  // state.error ?? "". Đặt ở đây, không đặt ở chỗ bắt lỗi — mọi thứ hiện
  // trên màn hình đều phải đi qua render().
}

/**
 * Sinh mã phiếu kiểu PC-2607-131 (PC-ngàytháng-số thứ tự). VIẾT SẴN.
 * Lấy số lớn nhất đang có rồi +1, KHÔNG dùng records.length + 1: xóa một
 * phiếu rồi thêm phiếu mới sẽ sinh ra mã trùng, và mã trùng thì nút xóa
 * xóa sai dòng.
 */
function taoMaPhieu(isoDate, records) {
  const [, thang, ngayTrongThang] = isoDate.split("-");
  const soLon = records.reduce(
    (max, r) => Math.max(max, Number(String(r.id).split("-").pop()) || 0),
    100
  );
  return `PC-${ngayTrongThang}${thang}-${soLon + 1}`;
}

/**
 * Thêm một phiếu từ dữ liệu người dùng vừa nhập.
 * @param {HTMLFormElement} form
 */
function themPhieu(form) {
  // TODO 11 — Bốn việc, theo đúng thứ tự:
  //   1. Nếu !kiemTraForm(form) thì dừng lại (hàm đó đã tự hiện lỗi trên
  //      từng ô và đưa tiêu điểm về ô sai đầu tiên — dùng lại, đừng viết
  //      kiểm tra lần hai ở đây).
  //   2. Đọc giá trị: const data = Object.fromEntries(new FormData(form));
  //      Nhớ Number(...) cho weight và amount — FormData luôn trả về CHUỖI,
  //      và "1000" + 500 trong JavaScript ra "1000500".
  //   3. Chèn LÊN ĐẦU state.records (unshift) rồi luuVaoMay(state.records).
  //      Mã phiếu: taoMaPhieu(data.date, state.records).
  //   4. form.reset(), render(), hienToast("Đã lưu phiếu …").
  //
  // Không tự vẽ thêm một dòng vào bảng. render() làm việc đó.
}

/**
 * Xóa một phiếu theo mã.
 * @param {string} id
 */
function xoaPhieu(id) {
  // TODO 12 — Sửa DỮ LIỆU, không sửa DOM:
  //   state.records = state.records.filter((r) => r.id !== id);
  //   luuVaoMay(state.records);
  //   render();
  //   hienToast(...)
  // Quên luuVaoMay là lỗi "xóa xong F5 thì dòng sống lại".
  // Quên render() là lỗi "xóa khỏi mảng nhưng dòng vẫn còn trên màn hình".
}

/** Nạp dữ liệu lần đầu. Đủ BA trạng thái: đang tải, có dữ liệu, lỗi. */
async function khoiDong() {
  // TODO 13 — Đúng khuôn này, đừng đổi thứ tự:
  //
  //   state.loading = true;
  //   state.error = null;
  //   render();                       // vẽ khung xương TRƯỚC khi chờ mạng
  //   try {
  //     state.records = await napDuLieu();
  //   } catch (err) {
  //     state.error = `Không tải được dữ liệu: ${err.message}`;
  //   } finally {
  //     state.loading = false;
  //     render();                      // finally: chạy cả khi lỗi
  //   }
  //
  // Vì sao render() ở finally chứ không ở cuối khối try: nếu đặt trong try,
  // lúc có lỗi trang sẽ đứng ở khung xương mãi mãi — người dùng ngồi chờ một
  // thứ không bao giờ tới.
}

/**
 * Điểm vào của trang app.html.
 * Ba trang kia không có #record-body nên hàm này thoát êm ở dòng đầu —
 * cùng một mẫu "module tự thoát êm" của buổi 4.
 */
export function initApp() {
  traPhanTu();
  if (!el.tbody || !el.template) return;

  // TODO 14 — Nối các điều khiển vào state. Mỗi listener làm ĐÚNG hai việc:
  // gán vào state, rồi gọi render(). Không lọc, không đếm, không sửa DOM.
  //
  //   #search          input   → state.query    (BỌC debounce, xem dưới)
  //   #filter-category change  → state.category
  //   #filter-status   change  → state.status
  //   #sort            change  → state.sort
  //   #clear-filters   click   → trả bốn trường trên về mặc định, và nhớ
  //                              xóa cả GIÁ TRỊ trong ô nhập/ô chọn nữa —
  //                              state sạch mà ô tìm kiếm còn chữ thì người
  //                              dùng thấy hai sự thật khác nhau.
  //
  // Riêng ô tìm kiếm phải qua debounce, nếu không mỗi phím là một lần lọc
  // và vẽ lại cả bảng:
  //
  //   const timKiem = debounce((giaTri) => { state.query = giaTri; render(); }, 300);
  //   el.search.addEventListener("input", (e) => timKiem(e.target.value));

  // TODO 15 — Ba việc còn lại:
  //   · el.addForm: gắn novalidate rồi bắt submit —
  //       el.addForm.setAttribute("novalidate", "");
  //       submit → e.preventDefault() rồi themPhieu(el.addForm)
  //     Gắn bằng JavaScript chứ không viết trong HTML: nếu JS lỗi, trình
  //     duyệt vẫn kiểm tra hộ bằng bong bóng mặc định. Lý do y như
  //     #contact-form, xem js/validate.js.
  //   · el.retry   click  → khoiDong()
  //   · el.restore click  → hỏi confirm(...) rồi await khoiPhucMau(),
  //     gán vào state.records, render(), hienToast(...)
  //     Có xác nhận vì đây là hành động XÓA DỮ LIỆU không lấy lại được.

  khoiDong();
}
