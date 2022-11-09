function emailValidation(a){var e=$("#email").val(),l=(a&&(e=$("#"+a).val()),!1);return $.ajax({async:!1,dataType:"json",url:"/checkMail",data:{email:e},success:function(a){"1"==a.isEmailValid?l=!0:(closeLoaderBox(),alert(FmtMessage.getMessage("js.general.email")))}}),l}
//# sourceMappingURL=emailValidation.js.map
