const image = document.getElementById('output')
const fileButton = document.querySelector("#file")

fileButton.addEventListener("change", (event)=>loadFile(event))

function loadFile(event) {
	image.src = URL.createObjectURL(event.target.files[0])
}

const start_btn = document.createElement('button');
start_btn.addEventListener("click", classifyImage);
start_btn.innerText = "Start Analyse";
document.querySelector("body").appendChild(start_btn);

const guess = document.getElementById("guess")


let nn
const speech = window.speechSynthesis;
const voices = window.speechSynthesis.getVoices();

console.log(ml5.version)

const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

function modelLoaded() {

    console.log('Model Loaded!')
}

function classifyImage() {
    classifier.classify(document.getElementById('output'), (err, res) => {
        console.log(res);
        for (let v of voices) {
            // if (v.lang != 'en') continue;
            const btn = document.createElement('button');
            btn.addEventListener("click", () => {
                guess.innerText = `Thissa: ${res[0].label}`
                let utterThis = new SpeechSynthesisUtterance(`Thissa: ${res[0].label}`);
                utterThis.voice = v;
                speak(utterThis);
            });
            console.log(v)
            btn.innerText = v.name;
            document.querySelector("body").appendChild(btn);
        }
    });
    speak(`I think this photo shows a tennis ball!`)
}

function speak(utterThis) {
    if (!speech.speaking) {
        speech.speak(utterThis);
    }
}
