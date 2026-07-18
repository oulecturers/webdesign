# Thiết kế Web (INTE03010) — Bộ code mẫu theo giáo trình

Kho code mẫu phục vụ giảng dạy môn **Thiết kế Web** (INTE03010 · 3 tín chỉ), sắp xếp **theo từng chương** của môn học*.
Mỗi bài là một file `.html` **độc lập, chạy được ngay** khi mở bằng trình duyệt, có chú thích tiếng Việt trong mã.

## Bắt đầu
Mở [index.html](index.html) — mục lục cả môn — rồi bấm vào từng chương. Khuyến nghị mở thư mục bằng
**VS Code + tiện ích Live Server** (bài fetch API ở Chương 3 cần chạy qua Live Server hoặc có mạng).

## Cấu trúc thư mục
```
WDCode/                        ← repo git (cả môn học)
├── index.html                 ← MỤC LỤC CẢ MÔN (bắt đầu từ đây)
├── assets/                    ← ảnh SVG placeholder + site.css/lesson.css (DÙNG CHUNG mọi chương)
├── chuong2/                   ← Chương 2 — HTML & CSS (2.1 → 2.6)
│   ├── index.html             ← mục lục Chương 2
│   └── 2.1-html/ … 2.6-emmet/
└── chuong3/                   ← Chương 3 — Lập trình JavaScript (3.1 → 3.12)
    ├── index.html             ← mục lục Chương 3
    ├── 01-…html … 14-bai-tap-tong-hop.html
    └── menu.json              ← dữ liệu cho bài fetch/async
```

## Ánh xạ chương ↔ giáo trình
| Chương | Nội dung | Trạng thái code |
|--------|----------|-----------------|
| 1 | Tổng quan Internet & công nghệ Web | *(chưa có)* |
| **2** | Xây dựng giao diện Web với HTML & CSS | ✓ `chuong2/` |
| **3** | Lập trình JavaScript căn bản | ✓ `chuong3/` |
| 4 | Thiết kế Web hiện đại với Bootstrap | *(đọc thêm/tự chọn — chưa có)* |
| 5 | Tuỳ biến giao diện với Tailwind CSS | *(chưa có)* |

> **Trình tự giảng dạy:** đề cương dạy **Tailwind (Ch.5) trước JavaScript (Ch.3)**; cách đánh số ở đây
> bám theo **giáo trình in** (JavaScript = Chương 3). Khung chi tiết: `../giao_an/giao_trinh/00_KHUNG_CHI_TIET.md`.

## Ghi chú kỹ thuật
- **Assets dùng chung**: thư mục `assets/` ở gốc. Bài trong chương con tham chiếu `../../assets/…`;
  trang mục lục của chương dùng `../assets/…`; trang chủ cả môn dùng `assets/…`.
- **Offline**: ảnh là SVG placeholder cục bộ. Riêng Font Awesome, YouTube embed và fetch API cần internet.
