
document.getElementById('info-text').style.display = 'none';
function toggleInfo(e) {
    e.preventDefault();
    if (event.type == 'click' || event.keyCode == 13) {
        const infotext = document.getElementById('info-text');
        if (infotext.style.display === "none") {
            infotext.style.display = "inline-block";
            infotext.setAttribute('aria-hidden', 'false');
        } else {
            infotext.style.display = "none";
            infotext.setAttribute('aria-hidden', 'true');
        }
    }
}
function addToList(e) {
    e.preventDefault();
    const source = document.getElementById('intressen').value;
    const target = document.getElementById('intresselista');                
    if ( source !== '' ) {
        target.innerHTML += '<span class="intressepost">' + source + '<button class="radera" aria-label="Radera raden" onclick="deleteFromList(this)"></span></button></span>';
        document.getElementById('intressen').value = '';
        document.getElementById('intresselistahidden').value += source + ',';
    }
}

function deleteFromList(element) {
    element.parentElement.remove();
    const hiddenlist = document.getElementById('intresselistahidden').value;
    const posts = document.getElementsByClassName('intressepost');
    let list = ''
    for (let i = 0; i < posts.length; i++ ) {
        list += posts[i].firstChild.data + ',' ;
    }
    document.getElementById('intresselistahidden').value = list;
}

const form = document.getElementById("anmalan");
form.addEventListener("submit", function(event) {
    if (document.getElementById('namn').value !== '' && document.getElementById('epost').value !== '' ) {
        event.preventDefault();
        const intresselista = document.getElementById('intresselistahidden').value;
        const params = JSON.stringify({
            'namn': document.getElementById('namn').value,
            'epost': document.getElementById('epost').value,
            'alder': document.getElementById('alder').value,
            'intressen': intresselista.substring(0, intresselista.length - 1),
            'boende': document.getElementById('ja').checked ? document.getElementById('ja').value : document.getElementById('nej').value,
            'sovsack': document.getElementById('sovsack').checked ? document.getElementById('sovsack').value : 'nej',
            'kudde': document.getElementById('kudde').checked ? document.getElementById('kudde').value : 'nej',
            'liggunderlag': document.getElementById('liggunderlag').checked ? document.getElementById('liggunderlag').value : 'nej',
        });
      
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert('Tack för din anmälan!');
            }
        };
        
        xhttp.open('POST', 'text.php', true);   
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");                
        xhttp.send(params);

        document.getElementById('anmalan').reset();
        document.getElementById('intresselista').innerHTML = '';
    }
});