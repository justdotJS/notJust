module.exports = function() {
  this.check: function (mod,cmd,message) {
		if (message.client.settings.get('global').includes(mod)) {
			return true
		}
  };
};
