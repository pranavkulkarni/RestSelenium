var request = require('request');
var fs = require("fs");
var Promise = require('bluebird');
var parse = require('parse-link-header');

////// FILL IN THE BLANKS

var token = "token " + "";
var userId = "pkulkar5";
var repoName = "Apriori"
var newRepoName = "AutoRepo4";
var issueRepo = "SocialComputing";
var issueTitle = "Issue title";
var issueDesc = "Issue description";
var issueLabel = "bug";
var wikiRepo = issueRepo;
var wikiSupportFlag = true;
var description = "Repo created automatically using git rest api";


var urlRoot = "https://github.ncsu.edu/api/v3";
// NCSU Enterprise endpoint:
// https://github.ncsu.edu/api/v3

//getYourRepos(userId);
//listBranches(userId, repoName);
//createRepo(newRepoName, description);
//createIssue(issueTitle, issueDesc, issueLabel, issueRepo);
changeWikiSupport(wikiSupportFlag, wikiRepo);

function getYourRepos(userName)
{
	var options = {
		//https://github.ncsu.edu/api/v3/user/repos
		url: urlRoot + '/user/repos',
		//url: urlRoot + '/users/' + userName + "/repos",
		method: 'GET',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
	};

	// Send a http request to url and specify a callback that will be called upon its return.
	request(options, function (error, response, body)
	{
		var obj = JSON.parse(body);
		//console.log( obj );
		for( var i = 0; i < obj.length; i++ )
		{
			var name = obj[i].name;
			console.log( name );
		}
	});
}


function listBranches(owner,repo)
{
	var options = {
		url: urlRoot + '/repos/' + owner + '/' + repo + '/branches',
		method: 'GET',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
	};

	// Send a http request to url and specify a callback that will be called upon its return.
	request(options, function (error, response, body)
	{
		console.log("Branches under " + repo + " repo:")
		var obj = JSON.parse(body);
		//console.log( obj );
		for( var i = 0; i < obj.length; i++ )
		{
			var name = obj[i].name;
			console.log( name );
			console.log("Branch details: ");
			console.log(obj[i]);
			console.log("\n");
		}
	});
}


function createRepo(newRepoName, description) {
	var options = {
		url: urlRoot + '/user/repos',
		method: 'POST',
		json: {
			"name": newRepoName,
			"description": description
		},
		headers: {
			"User-Agent": "SE Rest homework script",
			"content-type": "application/json",
			"Authorization": token
		}
	};

	request(options, function(error, response, body) {
		//console.log("Response received");
		console.log("Response: " + response.statusCode + " " + response.statusMessage);
		console.log(body);
	});

}


function createIssue(issueTitle, issueDesc, issueLabel, issueRepo) {
	var options = {
		url: urlRoot + '/repos/' + userId + '/' + issueRepo + '/issues',
		method: 'POST',
		json: {
			"title": issueTitle,
			"body": issueDesc,
			"label": issueLabel
		},
		headers: {
			"User-Agent": "SE Rest homework script",
			"content-type": "application/json",
			"Authorization": token
		}
	};

	request(options, function(error, response, body) {
		//console.log("Response received");
		console.log("Response: " + response.statusCode + " " + response.statusMessage);
		console.log(body);
	});

}


function changeWikiSupport(wikiSupportFlag, wikiRepo) {
	var options = {
		url: urlRoot + '/repos/' + userId + '/' + wikiRepo,
		method: 'PATCH',
		json: {
			"name": wikiRepo,
			"has_wiki": wikiSupportFlag
		},
		headers: {
			"User-Agent": "SE Rest homework script",
			"content-type": "application/json",
			"Authorization": token
		}
	};

	request(options, function(error, response, body) {
		//console.log("Response received");
		console.log("Response: " + response.statusCode + " " + response.statusMessage);
		console.log(body);
	});

}
