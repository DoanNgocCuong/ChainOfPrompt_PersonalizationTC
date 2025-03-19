/**
 * Tạo menu tùy chỉnh trong Google Sheets khi tài liệu được mở
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  
  // Tạo menu chính
  ui.createMenu('AI Tools')
      .addItem('Run All Scripts', 'runAll')
      .addSeparator()
      .addSubMenu(ui.createMenu('Individual Scripts')
          .addItem('Run Bài Học Chunking', 'runMainBaiHocChunking')
          .addItem('Run Milestones & Achievements', 'runMainMilestonesAchievements')
          .addItem('Run Lộ Trình Học (3 tình huống)', 'runMultipleLoTrinhHoc'))
      .addSeparator()
      .addItem('Test OpenAI Connection', 'testOpenAIResponse')
      .addToUi();
}

/**
 * Hiển thị thông báo khi script hoàn thành
 */
function showCompletionAlert() {
  var ui = SpreadsheetApp.getUi();
  ui.alert('Hoàn thành', 'Các scripts đã chạy xong!', ui.ButtonSet.OK);
}

/**
 * Wrapper cho hàm runAll để hiển thị thông báo khi hoàn thành
 */
function runAllWithNotification() {
  runAll();
  showCompletionAlert();
} 