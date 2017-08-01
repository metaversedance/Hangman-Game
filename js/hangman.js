//Specifications:

// 3. Use key events to listen for the letters that your players will type.

// 4. Display the following on the page:

// 5. Press any key to get started!

// 6. Wins: (# of times user guessed the word correctly).

//    * If the word is `madonna`, display it like this when the game starts: `_ _ _ _ _ _ _`.

//    * As the user guesses the correct letters, reveal them: `m a d o _  _ a`.

// 7. Number of Guesses Remaining: (# of guesses remaining for the user).

// 8. Letters Already Guessed: (Letters the user has guessed, displayed like `L Z Y H`).

// 9. After the user wins/loses the game should automatically choose another word and make the user play it.


//requirments:

//on page load it should set game model -- done

//it should set model state: 
	//current word: generate random word to be guessed -- done
	//number of guesses left: assigned length of current word + 5 -- done
	//lettersGuessed: empty array -- done

//on input, character should be added to letters guessed -- done

//subsequent key press should decriment number of guesses left -- done

//current word should be displayed with dashes obscuring letters not yet guessed -- done

//if all characters in current word are in letters guessed and numGuessLeft < 0 
	//user wins  -- todo
	//reset game state -- done

//if number of guesses left reaches 0
	//user loses -- todo
	// reset game state -- done


	var wordLibrary = ["cat","dog","madonna"];

	var util = {
	 	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
		getRandomIntInclusive: function (min, max) {
		  min = Math.ceil(min);
		  max = Math.floor(max);
		  return Math.floor(Math.random() * (max - min + 1)) + min;
		},
	 }
	function render() {
		//handle intro message on first key press
		var startMsg = document.getElementById("start-message");

		if ( !(hangManModel.keyPressedOnce) ) {
			startMsg.innerHTML = "Press Any Key To Play!";
			hangManModel.keyPressedOnce = true;
			return;
		} else {
			startMsg.innerHTML = "Lets Play!";

		}
		//render current score

		var renderTarget = document.getElementById("score");
		var wordWithDashes = obscureWordWithDashes(hangManModel.currentWord, hangManModel.lettersGuessed)

		var textToRender = "current word: " + wordWithDashes + "<br>"
						+ "number of guesses remaining: " + hangManModel.numGuessRemaining + "<br>"
						+ "letters guessed: " + hangManModel.lettersGuessed + "<br>"
		renderTarget.innerHTML = textToRender;
	}
//current word should be displayed with dashes obscuring letters not yet guessed -- done
	function obscureWordWithDashes(word, charArr) {
		var result = "";
		for (var i = 0; i < word.length; i++) {
			var charAt =  charArr.indexOf(word[i]);
			if(charAt > -1) {
				result+=word[i];
			} else {
				result+="-"
			}
		}
		return result;
	}


	function getRandomWord() {
		return wordLibrary[util.getRandomIntInclusive(0, wordLibrary.length)]
	}

	function onUserInput(event) {
		var key = event.key.toLowerCase();

		if (hangManModel.numGuessRemaining < 1 ) {
			resetModel();
			render()

			hangManModel.keyPressedOnce = false;

		}

		//on input, character should be added to letters guessed -- done

		if (hangManModel.lettersGuessed.indexOf(key)=== -1) {
			hangManModel.lettersGuessed.push(key)
		}

		//subsequent key press should decriment number of guesses left -- done

	 	hangManModel.numGuessRemaining --;

		render()

	}

//it should set model state: 
	//current word: generate random word to be guessed -- done
	//number of guesses left: assigned length of current word + 5 -- done
	//lettersGuessed: empty array -- done
	function resetModel() {
		hangManModel.currentWord = getRandomWord();

		hangManModel.numGuessRemaining = hangManModel.currentWord.length + 5;

		hangManModel.lettersGuessed = [];

		hangManModel.keyPressedOnce = false;
		render()

	}

	var hangManModel = {
		currentWord: null,
		numGuessRemaining: null,
		lettersGuessed: null,
		keyPressedOnce: false,

	}

//on page load it should set game model -- done

	function init() {
		//attach event listener
		document.onkeyup = onUserInput;

		//reset model
		resetModel();

		render();

	}
init()