const submitButton = document.querySelector(".submit");

const inputs = {
    milesDriven: document.querySelector(".miles-driven"),
    startTime: document.querySelector(".start-time"),
    endTime: document.querySelector(".end-time"),
    income: document.querySelector(".income"),
};

let currentToast = "";

const displayToast = (className) => {
    if (currentToast !== "") document.querySelector(`.${currentToast}`).classList.add("invisible");
    document.querySelector(`.${className}`).classList.remove("invisible");
    currentToast = className;
}

const hasNoCharacters = (string) => {
    for (char of string) if (char !== " ") return false;
    return true;
};

const extractFormText = () => {
    const shift = {};
    for (const input in inputs) shift[input] = inputs[input].value;
    return shift;
};

const validateForm = () => {
    for (const input in inputs) {
        if (inputs[input].value.length === 0 || hasNoCharacters(inputs[input].value)) {
            displayToast("validation");
            currentToast = "validation";
            return false;
        };
    };
    return true;
};

const clearForm = () => {for (const input in inputs) inputs[input].value = null};

submitButton.addEventListener("click", async (e) => {
    if (!validateForm()) return;

    const shift = extractFormText();

    const requestObject = {
        shift: shift
    };
    
    const jsonMessage = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestObject)
    };

    const testServer = "http://127.0.0.1:3000/test-post"

    try {
        const response = await fetch(testServer, jsonMessage);
        const body = await response.json();
        if ("error" in body) displayToast("data-failure");
        else {
            displayToast("data-success");
            clearForm();
        }
    } catch (e) {
        console.log(e.message);
    };
});
