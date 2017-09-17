function getYid() {
	var div = document.getElementsByClassName("post-body entry-content");
	var str = div[0].textContent;
	var arr = [];
	var ids = [];
	if (str.indexOf("[id]") != -1 && str.indexOf("[/id]") != -1) {
		if (str.indexOf("[s]") != -1 && str.indexOf("[/s]") != -1) {
			s = str.substring(str.indexOf("[s]") + 3, str.indexOf("[/s]"));
		} else {
			s = "YT";
		}
		var str1 = str.substr(str.indexOf("[id]"), str.indexOf("[/id]") - str.indexOf("[id]") + 5);
		if (str1.indexOf(";") != -1) {
			var p = str1.replace(/\[id\]|\[\/id\]/g, "");
			if (p[p.length - 1] == "|") {
				p = p.substr(0, p.length - 2);
			}
			arr = p.split("|");
			for (i = 0; i < arr.length; i++) {
				var arr1 = arr[i].split(";");
				var idobj = {};
				idobj.no = arr1[0];
				idobj.id = arr1[1].replace("http://www.youtube.com/watch?v=", "");
				idobj.s = s;
				ids.push(idobj);
			}
			return ids;
		} else {
			var p = str1.replace(/\[id\]|\[\/id\]/g, "");
			idobj.no = 1;
			idobj.id = p;
			idobj.s = s;
			ids.push(idobj);
			return ids;
		}
	} else if (document.getElementById("idkey")) {
		var str = window.atob(document.getElementById("idkey").textContent);
		if (str.indexOf("[s]") != -1 && str.indexOf("[/s]") != -1) {
			s = str.substring(str.indexOf("[s]") + 3, str.indexOf("[/s]"));
		} else {
			s = "YT";
		}
		var str1 = str.substr(str.indexOf("[id]"), str.indexOf("[/id]") - str.indexOf("[id]") + 5);
		if (str1.indexOf(";") != -1) {
			var p = str1.replace(/\[id\]|\[\/id\]/g, "");
			if (p[p.length - 1] == "|") {
				p = p.substr(0, p.length - 2);
			}
			arr = p.split("|");
			for (i = 0; i < arr.length; i++) {
				var arr1 = arr[i].split(";");
				var idobj = {};
				idobj.no = arr1[0];
				idobj.id = arr1[1].replace("http://www.youtube.com/watch?v=", "");
				idobj.s = s;
				ids.push(idobj);
			}
			return ids;
		} else {
			var p = str1.replace(/\[id\]|\[\/id\]/g, "");
			var idobj = {};
			idobj.no = 1;
			idobj.id = p;
			idobj.source = s;
			ids.push(idobj);
			return ids;
		}
	} else {
		return "No Video";
	}
}

function getdata(result) {
	if(localStorage.data != undefined) {
		var d=JSON.parse(window.atob(localStorage.data)); 
		var h = document.querySelector(".post-title .entry-title").textContent.trim();		
		var ids = [];
		var c = 0;
		for (var i = 0; i < d.length; i++) {
			if (d[i][1] == h) {
				var idobj = {};
				c += +1;
				idobj.no = c;
				idobj.s = d[i][2];
				idobj.id = d[i][0];
				ids.push(idobj);
			}
		}
	var cp = currentPart(ids);
	playeryt(cp);
	videojs("vid1");
	var f = $('.post-body,.entry-content');
	f[0].querySelector("img").src = 'https://i.ytimg.com/vi/' + cp.id + '/mqdefault.jpg';
	createBtn(ids);
	currentColor(cp.no);		
	}
	else {
	$.getJSON("https://sheets.googleapis.com/v4/spreadsheets/1-wcPG2G_Qw_To_dG7YYuPysDfCjicChqNK5OU2bBSMc/values/'phh'!A2:C1000?key=AIzaSyBVkPQygfiEFDmkR5ycn1uZBCCoWUcXPhM&majorDimension=rows", result);
	}
}

