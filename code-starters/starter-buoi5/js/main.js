// js/main.js — điểm khởi động DUY NHẤT cho cả BỐN trang.
//
// Quy tắc từ buổi 4 giữ nguyên: main.js chỉ GỌI, không xử lý. Mọi logic nằm
// trong module riêng. Nhờ vậy đọc file này là biết dự án có những tính năng
// gì, không phải lần mò trong 600 dòng.
//
// Mười hàm init cho bốn trang, và không hàm nào cần biết đang ở trang nào:
// mỗi module tự tra phần tử của mình, không thấy thì thoát êm ở dòng đầu.
// Đó là lý do một file duy nhất chạy đúng ở cả bốn trang mà console vẫn sạch.
import { initNav, initHeaderOnScroll, initToTop } from "./nav.js";
import { initTheme } from "./theme.js";
import { initFaq } from "./faq.js";
import { initPricing } from "./pricing.js";
import { initSlider } from "./slider.js";
import { initReveal } from "./reveal.js";
import { initApp } from "./app.js";
import { initContactForm } from "./validate.js";

// Buổi 4 — bảy tính năng tương tác, có ở mọi trang
initNav();
initHeaderOnScroll();
initToTop();
initTheme();
initFaq();
initPricing();
initSlider();
initReveal();

// Buổi 5 — trang dữ liệu (app.html) và kiểm tra form (contact.html, app.html)
initApp();
initContactForm();
