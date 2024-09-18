document.getElementById('input').addEventListener('change', function() {
    readXlsxFile(this.files[0]).then(function(rows) {
        const headers = rows[0];
        const getCol = (colName) => headers.indexOf(colName);
        
        const cols = {
            department: getCol('Department'),
            gender: getCol('Gender'),
            salary: getCol('Annual Salary'),
            hireDate: getCol('Hire Date'),
            exitDate: getCol('Exit Date'),
            age: getCol('Age'),
            fullName: getCol('Full Name')
        };

        const data = rows.slice(1);
        const output = document.getElementById('output');
        output.innerHTML = ""; // Tøm output-området først

        const womenInIT = data.filter(row => row[cols.department] === 'IT' && row[cols.gender] === 'Female').length;
        output.innerHTML += `<p>Antall kvinner i IT-bransjen: ${womenInIT}</p>`;

        const departments = new Set(data.map(row => row[cols.department]));
        output.innerHTML += `<p>Antall avdelinger i selskapet: ${departments.size}</p>`;

        const genderCount = data.reduce((acc, row) => {
            acc[row[cols.gender]] = (acc[row[cols.gender]] || 0) + 1;
            return acc;
        }, {});
        output.innerHTML += `<p>${genderCount.Male > genderCount.Female ? 'Flere mannlige ansatte' : 'Flere kvinnelige ansatte'}</p>`;

        const youngestAge = Math.min(...data.map(row => row[cols.age]));
        const youngestEmployees = data.filter(row => row[cols.age] === youngestAge).map(row => row[cols.fullName]);
        output.innerHTML += `<p>Yngste ansatte: ${youngestEmployees.join(', ')}</p>`;

        const highestSalary = Math.max(...data.map(row => row[cols.salary]));
        const departmentWithHighestSalary = data.find(row => row[cols.salary] === highestSalary)[cols.department];
        output.innerHTML += `<p>Avdeling med høyest lønn: ${departmentWithHighestSalary}</p>`;

        const earliestHireDate = new Date(Math.min(...data.map(row => new Date(row[cols.hireDate]))));
        const firstEmployee = data.find(row => new Date(row[cols.hireDate]).getTime() === earliestHireDate.getTime());
        output.innerHTML += `<p>Første ansatte: ${firstEmployee[cols.fullName]}</p>`;

        const resignedIn2019 = data.filter(row => new Date(row[cols.exitDate]).getFullYear() === 2019).length;
        output.innerHTML += `<p>Antall ansatte som sluttet i 2019: ${resignedIn2019}</p>`;

        const latestExitDate = new Date(Math.max(...data.map(row => new Date(row[cols.exitDate]))));
        const lastEmployeeToLeave = data.find(row => new Date(row[cols.exitDate]).getTime() === latestExitDate.getTime());
        output.innerHTML += `<p>Siste som sluttet: ${lastEmployeeToLeave[cols.fullName]}</p>`;

        const nameCounts = data.reduce((acc, row) => {
            acc[row[cols.fullName]] = (acc[row[cols.fullName]] || 0) + 1;
            return acc;
        }, {});
        const sameNameEmployees = Object.keys(nameCounts).filter(name => nameCounts[name] > 1);
        output.innerHTML += `<p>Ansatte med samme navn: ${sameNameEmployees.join(', ')}</p>`;
    });
});
