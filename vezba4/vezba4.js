function insert_Row() {
    var table = $("#sampleTable");
    table.append(`
    <tr>
        <td>Row3 cell1</td>
        <td>Row3 cell2</td>
    </tr>
    `);
    table.css("background-color","red");
    // table.fadeToggle("slow");
    table.slideDown();
}