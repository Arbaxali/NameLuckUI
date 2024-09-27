document.getElementById('inputForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.replaceAll(" ", "");
    const datetime = document.getElementById('datetime').value;

    const namePattern = /^[A-Za-z]+$/;
    const datetimePattern = /^\d{2}-\d{2}-\d{4}$/;

    if (!namePattern.test(name)) {
        alert("Name should only contain alphabetic characters.");
        return;
    }

    if (!datetimePattern.test(datetime)) {
        alert("Date should be in dd-mm-yyyy format and only contain numbers.");
        return;
    }

    const payload = { name, datetime };

   // try {
     //   const response = await fetch('https://nameluckweb.azurewebsites.net/Main', {
       //     method: 'POST',
         //   headers: { 'Content-Type': 'application/json' },
           // body: JSON.stringify(payload)
        //});

    try {
        const response = await fetch('http://35.208.10.119:7000/WeatherForecast/InsertNameAndDob', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            displayResult(data);
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function displayResult(data) {
    document.getElementById('inputForm').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('input').textContent = `Name:  ${data.input}`;
    document.getElementById('Datetime').textContent = `Date of birth:  ${data.Datetime}`;
    document.getElementById('dobSum').textContent = `Total sum of date of birth is: ${data.DobSum}`;
    document.getElementById('nameSum').textContent = `Total sum of name is: ${data.SumofName
    }`;
    document.getElementById('finalResult').textContent = `Pyramid Lucky Number is: ${data.finalResult
    }`

    const pyramidDiv = document.getElementById('pyramid');
    pyramidDiv.innerHTML = '';
    data.pyramid.forEach(level => {
        const levelDiv = document.createElement('div');
        level.forEach(num => {
            const span = document.createElement('span');
            span.textContent = num;
            levelDiv.appendChild(span);
        });
        pyramidDiv.appendChild(levelDiv);
    });
}

document.getElementById('backButton').addEventListener('click', () => {
    document.getElementById('inputForm').style.display = 'flex';
    document.getElementById('result').style.display = 'none';
});
