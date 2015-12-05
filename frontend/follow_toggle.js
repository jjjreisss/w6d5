var FollowToggle = function(el) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id");
  this.followState = this.$el.data("initial-follow-state");
  this.render();
  this.bindEvents();
};

$.extend(FollowToggle.prototype, {
  bindEvents: function () {
    this.$el.on('click', this.handleClick.bind(this));
  },
  render: function() {
    if (this.followState === "following" || this.followState === "unfollowing") {
      this.$el.attr("disabled", true);
    } else {
      this.$el.attr("disabled", false);
    }

    if (this.followState === "followed") {
      this.$el.text("Unfollow!");
    } else if (this.followState === "unfollowed"){
      this.$el.text("Follow!");
    }

  },

  handleClick: function(e) {
    e.preventDefault();
    var followState = this.followState;
    var fn = this;
    var postType;
    if (this.followState === "followed") {
      this.followState = "unfollowing";
      postType = 'DELETE';
    } else if (this.followState === "unfollowed"){
      this.followState = "following";
      postType = 'POST';
    }
    this.render();
    $.ajax({
      type: postType,
      url: "/users/" + this.userId + "/follow",
      dataType: "json",
      success: function() {
        if (fn.followState === "unfollowing") {
          fn.followState = "unfollowed";
        } else if (fn.followState === "following") {
          fn.followState = "followed";
        }

        fn.render();
      },
      error: function() {
        console.log("ERROR!");
      }
    });
  }

});




module.exports = FollowToggle;
