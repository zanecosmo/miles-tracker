const button = document.querySelector(".submit");

const inputs = {
    milesDriven: document.querySelector(".miles-driven"),
    startTime: document.querySelector(".start-time"),
    endTime: document.querySelector(".end-time"),
    income: document.querySelector(".income"),
};
const hasNoCharacters = (string) => {
    for (char of string) {if (char !== " ") return false};
    return true;
};

const extractFormText = () => {

    const shift = {};

    for (const input in inputs) {

        console.log(typeof inputs[input].value);

        // if (inputs[key].id === "start-time" || inputs[key].id === "end-time") {
        //     console.log(typeof inputs[key].value);
        // }

        if (inputs[input].value.length === 0) {
            console.log("all fields are required");
            break;
        };

        if (hasNoCharacters(inputs[input].value)) {
            console.log("all fields are required");
            break;
        };

        shift[input] = inputs[input].value;
    };

    return shift;
};

button.addEventListener("click", async (e) => {
    const shift = extractFormText();

    const requestObject = {
        shift: shift,
    }
    
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
        console.log(body);
    } catch (e) {
        console.log(e.message);
    };
});
