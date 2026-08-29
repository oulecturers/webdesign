# Starter Buổi 5 — Vựa

Môn **Thực hành Thiết kế Web** · Trường Đại Học Mở TPHCM, Khoa CNTT

Đây là **kết quả cuối Buổi 4**, dùng làm điểm xuất phát cho Buổi 5.
Dự án: **Vựa** — phần mềm quản lý vựa nông sản.

> Bạn đã làm xong buổi 4 trên repo của mình thì **dùng repo của mình**, không cần starter này.
> Trong trường hợp đó, chép sang bốn thứ: `app.html`, `js/format.js`, `js/toast.js`,
> và khối "BUỔI 5" ở cuối `src/input.css`. Ba file `js/store.js`, `js/app.js`,
> `js/validate.js` cũng chép sang — chúng là khung TODO của buổi này.
> Starter đầy đủ chỉ dành cho người chưa xong buổi 4, hoặc cần một bản sạch để đối chiếu.

**URL bản chạy công khai:** *dán link GitHub Pages của bạn vào đúng dòng này (tiết 5).*

---

## 1. Chạy dự án

```bash
npm install
npm run dev
```

Mở `app.html` bằng **Live Server** của VS Code.

> **Từ buổi này, nháy đúp vào file là KHÔNG CHẠY.** `fetch()` bị chặn bởi giao thức
> `file://`, console sẽ báo lỗi CORS và bảng đứng ở khung xương mãi mãi. Bắt buộc
> phải có một máy chủ: Live Server, hoặc `npx serve .`

`dist/output.css` đã được build sẵn nên trang hiện đúng giao diện ngay. Nhưng vẫn phải
chạy `npm run dev` suốt buổi: buổi 5 có class mới, không chạy watch thì Tailwind không sinh ra chúng.

**Kiểm tra nhanh xem đã chạy đúng chưa:** mở `app.html`, phải thấy sáu thanh xám nhấp
nháy (khung xương chờ) và **đứng đó mãi** — vì `js/app.js` chưa nạp dữ liệu. Đó là dấu
hiệu starter còn nguyên vẹn và bạn đang ở đúng điểm xuất phát.

---

## 2. Trong này đã có sẵn gì

| Phần | Trạng thái |
|---|---|
| Cấu hình Tailwind v4, script `dev` / `build` | Xong |
| `src/input.css` — token, component buổi 1→4 **và toàn bộ CSS của buổi 5** | Xong. Buổi 5 **không phải viết CSS**, chỉ viết JavaScript |
| `index.html`, `pricing.html`, `contact.html` + bảy tính năng tương tác | Xong ở buổi 4 |
| `js/nav.js` · `theme.js` · `faq.js` · `pricing.js` · `slider.js` · `reveal.js` | Xong ở buổi 4, **không sửa gì thêm** |
| **`app.html` — toàn bộ markup trang thứ tư**: bảng, `<template>` một dòng, bốn khối trạng thái, thanh công cụ, form thêm phiếu | Có sẵn, **chưa hoạt động** — bảng rỗng, bấm nút không có gì xảy ra |
| `contact.html` — thêm `id="contact-form"`, hộp lỗi cho mọi ô, `#form-summary`, `#toast-box` | Có sẵn |
| `js/format.js` — `tien()` `so()` `ngay()` `NHAN_TRANG_THAI` `debounce()` | **Viết sẵn hoàn chỉnh** — đọc, không sửa |
| `js/toast.js` — `hienToast()` | **Viết sẵn hoàn chỉnh** — đọc, không sửa |
| `js/main.js` | **Viết sẵn hoàn chỉnh** — đã gọi thêm `initApp()` và `initContactForm()` |
| `js/store.js` | Khung + chú thích + **TODO 1–6** — việc của bạn |
| `js/app.js` | Khung + chú thích + **TODO 1–15** — việc của bạn |
| `js/validate.js` | Khung + chú thích + **TODO 1–7** — việc của bạn |
| `data/records.json` — 30 phiếu cân mẫu | Có sẵn |
| `kiem-tra/anh-xa.json` | Có sẵn — khai báo với máy chấm rằng dự án này dùng khóa `trader` thay cho `name` |

**Vì sao markup cho sẵn.** Giống buổi 4: buổi 5 chấm khả năng lập trình, không chấm khả
năng gõ HTML. Đổi lại, **tên phần tử là hợp đồng: không được đổi.** Máy chấm tìm đúng
những cái tên trong bảng ở mục 5.

