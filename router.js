var router = require('koa-router')();
var config = require('config');
var email = require('./controllers/email');
var sse = require('.//controllers/sse');

router.get('/', function *() {
	yield this.render('index', {
		pretty: config.prettyHtml,
		title: 'please, no spam',
		domains: config.mail.domains
	});
});

router.get('/set/:id', function *() {
	this.session.test = this.params.id;
	this.body = this.session;
});
router.get('/get', function *() {
	this.body = this.session;
});

router.get('/:email/updates', sse.subscribe);
router.get('/:email.json', email.get);
router.get('/:email/test', email.test);
router.get('/:id/original', email.original);

module.exports = router;
