const semesters = {
    1: [
        { name: 'Physics', credits: 3 },
        { name: 'Differential Equations and Linear Algebra', credits: 4 },
        { name: 'Science Elective', credits: 2 },
        { name: 'Engineering Elective II', credits: 2 },
        { name: 'Science of Living Systems', credits: 2 },
        { name: 'Environmental Science', credits: 2 },
        { name: 'Physics Lab', credits: 1 },
        { name: 'Programming Lab', credits: 4 },
        { name: 'Engineering Drawing & Graphics', credits: 1 }
    ],
    2: [
        { name: 'Chemistry', credits: 3 },
        { name: 'Transform Calculus and Numerical Analysis', credits: 4 },
        { name: 'English', credits: 2 },
        { name: 'Basic Electronics', credits: 2 },
        { name: 'Engineering Elective I', credits: 2 },
        { name: 'HASS Elective I', credits: 2 },
        { name: 'Chemistry Lab', credits: 1 },
        { name: 'Engineering Lab', credits: 1 },
        { name: 'Workshop', credits: 1 },
        { name: 'Communication Lab', credits: 1 },
        { name: 'Yoga', credits: 1 }
    ],
    3: [
        { name: 'Scientific and Technical Writing', credits: 2 },
        { name: 'Probability and Statistics', credits: 4 },
        { name: 'Industry 4.0 Technologies', credits: 2 },
        { name: 'Data Structures', credits: 4 },
        { name: 'Digital Systems Design', credits: 3 },
        { name: 'Automata Theory and Formal Languages', credits: 4 },
        { name: 'Data Structures Laboratory', credits: 1 },
        { name: 'Digital Systems Design Laboratory', credits: 1 }
    ],
    4: [
        { name: 'HASS Elective II', credits: 3 },
        { name: 'Discrete Structures', credits: 4 },
        { name: 'Operating Systems', credits: 3 },
        { name: 'Object Oriented Programming using Java', credits: 3 },
        { name: 'Database Management Systems', credits: 3 },
        { name: 'Computer Organization and Architecture', credits: 4 },
        { name: 'Operating Systems Laboratory', credits: 1 },
        { name: 'Java Programming Laboratory', credits: 1 },
        { name: 'Database Management Systems Laboratory', credits: 1 },
        { name: 'Vocational Electives', credits: 1 }
    ],
    5: [
        { name: 'Engineering Economics', credits: 3 },
        { name: 'Design and Analysis of Algorithms', credits: 3 },
        { name: 'Software Engineering', credits: 4 },
        { name: 'Computer Networks', credits: 3 },
        { name: 'Professional Elective-I', credits: 3 },
        { name: 'Professional Elective-II', credits: 3 },
        { name: 'Algorithms Laboratory', credits: 1 },
        { name: 'Computer Networks Laboratory', credits: 1 },
        { name: 'K-Explore Open Elective-I', credits: 1 }
    ],
    6: [
        { name: 'HASS Elective-III', credits: 3 },
        { name: 'Machine Learning', credits: 4 },
        { name: 'Artificial Intelligence', credits: 3 },
        { name: 'Professional Elective-III', credits: 3 },
        { name: 'Open Elective-II/ MI-I', credits: 3 },
        { name: 'Universal Human Values', credits: 3 },
        { name: 'Artificial Intelligence Laboratory', credits: 1 },
        { name: 'Applications Development Laboratory', credits: 2 },
        { name: 'Mini Project', credits: 2 }
    ],
    7: [
        { name: 'Professional Elective-IV', credits: 3 },
        { name: 'Engineering Professional Practice', credits: 2 },
        { name: 'Open Elective-III/ (MI-II)', credits: 3 },
        { name: 'Project-I', credits: 5 },
        { name: 'Internship', credits: 2 },
        { name: 'MI- (Computing Laboratory)', credits: 2 }
    ],
    8: [
        { name: 'Research Elective', credits: 3 },
        { name: 'Research Project', credits: 12 }
    ]
};

function showSemesterSubjects() {
    const selectedSemester = document.getElementById('semesterSelect').value;
    const semesterContainer = document.getElementById('semesters');
    semesterContainer.innerHTML = '';

    if (!semesters[selectedSemester]) {
        semesterContainer.innerHTML = '<p>No data available for this semester.</p>';
        return;
    }

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

function calculateSGPA() {
    let totalCredits = 0;
    let weightedSum = 0;
    let allGradesValid = true;

    document.querySelectorAll('.grade').forEach(input => {
        const grade = parseFloat(input.value);
        const credits = parseInt(input.getAttribute('data-credits'));

        if (isNaN(grade) || grade < 0 || grade > 10) {
            allGradesValid = false;
            input.style.border = '2px solid red'; // Highlight invalid fields
        } else {
            weightedSum += grade * credits;
            totalCredits += credits;
            input.style.border = ''; // Reset border for valid fields
        }
    });

    if (!allGradesValid) {
        alert('Please ensure all grade inputs are valid (0-10).');
        return;
    }

    const sgpa = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : 0;
    alert(`Your SGPA is: ${sgpa}`);
    document.getElementById('result').textContent = `SGPA: ${sgpa}`;
}

function calculateCGPA() {
    const previousCgpa = parseFloat(document.getElementById('previousCgpa').value);
    const previousSemesters = parseInt(document.getElementById('previousSemesters').value);
    const newSemesterSgpa = parseFloat(document.getElementById('newSemesterSgpa').value);

    if (
        isNaN(previousCgpa) || previousCgpa < 0 || previousCgpa > 10 ||
        isNaN(previousSemesters) || previousSemesters < 1 ||
        isNaN(newSemesterSgpa) || newSemesterSgpa < 0 || newSemesterSgpa > 10
    ) {
        alert('Please enter valid CGPA, semester count, and SGPA values.');
        return;
    }

    const totalSemesters = previousSemesters + 1;
    const cgpa = ((previousCgpa * previousSemesters) + newSemesterSgpa) / totalSemesters;
    document.getElementById('cgpaResult').textContent = `CGPA: ${cgpa.toFixed(2)}`;
}



