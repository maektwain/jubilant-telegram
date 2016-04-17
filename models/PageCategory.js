var keystone = require('keystone');

/**
 * PageCategory Model
 * ==================
 */

var PageCategory = new keystone.List('pageCategory', {
	autokey: { from: 'name', path: 'key', unique: true }
});

PageCategory.add({
	name: { type: String, required: true }
});

PageCategory.relationship({ ref: 'Page', refpath: 'pageCategory' });

PageCategory.register();
