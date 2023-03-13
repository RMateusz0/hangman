window.onload = function() {
    const answerSectionDiv = document.querySelector(".answer-section")
    document.querySelector(".restart-btn").addEventListener("click", () => { window.location.reload() } )
    const canvas = document.getElementById("canvas")
    const context2d = canvas.getContext("2d")

    //rysowanie stelaża szubienicy
    context2d.fillStyle = "black";
    context2d.fillRect(30, 30, 15, 400) //pionowa
    context2d.fillRect(30, 30, 120, 15) //gorny poziom
    context2d.fillRect(5, 420, 180, 15) //dolny poziom
    context2d.fillRect(107, 30, 5, 80) //hak
    
    //podanie słowa do odgadnięcia
    const chosenWordPre = prompt("Podaj pojedyncze słowo, które będzie musiał odgadnąć Twój przeciwnik. NIE UŻYWAJ CYFR ANI ZNAKÓW SPECJALNYCH.")
      
        
    
    if (!chosenWordPre) { 
        alert("Należy wpisać słowo!")
        window.location.reload() 
    }

    
    const chosenWord = chosenWordPre.toUpperCase() 
    

    console.log("Wybrane słowo to: " + chosenWord)
    
    let lives = 6
    document.querySelector(".lives-span").innerText = lives
    let counter = 0
    
    const chosenWordLettersArray = [...chosenWord]

    //appendChild
    let progressShowArray = []
    for (let i = 0 ; i < chosenWordLettersArray.length ; i++) {
        progressShowArray.push("_")

        let letterChild = document.createElement("p")
        letterChild.classList.add("single-letter")
        letterChild.innerText = "_"
        letterChild.setAttribute("data-letter", chosenWordLettersArray[i])
        answerSectionDiv.appendChild(letterChild)
    }


    const buttonsElementsNodes = document.querySelectorAll(".letter-btn")
    const buttonsElementsArray = [...buttonsElementsNodes]

    //nasłuchiwanie na click

    buttonsElementsArray.forEach( (element) => {
        element.addEventListener("click", (event) => { checkLetter(event) } )
    } )


    //rysowanie w przypadku błędnego wybrania litery
    function drawInCanvas() {
        console.log("rysuje")
        console.log("Counter " + counter)
                 
        if (counter==0) {
            context2d.fillStyle = "white";
            context2d.beginPath();
            context2d.arc(110, 140, 40, 0, 2 * Math.PI);
            context2d.closePath();
            context2d.fill();
        }

        if (counter==1) {
            context2d.fillStyle = "white";
            context2d.fillRect(105, 170, 10, 100)
        }

        if (counter==2) {
            context2d.fillStyle = "white";
            context2d.fillRect(60, 200, 50, 10)
        }

        if (counter==3) {
            context2d.fillStyle = "white";
            context2d.fillRect(110, 200, 50, 10)
        }

        if (counter==4) {
            context2d.strokeStyle = "white";
            context2d.lineWidth = 10
            context2d.beginPath();
            context2d.moveTo(110, 265);
            context2d.lineTo(65,320);
            context2d.stroke();
        }

        if (counter==5) {
            context2d.strokeStyle = "white";
            context2d.lineWidth = 10
            context2d.beginPath();
            context2d.moveTo(110, 265);
            context2d.lineTo(155,320);
            context2d.stroke();
        }

        counter++
    }


    //sprawdzanie czy litera poprawna
    function checkLetter(event) {
        let statusChecker = 0
        let chosenTarget = event.target
        console.log("Kliknięta litera to: " + chosenTarget.innerText)

        chosenWordLettersArray.forEach( (element, letterIndex) => {
            if (element != chosenTarget.innerText) {

                statusChecker++
            }

        })

        // błędna litera oraz utrata wszystkich żyć
            if (statusChecker == chosenWordLettersArray.length) {
                lives--
                if (lives < 0) { lives = 0 }
                drawInCanvas()
                document.querySelector(".lives-span").innerText = lives

                if (lives == 0) {
                    setTimeout(() => {
                        alert("Nie udało Ci się odgadnąć słowa.")
                        window.location.reload()
                    },500)
                }
                
                document.querySelectorAll(".letter-btn").forEach ( (element) => {
                    if (element.innerText == chosenTarget.innerText) {
                        element.style.backgroundColor = "rgba(255,0,0, 0.8)"
                    }
                } ) 


            }
        // poprawna litera
            if (statusChecker < chosenWordLettersArray.length) {
                console.log("ZNAK POPRAWNY")


                    //podmiana tekstu w <p>
                document.querySelectorAll("p.single-letter").forEach ( (element) => {
                    if (element.getAttribute("data-letter") === chosenTarget.innerText) {
                        element.innerText = chosenTarget.innerText
                    } 
                } )


                    //oraz zmiana w tablicy progressShowArray
                chosenWordLettersArray.forEach ( (element, elementIndex) => {
                    if (element == chosenTarget.innerText) {
                        progressShowArray[elementIndex] = chosenTarget.innerText
                    }
                } )
                

                document.querySelectorAll(".letter-btn").forEach ( (element) => {
                    if (element.innerText == chosenTarget.innerText) {
                        element.style.backgroundColor = "lightgreen"
                    }
                } )    
             
            }

        console.log(progressShowArray)
        checkWin()    
    
    }

    //sprawdzanie czy słowo odgadnięte

    function checkWin() {
        let result = progressShowArray.join("")

        if (result.indexOf("_") == -1) {
            setTimeout(() => {
            alert("Udało Ci się odgadnąć słowo!")
            window.location.reload()
            },500)
        }

    }

}