function radio_on_change(identifier){
    document.getElementById(identifier + "input").disabled = false
    document.getElementById(identifier == "A" ? "Sinput" : "Ainput").disabled = true
}
let result = 0

function display_result(){
    let result_div  = document.getElementById("result")
    result_div.style.visibility = "visible"
    let is_percent = document.getElementById("percent").checked
    result_div.innerText  = is_percent ? result.toString().replace(/0*\.(.{2})/gm , "$1.") + "%" : result
}

function read_data(){
    let S = 0
    let N = document.getElementById("Ninput")
    if(document.getElementById("Sradio").checked){
        S = document.getElementById("Sinput")
        S = +(S.value || S.placeholder)*(-1)
        N = +(N.value || N.placeholder)
    }
    else{
        S = document.getElementById("Ainput")
        S = +(S.value || S.placeholder)
        N = +(N.value || N.placeholder) * (-1)
    }
    let E = document.getElementById("Einput")
    
    let R = document.getElementById("Rinput")
    R = +(R.value || R.placeholder)
    
    E =+(E.value || E.placeholder)
    return {
        'n':N,
        'S':S,
        'R':R,
        "precision": E
    }
}

function calculate(){
    let data = read_data()
    let SR_multiplier = data.S/data.R
    let previous_i = 0
    let next_i = 0.12
    let iterator = 0
    while(Math.abs(next_i - previous_i) > data.precision){
        previous_i = next_i
        next_i = previous_i - ((1+previous_i)** data.n + SR_multiplier*previous_i - 1)/(data.n * (1+ previous_i) ** (data.n - 1 ) + SR_multiplier)
        iterator++
    }
    let rounding  = Math.log10(data.precision)* -1
    next_i = next_i.toFixed(rounding)
    result = next_i
    display_result()
}
