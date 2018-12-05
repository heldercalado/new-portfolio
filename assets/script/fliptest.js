

function myFlip(argElement , argLetter){
    
    this.arrletter = [];
    this.spins = 0;
    this.element = argElement;
    this.intervalid;
    this.letter = argLetter
    this.counter=0;
    this.init();
    
    
}

myFlip.prototype.init = function() {
    this.letters();
    var _this = this;

    _this.intervalid = setInterval(function(){
        _this.run();
        
    },15);
}
myFlip.prototype.letters = function(){
    
        for (var i = 97; i < 123; i++) {
            this.arrletter.push(String.fromCharCode(i));

        }
        for (var i =48 ; i < 58; i++) {
            this.arrletter.push(String.fromCharCode(i));

        }
        this.arrletter.push(":");
        this.arrletter.push("-");
        this.arrletter.push(" ");
        this.arrletter.push("!");
        


        //console.log(this.arrletter);
    
}
myFlip.prototype.run = function(){
    
        
        
        var myLetter = this.arrletter[this.counter];
        
        
        
        $(this.element).html();
       $(this.element).prepend('<div style="display: none;" class="new-link" name="link[]">' + myLetter + '</div>');
      // $(this.element).prepend('<div style="display: none;" class="new-link" name="link[]"><h3>' + myLetter + '</h3></div>');
       $(this.element).find(".new-link:first-of-type").slideDown("fast");
       
       
       if (this.counter > 25) {
           //console.log("end");
           $(this.element).html();
        $(this.element).prepend('<div style="display: none;" class="new-link" name="link[]">' + this.letter + '</div>');
        $(this.element).find(".new-link:first-of-type").slideDown("fast");
        clearInterval(this.intervalid);
    }
       if (myLetter === this.letter) {
            clearInterval(this.intervalid);
        }
        
        this.counter++;
}











