# ChainOfPrompt_PersonalizationTC
Google Apps Script Integration Project

## Hướng dẫn kết nối Apps Script

1. **Tạo mới project Apps Script**:
   - Truy cập [Google Apps Script](https://script.google.com)
   - Click "New Project"
   - Đặt tên cho project

2. **Lấy Project ID**:
   - Vào Project Settings
   - Copy Project ID (Script ID)

3. **Cấu hình trong local project**:
   - Cài đặt clasp (Command Line Apps Script Projects):
     ```bash
     npm install -g @google/clasp
     ```
   - Đăng nhập Google:
     ```bash
     clasp login
     ```
     You are logged in as doanngoccuongdoanngoccuong@gmail.com.
   - Tạo file `.clasp.json` trong thư mục gốc với nội dung:
     ```json
     {
       "scriptId": "your_script_id_here",
       "rootDir": "./apps-script"
     }
     ```
        Bạn có thể tạo file `.clasp.json` bằng cả 2 cách:

        1. **Tạo bằng tay (Manual)**:
        - Tạo file mới tên `.clasp.json` trong thư mục gốc của project
        - Copy và paste nội dung sau:
        ```json
        {
        "scriptId": "your_script_id_here",
        "rootDir": "./apps-script"
        }
        ```
        - Thay `your_script_id_here` bằng Script ID bạn đã copy từ Google Apps Script

        2. **Tạo tự động (Recommended)**:
        ```bash
        # Đầu tiên tạo một thư mục apps-script
        mkdir apps-script

        # Sau đó chạy lệnh
        clasp clone "your_script_id_here" --rootDir apps-script
        ```

        Lệnh `clasp clone` sẽ:
        - Tự động tạo file `.clasp.json`
        - Cấu hình đúng Script ID
        - Tạo thư mục `apps-script`
        - Tải về code hiện tại từ Google Apps Script (nếu có)

        Khuyến nghị dùng cách tự động vì:
        - Ít khả năng gặp lỗi cú pháp
        - Tự động đồng bộ code hiện có
        - Cấu hình chính xác các thông số


4. **Push code lên Apps Script**:
   ```bash
   clasp push
   ```

5. **Kiểm tra kết nối**:
   - Truy cập lại Apps Script dashboard
   - Verify code đã được đồng bộ

## Reference Implementation
- Based on mentor's video grading implementation: [Grading Video Mentor Repository](https://github.com/Hngdcmnh/grading-video-mentor/tree/fullVersion_ckp/CheckPoints_All/deploy1.1_AppsScript_PreprocessingTools)

## Apps Script Connection
Project can be accessed at: [Apps Script Project](https://script.google.com/u/0/home/projects/1Kbf6Dxy1DLW2Cv0-lP-ha0XnOIBsk3mdvr2GHzqdESoochu8f4UnXxCI/settings)

======


# Cách update code các thứ 


Tôi sẽ hướng dẫn cách quản lý và update code với Google Apps Script:

1. **Push code lên Apps Script**:
```bash
# Push toàn bộ thay đổi lên
clasp push

# Push và theo dõi log
clasp push --watch
```

2. **Pull code về local**:
```bash
# Pull code mới nhất về
clasp pull

# Pull về version cụ thể
clasp pull <version-number>
```

3. **Quản lý versions**:
```bash
# Xem danh sách versions
clasp versions

# Tạo version mới
clasp version "Version description"

# Deploy một version cụ thể
clasp deploy -V <version-number>
```

4. **Theo dõi thay đổi**:
```bash
# Xem status của các file
clasp status

D:\GIT\ChainOfPrompt_PersonalizationTC\src> clasp status
Tracked files:
└─ apps-script\appsscript.json
└─ apps-script\Mã.js
Untracked files:

# Xem log của project
clasp logs
```

5. **Làm việc với project**:
```bash
# Mở project trên browser
clasp open

# Chạy function trong Apps Script
clasp run 'functionName'
```

Một số lưu ý quan trọng:
- Luôn test code trên Apps Script Editor trước khi deploy
- Nên tạo version mới cho mỗi lần update quan trọng
- Sử dụng `.claspignore` để loại trừ file không cần thiết
- Kiểm tra log sau mỗi lần push/deploy để phát hiện lỗi


# Add OPENAI_API_KEY to Google Apps Script

- vÀO https://script.google.com/u/0/home/projects/1Kbf6Dxy1DLW2Cv0-lP-ha0XnOIBsk3mdvr2GHzqdESoochu8f4UnXxCI/settings
- Tìm: Thuộc tính của tập lệnh
Phần thuộc tính của tập lệnh giúp xác định và tiết lộ các thuộc tính tùy chỉnh của phiên bản đối tượng cụ thể một cách dễ dàng và hiệu quả. Tìm hiểu thêm trong tài liệu về thuộc tính của tập lệnh.