**Vì sao `format.js` và `toast.js` cho sẵn.** Hai file này không có ý tưởng mới nào của
buổi 5 — chúng chỉ dọn đường. Nhưng **phải đọc**: `format.js` giải thích vì sao không tự
viết hàm chèn dấu chấm vào số, và vì sao `"2026-07-26"` truyền thẳng vào `new Date()` sẽ
hiện sai một ngày ở múi giờ GMT+7. Giảng viên hỏi vấn đáp cả hai chỗ đó.

---

## 3. Việc của bạn ở Buổi 5

Gõ `TODO` trong VS Code (Ctrl/Cmd + Shift + F) để thấy hết **28 điểm cần làm**, đã đánh
số trong từng file theo thứ tự làm.

| Tiết | Việc | File · TODO | Sản phẩm cuối tiết |
|---|---|---|---|
| 1 | Nạp dữ liệu, mô hình `state → render` | `store.js` 1–5 · `app.js` 3, 4, 7, 8, 9, 10, 13 | 30 dòng hiện ra từ JSON, có khung xương lúc chờ |
| 2 | Lọc, tìm, sắp xếp, thêm, xóa, lưu trữ | `app.js` 1, 2, 5, 6, 11, 12, 14, 15 · `store.js` 6 · `validate.js` 2, 3, 4 | `app.html` hoàn chỉnh |
| 3 | Kiểm tra dữ liệu form + toast | `validate.js` 1, 5, 6, 7 | `contact.html` hoàn chỉnh |
| 4 | Vòng rà soát chất lượng | — | Lighthouse A11y ≥ 95, console sạch |
| 5 | Phát hành, README, bảo vệ | `README.md` | tag `buoi-5`, demo 5 phút |

> **Thứ tự bắt chéo một chỗ.** `app.js` TODO 11 (thêm phiếu) gọi `kiemTraForm()` của
> `validate.js`. Nên làm `validate.js` TODO 2, 3, 4 ngay ở tiết 2 — mất mười phút và
> dùng được cho cả hai form. Phần còn lại của `validate.js` để tiết 3.

### Bốn quy tắc khi làm

1. **Mọi thứ hiển thị đều đi qua `render()`.** Ngoài `render()`, không hàm nào được chạm
   vào DOM của bảng. Nút xóa cũng vậy: xóa khỏi mảng, gọi `render()`, chứ không tự gỡ
   dòng. Đây là bài học trung tâm của buổi, và là câu vấn đáp số 1.
2. **Không nối chuỗi dữ liệu vào `innerHTML`.** Dùng `<template>` + `textContent`. Máy
   chấm bắt lỗi này bằng cách đọc mã nguồn, và mục E của `lab5.mjs` là **điều kiện cứng**
   — trượt mục E thì không nộp được dù tổng điểm đủ.
3. **Không dùng thư viện.** Kiểm tra dữ liệu form phải tự viết trên Constraint Validation
   API. Dùng thư viện cho tính năng bắt buộc thì phần đó không tính điểm.
4. **Chỉ sửa `js/` và `README.md`.** Đừng xóa thẻ hay đổi `id` / `data-*` trong HTML —
   làm vậy là mất điểm hồi quy ở `lab1.mjs`…`lab4.mjs` và máy chấm buổi 5 không tìm thấy
   phần tử.

### Năm cái bẫy đã biết trước

- **Lỗi CORS, bảng đứng ở khung xương.** Bạn đang mở bằng `file://`. Dùng Live Server.
- **`fetch` không báo lỗi dù file không tồn tại.** `fetch` chỉ ném lỗi khi mất mạng; với
  404 nó vẫn "thành công". Thiếu `if (!res.ok) throw` thì trang báo tải xong rồi hiện
  bảng rỗng, và bạn sẽ đi tìm lỗi ở chỗ khác suốt hai mươi phút.
- **Sửa xong mà trang vẫn hiện dữ liệu cũ.** Lần chạy trước đã ghi vào `localStorage`,
  và `napDuLieu()` đọc chỗ đó trước khi chạm tệp JSON. Bấm **"Khôi phục dữ liệu mẫu"**,
  hoặc xóa khóa `vua:records` trong DevTools → Application → Local Storage.
