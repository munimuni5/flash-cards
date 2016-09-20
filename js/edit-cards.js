/* edit-cards.js */

function clearEditTable() {
	$('.edit-table').html('');
}

function updateEditTable() {

	clearEditTable();

	var labels = '<tr class="labels"><th>#</th><th>Question</th><th>Answer</th><th class="options-column">Options</th></tr>';
	$('.edit-table').append(labels);

	for (var i = 0; i < myDecks[currentDeck].cards.length; i++) {
		addCardToTable(i);
	}
}

function addCardToTable(i) {
	// Begin html table row
	var entry = '<tr>';

	// Add card number
	entry += '<td>' + (i + 1) + '</td>';

	// Add question
	entry += '<td id="editQ" contenteditable="true">' + myDecks[currentDeck].cards[i].q + '</td>';

	// Add answer
	entry += '<td id=editA" contenteditable="true">' + myDecks[currentDeck].cards[i].a + '</td>';

	// Add Options
	entry += '<td><div class="cancel-button table-button">Cancel</div><div class="save-button table-button" value="' + i + '">Save</div><div class="delete-button table-button" value="' + i + '">Delete</div></td>';

	$('.edit-table').append(entry);
}

// Add new card to deck
function newCard() {
	var newCard = new Card();
	myDecks[currentDeck].cards.push(newCard);
	addCardToTable((myDecks[currentDeck].cards.length)-1);
}

// Create a new Deck
function newDeck() {
	var newDeck = new Deck();
	newDeck.name = 'New Deck';
	var firstCard = new Card();
	newDeck.cards.push(firstCard);

	myDecks.push(newDeck);
	saveDeckEdits();
}



// Save to local storage
function saveDeckEdits() {
	localStorage.setItem('Flashcard Decks', JSON.stringify(myDecks));
}



// EVENT LISTENERS

// Rename Deck button listener
$(deleteDeckButton).on('click', function() {
	var x = confirm('Are you sure you want to delete your deck: ' + myDecks[currentDeck].name + '?');
	if (x == true) {
		myDecks.splice(currentDeck, 1);
		saveDeckEdits();
		location.reload();
	}
})

// Rename Deck button listener
$(renameDeckButton).on('click', function() {
	var newName = $('.edit-container .deck-name').html();
	myDecks[currentDeck].name = newName;
	saveDeckEdits();
	updateDeckName();
	// Update deck name in desklist
	$('.deck.active span').html(newName);
})

// New Card button listener
$(addCardButton).on('click', newCard);

// Save Button listener
$('.edit-table').on('click', '.delete-button', function() {
	var i = $(this).attr('value');
	myDecks[currentDeck].cards.splice(i, 1);
	saveDeckEdits();
})

// Save Button listener
$('.edit-table').on('click', '.save-button', function() {
	var i = $(this).attr('value');
	myDecks[currentDeck].cards[i].q = $(this).parent().siblings().eq(1).html();
	myDecks[currentDeck].cards[i].a = $(this).parent().siblings().eq(2).html();
	saveDeckEdits();
})

// Cancel Button listener
$('.edit-table').on('click', '.cancel-button', function() {
	clearEditTable();
	updateEditTable();
})





// TODO cursor to end of line on table cell click
