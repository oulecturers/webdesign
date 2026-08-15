# Starter Buổi 3 — Vựa

Môn **Thực hành Thiết kế Web** · Trường Đại Học Mở TPHCM, Khoa CNTT

Đây là **kết quả cuối Buổi 2**, dùng làm điểm xuất phát cho Buổi 3.
Dự án: **Vựa** — phần mềm quản lý vựa nông sản.

> Bạn đã làm xong buổi 2 trên repo của mình thì **dùng repo của mình**, không cần starter này.
> Starter chỉ dành cho người chưa xong buổi 2, hoặc cần một bản sạch để đối chiếu.

**URL bản chạy công khai:** *chưa có — dán vào đúng dòng này sau khi bật Pages ở tiết 5.*

---

## 1. Chạy dự án

```bash
npm install
npm run dev
```

Mở `index.html` bằng **Live Server** của VS Code. Đừng nháy đúp vào file.

Kiểm tra nhanh xem đã chạy đúng chưa: mở `src/input.css`, đổi `--color-brand-600` sang màu bất kỳ, lưu lại. Navbar và các nút phải đổi màu ngay.

**Xem thử dark mode khi chưa có nút bấm:** DevTools → chọn thẻ `<html>` → thêm `class="dark"`. Nút bật/tắt là markup của tiết 3, JavaScript thì tới buổi 4 mới gắn.

---

## 2. Trong này đã có sẵn gì

| Phần                                                                  | Trạng thái                                                                            |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Cấu hình Tailwind v4, script`dev` / `build`                      | Xong                                                                                    |
| `src/input.css` — 20 design token, lớp base, **8 component** | Xong từ buổi 1, buổi 2 không đụng tới                                            |
| `index.html` — 9 section + footer, bố cục đầy đủ              | Xong ở buổi 2,**chỉ đúng ở 1440px — chưa có một class responsive nào** |
| Cặp token`*-invert`, `--color-surface-dark`                       | Đã khai báo sẵn,**chưa dùng**                                               |
| `@custom-variant dark`                                               | Đã khai báo từ buổi 1,**chưa dùng**                                        |
| Markup menu mobile, nút hamburger                                     | Có sẵn, chưa mở được (buổi 4 gắn JS)                                           |
| `data/records.json` — 30 phiếu cân mẫu                           | Có sẵn, buổi 5 mới dùng                                                            |
| `js/`                                                                | Trống, buổi 4 mới dùng                                                              |
| `pricing.html`, `contact.html`                                     | **Chưa có — bạn dựng ở tiết 4 và 5**                                      |

---

## 3. Việc của bạn ở Buổi 3

Gõ `TODO buổi 3` trong VS Code để tìm hết các điểm cần làm.

| Tiết | Việc                                                                                            | Sản phẩm cuối tiết                                    |
| ----- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| 1     | Chạy trang ở 360px,**viết ra giấy** 4 chỗ vỡ nặng nhất trước khi sửa dòng nào | Danh sách 4 mục                                         |
| 2     | Thêm responsive cho toàn trang, từ navbar xuống footer                                       | `index.html` chạy tốt từ 360px tới 1440px           |
| 3     | Dark mode: sửa`input.css` trước, HTML sau                                                   | Thêm`class="dark"` vào `<html>` là cả trang đổi |
| 4     | Trích component, dựng`pricing.html` và `contact.html`                                     | Ba trang dùng chung component                            |
| 5     | Form tiếp cận trong`contact.html`, rồi deploy                                               | URL công khai chạy được                              |

**Quy trình test cố định, dùng suốt buổi:** DevTools → chế độ thiết bị → **360 / 768 / 1024 / 1440**. Bốn con số này, mỗi lần đều vậy.

### Ba quy tắc khi làm

1. **Chỉ sửa class, không xóa thẻ.** Khung semantic và bố cục đã đạt `lab1.mjs` + `lab2.mjs`. Thêm tiền tố `sm:`/`lg:` thì được, xóa mất `items-stretch` hay `mt-auto` là mất điểm hồi quy.
2. **`dark:` phải dùng token của dự án.** `dark:bg-gray-800` bị chấm sai — bảng màu mặc định của Tailwind không liên quan gì tới thương hiệu của bạn, và khi rebrand thì phải đi tìm từng chỗ để sửa.
3. **Sửa CSS trước, HTML sau.** Đảo token trong `.dark` một lần ăn cả trang; rải `dark:` vào từng thẻ HTML là làm việc gấp mười.

### Trang này chưa có responsive — đó là chủ ý

Bố cục hiện tại dựng cứng cho 1440px: hero hai cột cứng, ba lưới `grid-cols-3` cứng, footer bốn cột cứng, menu ngang không ẩn được. Thu cửa sổ xuống 360px là vỡ toàn bộ, và đó chính là việc của tiết 1–2.

