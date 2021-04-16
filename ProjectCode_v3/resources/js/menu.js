function darkMode(){
    var color = document.body;
    color.classList.toggle("darkMode");
}

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    // var DataRow dr = user_table.Rows.Find("full_name = filter");
    //var query = 'SELECT * FROM user_table where full_name.toUpperCase() = filter;';
    
    //url = user\profile

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