- **Đừng thêm `setTimeout` giả để khoe khung xương.** Máy chấm chỉ chờ 150ms sau khi nạp
  trang; độ trễ tự thêm sẽ làm cả mục B trượt. Muốn xem khung xương thì DevTools →
  Network → chọn *Slow 3G*.
- **Ô textarea "quá ngắn" mà không báo lỗi.** Cờ `tooShort` chỉ bật khi người dùng **tự
  gõ**; dán vào hoặc gán bằng mã thì cờ không bật. Đây là hành vi đúng theo chuẩn, không
  phải lỗi của bạn. Sinh viên khá có thể xử lý thêm bằng `setCustomValidity()`.

---

## 4. Tự kiểm

Giải nén `kiem-tra.zip` (phát cùng buổi) vào thư mục gốc dự án, rồi:

```bash
node kiem-tra/lab1.mjs        # hồi quy buổi 1 — phải luôn ĐẠT
node kiem-tra/lab2.mjs        # hồi quy buổi 2 — phải luôn ĐẠT
node kiem-tra/lab3.mjs        # hồi quy buổi 3 — phải luôn ĐẠT
node kiem-tra/lab4.mjs        # hồi quy buổi 4 — phải luôn ĐẠT
node kiem-tra/lab5.mjs        # ngưỡng 30/44 — đây là việc của buổi 5
```

Chạy `lab5.mjs` **ngay lúc này**, trước khi viết dòng nào. Bạn sẽ thấy đúng **17/43**:
mọi mục "có phần tử X" đều PASS vì markup đã cho sẵn, còn 26 mục "làm X thì phải xảy ra
Y" đều FAIL. Danh sách 26 dòng đó chính là bản đồ công việc của cả buổi, và nó phải ngắn
dần sau mỗi tiết. (Tổng là 43 lúc này và 44 khi xong: mục "xóa được bản ghi" chỉ chạy
được sau khi nút xóa đã hiện ra.)

`lab5.mjs` chạy JavaScript thật của bạn trong một trình duyệt giả lập, nên nó bắt được cả
những thứ mắt thường không thấy: thiếu debounce, thiếu `aria-invalid`, quên `if (!res.ok)`,
quên lưu `localStorage`, hoặc nối chuỗi vào `innerHTML`.

Ba việc script **không** kiểm được, phải tự làm bằng tay:

- Thêm một phiếu rồi **F5** — phiếu phải còn.
- Bật một bộ lọc rồi bật thêm bộ lọc thứ hai — **cả hai** phải cùng có hiệu lực.
- Gửi form rỗng rồi nhấn **Tab** một lần — tiêu điểm phải đang ở ô sai đầu tiên.

---

## 5. Hợp đồng giao diện — không được đổi tên

### `app.html`

| Nhóm | Phần tử | Ghi chú |
|---|---|---|
| Bảng | `#record-table`, `#record-body` | mỗi dòng là `<tr data-id="…">` |
| Ô dữ liệu | `[data-cell='trader']`, `[data-cell='category']`, `[data-cell='status']`, `[data-cell='amount']`, `[data-cell='date']`, `[data-cell='id']`, `[data-cell='weight']` | tên trùng khóa trong JSON |
| Trạng thái | `#state-loading`, `#state-empty`, `#state-error` | bật/tắt bằng **thuộc tính** `hidden`, không phải class |
| Điều khiển | `#search`, `#filter-category`, `#filter-status`, `#sort`, `#clear-filters` | `value` của `<option>` trong `#sort` trùng khóa bảng tra `sorters` |
| Thêm bản ghi | `#add-form` | phiếu mới chèn lên **đầu** danh sách |
| Xóa | mỗi dòng có `[data-action='delete']` | `aria-label` phải nói rõ xóa phiếu nào |
| Thống kê | `#stat-count`, `#stat-amount` | đổi theo bộ lọc đang bật, không phải tổng cả sổ |
| Lưu trữ | khóa `localStorage` kết thúc bằng `:records` | dự án này dùng `vua:records` |
| Phụ trợ | `#nut-thu-lai`, `#nut-khoi-phuc`, `#row-template`, `#toast-box` | |

### `contact.html`

| Phần tử | Ghi chú |
|---|---|
| `#contact-form` | có `novalidate` — **do JavaScript gắn**, không viết trong HTML |
| mỗi ô nhập có `id` | kèm hộp lỗi `#<id>-error` đã dựng sẵn |
| `#form-summary` | dòng tóm tắt khi submit hỏng |
| `#toast-box` | nơi hiện thông báo sau khi gửi thành công |