Cả buổi xoay quanh một câu: trong Tailwind, `lg:` nghĩa là **từ lg trở lên**, không phải "ở lg". Hạ mặc định về cỡ điện thoại, rồi nâng dần bằng `sm:` và `lg:`.

Cách tìm thủ phạm khi có tràn ngang — dán vào Console ở 360px:

```js
[...document.querySelectorAll("*")].filter(el => el.scrollWidth > document.documentElement.clientWidth)
```

Ở 360px, **không được có thanh cuộn ngang ở cấp trang**.

---

## 4. Tự kiểm

```bash
cp -r ../../../ThucHanh/labs/kiem-tra .
npm install --save-dev jsdom

node kiem-tra/lab1.mjs        # 23/23 — hồi quy buổi 1, phải luôn ĐẠT
node kiem-tra/lab2.mjs        # 18/18 — hồi quy buổi 2, phải luôn ĐẠT
node kiem-tra/lab3.mjs        # ngưỡng 22/24 — đây là việc của buổi 3
```

Chạy `lab3.mjs` **ngay lúc này** để biết mình đang đứng ở đâu: mục A báo thiếu hai trang, mục C báo chưa có dark mode, mục E và F báo chưa có form và bảng so sánh. Đó là bản đồ công việc của cả buổi.

---

## 5. Nếu bạn làm sản phẩm khác

Starter dùng đề "Vựa" làm ví dụ chung. Nhóm làm chủ đề khác cần đổi ba thứ:

1. `src/input.css` — thay bộ token màu và phông theo bảng bạn đọc từ Figma.
2. `index.html` — thay `<title>`, `<meta name="description">`, tên thương hiệu, toàn bộ nội dung chữ.
3. Khối đặc trưng `.ticket` — sản phẩm của bạn nên có **một** chi tiết hình ảnh riêng, và chỉ một.

---

## 6. Cấu trúc thư mục

```
index.html          Trang chủ — bố cục desktop xong, CHƯA có responsive
HUONG-DAN-RESPONSIVE.md   9 bước cho tiết 1–2
pricing.html        BẠN TẠO ở tiết 4
contact.html        BẠN TẠO ở tiết 4 → 5
src/input.css       Design token + component  ← buổi 3 sửa file này TRƯỚC
dist/output.css     File Tailwind build ra — KHÔNG sửa tay, PHẢI commit
js/                 Trống, buổi 4 dùng
data/records.json   30 phiếu cân mẫu, buổi 5 dùng
assets/img/         Ảnh của bạn
assets/icons/       Icon SVG export từ Figma
```

---

## 7. Deploy — đọc trước khi tới tiết 5

```bash
npm run build
git add -A && git commit -m "feat: them trang gia va lien he, dark mode"
git push
# GitHub → Settings → Pages → Deploy from branch → main → Save
```

`dist/output.css` **phải được commit**, nếu không trang deploy sẽ trắng trơn. Xem `.gitignore`: nó chặn `node_modules/`, **không** chặn `dist/`. Đừng thêm `dist/` vào đó.

Deploy được xếp vào buổi 3 chứ không phải buổi 5 là có chủ đích: lỗi "quên commit file build nên trang trắng" gặp ở đây chỉ mất 5 phút, gặp lúc nộp bài thì mất điểm.

Mở link vừa deploy bằng **điện thoại của chính bạn**, không phải bằng máy đang code.

---

## 8. Checklist Buổi 3

- ☐ Ba trang chạy tốt ở đủ 4 mốc 360 / 768 / 1024 / 1440
- ☐ Ở 1440px giao diện **giống hệt** lúc chưa sửa gì
- ☐ Không có thanh cuộn ngang ở cấp trang tại 360px
- ☐ Không dùng `max-*` để đè ngược (tối đa 2 chỗ)
- ☐ Dark mode phủ hết trang, mọi `dark:` đều dùng token của dự án
- ☐ `@layer components` có 6–14 component, ≥ 4 cái dùng ở ít nhất 2 trang
- ☐ Form ≥ 6 trường, ≥ 4 kiểu, mọi trường có `<label for>` khớp `id`
- ☐ Bảng so sánh nằm trong `overflow-x-auto`, có câu "Vuốt ngang để xem hết bảng"
- ☐ Đi hết form bằng phím Tab, luôn nhìn thấy mình đang ở đâu
- ☐ URL công khai đã dán vào đầu README này
- ☐ Ít nhất 4 commit, có tag `buoi-3`

```bash
git add -A
git commit -m "feat(dark): dao token cho nen toi"
git tag buoi-3
```
