(function(window, document, undefined) {
  var EntryView = {};
  /* Renders an entry into the given $entry element. Requires the object
   * representing the active entry (activeEntryData). If this object is null,
   * picks the first existing entry. If no entry exists, this view will display
   * the CreatingEntryView. */
  EntryView.render = function($entry, activeEntryData) {
	  EntryModel.loadAll(function (error, entries) {
 		  if(error) {
			  $("div.error").text(error);
 		  } else {	
			  var source   = $("#entry-template").html();
			  if (activeEntryData === null) activeEntryData = entries[0];
			  if (activeEntryData === undefined) CreatingEntryView.render($entry);
			  else { 
				  var template = Handlebars.compile(source);
				  var html = template( {
					  viewing: true,
					  entries: entries,
					  activeEntryData: activeEntryData
				  });
				  $entry.html(html);
				  addEventListeners($entry, activeEntryData);
				  addSelectEventListener($entry, activeEntryData, entries);
				  addGoogleMapsView(activeEntryData);
			  }
		  }
	  });
  };
  //this function adds all the event listeners to the buttons on the home screen.
  //if there a button is clicked, the reason it reacts is due to this. the delete
  //logic is handled in the event listener it is added to.
  function addEventListeners($entry, activeEntryData) {
	  $("button.green.new").on("click", function () {
		  CreatingEntryView.render($entry);
	  });
	  $("button.teal.edit").on("click", function() {
		  EditingEntryView.render($entry, activeEntryData);
	  });
	  $entry.on("click","button.red.delete",  function() {
		  if( activeEntryData !== null || activeEntryData !== undefined) {
			  EntryModel.remove(activeEntryData.id, function(error, response) {
				  if(error) $("div.error").text(error);
				  else if (response.length > 0) {
					  EntryView.render($entry, null);
				  }
				  else CreatingEntryView.render($entry);
			  });
		  }
	  });
  }
  //this manages the select button event listener. it allows the user to change the
  //current entry.
  function addSelectEventListener($entry, activeEntryData, entries) {
	  var $select = $("select");
	  $select.on("change", function() {
		  var id = $select.val();
		  var newActiveEntryData = $.grep(entries, function(element){return element.id == id;});
		  EntryView.render($entry, newActiveEntryData[0]);
	  });
  } 
  //this function adds the google maps view given the current entry data. it simply
  //calls the google maps view render function.
  function addGoogleMapsView(activeEntryData) {
	  GoogleMapView.render($(".map"), activeEntryData);
  }
  window.EntryView = EntryView;
})(this, this.document);
