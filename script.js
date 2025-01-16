const semesters = {
    1: [
        { name: 'Physics', credits: 3 },
        { name: 'Differential Equations and Linear Algebra', credits: 4 },
        { name: 'Science Elective', credits: 2 },
    ],
    2: [
        { name: 'Chemistry', credits: 3 },
        { name: 'Transform Calculus', credits: 4 },
        { name: 'English', credits: 2 },
    ],
    3: [
        { name: 'Data Structures', credits: 4 },
        { name: 'Digital Systems Design', credits: 3 },
        { name: 'Automata Theory', credits: 4 },
    ],
};

function showSemesterSubjects() {
    const selectedSemester = document.getElementById('semesterSelect').value;
    const semesterContainer = document.getElementById('semesters');
    semesterContainer.innerHTML = '';

    if (selectedSemester && semesters[selectedSemester]) {
        const courses = semesters[selectedSemester];
        const table = document.createElement('table');
        const header = `<tr><th>Course</th><th>Credits</th><th>Grade (0-10)</th></tr>`;
        table.innerHTML = header;

        courses.forEach(course => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${course.name}</td>
                <td>${course.credits}</td>
                <td><input type="number" min="0" max="10" step="0.1" data-credits="${course.credits}" class="grade"></td>
            `;
            table.appendChild(row);
        });

        semesterContainer.appendChild(table);
    }
}

function calculateSGPA() {
    let totalCredits = 0;
    let weightedSum = 0;

    document.querySelectorAll('.grade').forEach(input => {
        const grade = parseFloat(input.value);
        const credits = parseInt(input.getAttribute('data-credits'));

        if (!isNaN(grade)) {
            weightedSum += grade * credits;
            totalCredits += credits;
        }
    });

    const sgpa = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : 0;
    alert(`Your SGPA is: ${sgpa}`);
    document.getElementById('result').textContent = `SGPA: ${sgpa}`;
}
