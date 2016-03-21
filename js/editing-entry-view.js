(function(window, document, undefined) {
  var EditingEntryView = {};

  /* Renders a view to allow the user to edit an entry. Requires the $entry
   * element and an object representing the active entry. */
  EditingEntryView.render = function($entry, activeEntryData) {
	  var source = $("#entry-template").html();
	  var template = Handlebars.compile(source);
	  var html = template({
		  editing: true,
		  entries: null,
		  activeEntryData: activeEntryData
	  });
	  $entry.html(html);
	  addEventListenerToUpdate($entry, activeEntryData);
  };
  // This function adds an event listener to the update button. 
  // once the user clicks this button the entry will be updated with
  // the active entry data. there are no checks because no changes
  // are necessary to update.
  function addEventListenerToUpdate($entry, activeEntryData) {
	  $("button.teal.update").on("click", function() {
		  var name = $("input[type='text'][name='name']").val();
		  var address = $("input[type='text'][name='address']").val();
		  var description = $("textarea[name='description']").val();
		  var entry = {
			  name: name,
			  address: address,
			  description: description,
			  id: activeEntryData.id
		  };
		  EntryModel.update(entry, function(error, entry) {
			  if(error) $("div.error").text(error);
			  else {
				  EntryView.render($entry, entry);
			  }
		  });

	  });
  }
  window.EditingEntryView = EditingEntryView;
})(this, this.document);
