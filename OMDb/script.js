var button = $("#button");
var del = $("#delete");
var books = [];



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

function updateTable() {
    $("#books tr:not(:first-child)").remove();
    for (var i = 0; i < books.length; i++) {
        addToTable(books[i]);
    }
}

function saveChanges(){
    localStorage.setItem("books", JSON.stringify(books));
}

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

del.click(() => {
    $("#books tr").last().remove();
    books.pop();
    saveChanges();
});

//https://pastebin.com/bw6mnz5F

$(document).ready(function(){
    var booksString = localStorage.getItem("books");
    books = JSON.parse(booksString);
    updateTable();
});

$(document).keypress(function (e) {
    if (e.which == 13) {
        $("#button").click();
    }
});
