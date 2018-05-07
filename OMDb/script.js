var button = $("#button");
var del = $("#delete");
var books = [];


//dodavanje vo tabela - prikaz
function addToTable(book) {
    $("#books").append(`
    <tr>
    <td><img height="100px" src="${book.Poster}"/></td>
        <td>${book.Title}<span>(${book.Year})</span></td>
        <td>${book.Director}</td>
        <td>${book.Genre}</td>
        <td>${book.Country}</td>
    </tr>
    `);
}

//sekoj book objekt od books array odnovo go prikazuvame vo tabela
function updateTable() {
    $("#books tr:not(:first-child)").remove();
    for (var i = 0; i < books.length; i++) {
        addToTable(books[i]);
    }
}

//go zacuvuvame objektot books vo localStorage
function saveChanges(){
    localStorage.setItem("books", JSON.stringify(books));
}

//event listener na click da prati povik do API da go zeme filmot
button.click(() => {
    var search = $("#search").val();
    var apiKey = "e37257dd";
    var url = `http://www.omdbapi.com/?t=${search}&plot=full&apikey=${apiKey}`;
    console.log(url);
    $.get(url, function (data) {
        console.log(data);
        books.push(data);
        saveChanges();
        updateTable();
    });
});
//kopceto za brisenje
del.click(() => {
    $("#books tr").last().remove();
    books.pop();
    saveChanges();
});

//pri otvoranje na stranata proveri dali ima lokalno zacuvuvani knigi
$(document).ready(function(){
    var booksString = localStorage.getItem("books");
    books = JSON.parse(booksString);
    updateTable();
});

//pri klik na enter da se pritisne kopceto za prakjanje povik
$(document).keypress(function (e) {
    if (e.which == 13) {
        $("#button").click();
    }
});
