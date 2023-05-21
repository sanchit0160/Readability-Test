function main(input) {
	function calculate(text) {
		const cleanText = text.replace(/[,;:`'"<({[|_\-.]/g, ' ').toLowerCase();
		const words = cleanText.split(/\s+/);
		const wordCount = words.length;
		//console.log('Number of words:', wordCount);

		const sentenceCount = text.split(/[.!\?]+/).filter(sentence => sentence.trim() !== '').length;
		//console.log('Number of sentences:', sentenceCount);

		const syllableCount = countSyllables(input);
		//console.log('Number of syllables:', syllableCount);

		if (wordCount === 0 || sentenceCount === 0 || syllableCount === 0) {
		  return 'N/A';
		}

		const averageWordsPerSentence = wordCount / sentenceCount;
		const averageSyllablesPerWord = syllableCount / wordCount;
		//console.log('Average Syllables Per Word:', averageSyllablesPerWord);
		//console.log('Average Words Per Sentence:', averageWordsPerSentence);

		const gradeLevel = 0.39 * averageWordsPerSentence + 11.8 * averageSyllablesPerWord - 15.59;
		const readingEaseScore = 206.835 - 1.015 * averageWordsPerSentence - 84.6 * averageSyllablesPerWord;
		console.log('Flesch-Kincaid Grade Level:', gradeLevel);
		console.log('Flesch-Kincaid Reading Ease:', readingEaseScore);
	}

	function countSyllables(text) {
		const syllablePrefixes = ['auto', 'bi', 'di', 'dis', 'pre', 're', 'un', 'semi', 'tri'];
		const syllableSuffixes = ['ed', 'es', 'ing', 'ion', 'ious', 'ly', 'ment', 'ness', 'tion'];
		const lowercaseText = text.toLowerCase();
		let syllableCount = 0;

		lowercaseText.split(/\s+/).forEach(function(word) {
		  	syllablePrefixes.forEach(function(prefix) {
				if (word.startsWith(prefix)) {
			  		word = word.slice(prefix.length);
				}
			});

		syllableSuffixes.forEach(function(suffix) {
			if (word.endsWith(suffix)) {
			  	word = word.slice(0, -suffix.length);
			}
		});

		const vowelPattern = /[aeiouy]+/g;
		const matches = word.match(vowelPattern);
		if (matches) {
			syllableCount += matches.length;
		}
	});
		return syllableCount;	
	}
	calculate(input);
}

const fs = require('fs');
fs.readFile('input', 'utf8', (err, data) => {
  if (err) throw err;
  main(data);
});
