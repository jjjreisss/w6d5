var FollowToggle = require('./follow_toggle.js');

var UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = this.$el.find('input');
  this.$ul = this.$el.find('ul');
  this.bindEvents();
};

$.extend(UsersSearch.prototype, {
  bindEvents: function() {
    this.$el.on('keyup', this.handleInput.bind(this));
  },

  handleInput: function(e) {
    var text = this.$input.val();
    var fn = this;

    $.ajax({
      type: "GET",
      url: "/users/search",
      dataType: "json",
      data: {
        query: text
      },
      success: function(search) {
        fn.renderResults(search);
      },
      error: function() {

      }

    });
  },

  renderResults: function(search) {
    var that = this;
    this.$ul.empty();
    search.forEach(function(result) {
      var followState = result.followed ? "followed" : "unfollowed";
      var $li = $('<li>');
      var $button = $('<button>');
      $button.addClass('follow-toggle');
      $button.attr("data-user-id", result.id);
      $button.attr("data-initial-follow-state", followState);
      $li.text(result.username);
      that.$ul.append($li);
      $li.append($button);
    });

    this.$ul.find('button').each(function(index, button) {
      new FollowToggle(button);
    });
  }

});

module.exports = UsersSearch;
