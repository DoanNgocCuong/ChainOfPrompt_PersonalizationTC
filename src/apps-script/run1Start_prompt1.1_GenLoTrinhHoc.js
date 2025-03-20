function runGenLoTrinhHoc() {
  // Lấy bảng tính hiện tại
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();

  // Đọc input từ ô A2
  var inputPrompt = sheet.getRange('A2').getValue();
  
  // Lấy prompt từ ô B2
  var model = sheet.getRange('B2').getValue();
  var systemPrompt = sheet.getRange('C2').getValue();

  // Kiểm tra xem inputPrompt và systemPrompt có rỗng không
  if (!inputPrompt || !systemPrompt || !model) {
    Logger.log('Input prompt, system prompt hoặc model không được rỗng.');
    return;
  }

  // Lấy API key từ config
  var apiKey = CONFIG.API_KEY;

  // Gửi yêu cầu tới OpenAI và nhận phản hồi
  var openAIResponse = getOpenAIResponse(systemPrompt, inputPrompt, apiKey, model);
  
  // Kiểm tra và tạo sheet "Responses" nếu không tồn tại
  var responseSheet = spreadsheet.getSheetByName('main');
  if (!responseSheet) {
    responseSheet = spreadsheet.insertSheet('main');
  }

  // Ghi phản hồi vào ô C2
  writeResponseToSheet('main', 'D2', openAIResponse);
}
