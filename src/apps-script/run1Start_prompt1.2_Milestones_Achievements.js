function runMainMilestonesAchievements() {
  // Lấy bảng tính hiện tại
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();

  // Đọc input từ ô A3
  var inputPrompt = sheet.getRange('A3').getValue();
  
  // Lấy prompt từ ô B3
  var systemPrompt = sheet.getRange('B3').getValue();

  // Kiểm tra xem inputPrompt và systemPrompt có rỗng không
  if (!inputPrompt || !systemPrompt) {
    Logger.log('Input prompt hoặc system prompt không được rỗng.');
    return;
  }

  // Lấy API key từ config
  var apiKey = CONFIG.API_KEY;

  // Gửi yêu cầu tới OpenAI và nhận phản hồi
  var openAIResponse = getOpenAIResponse(systemPrompt, inputPrompt, apiKey);
  
  // Kiểm tra và tạo sheet "Responses" nếu không tồn tại
  var responseSheet = spreadsheet.getSheetByName('main');
  if (!responseSheet) {
    responseSheet = spreadsheet.insertSheet('main');
  }

  // Ghi phản hồi vào ô C3
  writeResponseToSheet('main', 'C3', openAIResponse);
}
