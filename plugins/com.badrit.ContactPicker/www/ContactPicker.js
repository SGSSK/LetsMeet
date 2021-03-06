/**
 * @constructor
 */
var ContactPicker = function() {};


ContactPicker.prototype.chooseContact = function(success, failure) {
	var newContantInfo = null;
	cordova.exec(function(contactInfo) {
		newContantInfo = {
			id: contactInfo.id,
			displayName: contactInfo.displayName,
			email: contactInfo.email,
			photoUrl: contactInfo.photoUrl,
			address: [],
			phones: []
		};
		for (var i in contactInfo.phones) {
			if (contactInfo.phones[i].length)
			newContantInfo.phones = newContantInfo.phones.concat(contactInfo.phones[i]);
		};
		if(contactInfo.address.length){
			for (var i in contactInfo.address) {
				newContantInfo.address.push(contactInfo.address[i]);
			};
		}else{
			newContantInfo.address.push("")
		}
		success(newContantInfo);
	}, failure, "ContactPicker", "chooseContact", []);
};

ContactPicker.prototype.addContact = function(contact, success, failure) {
	var newContant = null;
	var newContantInfo = null;
	if (contact && device.platform == "Android")
		newContant = {
			id: contact.id ? contact.id  : "",
			displayName: contact.displayName ? contact.displayName : "",
			email: contact.email ? contact.email : "",
			mobileNumber: contact.mobileNumber ? contact.mobileNumber : ""
		}
	cordova.exec(function(contactInfo) {
		newContantInfo = {
			id: contactInfo.id,
			displayName: contactInfo.displayName,
			email: contactInfo.email,
			photoUrl: contactInfo.photoUrl,
			address: [],
			phones: []
		};
		for (var i in contactInfo.phones) {
			if (contactInfo.phones[i].length)
				newContantInfo.phones.push(contactInfo.phones[i]);
		};
		if(contactInfo.address.length){
			for (var i in contactInfo.address) {
				newContantInfo.address.push(contactInfo.address[i]);
			};
		}else{
			newContantInfo.address.push("")
		}
		success(newContantInfo);
	}, failure, "ContactPicker", "addContact", [newContant]);
};

// Plug in to Cordova
cordova.addConstructor(function() {

	if (!window.Cordova) {
		window.Cordova = cordova;
	};


	if (!window.plugins) window.plugins = {};
	window.plugins.ContactPicker = new ContactPicker();
});
