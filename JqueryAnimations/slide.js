var flip = $("#flip");//document.getElementById("flip");
var slide = $("#panel");

flip.click(function(){
    slide.slideToggle("slow");
})