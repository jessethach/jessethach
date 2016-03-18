var keystone = require('keystone');

/**
 * Role Model
 * ==================
 */

var Role = new keystone.List('Role', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Role.add({
	name: { type: String, required: true }
});

Role.relationship({ ref: 'Work', path: 'roles' });

Role.register();
