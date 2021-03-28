import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const operators = ["/", "*", "-", "+"];
const isOperator = (str) => {
    return operators.find((item) => item === str) && true;
};

const checkLength = (str) => {
    if (str) {
        return str.length < 23;
    }
    return false;
};

const endsWithOperator = (str) => {
    if (str) {
        return str[str.length - 1]?.match(/[\-+/*]/);
    }
    return false;
};

const replaceOperator = (str, operator) => {
    if (endsWithOperator(str)) {
        const replaced = str.replace(/[-+/*]+/, operator);
        return replaced;
    } else {
        return str + operator;
    }
};

const CalculatorButton = ({ children, id, handleClick, ...props }) => (
    <button type="button" id={id} {...props} onClick={handleClick}>
        {children}
    </button>
);

const Display = ({ currentValue, formula }) => (
    <div id="display">
        <h3>{formula}</h3>
        <h2>{currentValue}</h2>
    </div>
);

const App = () => {
    const [currentValue, setCurrentValue] = React.useState("0");
    const [previousValue, setPreviousValue] = React.useState("0");
    const [formula, setFormula] = React.useState("");
    const [currentOperator, setCurrentOperator] = React.useState();
    const [lastKey, setLastKey] = React.useState("");
    const [evaluated, setEvaluated] = React.useState("");
    const [currentSign, setCurrentSign] = React.useState("pos");

    React.useEffect(() => {
        setFormula((prevFormula) => {
            if (isOperator(lastKey) && lastKey !== "-") {
                return replaceOperator(prevFormula, lastKey);
            } else {
                return (prevFormula.replace(/([-+/*])0$|^0/, "$1") + lastKey)
                    .replace(/-+/, "-")
                    .replace(/\.(\d*)/, "0.$1");
            }
        });
    }, [lastKey, currentValue, currentSign]);

    const handleNumberClick = ({ target }) => {
        if (evaluated) {
            handleClear();
        }
        setLastKey(target.value);
        setCurrentValue((prevState) => {
            if (checkLength(prevState)) {
                if (prevState === "DIGIT LIMIT MET") {
                    return "DIGIT LIMIT MET";
                } else {
                    if (target.value === "." && prevState.includes(".")) {
                        setLastKey("");
                        return prevState;
                    }
                    return (prevState.replace(/^0/, "") + target.value)
                        .replace(/\.(\d*)/, "0.$1");

                }
            } else {
                const temp = prevState;
                setCurrentValue("DIGIT LIMIT MET");
                setTimeout(() => {
                    setCurrentValue(temp);
                }, 1000);
            }
        });
    };

    const handleOperatorClick = ({ target }) => {
        if (isOperator(target.value)) {
            if (evaluated) {
                setFormula(String(evaluated));
                setPreviousValue(String(evaluated));
                setEvaluated("");
            }
            setCurrentOperator(target.value);
            setPreviousValue(currentValue);
            setCurrentValue("0");
            setLastKey(target.value);
        }
    };

    const handleClear = () => {
        setCurrentOperator("");
        setCurrentValue("0");
        setPreviousValue("");
        setFormula("");
        setLastKey("");
        setCurrentSign("pos");
        setEvaluated("");
    };

    const handleEqualsClick = ({ target }) => {
        const calcualted = Math.round(100000000 * eval(formula)) / 100000000;
        setLastKey(`=${calcualted}`);
        setCurrentValue(String(calcualted));
        setEvaluated(calcualted);
    };


    return (
        <div id="calculator" className="card">
            <Display currentValue={currentValue} formula={formula} />

            <CalculatorButton
                id="clear"
                handleClick={handleClear}
                value={"clear"}
                className="button btn">
                AC
            </CalculatorButton>
            <CalculatorButton
                id="division"
                handleClick={handleOperatorClick}
                value={"/"}
                className="button btn">
                /
            </CalculatorButton>

            <CalculatorButton
                id="seven"
                handleClick={handleNumberClick}
                value={7}
                className="button btn">
                7
            </CalculatorButton>
            <CalculatorButton
                id="eight"
                handleClick={handleNumberClick}
                value={8}
                className="button btn">
                8
            </CalculatorButton>
            <CalculatorButton
                id="nine"
                handleClick={handleNumberClick}
                value={9}
                className="button btn">
                9
            </CalculatorButton>
            <CalculatorButton
                id="multiply"
                handleClick={handleOperatorClick}
                value={"*"}
                className="button btn">
                X
            </CalculatorButton>

            <CalculatorButton
                id="four"
                handleClick={handleNumberClick}
                value={4}
                className="button btn">
                4
            </CalculatorButton>
            <CalculatorButton
                id="five"
                handleClick={handleNumberClick}
                value={5}
                className="button btn">
                5
            </CalculatorButton>
            <CalculatorButton
                id="six"
                handleClick={handleNumberClick}
                value={6}
                className="button btn">
                6
            </CalculatorButton>
            <CalculatorButton
                id="subtract"
                handleClick={handleOperatorClick}
                value={"-"}
                className="button btn">
                -
            </CalculatorButton>

            <CalculatorButton
                id="one"
                handleClick={handleNumberClick}
                value={1}
                className="button btn">
                1
            </CalculatorButton>
            <CalculatorButton
                id="two"
                handleClick={handleNumberClick}
                value={2}
                className="button btn">
                2
            </CalculatorButton>
            <CalculatorButton
                id="three"
                handleClick={handleNumberClick}
                value={3}
                className="button btn">
                3
            </CalculatorButton>
            <CalculatorButton
                id="add"
                handleClick={handleOperatorClick}
                value={"+"}
                className="button btn">
                +
            </CalculatorButton>

            <CalculatorButton
                id="zero"
                handleClick={handleNumberClick}
                value={0}
                className="button btn">
                0
            </CalculatorButton>
            <CalculatorButton
                id="decimal"
                handleClick={handleNumberClick}
                value={"."}
                className="button btn">
                .
            </CalculatorButton>
            <CalculatorButton
                id="equals"
                handleClick={handleEqualsClick}
                value={"="}
                className="button btn">
                =
            </CalculatorButton>
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