function result(data, status) {
	var d = data.values; 
	if (typeof(Storage) !== "undefined") {localStorage.setItem("data",window.btoa(JSON.stringify(d)));}
	var h = document.querySelector(".post-title .entry-title").textContent.trim();
	var ids = [];
	var c = 0;
	for (var i = 0; i < d.length; i++) {
		if (d[i][1] == h) {
			var idobj = {};
			c += +1;
			idobj.no = c;
			idobj.s = d[i][2];
			idobj.id = d[i][0];
			ids.push(idobj);
		}
	}
	var cp = currentPart(ids);
	playeryt(cp);
	videojs("vid1");
	var f = $('.post-body,.entry-content');
	f[0].querySelector("img").src = 'https://i.ytimg.com/vi/' + cp.id + '/mqdefault.jpg';
	createBtn(ids);
	currentColor(cp.no);
}

function checkoffline(id) {
	var u = 'https://www.googleapis.com/youtube/v3/videos?part=id&id=' + id + '&type=video&key=AIzaSyDYwPzLevXauI-kTSVXTLroLyHEONuF9Rw';
	$.getJSON(u, function (data) {
		if (typeof(data.items[0]) != "undefined") {
			playeryt(d);
			createBtn(getYid());
			videojs("vid1", {
				plugins: {
					videoJsResolutionSwitcher: {
						default_res: '480',
						dynamicLabel: true
					}
				}
			}, function () {
				var player = this;
				player.on('resolutionchange', function () {
					console.info('Source changed')
				})
			});
			currentColor(d.no);
		} else {
			getdata(result);
		}
	});
}

