(function() {
  
    //Generate a unique-ish cb handler
    var cb = "bh";
    for(var i=0; i<20; i++) {
        cb += Math.floor(Math.random()*10); 
    }
 
    //Display results
    window[cb] = function(e) {
        if(!window.BEHANCE_DOM) var d = document.querySelector("#behance");
        else var d = document.querySelector(window.BEHANCE_DOM);
        
        if(e.responseStatus === 200) {
            var feed = e.responseData.feed,
                link = $("<a>", {html: feed.link});
                container = $("#behance");
            $.each(feed.entries, function(i, e) {
                var title   = $("<header>", {html: e.title}),
                    imgSrc  = /^<img.*?src=['"](.*?)['"]/.exec(e.content)[1],
                    img     = $("<a>", {href: e.link, html: $("<img>", {src: imgSrc})}),
                    content = $("<p>", {html: e.contentSnippet});
                    box     = $("<li>")
                                .append(title, img, content)
                                .appendTo(container);
            });



            // var body = "";
            // for(var i=0; i<e.responseData.feed.entries.length; i++) {
            //     var entry = e.responseData.feed.entries[i];
            //     //Remove the inline style
            //     var content = entry.content.replace(/style=".*?"/, "");
            //     //preprend a link
            //     content = content.replace(/>/,"></a>");
            //     content = "<a href='" + entry.link + "'>" + content;
            //     body += "<div class='behanceEntry'><a href='" + entry.link + "' class='titleLink'>" + entry.title + "</a><p>" + content + "</p></div>";
            // }
 
            
            // var result = "<div class='behanceEntries'>" + body + "</div></div>";
            // d.innerHTML = result;
            
        } else {
            //handle error
            d.innerHTML = "<div class='behanceMain'><p>Sorry, we couldn't load the Behance feed.</p></div>";
        }
    }
 
    if(!BEHANCE_USER) return;
 
 
    var url = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http%3A//www.behance.net/" + BEHANCE_USER + ".xml&num=10&v=1.0&callback="+cb;
 
    
    var script = document.createElement("script");
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}());