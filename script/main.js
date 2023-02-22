let nameActivity = "";
let numberUtility = "";
let numberInvestors = "";
let moneyTotal;
const personInversors = [];
function addInversor() {
    let state;
  const investor = document.querySelectorAll(".inversor");
  console.log(investor);
  for (i = 0; i < investor.length; i++) {
    const name = investor[i].querySelector("#name").value;
    const investmentAmount =
      investor[i].querySelector("#investmentAmount").value;
    if (name != "" && investmentAmount != "") {
      personInversors.push({
        name: name,
        investmentAmount: parseFloat(investmentAmount), 
      });
        state = true;
    } else {
        swal(
            "Te falta ingresar datos",
            "Ingrese, un nombre y un valor, y vuelva a intentarlo",
            "error"
        );
        state = false;
    }
}
    if (state){
        const main = document.querySelector('main');
        const divMain = main.querySelector('div');
        const sectionForm = main.querySelector('.inversor_section');
        sectionForm.remove();
        const headerH1 = document.querySelector('header h1');
        headerH1.remove();
        divMain.remove();
            const sectionResultCreate = document.createElement('section');
            sectionResultCreate.classList.add('section_result');
            sectionResultCreate.innerHTML = `        <div class="section-result_information">
            <h1>Actividad: "${nameActivity}"</h1>
            <p><b> Dinero total obtenido: </b> S/. ${numberUtility}}</p>
            <p><b> Dinero total invertido: </b> S/. ${totalMoneyInversion(personInversors)</p>
            <p>
              <b> Utilidad neta: </b>
              S/. ${numberUtility - totalMoneyInversion(personInversors)}
            </p>
          </div>
          `
          const sectionResultInformationInversor = document.createElement('section');
            sectionResultInformationInversor.classList.add('section-result_information_inversor');
        sectionResultCreate.append(sectionResultInformationInversor);
        
        for (person in personInversors){
          const totalUtility = numberUtility - totalMoneyInversion(personInversors);
          const porcentage = calculatePorcentageUtility(totalMoneyInversion(personInversors), personInversors[person].investmentAmount);
          sectionResultInformationInversor.innerHTML +=`
          <div class="data-container_inversor">
            <h2>Inversor ${parseInt(person)+ 1}</h2>
            <p><b>Nombre:</b> ${personInversors[person].name}</p>
            <p><b>Dinero invertido:</b> S/.${personInversors[person].investmentAmount}</p>
            <p><b>Porcentaje de la utilidad neta:</b> %${porcentage}</p>
            <p><b>Dinero invertido + utilidad neta:</b> S/.${moneyPlusInvestment(porcentage, personInversors[person].investmentAmount, totalUtility)}</p>
            <p><b>Ganancia: </b>S/ ${calculateRevenue(totalUtility, porcentage)}</p>
          </div>
          `}
            main.append(sectionResultCreate);
            const button = document.createElement('button');
            button.classList.add('btn');
            button.textContent = 'Volver a calcular';
            main.append(button);
            button.addEventListener('click', () => {
                location.reload();
            }
            )
    }     
  

}
function calculatePorcentageUtility(total, money) {
  const rta = (money * 100) / total;
  return parseFloat(rta.toFixed(2));
}
function moneyPlusInvestment(percentage, money, utility) {
  const rta = utility * percentage/100 + money;
  return parseFloat(rta.toFixed(2));
}
function calculateRevenue(utility, percentage) {
const rta = utility*percentage/100;
return parseFloat(rta.toFixed(2));
}