### Hợp đồng dữ liệu — `data/records.json`

Sáu khóa **bắt buộc**: `id`, `name`, `category`, `status`, `amount`, `date`. Thêm khóa
riêng của lĩnh vực (ở đây là `weight`) thì được, bỏ bớt thì không. `amount` là **số**,
`date` là **`YYYY-MM-DD`** — dạng này so sánh được bằng `>=` trên chuỗi, đó là lý do
`sorters` chỉ cần `localeCompare` chứ không cần `new Date()`.

Dự án Vựa gọi khóa đó là **`trader`** thay cho `name`, nên có `kiem-tra/anh-xa.json`:

```json
{ "name": "trader" }
```

Nhãn hiện trên màn hình là **tự do** — cột `trader` hiện là "Thương lái". Khóa trong JSON
là hợp đồng với máy; nhãn trên màn hình là hợp đồng với người dùng. Hai thứ khác nhau.

---

## 6. Nếu bạn làm sản phẩm khác

Starter dùng đề "Vựa" làm ví dụ chung. Nhóm làm chủ đề khác:

- **Giữ nguyên** mọi `id` và `data-*` ở bảng trên — chúng là tên **vai trò**, không phải
  tên sản phẩm.
- **Đổi** nhãn cột, danh sách `<option>` của hai bộ lọc, ba mã trạng thái, và nội dung
  `data/records.json`.
- Ba mã trạng thái đổi ở **ba chỗ**: `NHAN_TRANG_THAI` trong `js/format.js`, các
  `<option>` trong `app.html`, và khối `.tbl [data-status="…"]` trong `src/input.css`.
- Khóa tên chính không phải `trader` thì sửa `kiem-tra/anh-xa.json` cho khớp.

---

## 7. Nộp bài

```bash
npm run build
git add -A && git commit -m "feat(app): trang du lieu doc tu JSON"
git tag buoi-5 && git push --tags
```

README nộp bài phải có: ảnh chụp màn hình · link demo công khai · link file Figma · danh
sách tính năng · hướng dẫn chạy · điểm Lighthouse trước và sau khi sửa · và mục
**"3 điều tôi sẽ …"** (câu đầy đủ ghi trong đề lab, nhiệm vụ 5 — chép đúng câu đó làm
tiêu đề).

Con số Lighthouse trước khi sửa không phải điều đáng xấu hổ; nó là bằng chứng bạn đã thật
sự chạy vòng rà soát.

---

## 8. Cấu trúc thư mục

```
index.html          Trang chủ — xong ở buổi 4
pricing.html        Bảng giá — xong ở buổi 4
contact.html        Liên hệ — markup form đã đủ, JavaScript kiểm tra là việc của tiết 3
app.html            SỔ PHIẾU CÂN — markup đủ, chưa có dữ liệu. Trang chính của buổi 5
src/input.css       Token + component, đã có sẵn CSS của buổi 5 — không phải sửa
dist/output.css     File Tailwind build ra — KHÔNG sửa tay, PHẢI commit
js/main.js          VIẾT SẴN — điểm khởi động, chỉ gọi mười hàm init
js/format.js        VIẾT SẴN — tien, so, ngay, NHAN_TRANG_THAI, debounce. ĐỌC KỸ
js/toast.js         VIẾT SẴN — hienToast
js/store.js         TODO 1–6    · fetch, localStorage, khôi phục mẫu      (tiết 1–2)
js/app.js           TODO 1–15   · state → render, lọc, thêm, xóa, thống kê (tiết 1–2)
js/validate.js      TODO 1–7    · Constraint Validation API, lỗi tiếng Việt (tiết 2–3)
js/nav.js           Xong ở buổi 4
js/theme.js         Xong ở buổi 4
js/faq.js           Xong ở buổi 4
js/pricing.js       Xong ở buổi 4
js/slider.js        Xong ở buổi 4
js/reveal.js        Xong ở buổi 4
data/records.json   30 phiếu cân mẫu — hợp đồng dữ liệu, xem mục 5
kiem-tra/anh-xa.json  Khai báo dự án dùng khóa "trader" thay cho "name"
assets/img/         Ảnh của bạn
assets/icons/       Icon SVG export từ Figma
```

Cuối buổi: `git commit` ít nhất 4 lần, rồi `git tag buoi-5`.
