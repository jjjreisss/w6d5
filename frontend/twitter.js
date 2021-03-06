var FollowToggle = require('./follow_toggle.js');
var UsersSearch = require('./users_search.js');
var TweetCompose = require('./tweet_compose.js');

$(function() {
  var $buttons = $('button.follow-toggle');
  $buttons.each(function(index, button) {
    new FollowToggle(button);
  });

  var $searches = $('nav.users-search');
  $searches.each(function(index, search) {
    new UsersSearch(search);
  });

  var $tweet = $('form.tweet-compose');
  new TweetCompose($tweet);

});
