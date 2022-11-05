(function($) {
	$.fn.letterCase = function(locale) {

		var UC = net.kornr.unicode;
		if (typeof UC === undefined)
			return this;

		if (typeof locale !== "string")
			locale = "en";

		function convertStr(obj, originalStr, keyCode) {
			var convertedStr = originalStr;
			if ($(obj).hasClass('upperNomark')) {
				convertedStr = UC.uppercase_nomark(originalStr);
				//English Character control
				var convertedKeyCode = convertedStr.charCodeAt(0);
				if(convertedKeyCode != 32){
					if ($(obj).hasClass('numberLetter')) {
						if(convertedKeyCode < 48 || convertedKeyCode > 90 || (convertedKeyCode > 57 && convertedKeyCode < 65)){
							convertedStr = "";
						}
					}else if(convertedKeyCode < 65 || convertedKeyCode > 90){
						convertedStr = "";
					}
				}
			} else if ($(obj).hasClass('lowerNomark')) {
				convertedStr = UC.lowercase_nomark(originalStr);
			} else if ($(obj).hasClass('upperMark')) {
				if (locale == "tr" && keyCode == 105) {
					convertedStr = "\u0130";
				} else {
					convertedStr = originalStr.toUpperCase();
				}
			} else if ($(obj).hasClass('lowerMark')) {
				if (locale == "tr" && keyCode == 73) {
					convertedStr = "\u0131";
				} else {
					convertedStr = originalStr.toUpperCase();
				}
			}
			return convertedStr;
		}
		
		/*
		return this.each(function() {
			$('.upperNomark,.lowerNomark,.upperMark,.lowerMark,.onlyNumberLetter', this).on("keypress", function(event) {
				var keyCode = event.which ? event.which : event.charCode ? event.charCode : event.keyCode;
				var originalStr = String.fromCharCode(keyCode);

				if (keyCode > 32) {
					
					if (UC.is_letter_number(originalStr)) {

						var convertedStr = convertStr(this, originalStr, keyCode);
						var startpos = 0, endpos = 0;
						if (this.selectionStart) { 
							startpos = this.selectionStart;
							endpos = this.selectionEnd;
						} else if (document.selection) { 
						    this.focus(); 

						    var r = document.selection.createRange(); 
						    if (r == null) { 
						      return 0; 
						    } 

						    var re = this.createTextRange(), 
						        rc = re.duplicate(); 
						    re.moveToBookmark(r.getBookmark()); 
						    rc.setEndPoint('EndToStart', re); 

						    startpos = rc.text.length;
						    endpos = rc.text.length + re.text.length;
						}  
						
						this.value = this.value.substr(0, startpos) + convertedStr + this.value.substr(endpos);
						
						if (typeof this.setSelectionRange != "undefined"){
							this.setSelectionRange(startpos + 1, startpos + 1);
						}else{
							var range = this.createTextRange();
							range.collapse(true);
							range.moveStart('character', startpos + 1);
							range.moveEnd('character', 0);
							range.select();
						}
						
						event.preventDefault();
					}else{
						var acceptStr = false;
						
						if($(this).hasClass('acceptComma') && keyCode == 44 ){ // 44 comma ,
							acceptStr = true;
						}else if($(this).hasClass('acceptPoint') && keyCode == 46){ // 46 point .
							acceptStr = true;
						}
						
						if (!acceptStr && $(this).hasClass('alphaOnly')) {
							event.preventDefault();
						}
					}
				}

			});
		});

	*/
		
	return this.each(function() {
		
			$('.upperNomark, .lowerNomark, .upperMark, .lowerMark').on("input", function(event) {

				event.preventDefault();
				
				var valueChanged = false;

			    if (event.type=='propertychange') {
			        valueChanged = event.originalEvent.propertyName=='value';
			    } else {
			        valueChanged = true;
			    }
			    if (valueChanged) {

					var originalStr = this.value.substring(this.value.length-1);
					var keyCode = this.value.charCodeAt(this.value.length - 1);

					if (keyCode > 32 && keyCode != 46) {
						
						if (UC.is_letter_number(originalStr)) {

							var convertedStr = convertStr(this, originalStr, keyCode);
							var startpos = this.value.length == 1 ? 0 : this.value.length-1;
							this.value = this.value.substr(0, startpos) + convertedStr;
							this.value = UC.uppercase_nomark(this.value);

							event.preventDefault();

						}else{
							var acceptStr = false;
							
							if($(this).hasClass('acceptComma') && keyCode == 44 ){ // 44 comma ,
								acceptStr = true;
							}else if($(this).hasClass('acceptPoint') && keyCode == 46){ // 46 point .
								acceptStr = true;
							}
							
							if (!acceptStr && $(this).hasClass('alphaOnly')) {
								event.preventDefault();
							}
						}
					}
			    	
			    }

			});
			
		});

	};
}(jQuery));

function getCaret(el) { 
	  if (el.selectionStart) { 
	    return el.selectionStart; 
	  } else if (document.selection) { 
	    el.focus(); 

	    var r = document.selection.createRange(); 
	    if (r == null) { 
	      return 0; 
	    } 

	    var re = el.createTextRange(), 
	        rc = re.duplicate(); 
	    re.moveToBookmark(r.getBookmark()); 
	    rc.setEndPoint('EndToStart', re); 

	    return [rc.text.length, rc.text.length + re.text.length];
	  }  
	  return 0; 
}
