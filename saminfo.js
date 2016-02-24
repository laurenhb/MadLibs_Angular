//angular tips

var self = this;
// LOCAL VARIABLES
var names = ['sam','nMW2'];

// BOUND FUNCTIONS
self.dothis = dothis;

// BOUND VALUES
self.stuff = 7;
self.thing = "word";

// BOUND FUNCTION IMPLEMENTATIONS
function dothis(){
    console.log("this");
    toggle(self.visible);
    self.visible = !self.visible;
}

// HELPER FUNCTIONS
function removeFromList(list,el){
    //loop through list and remove element
}
