import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "./img/tree.jpg",matched:false  },
  { src: "./img/soldier.jpg",matched:false },
  { src: "./img/ball.jpg",matched:false },
  { src: "./img/sword.jpg",matched:false },
  { src: "./img/ring.jpg",matched:false },
  { src: "./img/scroll.jpg",matched:false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled,setDisabled]=useState(false);

  const shuffleCards = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    console.log(card);
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }; // Corrected syntax
            } else {
              return card;
            }
          });
        });
        

       
        resetTurn();
      } else {
        console.log("cards don't match");
        setTimeout(()=>resetTurn(),1000) ;
      }
    }
  },[choiceOne,choiceTwo]);
  console.log(cards);
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false)
  };
useEffect (()=>{
  shuffleCards();
},[])
  console.log(cards, turns);
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
           key={card.id} 
           card={card}
           handleChoice={handleChoice} 
           flipped ={card === choiceOne || card === choiceTwo || card.matched}
           disabled={disabled}
           />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
    
  );
}

export default App;