function getSource() {
	var d = document.getElementsByClassName("post-body entry-content")[0].textContent;
	if (d.indexOf("[s]") != -1 && d.indexOf("[/s]") != -1) {
		d = d.substring(d.indexOf("[s]") + 3, d.indexOf("[/s]"));
		return d;
	} else {
		return null;
	}
}
function reload(n) {
	var h = window.location.href;
	var h = h.split(".html")[0] + ".html";
	if (h.indexOf('?') > -1) {
		h = h + '&part=' + n;
	} else {
		h = h + '?part=' + n;
	}
	window.location.href = h;
}
function currentPart(id) {
	var p = {};
	var aid = id;
	var u = window.location.href;
	if (u.indexOf("m=1") != -1) {
		u = u.substring(0, u.indexOf("&m=1"));
	}
	if (u.indexOf("=") != -1) {
		u = u.split("=")[1];
		u = Number(u);
		p.no = Number(u);
		for (i = 0; i < aid.length; i++) {
			if (aid[i].no == p.no) {
				p.id = aid[i].id;
				p.s = aid[i].s;
			}
		}
	} else {
		p.id = aid[0].id;
		p.no = aid[0].no;
		p.s = aid[0].s;
	}
	return p;
}
function createytPlayer(id) {
	var strVar = "";
	strVar += "<video";
	strVar += "  id=\"vid1\"";
	strVar += "  class=\"video-js vjs-fluid \"";
	strVar += "  controls";
	strVar += "  ";
	strVar += "  width=\"800\" height=\"450\"";
	strVar += "  data-setup='{ \"techOrder\": [\"youtube\"], \"sources\": [{ \"type\": \"video\/youtube\", \"src\": \"https:\/\/www.youtube.com\/watch?v=";
	strVar += id;
	strVar += "\"}], \"youtube\": { \"customVars\": { \"iv_load_policy\": \"3\" } } }'";
	strVar += ">";
	strVar += "<\/video>";
	return strVar;
}
function createggucPlayer(id) {
	var blg = "";
	blg += "<video id=\"vid1\" class=\"video-js vjs-fluid\" controls preload=\"auto\" data-setup='{}'><source data-res=\"1080\" src=\"https:\/\/lh3.goog";
	blg += "leusercontent.com\/";
	blg += id;
	blg += "=m18\" type=\"video\/mp4\" ><\/source><source  data-res=\"720\" src=\"https:\/\/lh3.goog";
	blg += "leusercontent.com\/";
	blg += id;
	blg += "=m22\" type=\"video\/mp4\" ><\/source><source  data-res=\"480\" src=\"https:\/\/lh3.goog";
	blg += "leusercontent.com\/";
	blg += id;
	blg += "=m37\" type=\"video\/mp4\" ><\/source>";
	blg += "  <p class=\"vjs-no-js\"> To view this video please enable JavaScript, and consider upgrading to a web browser that <a href=\"http:\/\/videojs.com\/html5-video-support\/\" target=\"_blank\">supports HTML5 video<\/a><\/p><\/video>";
	return blg;
}
function createDmplayer(vbox, id) {
	var newDiv = document.createElement("div");
	newDiv.className += ' dmvbox';
	var currentDiv = document.getElementsByClassName("vcontainer")[0];
	currentDiv.insertBefore(newDiv, currentDiv.childNodes[0]);
	newDiv.append(document.getElementById("vbox"));
	var player = DM.player(document.getElementById(vbox), {
			video: id,
			width: "100%",
			height: "100%",
			params: {
				autoplay: true,
				sharing_enable: false,
				endscreen_enable: false,
				ui_start_screen_info: false,
				ui_logo: false
			}
		});
}
function createVmplayer(id) {
	var newDiv = document.createElement("div");
	newDiv.className += ' dmvbox';
	var currentDiv = document.getElementsByClassName("vcontainer")[0];
	currentDiv.insertBefore(newDiv, currentDiv.childNodes[0]);
	newDiv.append(document.getElementById("vbox"));
	var strVar = "";
	strVar += "<div data-vimeo-id=\"";
	strVar += id;
	strVar += "\" data-vimeo-width=\"801px\" data-vimeo-byline=\"false\" data-vimeo-title=\"false\" data-vimeo-portrait=\"false\" data-vimeo-responsive=\"1\" id=\"vmbox\"><\/div>";
	return strVar;
}
function createGDplayer(id) {
	var strVar = "";
	strVar += "<div class=\'iframeWrapper\'><iframe src=\"https:\/\/drive.google.com\/file\/d\/";
	strVar += id;
	strVar += "\/preview\" width=\"801\" height=\"455\" allowfullscreen scrolling=\'no\'  > <\/iframe></div>";
	return strVar;
}
function playeryt(p) {
	var vdiv = document.getElementById("vbox");
	switch (p.s) {
	case "DM":
		createDmplayer("vbox", p.id);
		var ss = '<span class=\"source\" >Source: Dailymotion<\/span>';
		$('#sn').append(ss);
		break;
	case "VM":
		vdiv.innerHTML = createVmplayer(p.id);
		var ss = '<span class=\"source\" >Source: Vimeo<\/span>';
		var vmPlayer = new Vimeo.Player('vmbox');
		vmPlayer.on('play', function () {});
		$('#sn').append(ss);
		break;
	case "GG":
		vdiv.innerHTML = createggucPlayer(p.id);
		var ss = '<span class=\"source\" >Source: Internet<\/span>';
		$('#sn').append(ss);
		break;
	case "YT":
		vdiv.innerHTML = createytPlayer(p.id);
		var ss = '<span class=\"source\" >Source: Youtube<\/span>';
		$('#sn').append(ss);
		break;
	case "GD":
		vdiv.innerHTML = createGDplayer(p.id);
		var ss = '<span class=\"source\" >Source: Internet<\/span>';
		$('#sn').append(ss);
		break;
	}
}
function createBtn(id) {
	var d = document.getElementById("btn");
	var arrid = id;
	var n = arrid.length;
	var btn = "   ";
	if (n > 1) {
		for (i = 0; i < n; i++) {
			btn += '<button onclick=\"reload(' + arrid[i].no + ')\" class=\"buttn\" ">' + arrid[i].no + '<\/button>';
		}
		d.innerHTML = "<span class='part'>Part:</span>" + btn;
		d.setAttribute("class", "bttn");
	}
}
function currentColor(n) {
	if (document.getElementById("btn").innerHTML != "") {
		var btt = document.getElementsByClassName("buttn");
		for (i = 0; i < btt.length; i++) {
			if (btt[i].innerHTML == n) {
				btt[i].style.background = "#32bd35";
				btt[i].focus();
			}
		}
	}
}
//related post change not available imange yt only
function getdata2() {
	if(localStorage.data != undefined) {
		var d=JSON.parse(window.atob(localStorage.data)); 
		var n = $('#related-posts');
		var m = n[0].querySelectorAll('img');
		var o = $('.related-title');
		for (var i = 0; i < m.length; i++) {
			if (m[i].src.search("youtube") != -1 || m[i].src.search("ytimg" != -1)) {
				if (m[i].naturalWidth == 120 && m[i].naturalHeight == 90) {
					for (var j = 0; j < d.length; j++) {
						if (d[j][1] == o[i].textContent) {
							m[i].src = 'https://i.ytimg.com/vi/' + d[j][0] + '/0.jpg';
						}
					}
				}
			}
		}		
	} else {
		$.getJSON("https://sheets.googleapis.com/v4/spreadsheets/1-wcPG2G_Qw_To_dG7YYuPysDfCjicChqNK5OU2bBSMc/values/'phh'!A2:C1000?key=AIzaSyBVkPQygfiEFDmkR5ycn1uZBCCoWUcXPhM&majorDimension=rows", relatedImageChange);
	}
}
function relatedImageChange(data) {
	var n = $('#related-posts');
	var m = n[0].querySelectorAll('img');
	var o = $('.related-title');
	var d = data.values; 
	if (typeof(Storage) !== "undefined") {localStorage.setItem("data",window.btoa(JSON.stringify(d)));}	
	for (var i = 0; i < m.length; i++) {
		if (m[i].src.search("youtube") != -1 || m[i].src.search("ytimg" != -1)) {
			if (m[i].naturalWidth == 120 && m[i].naturalHeight == 90) {
				for (var j = 0; j < d.length; j++) {
					if (d[j][1] == o[i].textContent) {
						m[i].src = 'https://i.ytimg.com/vi/' + d[j][0] + '/0.jpg';
					}
				}
			}
		}
	}
}

