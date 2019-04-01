function search(event){
  if(event.keyCode == 13)
    clearresult();
    connect();
}

function clearresult(){
  var ele=document.getElementById("result");
  while (ele.firstChild) {
    ele.removeChild(ele.firstChild);
}
}

function connect(){
  document.getElementsByClassName("p2")[0].style.display="none";
  var term = document.getElementsByTagName("input")[0].value;
  document.getElementById("cover").style.top="10%";
  document.getElementsByClassName("p1")[0].style.top="2%";
  var api ="https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + term;
  //cors-anywhere get from https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141
  const proxyurl = "https://cors-anywhere.herokuapp.com/"; // site that doesn’t send Access-Control-*
  fetch(proxyurl + api) // https://cors-anywhere.herokuapp.com/https://example.com
  .then(response => response.json())
  .then(contents => gotData(contents))
  .catch(() => console.log("Can’t access " + api + " response. Blocked by browser?"))
//end of cors-anywhere
}

function gotData(contents){
  for(var i=0; i<contents[1].length; i++){
    var ldiv = document.createElement("DIV");
    ldiv.className+="box";
    var h2=document.createElement("H2");
    h2.appendChild(document.createTextNode(contents[1][i]));
    var p=document.createElement("P");
    p.appendChild(document.createTextNode(contents[2][i]));
    ldiv.appendChild(h2);
    ldiv.appendChild(p);
    
    const l=contents[3][i];
    ldiv.addEventListener("click", function(i){window.location.assign(l);})
    document.getElementById("result").appendChild(ldiv);
  }

}