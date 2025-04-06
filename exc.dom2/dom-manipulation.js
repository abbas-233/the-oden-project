// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create a new paragraph element
    const para = document.createElement('p');
    para.textContent = "We hope you enjoyed the ride.";

    // Create a new section element
    const sect = document.createElement('section');

    // Create a new paragraph for the link
    const linkPara = document.createElement('p');
    linkPara.textContent = "Click here for more information.";

    // Create a new link element
    const link = document.createElement('a');
    link.href = "https://developer.mozilla.org/";
    link.textContent = "MDN Web Docs";

    // Append the link to the paragraph
    linkPara.appendChild(link);

    // Append the paragraph to the section
    sect.appendChild(linkPara);

    // Append the section to the body
    document.body.appendChild(sect);

    // Add some styling to the paragraph
    para.style.color = "white";
    para.style.backgroundColor = "black";
    para.style.padding = "10px";
    para.style.width = "250px";
    para.style.textAlign = "center";

    // Append the styled paragraph to the body
    document.body.appendChild(para);

    // Remove the link paragraph after a delay so you can see it
    setTimeout(() => {
        linkPara.remove();
    }, 3000); // Remove after 3 seconds
}); 