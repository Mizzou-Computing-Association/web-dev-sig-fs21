function includeHTML() {
  var z, i, elmnt, file, xhttp, title, left_link, right_link, left_href, right_href;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("div");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    title = elmnt.getAttribute("include_content");
    
    left_link = elmnt.getAttribute("left_link");
    left_href = elmnt.getAttribute("left_href");

    right_link = elmnt.getAttribute("right_link");
    right_href = elmnt.getAttribute("right_href");

    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          header = document.getElementById("main-header");
          header.innerHTML = title;

          leftLink = document.getElementById("left-link");
          leftLink.innerHTML = left_link;
          leftLink.setAttribute("href", left_href);

          rightLink = document.getElementById("right-link");
          rightLink.innerHTML = right_link;
          rightLink.setAttribute("href", right_href);

          elmnt.removeAttribute("w3-include-html");
					elmnt.removeAttribute("include_content");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}