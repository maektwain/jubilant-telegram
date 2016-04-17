var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Job Model
 * ==========
 */

 var Job = new keystone.List('Job',{
   map: {name: 'title'},
   autokey: {path: 'slug', from:'title', unique: true}
 });

 Job.add({

   title: {type: String, required: true},
   state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
   author: { type: Types.Relationship, ref: 'User', index: true },
 	 publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
 	 image: { type: Types.CloudinaryImage },
   content: {
 		brief: { type: Types.Html, wysiwyg: true, height: 150 },
 		extended: { type: Types.Html, wysiwyg: true, height: 400 }
 	},
  jobTag: {type: Types.Relationship, ref:'jobTag', many: true }
});


Job.relationship({ ref: 'JobApplicant', refPath: 'job', path:'applicants'});
Job.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Job.register();
