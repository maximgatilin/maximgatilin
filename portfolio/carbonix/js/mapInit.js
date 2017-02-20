function map_init() {
	function initialize() {
		var mapCenter = new google.maps.LatLng(-33.870564, 151.268226),
			mapMarkerImage = 'i/icons/icon_map.png';
		var mapStyle = [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]
		var mapProp = {
			center:mapCenter,
			zoom:14,
			mapTypeId:google.maps.MapTypeId.ROADMAP,
			disableDefaultUI:true
		};
		var map_1=new google.maps.Map(document.getElementById("map_canvas_1"),mapProp),
		map_2=new google.maps.Map(document.getElementById("map_canvas_2"),mapProp);
		var marker_1=new google.maps.Marker({
			position:mapCenter,
			icon:mapMarkerImage
		});
		var marker_2=new google.maps.Marker({
			position:mapCenter,
			icon:mapMarkerImage
		});

		marker_1.setMap(map_1);
		marker_2.setMap(map_2);
		map_1.setOptions({styles: mapStyle});
		map_2.setOptions({styles: mapStyle});
	}
	google.maps.event.addDomListener(window, 'load', initialize);
}