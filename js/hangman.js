// 3. Use key events to listen for the letters that your players will type.

// 4. Display the following on the page:

// 5. Press any key to get started!

// 6. Wins: (# of times user guessed the word correctly).

//    * If the word is `madonna`, display it like this when the game starts: `_ _ _ _ _ _ _`.

//    * As the user guesses the correct letters, reveal them: `m a d o _  _ a`.

// 7. Number of Guesses Remaining: (# of guesses remaining for the user).

// 8. Letters Already Guessed: (Letters the user has guessed, displayed like `L Z Y H`).

// 9. After the user wins/loses the game should automatically choose another word and make the user play it.


//it must listen for key events, and save that key
//it must choose a word to be guessed
//it must listen for a key is pressed to begin game
//subsequent keys pressed should:
	//if key pressed, numberOfGuesses -- 
	//if key pressed is not in word, push letter to alreadyGuessedLetters
	//if key pressed is in word, push letter to correct index of wordArray
	//if length of 

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

		if (hangManModel.currentWord.indexOf(key) > -1 && hangManModel.lettersGuessed.indexOf(key)=== -1) {
			hangManModel.lettersGuessed.push(key)
		}

		if (hangManModel.numGuessRemaining < 1 ) {
			resetModel();

			hangManModel.keyPressedOnce = false;

		}

	 	hangManModel.numGuessRemaining --;

		render()

	}
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

	function init() {
		//attach event listener
		document.onkeyup = onUserInput;

		//reset model
		resetModel();

		render();

	}
init()