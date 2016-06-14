var async = require('async');
var crypto = require('crypto');
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User', {
	track:true,
	autoKey: {path: 'key', from: 'name', unique: true}
});

var deps = {
	facebook: { 'services.facebook.isConfigured': true },
}

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	resetPasswordKey: { type: String, hidden: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
	isVerified: { type: Boolean, label: 'Has a verified email address' }
}, 'Profile', {
	isPublic: { type: Boolean, default: true },
	isEmployee: Boolean,
	photo: { type: Types.CloudinaryImage },
	website: { type: Types.Url },
	bio: { type: Types.Markdown },
	gravatar: { type: String, noedit: true }
},'Services',{

		services:{
			facebook: {
			isConfigured: { type: Boolean, label: 'Facebook has been authenticated' },

			profileId: { type: String, label: 'Profile ID', dependsOn: deps.facebook },

			username: { type: String, label: 'Username', dependsOn: deps.facebook },
			avatar: { type: String, label: 'Image', dependsOn: deps.facebook },

			accessToken: { type: String, label: 'Access Token', dependsOn: deps.facebook },
			refreshToken: { type: String, label: 'Refresh Token', dependsOn: deps.facebook }
		},
}

});

User.schema.methods.wasActive = function () {
	this.lastActiveOn = new Date();
	return this;
}

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});

//Pulling out gravatar

User.schema.virtual('avatarUrl').get(function() {
	if (this.photo.exists) return this._.photo.thumbnail(120,120);
	if (this.services.facebook.isConfigured && this.services.facebook.avatar) return this.services.facebook.avatar;
	if (this.gravatar) return 'http://www.gravatar.com/avatar/' + this.gravatar + '?d=http%3A%2F%2Fsydjs.com%2Fimages%2Favatar.png&r=pg';
});


/**
 * Relationships
 */

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'Page', path:'pages',  refPath:'author'});



/**
 * Methods
 * =======
*/

User.schema.methods.resetPassword = function(callback) {
	var user = this;
	user.resetPasswordKey = keystone.utils.randomString([16,24]);
	user.save(function(err) {
		if (err) return callback(err);
		new keystone.Email('forgotten-password').send({
			user: user,
			link: '/reset-password/' + user.resetPasswordKey,
			subject: 'Reset your Upscale Password',
			to: user.email,
			from: {
				name: 'PASSWORD-RESET',
				email: 'dev-ops@theupscale.in'
			}
		}, callback);
	});
}

/**
 * Registration
 */

User.defaultColumns = 'name, email, isAdmin';
User.register();
