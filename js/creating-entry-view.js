(function(window, document, undefined) {
  var CreatingEntryView = {};

  /* Renders a view to allow the user to create an entry. Requires the $entry
   * element. */
  CreatingEntryView.render = function($entry) {
	  var source = $("#entry-template").html();
	  var template = Handlebars.compile(source);
	  var html = template({
		  creating: true,
		  entries: null,
		  activeEntryData: null
	  });
	  $entry.html(html);
	  addEventListenerToAdd($entry);
  };
  //this function adds the "add" event listener. when someone clicks the add
  //button they go to here to process the value. the data from the current
  //screen is taken and then added to the model. if something is wrong it puts
  //the error in the error bar in the bottom.
  function addEventListenerToAdd($entry) {
	  $("button.green.add").on("click", function() {
		  var name = $("input[type='text'][name='name']").val();
		  var address = $("input[type='text'][name='address']").val();
		  var description = $("textarea[name='description']").val();
		  EntryModel.add( {
			  name: name,
			  address: address,
			  description: description
		  }, function(error, entry) {
			  if(error) $("div.error").text(error);
			  else {
				  EntryView.render($entry, entry);
			  }
		  });
	  });
  }

  window.CreatingEntryView = CreatingEntryView;
})(this, this.document);
