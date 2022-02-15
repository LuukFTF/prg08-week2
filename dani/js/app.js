let nn
const speech = window.speechSynthesis;
const voices = window.speechSynthesis.getVoices();

console.log(ml5.version)

const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
function loadModel() {
}

function modelLoaded() {
    classifier.classify(document.getElementById('image'), (err, res) => {
        console.log(res);
        for (let v of voices) {
            if (v.lang != 'en') continue;
            const btn = document.createElement('button');
            btn.addEventListener("click", () => {
                let utterThis = new SpeechSynthesisUtterance(`${res[0].label}`);
                utterThis.voice = v;
                speak(utterThis);
            });
            console.log(v)
            btn.innerText = v.name;
            document.querySelector("body").appendChild(btn);
        }
    });
    console.log('Model Loaded!')

}

function classifyImage() {
    speak(`I think this photo shows a tennis ball!`)
}

function speak(utterThis) {
    if (!speech.speaking) {
        speech.speak(utterThis);
    }
}


loadModel()
