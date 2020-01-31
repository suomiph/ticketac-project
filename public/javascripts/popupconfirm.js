
var divpopup = document.getElementById("lepopup");

var objResult = JSON.parse(divpopup.dataset.result);
console.log(objResult)



function myPopUp() {
  var txt;
  
  console.log(objResult)
  
  var confirmString = `Are you sure you want to reserve the train(s):\n`
  for (var i=0; i<objResult.length; i++ ){
  	confirmString = confirmString + `From ${objResult[i].fromcity} to ${objResult[i].tocity}, the ${objResult[i].date} at ${objResult[i].hour}?\n`;
  }
  	
  console.log( confirmString )	
  
  if ( confirm( confirmString )) {
    txt = "You pressed OK!";
  } else {
    txt = "You pressed Cancel!";
  }
   
  document.getElementById("lepopup").innerHTML = txt;
}
