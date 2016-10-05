// Simulate config options from your production environment by
// customising the .env file in your project's root folder.

require('babel-register')({only: /\/graphql\/.*/ });
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var pkg = require('./package.json')

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'upscale',
	'brand': 'upscale',
	'back': '/me',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',
	'view-cache': false,

	'emails': 'templates/emails',

	'auto update': true,

	'mongo' : process.env.MONGODB_URI,
	'cloudinary config' : process.env.CLOUDINARY_URL,

	'session': true,
	'session store':'mongo',
	'auth': true,
	'user model': 'User',

	'cookie secret': process.env.COOKIE_SECRET || 'upscale',

	'mandrill api key': process.env.MANDRILL_API_KEY,

	'basedir':__dirname

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	//env: keystone.get('.env'),
	utils: keystone.utils,
	moment: require('moment'),
	js: 'javascript:;',
	plural: keystone.utils.plural,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));


// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
	utils: keystone.utils,
	host: (function() {
		if (process.env.NODE_ENV === 'staging') return '';
		if (process.env.NODE_ENV === 'production') return 'http://theupscale.in';
		return (keystone.get('host') || 'http://localhost:') + (keystone.get('port') || '32772');
	})()
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

// keystone.set('email rules', [{
// 	find: '/images/',
// 	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/images/' : 'http://localhost:3000/images/'
// }, {
// 	find: '/keystone/',
// 	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/keystone/' : 'http://localhost:3000/keystone/'
// }]);

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts','post-comments', 'post-categories'],
	'enquiries': 'enquiries',
	'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
