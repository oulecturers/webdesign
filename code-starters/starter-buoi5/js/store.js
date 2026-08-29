// js/store.js — BUỔI 5, tiết 1–2 · Tầng dữ liệu.
//
// Cả file này chỉ làm một việc: LẤY và LƯU mảng bản ghi. Nó không biết
// bảng trông thế nào, không đụng vào một phần tử DOM nào.
//
// Vì sao tách riêng: khi bạn đổi từ localStorage sang một API thật ở môn
// sau, chỉ file này phải sửa. js/app.js không cần biết dữ liệu đến từ đâu.
//
// Đường đi của dữ liệu, lần đầu và những lần sau:
//
//   Lần đầu mở trang:   fetch("./data/records.json")  →  localStorage  →  state
//   Những lần sau:      localStorage                                   →  state
//   Bấm "Khôi phục":    fetch(...) ghi đè localStorage                 →  state

// TODO 1 — Đặt khóa lưu trữ.
// Hợp đồng bảng 5.1: khóa PHẢI kết thúc bằng ":records". Tiền tố là tên
// dự án của bạn, để hai bài thực hành khác nhau mở trên cùng máy không
// ghi đè dữ liệu của nhau (localStorage dùng chung theo origin, và
// localhost:5500 của Live Server là CHUNG cho mọi dự án bạn mở).
export const KEY = "";

/** Đường dẫn tệp dữ liệu mẫu. Tương đối, để deploy lên GitHub Pages vẫn đúng. */
const TEP_MAU = "./data/records.json";

/**
 * Đọc mảng bản ghi đã lưu trên máy này.
 * @returns {object[]|null} null nghĩa là "chưa từng lưu", KHÁC với [] nghĩa
 *   là "đã lưu, và đang rỗng vì người dùng xóa hết". Hai tình huống này dẫn
 *   tới hai hành vi khác nhau ở napDuLieu(), nên không được gộp.
 */
function docTuMay() {
  // TODO 2 — Lấy chuỗi theo KEY. Chưa có thì trả về null.
  // JSON.parse ném lỗi khi chuỗi hỏng (người dùng sửa tay trong DevTools,
  // hoặc phiên bản trước lưu định dạng khác). Bọc try/catch và coi dữ liệu
  // hỏng như chưa có — thà nạp lại tệp mẫu còn hơn để cả trang chết.
  return null;
}

/**
 * Ghi mảng bản ghi xuống máy. Gọi sau MỌI lần state.records thay đổi.
 * @param {object[]} records
 */
export function luuVaoMay(records) {
  // TODO 3 — localStorage chỉ chứa được chuỗi, nên phải JSON.stringify.
  // localStorage.setItem có thể ném lỗi khi hết dung lượng (khoảng 5MB) hoặc
  // khi trình duyệt ở chế độ chặn lưu trữ. Bọc try/catch và báo ra console —
  // mất một lần lưu không được phép làm cả ứng dụng dừng.
}

/**
 * Tải tệp dữ liệu mẫu từ máy chủ.
 * @returns {Promise<object[]>}
 * @throws {Error} khi máy chủ trả về mã lỗi hoặc tệp không phải mảng
 */
async function taiTepMau() {
  const res = await fetch(TEP_MAU);

  // TODO 4 — Dòng quan trọng nhất của tiết 1:
  //
  //   if (!res.ok) throw new Error(`Máy chủ trả về ${res.status}`);
  //
  // fetch KHÔNG tự ném lỗi khi máy chủ trả về 404 hay 500 — nó chỉ ném khi
  // mất mạng. Thiếu dòng này, res.json() sẽ ném một lỗi cú pháp khó hiểu ở
  // chỗ khác, hoặc trang báo "tải xong" rồi hiện bảng rỗng, và người dùng
  // tưởng là KHÔNG CÓ DỮ LIỆU trong khi thực tế là HỎNG ĐƯỜNG DẪN.
  // Hai tình huống đó cần hai thông báo khác nhau.

  const duLieu = await res.json();

  // Tệp có thể tải được nhưng nội dung không phải mảng. Kiểm ở đây thì lỗi
  // hiện ra ngay tại nguồn, không phải ở chỗ .filter() ném lỗi ba hàm sau.
  if (!Array.isArray(duLieu)) throw new Error("Tệp dữ liệu không phải một mảng");
  return duLieu;
}

/**
 * Nạp dữ liệu để khởi động trang.
 * Đã có trên máy thì dùng luôn; chưa có thì tải tệp mẫu rồi lưu lại.
 * @returns {Promise<object[]>}
 */
export async function napDuLieu() {
  // TODO 5 — Ba dòng:
  //   1. Gọi docTuMay(). Nếu KHÔNG phải null thì trả về ngay — xong,
  //      không chạm mạng.
  //   2. Ngược lại: await taiTepMau().
  //   3. Lưu kết quả vào máy rồi trả về.
  // Đừng bọc try/catch ở đây. Lỗi phải nổi lên cho js/app.js bắt và hiện
  // khối #state-error; nuốt lỗi tại đây thì trang đứng ở khung xương mãi mãi.
  return [];
}

/**
 * Xóa dữ liệu trên máy và nạp lại 30 phiếu mẫu.
 * Nút "Khôi phục dữ liệu mẫu" gọi hàm này. Lúc chấm bài và lúc demo đều cần:
 * người chấm phải xóa được đống dữ liệu thử nghiệm của bạn.
 * @returns {Promise<object[]>}
 */
export async function khoiPhucMau() {
  // TODO 6 — Xóa khóa khỏi localStorage, tải lại tệp mẫu, lưu, rồi trả về.
  return [];
}
