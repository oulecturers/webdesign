# Starter Buổi 4 — Vựa

Môn **Thực hành Thiết kế Web** · Trường Đại Học Mở TPHCM, Khoa CNTT

Đây là **kết quả cuối Buổi 3**, dùng làm điểm xuất phát cho Buổi 4.
Dự án: **Vựa** — phần mềm quản lý vựa nông sản.

> Bạn đã làm xong buổi 3 trên repo của mình thì **dùng repo của mình**, không cần starter này.
> Starter chỉ dành cho người chưa xong buổi 3, hoặc cần một bản sạch để đối chiếu.

**URL bản chạy công khai:** *dán link GitHub Pages của bạn vào đúng dòng này.*

---

## 1. Chạy dự án

```bash
npm install
npm run dev
```

Mở `index.html` bằng **Live Server** của VS Code. Đừng nháy đúp vào file.

`dist/output.css` đã được build sẵn, nên trang hiện đúng giao diện ngay cả khi phòng máy chưa cài được gì. Nhưng vẫn phải chạy `npm run dev` trong suốt buổi: buổi 4 có thêm class mới, không chạy watch thì Tailwind không sinh ra chúng.

**Kiểm tra nhanh xem đã chạy đúng chưa:** mở trang, nhấn **Tab** một lần — phải thấy khung tiêu điểm ở link "Bỏ qua đến nội dung chính". Đó là dấu hiệu bản buổi 3 còn nguyên vẹn.

---

## 2. Trong này đã có sẵn gì

| Phần | Trạng thái |
|---|---|
| Cấu hình Tailwind v4, script `dev` / `build` | Xong |
| `src/input.css` — token, component buổi 1→3 **và toàn bộ CSS của buổi 4** | Xong. Buổi 4 **không phải viết CSS**, chỉ viết JavaScript |
| `index.html`, `pricing.html`, `contact.html` — responsive, dark mode | Xong ở buổi 3 |
| **Markup của cả bảy tính năng**: nút hamburger, `#nav-sentinel`, nút `#nut-nen-toi`, năm cặp FAQ, công tắc `#cong-tac-gia`, `data-monthly`/`data-yearly`, slider, `[data-reveal]`, nút `#nut-len-dau` | Có sẵn, **chưa hoạt động** — bấm không có gì xảy ra |
| `js/main.js` | **Viết sẵn hoàn chỉnh** — ví dụ mẫu của tiết 1, không cần sửa |
| `js/nav.js` · `theme.js` · `faq.js` · `pricing.js` · `slider.js` · `reveal.js` | Khung + chú thích + **TODO** — đây là việc của bạn |
| Đoạn script inline trong `<head>` của cả ba trang | **Chưa có** — TODO của tiết 3 |
| `data/records.json` — 30 phiếu cân mẫu | Có sẵn, buổi 5 mới dùng |
| `app.html` | **Chưa có** — buổi 5 mới dựng |

**Vì sao markup cho sẵn.** Buổi 4 chấm khả năng lập trình, không chấm khả năng gõ HTML. Bạn đã chứng minh làm được markup ở ba buổi trước rồi. Đổi lại, **tên phần tử là hợp đồng: không được đổi.** Máy chấm tìm đúng những cái tên trong bảng ở mục 5.

---

## 3. Việc của bạn ở Buổi 4

Gõ `TODO` trong VS Code (Ctrl/Cmd + Shift + F) để thấy hết **31 điểm cần làm**, đã đánh số trong từng file theo thứ tự làm.

| Tiết | Việc | Sản phẩm cuối tiết |
|---|---|---|
| 1 | Đọc `main.js`, hiểu mẫu "mỗi module tự thoát êm". Làm nút lên đầu trang | `nut-len-dau` hiện sau khi cuộn 400px |
| 2 | Menu mobile (`initNav`) và navbar khi cuộn (`initHeaderOnScroll`) | Tính năng 1, 2 |
| 3 | Accordion FAQ, công tắc sáng/tối + **script inline trong `<head>`** | Tính năng 3, 4 |
| 4 | Công tắc giá Tháng/Năm, hiệu ứng lộ dần | Tính năng 5, 7 |
| 5 | Slider cảm nhận tự viết | Tính năng 6, rồi demo 2 phút |

### Bốn quy tắc khi làm

1. **Không dùng thư viện.** Bảy tính năng phải tự viết. Dùng thư viện cho tính năng bắt buộc thì phần đó không tính điểm.
2. **Đổi giao diện là đổi luôn trạng thái ARIA.** Bật `hidden` mà quên `aria-expanded` thì với trình đọc màn hình, menu vẫn đang đóng mãi mãi. Đây là bài học trung tâm của buổi.
3. **Chỉ sửa `js/` và chèn script inline vào `<head>`.** Đừng xóa thẻ hay đổi `id` trong HTML — làm vậy là mất điểm hồi quy ở `lab1.mjs`…`lab3.mjs` và máy chấm buổi 4 không tìm thấy phần tử.
4. **Rút chuột ra thử.** Mọi thứ bấm được bằng chuột đều phải tới được bằng phím Tab, và phải nhìn thấy mình đang ở đâu.

