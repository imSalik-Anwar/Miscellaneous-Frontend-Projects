let roll = document.querySelector('.roll')
        let tar = document.querySelector('#target')
        let Score = document.querySelector('#score')
        let result = document.querySelector(`#result`)
        let termCount = document.querySelector(`#terms`)

        let diceSides = [1,2,3,4,5,6]
        let n = diceSides.length

        // add event
        roll.addEventListener("click", score)

        let playerScore = 0;
        let terms = 5
        let target = Math.floor(Math.random() * (23 - 15) + 15);
        tar.innerHTML = `Target score: ${target}`
        Score.innerHTML = `Your score: ${playerScore}`
        termCount.innerHTML = `Terms left: 5`
        function score(){
            if(terms > 0){
                let index = Math.floor(Math.random() * n)
                let termScore = diceSides[index]
                playerScore += termScore
                Score.innerHTML = `Your score: ${playerScore}`
                terms--
                termCount.innerHTML = `Trems left: ${terms}`
                changeColor(termScore)
                if(playerScore > target || terms == 0){
                    printResult()
                } 
            } else {
                 printResult()    
            }
        }
        function printResult(){
            if(playerScore > target){
                result.innerHTML = `Hurrah, you won!! :)`
                document.getElementById("result").style.color = "green"
            } else if(playerScore < target){
                result.innerHTML = `Alas, you lost! :(`
                document.getElementById("result").style.color = "red"
            } else {
                result.innerHTML = `Nah, It's a tie :|`
                document.getElementById("result").style.color = "gray"
            } 
        }
        function changeColor(termScore){
            if(termScore == 1){
                document.getElementById("one").style.color = "yellow"
            } else if(termScore == 2){
                document.getElementById("two").style.color = "yellow"
            } else if(termScore == 3){
                document.getElementById("three").style.color = "yellow"
            } else if(termScore == 4){
                document.getElementById("four").style.color = "yellow"
            } else if(termScore == 5){
                document.getElementById("five").style.color = "yellow"
            } else if(termScore == 6){
                document.getElementById("six").style.color = "yellow"
            }

        }