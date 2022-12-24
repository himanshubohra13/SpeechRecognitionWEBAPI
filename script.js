const recordBtn = document.querySelector(".record");
const languagesSelect = document.querySelector("#language");
const result = document.querySelector(".result")
const downloadBtn = document.querySelector(".download");
const clearBtn = document.querySelector(".clear");

function populateLanguage() {
    console.log(languages);
    languages.forEach((lang) => {
        const option = document.createElement('option')
        option.value = lang.code;
        option.innerHTML = lang.name;
        languagesSelect.appendChild(option);

    });
}

populateLanguage();

let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition, recognition, recording = false;

function speechToText() {
    try {
        recognition = new speechRecognition();
        recognition.lang = languagesSelect.value;
        recognition.interimResults = true;
        recordBtn.querySelector('p').innerHTML = "Listening...";
        recognition.start();
        recognition.onresult = (event) => {
            console.log(event.results);
            const speechResult = event.results[0][0].transcript;
            if (event.results[0].isFinal) {
                result.innerHTML += " " + speechResult;
                result.querySelector('p').remove();

            }
            else {
                if (!document.querySelector(".interim")) {
                    const interim = document.createElement('p');
                    interim.classList.add('interim');
                    result.appendChild(interim)

                }
                document.querySelector('.interim').innerHTML = " " + speechResult;
            }

            downloadBtn.disabled = false;
        }


        recognition.onspeechend = () => {
            speechToText();
        }
        recognition.enerror = (event) => {
            alert("Error Occured:" + event.error);
        }

    } catch (error) {
        recording = false;
        console.log(error);
    }

}

recordBtn.addEventListener('click', () => {
    if (!recording) {
        speechToText();
        recording = true;

    } else {
        stopRecording();
    }
});

function stopRecording() {
    recognition.stop();
    recordBtn.querySelector('p').innerHTML = "Start Listening";
    recordBtn.classList.remove()
    recording = false;
}
function download() {
    const text = result.innerHTML;
    const filename = "speech.txt";
    const element = document.createElement('a');
    element.setAttribute("href", "data:text/plain;charset=utf-8" + encodeURIComponent(text));
    element.setAttribute("download", filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element)


}
downloadBtn.addEventListener('click', download);
clearBtn.addEventListener('click', () => {
    result.innerHTML = "";
    downloadBtn.disabled = true;

})