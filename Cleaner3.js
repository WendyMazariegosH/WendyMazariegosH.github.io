// MIT License
// 

function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

// Conjunto para rastrear estados visitados
let visitedStates = new Set();

function test(states) {
    let location = states[0];    
    let stateA = states[1];  
    let stateB = states[2];  

    let currentState = `${location}-${stateA}-${stateB}`;

    // Si ya hemos visitado este estado, lo agregamos al registro
    if (!visitedStates.has(currentState)) {
        visitedStates.add(currentState);
    }

    // Mostrar el estado ANTES de ejecutar la acción
    document.getElementById("log").innerHTML += `<br>🔵 Estado actual: Location: ${location} | State A: ${stateA} | State B: ${stateB}`;

    // Obtener la acción del agente
    let action_result = reflex_agent(location, location == "A" ? stateA : stateB);

    // Ejecutar la acción
    if (action_result == "CLEAN") {
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    } 
    else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";

    // Mostrar el estado DESPUÉS de la acción
    document.getElementById("log").innerHTML += `<br>🟢 Acción: ${action_result} | Nuevo estado: Location: ${states[0]} | State A: ${states[1]} | State B: ${states[2]}`;

    // Verificar si ya hemos visitado los 8 estados
    if (visitedStates.size >= 8) {
        document.getElementById("log").innerHTML += "<br>✅ Todos los 8 estados han sido visitados. Deteniendo ejecución.";
        return;
    }

    // Llamar recursivamente después de 2 segundos
    setTimeout(function() { test(states); }, 2000);
}

// Estado inicial: La aspiradora está en "A" y ambos lados están sucios
var states = ["A", "DIRTY", "DIRTY"];
test(states);

