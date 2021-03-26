import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const CalculatorButton = ({ children, id, ...props }) => (
    <button type="button" id={id} {...props}>
        {children}
    </button>
);

const Display = ({ state }) => (
    <div id="display">
        ss
    </div>
)

const App = () => {
    const [state, setState] = React.useState("2")
    
    const handleClick = () => console.log("clicked");

    return (
        <div id="calculator" className="card">

            <Display state={state} />

            <CalculatorButton id="clear" handleClick={handleClick} className="button btn">AC</CalculatorButton>
            <CalculatorButton id="division" handleClick={handleClick} className="button btn">/</CalculatorButton>

            <CalculatorButton id="seven" handleClick={handleClick} className="button btn">7</CalculatorButton>
            <CalculatorButton id="eight" handleClick={handleClick} className="button btn">8</CalculatorButton>
            <CalculatorButton id="nine" handleClick={handleClick} className="button btn">9</CalculatorButton>
            <CalculatorButton id="multiply" handleClick={handleClick} className="button btn">X</CalculatorButton>
            
            <CalculatorButton id="four" handleClick={handleClick} className="button btn">4</CalculatorButton>
            <CalculatorButton id="five" handleClick={handleClick} className="button btn">5</CalculatorButton>
            <CalculatorButton id="six" handleClick={handleClick} className="button btn">6</CalculatorButton>
            <CalculatorButton id="subtract" handleClick={handleClick} className="button btn">-</CalculatorButton>

            <CalculatorButton id="one" handleClick={handleClick} className="button btn">1</CalculatorButton>
            <CalculatorButton id="two" handleClick={handleClick} className="button btn">2</CalculatorButton>
            <CalculatorButton id="three" handleClick={handleClick} className="button btn">3</CalculatorButton>
            <CalculatorButton id="add" handleClick={handleClick} className="button btn">+</CalculatorButton>


            <CalculatorButton id="sign" handleClick={handleClick} className="button btn">+/-</CalculatorButton>
            <CalculatorButton id="zero" handleClick={handleClick} className="button btn">0</CalculatorButton>
            <CalculatorButton id="decimal" handleClick={handleClick} className="button btn">.</CalculatorButton>
            <CalculatorButton id="equals" handleClick={handleClick} className="button btn">=</CalculatorButton>

            
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
