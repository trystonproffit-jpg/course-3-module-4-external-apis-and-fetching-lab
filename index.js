// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

function fetchWeatherAlerts(state){
    fetch(`https://api.weather.gov/alerts/active?area=${state}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            return response.json();
        })

        .then(data => {
            console.log(data);
            clearError();

            displayAlerts(data);
        })

        .catch(errorObject => {
            console.log(errorObject.message);
            showError(errorObject.message);
        });
}

function displayAlerts(data){
    const alertsDisplay = document.getElementById("alerts-display");
    alertsDisplay.innerHTML = "";
    const alertCount = data.features.length;
    
    const summary = document.createElement("h2");
    summary.textContent = `Weather Alerts: ${alertCount}`;
    alertsDisplay.appendChild(summary);

    if (alertCount === 0){
        const noAlerts = document.createElement("p");
        noAlerts.textContent = "No active alerts for this state.";
        alertsDisplay.appendChild(noAlerts);
        return;
    }

    const ul = document.createElement("ul");

    data.features.forEach(alert => {
        const li = document.createElement("li");
        li.textContent = alert.properties.headline;
        ul.appendChild(li);
    })

    alertsDisplay.appendChild(ul);
    

}

const fetchButton = document.getElementById("fetch-alerts");
const stateInput = document.getElementById("state-input");

fetchButton.addEventListener("click", () => {
    const state = stateInput.value.trim().toUpperCase();

    if (state.length !== 2) {
        showError("Please enter a valid 2-letter state abbreviation.")
        return;
    }

    fetchWeatherAlerts(state);

    stateInput.value = "";
});

const errorMessageDiv = document.getElementById("error-message");

function showError(message){
    errorMessageDiv.textContent = message;
    errorMessageDiv.classList.remove("hidden");
}

function clearError(){
    errorMessageDiv.textContent = "";
    errorMessageDiv.classList.add("hidden");
}