### Ba cái bẫy đã biết trước

- **`null is not an object`** — lỗi bạn sẽ gặp nhiều nhất. Ba trang dùng chung một `main.js`, mà trang liên hệ thì làm gì có bảng giá. Cách chữa nằm ở dòng `if (!el) return;` đầu mỗi hàm, không phải `try/catch`.
- **Nháy trắng khi tải trang ở chế độ tối** — chỉ thấy được khi tải lại trang liên tục ở chế độ tối. Lý do và cách chữa: xem TODO trong `<head>` của `index.html`.
- **Slider chạy nhanh dần rồi giật** — `setInterval` không được `clearInterval` trước khi đặt cái mới. Rê chuột vào ra mười lần là hiện tượng lộ ra.

---

## 4. Tự kiểm

```bash
cp -r ../../../ThucHanh/labs/kiem-tra .
npm install --save-dev jsdom

node kiem-tra/lab1.mjs        # hồi quy buổi 1 — phải luôn ĐẠT
node kiem-tra/lab2.mjs        # hồi quy buổi 2 — phải luôn ĐẠT
node kiem-tra/lab3.mjs        # hồi quy buổi 3 — phải luôn ĐẠT
node kiem-tra/lab4.mjs        # ngưỡng 26/35 — đây là việc của buổi 4
```

Chạy `lab4.mjs` **ngay lúc này**, trước khi viết dòng nào. Bạn sẽ thấy đúng **21/35**: mọi mục "có phần tử X" đều PASS vì markup đã cho sẵn, còn 14 mục "bấm thì phải xảy ra Y" đều FAIL. Danh sách 14 dòng FAIL đó chính là bản đồ công việc của cả buổi, và nó phải ngắn dần sau mỗi tiết.

`lab4.mjs` chạy JavaScript thật của bạn trong một trình duyệt giả lập, nên nó bắt được cả những lỗi mắt thường không thấy: thiếu `inert` trên slide ẩn, quên `aria-expanded`, tự viết hàm định dạng tiền thay vì dùng `Intl.NumberFormat`.

---

## 5. Hợp đồng giao diện — không được đổi tên

| Tính năng | Phần tử | Ghi chú |
|---|---|---|
| 1. Menu mobile | nút có `aria-controls="nav-mobile"`, khối `#nav-mobile` | menu đang có class `hidden` |
| 2. Navbar khi cuộn | `#nav-sentinel` | thẻ rỗng cao 1px, đầu `<body>` |
| 3. Accordion | `#cau-hoi`, nút `[data-faq-trigger]` với `aria-controls` trỏ tới panel | 5 cặp `faq-t*` / `faq-p*` |
| 4. Sáng/tối | `#nut-nen-toi`, khóa `localStorage` là `"theme"` | class `dark` đặt trên `<html>` |
| 5. Giá tháng/năm | `#cong-tac-gia` (`role="switch"`), `[data-price]` có `data-monthly`/`data-yearly`, `[data-price-unit]` | |
| 6. Slider | `#slider-camnhan` chứa `[data-slider-track]`, `[data-slide]`, `[data-slider-dots]`, `[data-slider-prev]`, `[data-slider-next]` | slide ẩn phải có `inert` |
| 7. Lộ dần | `[data-reveal]` → thêm class `is-visible` | CSS dùng tiền tố `.js` |
| Khởi động | `#nut-len-dau` → thêm class `is-visible` | |

---

## 6. Nếu bạn làm sản phẩm khác

Starter dùng đề "Vựa" làm ví dụ chung. Nhóm làm chủ đề khác giữ nguyên toàn bộ `id` và `data-*` ở bảng trên — chúng là tên **vai trò**, không phải tên sản phẩm — và chỉ đổi phần nội dung: chữ trong FAQ, tên gói giá, số tiền trong `data-monthly`/`data-yearly`, các đoạn cảm nhận trong slider.

---

## 7. Cấu trúc thư mục

```
index.html          Trang chủ — markup 7 tính năng đã có, script inline CHƯA có
pricing.html        Bảng giá — cũng cần đoạn script inline
contact.html        Liên hệ — cũng cần đoạn script inline
src/input.css       Token + component, đã có sẵn CSS của buổi 4 — không phải sửa
dist/output.css     File Tailwind build ra — KHÔNG sửa tay, PHẢI commit
js/main.js          VIẾT SẴN — điểm khởi động, chỉ gọi các hàm init
js/nav.js           TODO 1–6   · tính năng 1, 2 và nút lên đầu trang   (tiết 1–2)
js/faq.js           TODO 1–4   · tính năng 3                            (tiết 3)
js/theme.js         TODO 1–4   · tính năng 4                            (tiết 3)
js/pricing.js       TODO 1–4   · tính năng 5                            (tiết 4)
js/reveal.js        TODO 1–3   · tính năng 7                            (tiết 4)
js/slider.js        TODO 1–10  · tính năng 6                            (tiết 5)
data/records.json   30 phiếu cân mẫu, buổi 5 dùng
assets/img/         Ảnh của bạn
assets/icons/       Icon SVG export từ Figma
```

Cuối buổi: `git commit` ít nhất 4 lần, rồi `git tag buoi-4`.
