$(document).ready(function(){
    $('#jumbo').load("jumbotron.html");
});

//blog stuffs
function createBlogContent(id, title, date) {
    $("#blog" + id).html('<div class="container-fluid showcase">' + 
    '<h2>' + title + '</h2><h5>' + date + '</h5><div id="blog' + id +'-content">' +
    '</div></div>');
    $("#blog" + id + "-content").load("blogposts/blog" + id + ".html");
}

//copy text button
function execCopy(text) {
    const el = document.createElement('textarea');  // Create a <textarea> element
    el.value = text;                                // Set its value to the string that you want copied
    el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
    el.style.position = 'absolute';                 
    el.style.left = '-9999px';                      // Move outside the screen to make it invisible
    document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
    const selected =            
        document.getSelection().rangeCount > 0        // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)     // Store selection if found
        : false;                                    // Mark as false to know no selection existed before
    el.select();                                    // Select the <textarea> content
    document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el);                  // Remove the <textarea> element
    if (selected) {                                 // If a selection existed before copying
        document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
        document.getSelection().addRange(selected);   // Restore the original selection
    }
    $('.toast').toast('show');    
}