function initialForm() {
  const sectionDate = document.querySelector(".section_date");
  sectionDate.innerHTML = "";
  const labelActivity = document.createElement("label");
  labelActivity.setAttribute("for", "name_activity");
  labelActivity.setAttribute("id", "label_activity_name");
  labelActivity.textContent = "Nombre de la actividad";
  const inputActivity = document.createElement("input");
  inputActivity.setAttribute("id", "name_activity");
  inputActivity.setAttribute("class", "date_inversion");
  inputActivity.setAttribute("type", "text");
  inputActivity.setAttribute(
    "placeholder",
    "Ejm. Compra y venta de  Smartphones"
  );
  inputActivity.addEventListener("change", saveNameActivity);
  inputActivity.value = nameActivity;
  const btnNextActivity = document.createElement("button");
  btnNextActivity.setAttribute("class", "btn");
  btnNextActivity.textContent = "Siguiente";
  btnNextActivity.id = "btn_activity";
  const section_date = document.querySelector(".section_date");
  section_date.appendChild(labelActivity);
  section_date.appendChild(inputActivity);
  section_date.appendChild(btnNextActivity);
  btnNextActivity.addEventListener("click", nextUtility);
}
initialForm();
function nextUtility() {
  if (document.querySelector("#name_activity").value != "") {
    console.log("cambio");
    const labelActivity = document.querySelector("#label_activity_name");
    const inputActivity = document.querySelector("#name_activity");
    labelActivity.remove();
    inputActivity.remove();
    const btnNextActivity = document.querySelector("#btn_activity");
    btnNextActivity.remove();
    //
    const sectionDate = document.querySelector(".section_date");
    sectionDate.innerHTML = `
    <label>
    Dinero total obtenido
    </label>
    <input id="utility_money" value = "${numberUtility}" onchange = "saveUtilityValue()" id="utility" class="date_inversion" placeholder="Ejm. 10000"/>
    <div>
    <button onclick = "backActivity()" id="btnBackActivity" class="btn">
    Atras 
    </button>
    <button onclick = "nextNumberInversors()" class="btn">
    Siguiente
    </button>
    </div>
    `;
  } else {
    swal(
      "Te falta ingresar el nombre de la actividad",
      "Ingrese, un nombre, y vuelva a intentarlo",
      "error"
    );
  }
}
function saveUtilityValue() {
  numberUtility = parseInt(event.target.value);
}
function saveNameActivity() {
  nameActivity = event.target.value;
}
function backActivity() {
  initialForm();
}
function nextNumberInversors() {
  if (document.querySelector("#utility_money").value != "") {
    const sectionDate = document.querySelector(".section_date");
    sectionDate.innerHTML = "";
    sectionDate.innerHTML = `
    <select onchange="saveNumbersInversors()" id="numberInvestors" class="date_inversion" name="cantidad_inversonistas" id="">
    <option selected disabled value="">Cantidad de inversionistas</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    </select>
    <div>
    <button onclick = "backUtility()" id="btnBackActivity" class="btn">
    Atras 
    </button>
    <button onclick = "renderNumberInversors()" class="btn">
    Siguiente
    </button>
    </div>
    `;
  } else {
    swal(
      "Te falta ingresar la ganancia total",
      "Ingrese, un valor, y vuelva a intentarlo",
      "error"
    );
  }
}
function backUtility() {
  numberInvestors = 0;
  renderNumberInversors();
  const sectionDate = document.querySelector(".section_date");
  sectionDate.innerHTML = "";
  sectionDate.innerHTML = `
    <label>
    Utilidad neta
    </label>
    <input id="utility_money" value = "${numberUtility}" onchange = "saveUtilityValue()" id="utility" class="date_inversion" placeholder="Ejm. 1000"/>
    <div>
    <button onclick = "backActivity()" id="btnBackActivity" class="btn">
    Atras 
    </button>
    <button onclick = "nextNumberInversors()" class="btn">
    Siguiente
    </button>
    </div>
    `;
}
function renderNumberInversors() {
  if (typeof numberInvestors == "number") {
    const mainDiv = document.querySelector("main");

    const inversorSection = document.querySelector(".inversor_section");
    if (inversorSection) {
      inversorSection.remove();
    }
    const inversorSectionCreate = document.createElement("section");
    inversorSectionCreate.classList.add("inversor_section");
    mainDiv.append(inversorSectionCreate);
    const formInversors = document.createElement("form");
    inversorSectionCreate.append(formInversors);

    for (let i = 0; i < numberInvestors; i++) {
      formInversors.innerHTML += `<div class="inversor">
            <h2>Inversor ${i + 1}</h2>
            <input id="name" class="date_inversion" type="text" placeholder="Ingrese su nombre"/>
            <input id="investmentAmount" class="date_inversion" type="number" placeholder="Ingrese el monto de la inversión"/>
          </div>
          `;
    }
    if (numberInvestors > 0) {
      inversorSectionCreate.innerHTML += `
  <button onclick = "addInversor()" class="btn">
  Calcular
  </button>
  `;
    }
  } else {
    swal(
      "Te falta ingresar la cantidad de inversores",
      "Ingrese, una cantidad, y vuelva a intentarlo",
      "error"
    );
  }
}
function saveNumbersInversors() {
  numberInvestors = parseInt(event.target.value);
}
function totalMoneyInversion(array) {
  return array.reduce((sum, item) => sum + item.investmentAmount, 0);
}
