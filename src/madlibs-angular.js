(function(){
var app = angular.module('madLibs', []);

app.controller('CreateMadLibsController', function(Data, MadLibGenerator){
    var self = this;

    //LOCAL VARIABLES

    //BOUND FUNCTIONS
    self.generateMadLib = generateMadLib;

    //BOUND VALUES
    self.userWords = {
        nouns: '',
        verbs: '',
        adjectives: '',
        adverbs: ''
    };

    self.selectedStory = {
        name: ''
    };

    self.storyDisplay = '';

    //BOUND FUNCTIION IMPLEMENTATIONS
    function generateMadLib(){
        if (!self.userWords.nouns || !self.userWords.verbs || !self.userWords.adverbs || !self.userWords.adjectives){
            alert ("You must enter at least 1 noun, verb, adverb, and adjective!");
            return;
        }

        if (!self.selectedStory.name){
            alert ("You must select a story!");
            return;
        }

        console.log('self.userWords: ', self.userWords);
        console.log('self.selectedStory: ', self.selectedStory);

        self.storyDisplay = MadLibGenerator.generate(self.userWords, self.selectedStory);
    }

});

})();
