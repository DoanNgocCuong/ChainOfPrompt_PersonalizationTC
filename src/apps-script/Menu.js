/**
 * Tạo menu tùy chỉnh trong Google Sheets khi tài liệu được mở
 */
function onOpen(e) {
  // Kiểm tra xem script có đang chạy trong ngữ cảnh có UI không
  var context = e && e.authMode ? e.authMode : 'NONE';
  
  // Ghi log
  Logger.log('Đang tạo menu AI Tools... Context: ' + context);
  
  // Chỉ tạo menu nếu đang chạy trong ngữ cảnh có UI
  if (context !== 'NONE') {
    try {
      var ui = SpreadsheetApp.getUi();
      
      ui.createMenu('AI Tools - Đoàn Ngọc Cường')
          .addItem('Run All Scripts', 'runAll')
          .addSeparator()
          .addSubMenu(ui.createMenu('Individual Scripts')
              .addItem('Gen Lộ Trình Học', 'runMainBaiHocChunking')
              .addItem('Run Milestones & Achievements', 'runMainMilestonesAchievements')
              .addItem('Run Lộ Trình Học (3 tình huống)', 'runMultipleLoTrinhHoc'))
          .addSeparator()
          .addItem('Test OpenAI Connection', 'testOpenAIResponse')
          .addToUi();
      
      Logger.log('Menu AI Tools đã được tạo thành công.');
    } catch (error) {
      Logger.log('Lỗi khi tạo menu: ' + error.message);
    }
  } else {
    Logger.log('Bỏ qua việc tạo menu vì đang chạy trong ngữ cảnh không có UI.');
  }
}

/**
 * Hiển thị thông báo khi script hoàn thành
 */
function showCompletionAlert() {
  try {
    var ui = SpreadsheetApp.getUi();
    ui.alert('Hoàn thành', 'Các scripts đã chạy xong!', ui.ButtonSet.OK);
    console.log('Đã hiển thị thông báo hoàn thành.');
  } catch (error) {
    console.log('Không thể hiển thị thông báo: ' + error.message);
  }
}

/**
 * Wrapper cho hàm runAll để hiển thị thông báo khi hoàn thành
 */
function runAllWithNotification() {
  console.log('Bắt đầu chạy tất cả các scripts...');
  
  try {
    // Ghi thời gian bắt đầu
    var startTime = new Date();
    console.log('Thời gian bắt đầu: ' + startTime);
    
    // Chạy tất cả các scripts
    runAll();
    
    // Ghi thời gian kết thúc và tính thời gian chạy
    var endTime = new Date();
    var executionTime = (endTime - startTime) / 1000; // Đổi sang giây
    console.log('Thời gian kết thúc: ' + endTime);
    console.log('Tổng thời gian chạy: ' + executionTime + ' giây');
    
    // Hiển thị thông báo hoàn thành
    showCompletionAlert();
    
    console.log('Tất cả các scripts đã chạy thành công.');
  } catch (error) {
    console.log('Lỗi khi chạy tất cả các scripts: ' + error.message);
    console.log('Stack trace: ' + error.stack);
  }
}

/**
 * Hàm để ghi log vào một sheet riêng
 * @param {string} message - Thông điệp cần ghi log
 */
function logToSheet(message) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var logSheet = spreadsheet.getSheetByName('Logs');
    
    // Tạo sheet logs nếu chưa tồn tại
    if (!logSheet) {
      logSheet = spreadsheet.insertSheet('Logs');
      logSheet.appendRow(['Timestamp', 'Message']);
    }
    
    // Thêm log mới
    logSheet.appendRow([new Date(), message]);
  } catch (error) {
    console.log('Không thể ghi log vào sheet: ' + error.message);
  }
}

// Ghi đè console.log để ghi log vào cả Logger và sheet
console.log = function(message) {
  Logger.log(message);
  logToSheet(message);
  return message;
}; 