var check = 30; //Check every X seconds
var url = "http://example.com";
var msg = "Yay! " + url + " has been updated!";

//Don't Edit!

global.md5 = function(str) {
    var crypto = require('crypto');
    return crypto.createHash('md5').update(str).digest('hex');
};

global.escapeshell = function(cmd) { //http://stackoverflow.com/a/7685469
  return '"'+cmd.replace(/(["\s'$`\\])/g,'\\$1')+'"';
};

global.say = function(string)
{
	var os = require('os');

	if (os.type() === 'Darwin')
	{
		var exec = require('child_process').exec;
		exec("say " + escapeshell(string), function(error, stdout, stderr)
		{
			console.log(stderr);
		});
	}
};

var hashedContent = null;

var HTTPRequest = require('HTTPRequest');

function ping()
{
	console.log("Checking...");
	HTTPRequest.get(url, function(status, headers, content)
	{
		if (status == 200 || status == 302)
		{
			if (hashedContent == null)
			{
				hashedContent = md5(content);
			}
			else
			{
				var tempHash = md5(content);
				if (hashedContent != tempHash)
				{
					console.log(msg);
					say(msg);
				}
				hashedContent = tempHash;
			}
		}
		else
		{
			console.log("Http Error: " + status);
		}
	});
}

ping();

setInterval(function()
{
	ping();
}, check * 1000);