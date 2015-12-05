var TweetCompose = function($el) {
  this.$el = $el;
  this.bindEvents();
};

$.extend(TweetCompose.prototype, {
  bindEvents: function() {
    this.$el.on('click','.input-button', this.submit.bind(this));
  },

  submit: function(e) {
    var that = this;
    e.preventDefault();
    var serializedForm = this.$el.serializeJSON();

    $.ajax({
      type: 'POST',
      url: "/tweets/",
      dataType: "json",
      data: serializedForm,
      success: function(show) {
        that.render(show);
      },
      error: function() {
        console.log("ERROR");
      }
    });
  },

  render: function(show) {
    var $feed = $('#feed');
    var $li = $('<li>');
    $li.text(show.content +
      show.user_id +
      show.created_at +
      show.updated_at);
    $feed.prepend($li);
  }
});

module.exports = TweetCompose;
