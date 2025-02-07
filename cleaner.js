// MIT License
//

let visitedStates = new Set(); // Guarda los estados visitados

function getStateKey(location, stateA, stateB) {
    return `${location}-${stateA}-${stateB}`;
}

function reflex_agent(location, state){
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

function test(states){
    let location = states[0];
    let stateA = states[1];
    let stateB = states[2];
    
    let currentStateKey = getStateKey(location, stateA, stateB);
    visitedStates.add(currentStateKey);
    
    document.getElementById("log").innerHTML += `<br>Location: ${location} | State A: ${stateA} | State B: ${stateB} | Visited: ${visitedStates.size}/8`;
    
    if (visitedStates.size >= 8) {
        document.getElementById("log").innerHTML += "<br>All states visited. Stopping.";
        return;
    }
    
    let state = (location == "A") ? stateA : stateB;
    let action_result = reflex_agent(location, state);
    
    document.getElementById("log").innerHTML += ` | Action: ${action_result}`;
    
    if (action_result == "CLEAN") {
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    }
    else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";
    
    setTimeout(() => test(states), 1000);
}

var states = ["A", "DIRTY", "DIRTY"];
test(states);
