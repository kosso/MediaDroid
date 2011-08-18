// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


//var win = Ti.UI.currentWindow;

var win = Titanium.UI.createWindow({  
    title:'Video Recorder',
    backgroundColor:'#eee'
});





var tabBar = Ti.UI.createView({
	width:320,
	height:70,
	//borderWidth:1,
	//borderColor:theme.border_color,
	backgroundColor:'#222222',
	bottom:0
});


var videoButton = Titanium.UI.createButton({
  top: 0, left: 0, width: 160, height: 70, title: "Record Video", backgroundColor:'#aaa', color:'#222'
});

var audioButton = Titanium.UI.createButton({
  top: 0, right: 0, width: 160, height: 70, title: "Record Audio", backgroundColor:'#444', color:'#fff'
});


tabBar.add(videoButton);
tabBar.add(audioButton);


win.add(tabBar);


var win1 = Titanium.UI.createWindow({  
    title:'MediaDroid : Video',
    top:0,
    bottom:70,
    backgroundColor:'#ccc',
    url: 'record_video.js'
});


var win2 = Titanium.UI.createWindow({  
    title:'MediaDroid : Audio',
    top:0,
    bottom:70,
    backgroundColor:'#ccc',
    url: 'record_audio.js'
});

win.open();

var current_win = 1;
win1.open();


videoButton.addEventListener('click', function() {
	if(current_win == 2){
		
		win1.open();
		win2.close();
		current_win = 1;
		videoButton.backgroundColor = '#aaa';
		videoButton.color = '#222';
		audioButton.backgroundColor = '#444';
		audioButton.color = '#fff';

	}
});

audioButton.addEventListener('click', function() {
	if(current_win == 1){
		win2.open();
		win1.close();
		current_win = 2;
		audioButton.backgroundColor = '#aaa';
		audioButton.color = '#222';
		videoButton.backgroundColor = '#444';
		videoButton.color = '#fff';
		
	}
});