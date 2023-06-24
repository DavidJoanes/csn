














(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
 })(window,document,'script','//www.google-analytics.com/analytics.js','ga');if (window.location.hostname.indexOf('www.peoplesoft.nau.edu') != -1) { 
 
 ga('create', 'UA-137491166-2', 'auto');} else {
 if (window.location.hostname.indexOf('ps92qa.ucc.nau.edu') != -1) { 
 
 ga('create', 'UA-137491166-4', 'auto'); } else { 
 
 ga('create', 'UA-137491166-3', 'auto'); }
}


if (window.location.search.toUpperCase().indexOf('PAGE=') != -1) {
 
 var newSearch = window.location.search.replace(/\?(.*&Page=)/i,'?Page=').replace(/&.*/,'');} else {
 
 var newSearch = '';}


ga('send', {
 'hitType': 'pageview',
 'page': window.location.pathname + newSearch,
 'location': window.location.protocol + '//' + window.location.hostname + window.location.pathname + newSearch
});