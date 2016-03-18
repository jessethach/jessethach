var keystone = require('keystone');

/**
 * Technology Model
 * ==================
 */

var Technology = new keystone.List('Technology', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Technology.add({
	name: { type: String, required: true }
});

Technology.relationship({ ref: 'Work', path: 'technologies' });

Technology.register();
