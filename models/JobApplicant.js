var keystone = require('keystone');
var Types = keystone.Field.Types;


/**
 * Job Applicants Model
 * ===================
 */

var JobApplicant = new keystone.List('JobApplicant',{

  nocreate: true
});

JobApplicant.add({
  job: { type: Types.Relationship, ref:'Job', index: true},
  author: { type: Types.Relationship, ref: 'User', index: true, filters: {isEmployee: true} },
	date: { type: Types.Date, default: Date.now, index: true },
	content: { type: Types.Markdown }
});


/**
 * Registration
 * ===================
 */


 JobApplicant.defaultColumns = 'post, author, date|20%';
 JobApplicant.register();
