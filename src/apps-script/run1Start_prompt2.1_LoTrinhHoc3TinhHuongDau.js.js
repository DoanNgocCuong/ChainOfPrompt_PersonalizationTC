function runMultipleLoTrinhHoc() {
  // Lấy bảng tính hiện tại
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();

  // Đọc input và prompt từ các ô
  var inputs = [
    { input: sheet.getRange('D2').getValue(), prompt: sheet.getRange('E2').getValue(), outputCell: 'F2' },
    { input: sheet.getRange('D3').getValue(), prompt: sheet.getRange('E3').getValue(), outputCell: 'F3' },
    { input: sheet.getRange('D4').getValue(), prompt: sheet.getRange('E4').getValue(), outputCell: 'F4' }
  ];

  // Kiểm tra xem các input và prompt có rỗng không
  for (var i = 0; i < inputs.length; i++) {
    if (!inputs[i].input || !inputs[i].prompt) {
      Logger.log('Input hoặc prompt ở hàng ' + (i + 2) + ' không được rỗng.');
      return;
    }
  }

  // Lấy API key từ config
  var apiKey = CONFIG.API_KEY;

  // Tạo một mảng các promises cho các yêu cầu
  var promises = inputs.map(function(item) {
    return new Promise(function(resolve, reject) {
      try {
        // Gửi yêu cầu tới OpenAI và nhận phản hồi
        var openAIResponse = getOpenAIResponse(item.prompt, item.input, apiKey);
        // Ghi phản hồi vào ô tương ứng
        writeResponseToSheet('main', item.outputCell, openAIResponse);
        resolve();
      } catch (error) {
        Logger.log('Lỗi khi xử lý input ở ô ' + item.outputCell + ': ' + error.message);
        reject(error);
      }
    });
  });

  // Chạy tất cả các promises song song
  Promise.all(promises)
    .then(function() {
      Logger.log('Tất cả các yêu cầu đã hoàn thành.');
    })
    .catch(function(error) {
      Logger.log('Có lỗi xảy ra: ' + error.message);
    });
} 