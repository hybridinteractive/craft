$(function() {
    $('body').on('click', '.js-search-toggle', function(e) {
        e.preventDefault();
        $('#searchbar').toggleClass('-expanded');
    });
    $('body').on('click', '#searchbar .close', function(e) {
        //e.preventDefault();
        $('#searchbar').toggleClass('-expanded');
    });
});