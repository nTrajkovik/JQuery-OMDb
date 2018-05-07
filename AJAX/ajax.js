var button = $("#button");
button.click(() => {
    var url = "https://raw.githubusercontent.com/sedc-codecademy/sedc5-ajs/10e8b19d62a365926927cb5ae0e2ed9452cdc607/group-2/books/books2.json";
    $.get(url, function (data) {
        var info = JSON.parse(data);
        
        for (var i = 0; i < info.length; i++) {
            var item = info[i];
            console.log(item);
            $("#books").append(`
            <div>
                <h2>${item.title}</h2>
                <p>${item.author} Awarded: ${item.awards}</p>
               
            </div>
            `);
        }
    });
});