function getdata1() {
	if(localStorage.data != undefined) {
		var d=JSON.parse(window.atob(localStorage.data)); 
		var g = $('.blog-posts,.hfeed');
		var k = g[0].querySelectorAll('img');
		var l = g[0].querySelectorAll('.title-overlay');
		for (var i = 0; i < k.length; i++) {
			if (k[i].naturalWidth == 120 && k[i].naturalHeight == 90) {
				for (var j = 0; j < d.length; j++) {
					if (d[j][1] == l[i].textContent.trim()) {
						k[i].src = 'https://i.ytimg.com/vi/' + d[j][0] + '/0.jpg';
					}
				}
			}
		}
	}
	else {	
	$.getJSON("https://sheets.googleapis.com/v4/spreadsheets/1-wcPG2G_Qw_To_dG7YYuPysDfCjicChqNK5OU2bBSMc/values/'phh'!A2:C1000?key=AIzaSyBVkPQygfiEFDmkR5ycn1uZBCCoWUcXPhM&majorDimension=rows", change);
	}
}
function change(data) {
	var g = $('.blog-posts,.hfeed');
	var k = g[0].querySelectorAll('img');
	var l = g[0].querySelectorAll('.title-overlay');
	var d = data.values; 
	if (typeof(Storage) !== "undefined") {localStorage.setItem("data",window.btoa(unescape(encodeURIComponent(JSON.stringify(d))));}
	for (var i = 0; i < k.length; i++) {
		if (k[i].naturalWidth == 120 && k[i].naturalHeight == 90) {
			for (var j = 0; j < d.length; j++) {
				if (d[j][1] == l[i].textContent.trim()) {
					k[i].src = 'https://i.ytimg.com/vi/' + d[j][0] + '/0.jpg';
				}

			}
		}
	}
}
