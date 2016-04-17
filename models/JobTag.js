var keystone = require('keystone');

/**
 * JobTags Model
 * ==================
 */

var JobTag = new keystone.List('jobTag', {
	autokey: { from: 'name', path: 'key', unique: true }
});

JobTag.add({
	name: { type: String, required: true }
});

JobTag.relationship({ ref: 'Job', refpath: 'jobTag' });

JobTag.register();
