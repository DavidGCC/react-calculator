import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const operators = ["/", "*", "-", "+"];
const isOperator = (str) => {
    return operators.find((item) => item === str) && true;
};

const endsWithOperator = (str) => {
    if (str) {
        return str[str.length - 1]?.match(/[\-+/*]/);
    }
    return false;
};

const replaceOperator = (str, operator) => {
    if (endsWithOperator(str)) {
        const replaced = str.replace(/[-+/*]+$/, operator);
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

const NumberButtons = ({ handleNumberClick }) => {
    const numberClasses = "button btn numbers";
    return (
        <>
            <CalculatorButton
                id="seven"
                handleClick={handleNumberClick}
                value={7}
                className={numberClasses}>
                7
            </CalculatorButton>
            <CalculatorButton
                id="eight"
                handleClick={handleNumberClick}
                value={8}
                className={numberClasses}>
                8
            </CalculatorButton>
            <CalculatorButton
                id="nine"
                handleClick={handleNumberClick}
                value={9}
                className={numberClasses}>
                9
            </CalculatorButton>

            <CalculatorButton
                id="four"
                handleClick={handleNumberClick}
                value={4}
                className={numberClasses}>
                4
            </CalculatorButton>
            <CalculatorButton
                id="five"
                handleClick={handleNumberClick}
                value={5}
                className={numberClasses}>
                5
            </CalculatorButton>
            <CalculatorButton
                id="six"
                handleClick={handleNumberClick}
                value={6}
                className={numberClasses}>
                6
            </CalculatorButton>

            <CalculatorButton
                id="one"
                handleClick={handleNumberClick}
                value={1}
                className={numberClasses}>
                1
            </CalculatorButton>
            <CalculatorButton
                id="two"
                handleClick={handleNumberClick}
                value={2}
                className={numberClasses}>
                2
            </CalculatorButton>
            <CalculatorButton
                id="three"
                handleClick={handleNumberClick}
                value={3}
                className={numberClasses}>
                3
            </CalculatorButton>

            <CalculatorButton
                id="zero"
                handleClick={handleNumberClick}
                value={0}
                className={numberClasses}>
                0
            </CalculatorButton>
        </>
    );
};

const OperatorButtons = ({ handleOperatorClick }) => (
    <>
        <CalculatorButton
            id="division"
            handleClick={handleOperatorClick}
            value={"/"}
            className="button btn operators">
            /
        </CalculatorButton>

        <CalculatorButton
            id="multiply"
            handleClick={handleOperatorClick}
            value={"*"}
            className="button btn operators">
            X
        </CalculatorButton>

        <CalculatorButton
            id="subtract"
            handleClick={handleOperatorClick}
            value={"-"}
            className="button btn operators">
            -
        </CalculatorButton>

        <CalculatorButton
            id="add"
            handleClick={handleOperatorClick}
            value={"+"}
            className="button btn operators">
            +
        </CalculatorButton>
    </>
);

const App = () => {
    const [currentValue, setCurrentValue] = React.useState("0");
    const [previousValue, setPreviousValue] = React.useState("0");
    const [formula, setFormula] = React.useState("");
    const [evaluated, setEvaluated] = React.useState("");

    React.useEffect(() => {
        const handleKeyPress = (e) => {
            const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            if (numbers.includes(e.key)) {
                e.preventDefault();
                handleNumberClick({
                    target: {
                        value: e.key
                    }
                })
            } else if (operators.includes(e.key)) {
                e.preventDefault();
                handleOperatorClick({
                    target: {
                        value: e.key
                    }
                })
            } else if (e.key === "Enter" && e.ctrlKey) {
                handleClear();
            } else if (e.key === "=" || e.key === "Enter") {
                e.preventDefault();
                handleEqualsClick();
            } else if (e.key === ".") {
                e.preventDefault();
                handleDecimalClick();
            }
        }
        window.addEventListener("keypress", handleKeyPress);
        return () => removeEventListener("keypress", handleKeyPress);
    })

    const maxDigitNumber = () => {
        setCurrentValue("DIGIT LIMIT MET");
        setPreviousValue(currentValue);
        setTimeout(() => setCurrentValue(currentValue), 1000);
    };

    const handleNumberClick = ({ target }) => {
        if (!currentValue.includes("LIMIT")) {
            if (currentValue.length >= 21) {
                maxDigitNumber();
            } else if (evaluated) {
                setCurrentValue(target.value);
                setFormula(target.value);
                setEvaluated("");
            } else {
                setCurrentValue((prevValueState) => {
                    if (
                        endsWithOperator(prevValueState) ||
                        prevValueState === "0"
                    ) {
                        return target.value;
                    } else {
                        return prevValueState + target.value;
                    }
                });
                setFormula((prevFormulaState) => {
                    if (prevFormulaState === "0" || prevFormulaState === "") {
                        return target.value;
                    } else if (target.value === "0" && currentValue === "0") {
                        return prevFormulaState;
                    } else {
                        return prevFormulaState + target.value;
                    }
                });
            }
        }
    };

    const handleOperatorClick = ({ target }) => {
        if (!currentValue.includes("LIMIT")) {
            if (isOperator(target.value)) {
                if (evaluated) {
                    setFormula(evaluated);
                    setEvaluated("");
                }
                setCurrentValue(target.value);
                setFormula((prevFormula) => {
                    if (target.value !== "-") {
                        return replaceOperator(prevFormula, target.value);
                    } else {
                        return prevFormula.endsWith("-")
                            ? prevFormula.slice(0, -1)
                            : prevFormula + "-";
                    }
                });
            }
        }
    };

    const handleDecimalClick = () => {
        if (evaluated) {
            setCurrentValue("0.");
            setFormula("0.");
            setEvaluated("");
        } else {
            if (
                !currentValue.includes("LIMIT") &&
                !currentValue.includes(".")
            ) {
                if (endsWithOperator(currentValue)) {
                    setCurrentValue("0.");
                    setFormula(formula + "0.");
                } else {
                    setCurrentValue(currentValue + ".");
                    setFormula(formula === "" ? formula + "0." : formula + ".");
                }
            }
        }
    };

    const handleClear = () => {
        setCurrentValue("0");
        setPreviousValue("");
        setFormula("");
        setEvaluated("");
    };

    const handleEqualsClick = () => {
        const formulaToCalculate = formula
            .replace(/(\d*)=\d*$/, "$1")
            .replace(/[-+/*]*$/, "");
        const calcualted =
            Math.round(100000000000 * eval(formulaToCalculate)) / 100000000000;
        setCurrentValue(String(calcualted));
        setEvaluated(String(calcualted));
        setFormula(formulaToCalculate + `=${calcualted}`);
    };

    return (
        <div id="calculator" className="card">
            <Display currentValue={currentValue} formula={formula} />
            <NumberButtons handleNumberClick={handleNumberClick} />
            <OperatorButtons handleOperatorClick={handleOperatorClick} />
            <CalculatorButton
                id="clear"
                handleClick={handleClear}
                value={"clear"}
                className="button btn">
                AC
            </CalculatorButton>
            <CalculatorButton
                id="decimal"
                handleClick={handleDecimalClick}
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
