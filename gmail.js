	function labelEmails (tabIndex) {
		var isUnsubArray = [] 
		var emailArrayLarge = []
		var page = $('body').html()
		var startChar = page.indexOf('VIEW_DATA=') + 10
		var endChar = page.indexOf('; var GM_TIMING_END_CHUNK2')
		var viewDataString = page.substring(startChar, endChar)
		var viewData = eval(viewDataString)
		console.log(viewData)
		var emailArray = viewData[3][2]
		var y = 0
		for(i=0; i<viewData.length; i++) {
			if (viewData[i][0] == "ti") {
				y = y+1
			}
			console.log(tabIndex, y)
			if(tabIndex == y) {
				if(viewData[i][0]=='tb') {
					for(j=0; j<viewData[i][2].length; j++) {
						emailArrayLarge.push(viewData[i][2][j])
					}
				}
			}
			
		}
		console.log(emailArrayLarge)
		for(i=0; i<emailArrayLarge.length; i++) {
			//var emailProps = {
			//	'isUnsub':false,
			//	'promo':false,
			//	'social':false,
			//	'update':false,
			//	'forum':false
			//}
			var smartLabels = emailArrayLarge[i][5]
			for(j=0; j<smartLabels.length; j++ ) {
				var sl = smartLabels[j]
				var isUnsub = false
				if (sl == '^unsub') {
					isUnsub = true
				} //else if (sl == "^smartlabel_promo") {
				//	emailProps.promo = true
				//} else if (sl == "^smartlabel_social") {
				//	emailProps.social = true
				//} else if (sl == "^smartlabel_group") {
				//	emailProps.forum = true
				//} else if (sl == "^smartlabel_notification") {
				//	emailProps.update = true
				//} 
			}
			//isUnsubArray.push(emailProps)
			isUnsubArray.push(isUnsub)
		}
		console.log(isUnsubArray)

		var label = "<span class='unSubButton'>Unsubscribe</span>"
		var emails = $('.a4W')
		console.log(emails.length)
		emails.each(function(ind,val) {
			if (isUnsubArray[ind]) {
				$(val).find('.y6').addClass('unsubText')
				$(val).append(label)	
				$(val).find('.unSubButton').on('click', function(){
					var pollNum = 0

					function poll() {
						console.log(pollNum)
						if($('.Ca').length>0) {
							$('.Ca').click()
							
							window.history.back()
							
						} else if(pollNum < 50) {
							//$('body').append("<div class='opaqueBackground'></div>")
							window.setTimeout(function() {
								pollNum = pollNum +1
								poll()
							}, 2)
						}
						
					}
					
					poll()
				})
			}	
		})
		emails.css('position', 'relative')
		$('.unsubText').css('text-overflow', 'ellipsis')
		$('.unSubButton').css({
			"opacity": "0.75",
			"position": "absolute",
			"right": "-300px",
			"top": "3px",
			"background-color": "rgb(233, 233, 233)",
			"background-image": "-webkit-linear-gradient(top, rgb(233, 233, 233), rgb(230, 230, 230))",
			"border-bottom-color": "rgb(204, 204, 204)",
			"border-bottom-left-radius": "2px",
			"border-bottom-right-radius": "2px",
			"border-bottom-style": "solid",
			"border-bottom-width": "1px",
			"border-collapse": "collapse",
			"border-image-outset": "0px",
			"border-image-repeat": "stretch",
			"border-image-slice": "100%",
			"border-image-source": "none",
			"border-image-width": "1",
			"border-left-color": "rgb(204, 204, 204)",
			"border-left-style": "solid",
			"border-left-width": "1px",
			"border-right-color": "rgb(204, 204, 204)",
			"border-right-style": "solid",
			"border-right-width": "1px",
			"border-top-color": "rgb(204, 204, 204)",
			"border-top-left-radius": "2px",
			"border-top-right-radius": "2px",
			"border-top-style": "solid",
			"border-top-width": "1px",
			"color": "rgb(68, 68, 68)",
			"display": "inline-block",
			"font-family": "arial, sans-serif",
			"font-size": "11px",
			"font-weight": "bold",
			"height": "17px",
			"line-height": "17px",
			"min-width": "56px",
			"padding-left": "6px",
			"padding-right": "6px",
			"text-align": "center",
			"width": "112.453125px",

		})

		$('.unSubButton').animate({'opacity':'1','right':'0px'},200)
		$('.unsubText').animate({'margin-right':'155px'},200)

		$('.unSubButton').hover(function(){
			$(this).css({	'background-color': 'rgb(255,255,255)',
				'background-image': '-webkit-linear-gradient(top; rgb(255; 255; 255); rgb(255; 255; 255))'
						})
		},function(){
			$(this).css({	'background-color': 'rgb(230,230,230)',
				'background-image': '-webkit-linear-gradient(top; rgb(233; 233; 233); rgb(230; 230; 233))'
						})
		})
}
$(document).ready(function() {
	labelEmails(1)
	$('.aRz').click(function(){
		var index = $(this).index() + 1
		labelEmails(index)
	})
});

///////////////////////////
/*
	var storage = chrome.storage.local;
	var init = {};
	var linkData = {};
	var newEmails = {}
//	var combinedData = {};

	var address =$('.gb_ga')[0] || $('.gb4')
	var address = address.innerText

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

				var obj =  dbResponse[ind] || {}
				if (obj['isUnsub'] != undefined) {
				} else {
					newEmails[ind] = val
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
		//var url = 'https://mail.google.com/mail/u/0/h/?view=lg&v=c&ui=html&th='+id
		var url = 'https://mail.google.com/mail/u/0/'+id
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
		})
	}

	function handleEmail(page, uid) {

		var $page = $("<html></html>").html(page)
		var links = $page.find('.msg a')

		linkData[uid]['isUnsub'] = false
		console.log(page.indexOf('VIEW_DATA='))
		console.log(page.indexOf('; var GM_TIMING_END_CHUNK2'))	
		/*$.each(links, function(ind, val) {
			var $val = $(val)
			var linkText = $val.text().toUpperCase()
			var linkURL = $val.attr('href')
			
			if (linkTextPossibilities.indexOf(linkText) != -1) {
				//console.log(linkText)
				linkData[uid]['isUnsub'] = true
				linkData[uid]['unSubURL'] = linkURL				
			}
		})*/	
	/*	
	}

	function storeLinkData(obj) {

		window.setTimeout(function() {
			var store = {}
			store[address] ={} //obj
			storage.set(store, function() {
				console.log('STORED DATAAAAA')
				console.log(obj)
			})

		}, 10000)
		
	}
*/
//////////////////////////////////////////////
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


/*

var store = {}
		store['backImg'] = backImg
		storage.set(store, function() {

		})
*/