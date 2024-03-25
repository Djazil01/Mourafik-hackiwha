let text = document.querySelector('#text');

text.addEventListener('input', function () {
    console.log(text.value);
    let textLength = text.value.length;
    let textWords = text.value.split(' ').filter(function (word) {
        return word.length > 0;
    }).length;
    //make the text area fit the text
    text.style.height = 'auto';
    text.style.height = text.scrollHeight + 'px';


    document.querySelector('#text-length').textContent = textLength;
    //document.querySelector('#text-words').textContent = textWords;
});