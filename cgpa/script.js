// Define semesters with all subjects and credits
const semesters = {
    1: [
        { name: 'Physics', credits: 3 },
        { name: 'Mathematics', credits: 4 },
        { name: 'Chemistry', credits: 3 },
        { name: 'Engineering Graphics', credits: 2 },
        { name: 'Programming Lab', credits: 1 },
    ],
    2: [
        { name: 'Engineering Mechanics', credits: 3 },
        { name: 'Biology', credits: 3 },
        { name: 'Mathematics-II', credits: 4 },
        { name: 'Electrical Engineering', credits: 3 },
        { name: 'Workshop Practices', credits: 2 },
    ],
    3: [
        { name: 'Data Structures', credits: 4 },
        { name: 'Digital Systems', credits: 3 },
        { name: 'Automata Theory', credits: 4 },
    ],
    // Add remaining semesters as needed
};

// Display subjects dynamically for the selected semester
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

// Calculate SGPA
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

// Calculate CGPA
function calculateCGPA() {
    const previousCgpa = parseFloat(document.getElementById('previousCgpa').value);
    const previousSemesters = parseInt(document.getElementById('previousSemesters').value);
    const newSemesterSgpa = parseFloat(document.getElementById('newSemesterSgpa').value);

    if (isNaN(previousCgpa) || isNaN(previousSemesters) || isNaN(newSemesterSgpa)) {
        alert('Please fill out all fields with valid numbers!');
        return;
    }

    const totalCredits = previousSemesters + 1;
    const newCgpa = ((previousCgpa * previousSemesters) + newSemesterSgpa) / totalCredits;

    alert(`Your updated CGPA is: ${newCgpa.toFixed(2)}`);
    document.getElementById('cgpaResult').textContent = `CGPA: ${newCgpa.toFixed(2)}`;
}
