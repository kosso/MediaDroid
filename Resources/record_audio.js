var win = Ti.UI.currentWindow;


// const value grabbed from
// http://developer.android.com/reference/android/provider/MediaStore.Audio.Media.html#RECORD_SOUND_ACTION
var RECORD_SOUND_ACTION = "android.provider.MediaStore.RECORD_SOUND";
var soundUri = null; // Will be set as a result of recording action.

var recordButton = Titanium.UI.createButton({
  top: 10, left: 10, right: 10, height: 50, title: "Record Audio"
});
var labelResultCaption = Titanium.UI.createLabel({
  top: 50, left: 10, right: 10, height: 35, visible: false, color: 'yellow'
});
var labelResult = Titanium.UI.createLabel({
  top: 100, left: 10, right: 10, height: 100, visible: false,
  backgroundColor: 'white', color: 'black',
  verticalAlign: 'top'
});

var sendButton = Titanium.UI.createButton({
  top: 200, left: 10, right: 10, height: 35,
  title: "Share Recorded Audio", visible: false
});


win.add(recordButton);
win.add(labelResultCaption);
win.add(labelResult);
win.add(sendButton);


sendButton.addEventListener('click', function(){
  var intent = Titanium.Android.createIntent({
    action: Titanium.Android.ACTION_SEND,
    type: 'audio/amr'
  });
  intent.putExtraUri(Titanium.Android.EXTRA_STREAM, soundUri);
  Titanium.Android.currentActivity.startActivity(intent);
});

recordButton.addEventListener('click', function() {

//	Ti.API.debug('DEBUG');

//	Ti.API.info('INFO');

  var intent = Titanium.Android.createIntent({ action: RECORD_SOUND_ACTION });
  Titanium.Android.currentActivity.startActivityForResult(intent, function(e) {
    if (e.error) {
      labelResultCaption.text = 'Error: ' + e.error;
      labelResultCaption.visible = true;
    } else {
      if (e.resultCode === Titanium.Android.RESULT_OK) {
      
      
       	Ti.API.debug('###############RESULT_OK######## e : '+e);
      
        soundUri = e.intent.data;

		var contentId = soundUri.split('/');
		
		contentId = contentId.pop();
		
        Ti.API.info('>>>>>>>>>>>>>>>>>>>>>> '+typeof soundUri+' <<<<<<<<<<<<<<<<<<<<<<<');

        var pathQuery = require('com.kosso.mediaquery');

	// Testing the proxy 
	pathQuery.createExample({message: "hello world  ##############"});
		
        Ti.API.info('>>>>>>>>>>>>>>>>>>>>>> QUERY NOW <<<<<<<<<<<<<<<<<<<<<<<');

        var thePath = pathQuery.getAudioPath(contentId);
		
	Ti.API.info('>> THE PATH IS : '+thePath);
		
        Ti.API.info('>>>>>>>>>>>>>>>>>>>>>> QUERY END <<<<<<<<<<<<<<<<<<<<<<<');

        
        var recording = Ti.Filesystem.getFile('file://'+thePath);
        
        var fileName = recording.name;
        
       // var theFile = recording.read();
       
       // Ti.API.info('>>>>>>>>>>>  theFile : '+theFile); 
       
       /*
       It appears that it is also possible to save the returned soundUri without the module using something like this:
       
           var source = Ti.Filesystem.getFile(soundUri);
	   var target = Ti.Filesystem.getFile('appdata://recording.amr');
	   // note: source.exists() will return false, because this is a URI into the MediaStore.
	   source.copy(target.nativePath);
       
       */
       
       
        
        Ti.API.info('>>>>>>>>>>>  recording : '+recording); 

		Ti.API.info('file size = ' + recording.size + ' bytes');

        Ti.API.info('>>>>>>>>>>>  file exists : '+recording.exists()); 
        
        Ti.API.info('>>>>>>>>>>>  file nativePath : '+recording.nativePath);
        
     //   var moveFile = recording.move(Ti.Filesystem.applicationDataDirectory + '/' + fileName);
        
        
        Ti.API.info('>>>>>>>>>>>>  applicationDataDirectory = '+Ti.Filesystem.applicationDataDirectory);
        
       // Ti.API.info('>>>>>>>>> file move result : '+moveFile);
        
        labelResultCaption.text = 'Audio Captured. Content URI:';
        labelResult.text = soundUri + '\n\n' + thePath;
        
        labelResultCaption.visible = true;
        labelResult.visible = true;
        sendButton.visible = true;
      } else {
        labelResultCaption.text = 'Canceled/Error? Result code: ' + e.resultCode;
        labelResultCaption.visible = true;
      }
    }
  });
});


//win.open();

