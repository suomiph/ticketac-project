
var divpopup = document.getElementById("lepopup");

var objResult = JSON.parse(divpopup.dataset.result);
console.log(objResult)



function myPopUp() {
  var txt;
  
  var confirmString = `Are you sure you want to reserve the train(s):\n`
  for (var i=0; i<objResult.length; i++ ){
  	confirmString = confirmString + `From ${objResult[i].fromcity} to ${objResult[i].tocity}, the ${objResult[i].date} at ${objResult[i].hour}?\n`;
  }
  	
  console.log( confirmString )	
  
  if ( confirm( confirmString )) {
  
    window.location.href = '/addbdd';
  } else {
    txt = "You pressed Cancel!";
  }
   
  document.getElementById("lepopup").innerHTML = txt;
}
