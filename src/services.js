(function(){
    angular.module('madLibs')
    .factory('Data', data)
    .factory('MadLibGenerator', madLibGenerator);

    function data(){
        var stories = {
            christmas: "Every Christmas we VERB to a ADJECTIVE tree farm far away. This is not just any ADJECTIVE tree farm. My dad and I VERB onto the NOUN to VERB for the perfect NOUN. Some people like them ADJECTIVE, but I prefer them ADJECTIVE. After searching for hours I usually ADVERB exclaim \"Dad! The perfect tree is over there!\" Off we VERB to get the tree. The problem is we always forget the NOUN and the NOUN. But at the end of the day we ADVERB get the tree and head home ADVERB. \"I wish it was Christmas all year round\"  I ADVERB think to myself.",
            shopping: "Today I went shopping. When I arrived at the store I saw a ADJECTIVE NOUN, who upon noticing me ADVERB said \"I need to VERB\". \"Well, that was ADJECTIVE\" I thought to myself and walked in the store. The store had rearranged it's inventory, so I felt ADVERB lost. I walked up to the store clerk and said ADVERB \"I am looking for a ADJECTIVE NOUN that doesn’t VERB as often as the last one I had.\" The store clerk looked at me with a ADJECTIVE look in his eye and said, \"What you are looking for can be found by the NOUN, if you see a NOUN that ADVERB can VERB, then you've gone too far.\" As I tried to understand his directions, I thought to myself, \"I should have just ordered it on Amazon, their products seem to VERB the perfect amount.\"",
            brainstorm: "Many say that brainstorming is ADJECTIVE and does not VERB. However, with the combination of the right computer and NOUN anyone can lead a good VERB. When you have ADVERB pulled together a ADJECTIVE group of NOUN in a big room with lots of TV's then magical things will happen. In the past we have ADVERB suggested participants work together to find the most ADJECTIVE solution. The most difficult part is many ADJECTIVE NOUN like to VERB. This has proved to be ADVERB problematic. But in the end the most important NOUN usually is brought to light. Typically we try to encourage ideas to VERB, and never shut ideas down. This concludes our instructions. Thanks for ADVERB listening!"
        };

        var defaultWords = {
            nouns: ["UNICORN", "GOBLIN", "ROCKET LAUNCHER", "SUPER MODEL", "DEATH CAKE", "SQUIRREL", "NAIL POLISH", "TOILET", "IPHONE", "AUTOPSY REPORT"],
            verbs: ["SKIP", "BOOGIE", "CRAWL", "SULK", "PRANCE", "GALLOP", "SHIMMY", "SING", "WIGGLE", "TIP-TOE"],
            adjectives: ["SLIMY", "FLIRTY", "FUZZY", "SQUISHY", "UNBEARABLE", "SPUNKY", "MOIST", "FOUL", "CRUNCHY", "SILKY"],
            adverbs: ["QUIETLY", "OSTENTATIOUSLY", "POMPOUSLY", "SNEAKILY", "SEDUCTIVELY", "GRUDGINGLY", "STUPIDLY", "QUICKLY", "VALIANTLY", "LOUDLY"]
        };

        var service = {
            stories: stories,
            defaultWords: defaultWords
        };
        return service;
    }

    function madLibGenerator(Data){
        var defaultWords = Data.defaultWords;

        var stories = Data.stories;

        var comboArrays = {
            nouns: [],
            verbs: [],
            adjectives: [],
            adverbs: []
        };

        var service = {
            generate: generate
        };
        return service;

        function generate(userWords, selectedStory){
            console.log('self.userWords: ', userWords);
            console.log('self.selectedStory: ', selectedStory);

            shuffle(defaultWords.nouns);
            shuffle(defaultWords.verbs);
            shuffle(defaultWords.adjectives);
            shuffle(defaultWords.adverbs);

            comboArrays.nouns = addUserWords(userWords.nouns, defaultWords.nouns);
            comboArrays.verbs = addUserWords(userWords.verbs, defaultWords.verbs);
            comboArrays.adjectives = addUserWords(userWords.adjectives, defaultWords.adjectives);
            comboArrays.adverbs = addUserWords(userWords.adverbs, defaultWords.adverbs);

            shuffle(comboArrays.nouns);
            shuffle(comboArrays.verbs);
            shuffle(comboArrays.adjectives);
            shuffle(comboArrays.adverbs);

            var finalStory;
            if (selectedStory.name === 'christmas') {
              finalStory = replaceWordsInStory(stories.christmas);
            } else if (selectedStory.name === 'shopping') {
              finalStory = replaceWordsInStory(stories.shopping);
            } else if (selectedStory.name === 'brainstorm'){
              finalStory = replaceWordsInStory(stories.brainstorm);
            }
            return finalStory;

            //HELPER FUNCTIONS
            function addUserWords(userWord, defaultWord){
                var userArray = userWord.toUpperCase().split(',');
                var comboArray = userArray.concat(defaultWord);
                if (comboArray.length>4){
                    comboArray.splice(4,100);
                }
                return comboArray;
            }

            function shuffle(o){
                for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                return o;
            }

            function replaceWordsInStory (story) {
              var storyWithReplacedWords = story;

              loopThroughComboArrays(comboArrays.nouns, "NOUN");
              loopThroughComboArrays(comboArrays.adverbs, "ADVERB");
              loopThroughComboArrays(comboArrays.verbs, "VERB");
              loopThroughComboArrays(comboArrays.adjectives, "ADJECTIVE");

              function loopThroughComboArrays (comboArray, wordType) {
                for (var i = 0; i < comboArray.length; i++) {
                    storyWithReplacedWords = storyWithReplacedWords.replace(wordType, comboArray[i]);
                    }
                }
                return storyWithReplacedWords;
            }
        }
    }
})();
