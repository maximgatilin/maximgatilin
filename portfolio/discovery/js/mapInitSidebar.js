function map_init() {
	var map;


	var latlng = new google.maps.LatLng(55.7295, 37.6265);
	var settings = {
		zoom: 15,
		center: latlng,
		mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
		navigationControl: true,
		navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
		mapTypeControl: false,
		scrollwheel: false,
		styles: [{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [{"color": "#000000"},
				{"lightness": 17}]
		},
			{
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 20
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 17
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 29
					},
					{
						"weight": 0.2
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 18
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 16
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 21
					}
				]
			},
			{
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"color": "#000000"
					},
					{
						"lightness": 16
					}
				]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"saturation": 36
					},
					{
						"color": "#000000"
					},
					{
						"lightness": 40
					}
				]
			},
			{
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 19
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 20
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 17
					},
					{
						"weight": 1.2
					}
				]
			}
		]


	};
	map = new google.maps.Map(document.getElementById("map_canvas"), settings);
	var companyPos = new google.maps.LatLng(55.7295, 37.6265);
	var companyPos2 = new google.maps.LatLng(55.7285, 37.6255);
	var companyPos3 = new google.maps.LatLng(55.7280, 37.6245);
	var companyPos4 = new google.maps.LatLng(55.7275, 37.6235);
	var companyPos5 = new google.maps.LatLng(55.7270, 37.6225);
	var companyPos6 = new google.maps.LatLng(55.7265, 37.6215);


	var companyLogo = new google.maps.MarkerImage('i/icons/icon_loc.png',
		new google.maps.Size(46, 44),
		new google.maps.Point(0, 0),
		new google.maps.Point(50, 50)
	);
	var companyLogo2 = new google.maps.MarkerImage('i/icons/icon_loc_a.png',
		new google.maps.Size(46, 44),
		new google.maps.Point(0, 0),
		new google.maps.Point(50, 50)
	);

	var companyMarker = new google.maps.Marker({
		position: companyPos,
		map: map,
		icon: companyLogo
	});

	var companyMarker2 = new google.maps.Marker({
		position: companyPos2,
		map: map,
		icon: companyLogo
	});
	var companyMarker3 = new google.maps.Marker({
		position: companyPos3,
		map: map,
		icon: companyLogo2
	});
	var companyMarker4 = new google.maps.Marker({
		position: companyPos4,
		map: map,
		icon: companyLogo
	});
	var companyMarker5 = new google.maps.Marker({
		position: companyPos5,
		map: map,
		icon: companyLogo
	});
	var companyMarker6 = new google.maps.Marker({
		position: companyPos6,
		map: map,
		icon: companyLogo
	});
}
