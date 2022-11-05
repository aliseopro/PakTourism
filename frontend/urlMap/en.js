
var URL_MAPPING = function() {
	var localizedUrlMap = {"/tours/detail":"/tours/details","/searchFlights":"/flight-search/**","/passengerAdd":"/panel/passengers/passenger-add","/reservation/success/moneytransfer":"/flights/reservation-money-transfers","/order/transferOrderDetail":"/panel/orders/airport-transfer/details","/passengerDelete":"/panel/passengers/passenger-delete","/hotelDetailSearch":"/hotel-details-search/**","/common/error":"/common/error","/order/busOrderDetail":"/panel/orders/bus/details","/campaign/detail":"/campaign/detail/**","/order/detailcancel":"/order/detailcancel","/orders":"/panel/orders","/order/detail":"/panel/orders/flights/details","/passengerList":"/panel/passengers/passenger-list","/order/insuranceOrderDetail":"/panel/orders/travel-insurance/details","/eticket":"/eticket","/passengerUpdate":"/panel/passengers/passenger-update","/order/hotelOrderDetail":"/panel/orders/hotel/details","/profile":"/panel/profile"};
	
	this.resolveUrl = function(url){
	
		if(localizedUrlMap != null){
			var mappedUrl = localizedUrlMap[url]
			if(mappedUrl != null){
				url = mappedUrl;

				url = removeAllString(url, '/**');
			}
		}
	
		return url;
	}
	
	this.removeAllString = function(str, search){
	    return str.split(search).join('');
	}
	
	return {
		resolveUrl : resolveUrl
	}
}();