function js_style(){
    var el = document.getElementById("text");
    el.style.fontSize = "60px";
    el.style.color = "red"; 
    el.style.fontFamily = "Helvetica";
}

document.getElementById("jsstyle").addEventListener('click', function(){
    js_style();
});

var el = document.getElementById("jsstyle");
el.addEventListener('click', function(){
    js_style();
});