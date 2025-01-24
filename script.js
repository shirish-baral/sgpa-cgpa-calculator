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

const gradePoints = {
    'O': 10,
    'E': 9,
    'A': 8,
    'B': 7,
    'C': 6,
    'D': 5
};

// Function to display subjects for the selected semester
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
    table.classList.add('grade-table'); // Add class for styling
    const header = `<tr><th>Course</th><th>Credits</th><th>Grade</th></tr>`;
    table.innerHTML = header;

    courses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.name}</td>
            <td>${course.credits}</td>
            <td>
                <select class="grade" data-credits="${course.credits}">
                    <option value="" selected disabled>Select Grade</option>
                    <option value="O">O (10)</option>
                    <option value="E">E (9)</option>
                    <option value="A">A (8)</option>
                    <option value="B">B (7)</option>
                    <option value="C">C (6)</option>
                    <option value="D">D (5)</option>
                </select>
            </td>
        `;
        table.appendChild(row);
    });

    semesterContainer.appendChild(table);
}

// Function to calculate SGPA
function calculateSGPA() {
    let totalCredits = 0;
    let weightedSum = 0;
    let allGradesValid = true;

    document.querySelectorAll('.grade').forEach(select => {
        const gradeValue = select.value;
        const credits = parseInt(select.getAttribute('data-credits'));

        if (!gradeValue) {
            allGradesValid = false;
            select.style.border = '2px solid red'; // Highlight invalid fields
        } else {
            const gradePoint = gradePoints[gradeValue];
            weightedSum += gradePoint * credits;
            totalCredits += credits;
            select.style.border = ''; // Reset border for valid fields
        }
    });

    if (!allGradesValid) {
        alert('Please select grades for all subjects.');
        return;
    }

    const sgpa = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : 0;
    document.getElementById('result').textContent = `SGPA: ${sgpa}`;
}

// Function to calculate CGPA
function calculateCGPA() {
    // Get input values
    const newSemesterSgpa = parseFloat(document.getElementById('newSemesterSgpa').value);
    const semesterForSgpa = parseInt(document.getElementById('semesterForSgpa').value);
    const previousCgpa = parseFloat(document.getElementById('previousCgpa').value);

    // Validate inputs
    if (isNaN(newSemesterSgpa) || isNaN(semesterForSgpa) || isNaN(previousCgpa)) {
        alert('Please fill in all fields correctly.');
        return;
    }

    // Calculate total number of semesters (including the latest one)
    const totalSemesters = semesterForSgpa;

    // Calculate old semesters credit 
    let oldSemestersCredits = 0;
    for (let i = 1; i < totalSemesters;i++){
        const subjects = semesters[`${i}`];
        for (const subject of subjects){
            oldSemestersCredits += subject.credits;
        }
    }

    // Calculate new semesters credit 
    let newSemesterCredits = 0;
    for(const subject of semesters[`${semesterForSgpa}`]){
        newSemesterCredits += subject.credits;
    }

    // Calculate total semester credits
    const totalSemesterscredits = oldSemestersCredits + newSemesterCredits;

    // Calculate CGPA using the formula:
    const newCgpa = ((previousCgpa * oldSemestersCredits) + (newSemesterSgpa * newSemesterCredits) ) / totalSemesterscredits;

    // Display the result with updated styling
    const cgpaOutput = `
        <div class="cgpa-result">
            <div>Your updated CGPA after Semester ${semesterForSgpa} is: <span>${newCgpa.toFixed(2)}</span></div>
        </div>
    `;
    document.getElementById('cgpaResult').innerHTML = cgpaOutput;
}

// Function to toggle between SGPA and CGPA calculators
function toggleCalculator(type) {
    const sgpaCalc = document.getElementById('sgpa-calculator');
    const cgpaCalc = document.getElementById('cgpa-container');
    const buttons = document.querySelectorAll('.toggle-btn');

    if (type === 'sgpa') {
        sgpaCalc.classList.remove('hidden');
        cgpaCalc.classList.add('hidden');
        buttons[0].classList.add('active');
        buttons[1].classList.remove('active');
    } else {
        sgpaCalc.classList.add('hidden');
        cgpaCalc.classList.remove('hidden');
        buttons[0].classList.remove('active');
        buttons[1].classList.add('active');
    }
}

// Ensure SGPA is displayed by default when the page loads
window.onload = function () {
    toggleCalculator('sgpa'); // This will make sure SGPA is selected initially
};