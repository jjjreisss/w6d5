var FollowToggle = require('./follow_toggle.js');
var UsersSearch = require('./users_search.js');

$(function() {
  var $buttons = $('button.follow-toggle');
  $buttons.each(function(index, button) {
    new FollowToggle(button);
  });

  var $searches = $('nav.users-search');
  $searches.each(function(index, search) {
    new UsersSearch(search);
  });

});
