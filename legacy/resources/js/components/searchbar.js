$(function() {
    var $searchbar = $('#searchbar');
    $('.js-search-toggle').on('click', function(e) {
        e.preventDefault();
        $searchbar.toggleClass('-expanded');
    });
    $searchbar.on('click', '.close', function(e) {
        //e.preventDefault();
        $searchbar.toggleClass('-expanded');
    });
});