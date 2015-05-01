$(document).ready(function() {

	var storage = chrome.storage.local;
	var init = {};
	var linkData = {};
	var newEmails = {}
//	var combinedData = {};

	var address = $('.gb_ga')[0].innerText

	storage.get(address, function(result) {
		init = result[address]
		console.log("DBRESULT YO")
		console.log(init)

	})	

	var linkTextPossibilities = [
		'UNSUBSCRIBE',
		'SUBSCRIPTION',
		'EMAIL PREFERENCES',
		'EMAIL SETTINGS',
		'E-MAIL PREFERENCES',
		'E-MAIL SETTINGS',
		'OPT OUT',
		'OPT-OUT'
	]

	function findNewEmails(dbResponse, pageEmails) {
		$.each(pageEmails, function(ind, val) {
			try {
				if (dbResponse[ind]['isUnsub'] != undefined) {
					console.log(ind)
				} else {
					newEmails[ind] = val
				}
			} catch(e) {

			}
		})
	}

	function buildLinkData(response) {
		var $r = $(response)
		var ch = $r.find('.ts')
		var row = ch.parents('tr')		//var links = ch.find('a')

		
		$.each(row, function(ind, val) {
			
			var email = {}
			var $val = $(val)
			var href = $val.find('a').attr('href')
			var sender = $val.find('td')[1].innerText
			var sub = $val.find('td')[2]
			var subject = $(sub).find('span').text()
			var uid = href.split('&')[1]
			var uid = uid.split('=')[1]
			
			email.subject = subject
			email.sender = sender
			email.uid = uid

			if(uid) {
				if (uid.length == 16) {
					linkData[uid] = email
				}	
			}
	
		})
		
		findNewEmails(init, linkData)
		handleLinkData(newEmails)
		storeLinkData(linkData)
	}

	var url = 'https://mail.google.com/mail/u/0/?ui=html'
	var client = new XMLHttpRequest();
	client.open("GET", url, true);
	client.onload = (function(response) {
		var target = response.currentTarget
		if (target.readyState === 4) {
	    	if (target.status === 200) {
		   		buildLinkData(target.response)
		   		
		   	}
		}
		
	})
	
	client.send()

	function scrapeEmail (id) {
		var url = 'https://mail.google.com/mail/u/0/h/?view=lg&v=c&ui=html&th='+id
		//var url = 'https://mail.google.com/mail/u/0/#inbox/'+id
		var client = new XMLHttpRequest();
		client.open("GET", url, true);
		client.onload = (function(response) {
			var target = response.currentTarget
			if (target.readyState === 4) {
    			if (target.status === 200) {
	   				var page = target.response
	   				handleEmail(page, id)
	   			}
			}
		})
		client.send()
	}

	function handleLinkData(links) {

		$.each(links, function(ind, val) {
			scrapeEmail(val.uid)
			console.log(val.sender)
		})
	}

	function handleEmail(page, uid) {

		var $page = $("<html></html>").html(page)
		var links = $page.find('.msg a')

		linkData[uid]['isUnsub'] = false
		$.each(links, function(ind, val) {
			var $val = $(val)
			var linkText = $val.text().toUpperCase()
			var linkURL = $val.attr('href')
			console.log(linkTextPossibilities.indexOf(linkText))
			if (linkTextPossibilities.indexOf(linkText) != -1) {
				//console.log(linkText)
				linkData[uid]['isUnsub'] = true
				linkData[uid]['unSubURL'] = linkURL				
			}
		})	
		
	}

	function storeLinkData(obj) {

		window.setTimeout(function() {
			var store = {}
			store[address] = obj
			storage.set(store, function() {
				console.log('STORED DATAAAAA')
				console.log(obj)
			})

		}, 10000)
		
	}


	/*

	

	

	function combine(pageItems, storedItems) { 
		$.each(pageItems, function(ind, val) {
			//console.log(ind)
			if (ind in storedItems) {
			//	if (combinedData[val] == undefined) {
			//		scrapeEmail(val)
			//	}
				combinedData[val] = storedItems[ind]
			} else {
				combinedData[ind] = undefined
				scrapeEmail(val)
			}
		})
	}

	

	function hasUnsubscribe(html) {
		var links = html.find('a')
		var isUnsub = false
		
		$.each(links, function(ind, val) {
			var $val = $(val)

			var linkText = $val.text().toUpperCase()
			var linkURL = $val.attr('href')
			console.log(linkTextPossibilities.indexOf(linkText))
			if (linkTextPossibilities.indexOf(linkText) != -1) {
				console.log(linkText)
				isUnsub = true				
			}
			
		})
		console.log(isUnsub)
		return isUnsub
	}

	//test with th=14b8f2ddcb8fcf60
	

	//$('tbody').children().click()
	var url = 'https://mail.google.com/mail/u/0/?ui=html'
	var client = new XMLHttpRequest();
	client.open("GET", url, true);
	client.onload = (function(response) {
		var target = response.currentTarget
		if (target.readyState === 4) {
	    	if (target.status === 200) {
		   		buildLinkData(target.response)
		   		//combine(linkData, init)
		   	}
		}
		
	})
	
	client.send()

	
*/
});

/*

var store = {}
		store['backImg'] = backImg
		storage.set(store, function() {

		})
*/