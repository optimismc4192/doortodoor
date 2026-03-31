var NOTIFY_EMAIL = "optimismc4192@gmail.com";

function doGet(e) {
  try {
    var name = e.parameter.name || "";
    var phone = e.parameter.phone || "";
    var business = e.parameter.business || "";
    var message = e.parameter.message || "";
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var now = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");

    sheet.appendRow([now, name, phone, business, message, "신규"]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "[DoorToDoor] 새 견적문의 — " + name,
      body: "접수시간: " + now + "\n이름: " + name + "\n연락처: " + phone + "\n업종: " + business + "\n문의내용: " + message
    });

    return ContentService.createTextOutput("ok");
  } catch(err) {
    return ContentService.createTextOutput("error: " + err.toString());
  }
}

function doPost(e) {
  return doGet(e);
}

// ★ 이메일 권한 부여용 — 이것을 ▶실행 해주세요!
function testEmail() {
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "[DoorToDoor] 이메일 테스트",
    body: "이 메일이 도착했다면 이메일 알림이 정상 작동합니다!"
  });
  Logger.log("이메일 발송 완료: " + NOTIFY_EMAIL);
}

function initSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange(1,1,1,6).setValues([["접수일시","이름","연락처","업종","문의내용","상태"]]);
  sheet.getRange(1,1,1,6).setFontWeight("bold").setBackground("#4AF0C0");
}
