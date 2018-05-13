var button = $("#button");
var del = $("#delete");
var details = $("#movie-details");
var movies = {};
var apiKey = "e37257dd";
var apiRoot = `http://www.omdbapi.com/?apikey=${apiKey}&`;

//dodavanje vo tabela - prikaz
function addToTable(movie) {    
    $("#movies").append(`
    <tr>
    <td><a onclick="showMovie('${movie.imdbID}')"><img height="100px" src="${movie.Poster}"/></a></td>
    <td><a onclick="showMovie('${movie.imdbID}')">${movie.Title}<span>(${movie.Year})</span></a></td>
    </tr>
    `);
}

//sekoj movie objekt od movies array odnovo go prikazuvame vo tabela
function updateTable() {
    $("#movies tr:not(:first-child)").remove();
    for (id in movies) {
        addToTable(movies[id]);
    }
}

//go zacuvuvame objektot movies vo localStorage
function saveChanges() {
    // let res = "{";
    // for(id in movies){
    //     res += `'${id}':${JSON.stringify(movies[id])},`;
    // }
    // res = res.substring(0, res.length - 1)
    // res += "}";
    // console.log(res);
    localStorage.setItem("movies", JSON.stringify(movies));
}

function showMovie(id){
    console.log("REQUESTING FOR " + id);
    $.get(`${apiRoot}i=${id}`, function(data, status){
        console.log(data);
        details.html(`
            <img src="${data.Poster}"/>
        `);
    });
}

function pushMovies(arr) {
    arr.forEach(a => {
        let id = a["imdbID"];
        movies[id] = Object.assign({}, a);
    });
}

//event listener na click da prati povik do API da go zeme filmot
button.click(() => {
    var search = $("#search").val();
    var url = `${apiRoot}s=${search}`;
    console.log(url);
    $.get(url, function (data) {
        pushMovies(data.Search);
        saveChanges();
        updateTable();
    });
});
//kopceto za brisenje
del.click(() => {
    $("#movies tr").last().remove();
    movies.pop();
    saveChanges();
});

//pri otvoranje na stranata proveri dali ima lokalno zacuvuvani knigi
$(document).ready(function () {
    var moviesString = localStorage.getItem("movies") || "{}";
    movies = JSON.parse(moviesString);
    movies = Object.values(movies).filter(movie => movie != null);
    updateTable();
});

//pri klik na enter da se pritisne kopceto za prakjanje povik
$(document).keypress(function (e) {
    if (e.which == 13) {
        $("#button").click();
    }
});