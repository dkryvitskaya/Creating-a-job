// Function to validate that all required fields are filled
function validateForm() {
    const requiredFields = [
        { id: 'firstName', name: 'First name' },
        { id: 'lastName', name: 'Last name' },
        { id: 'phone', name: 'Phone' },
        { id: 'jobType', name: 'Job type' },
        { id: 'jobSource', name: 'Job source' },
        { id: 'address', name: 'Address' },
        { id: 'city', name: 'City' },
        { id: 'state', name: 'State' },
        { id: 'code', name: 'Zip code' },
        { id: 'area', name: 'Area' },
        { id: 'date', name: 'Start date' },
        { id: 'startTime', name: 'Start time' },
        { id: 'endTime', name: 'End time' },
        { id: 'technician', name: 'Technician' }
    ];

    // Loop through each required field to check if it's filled
    for (let field of requiredFields) {
        const inputValue = document.getElementById(field.id).value;
        if (!inputValue) {
            alert(`Please fill out the ${field.name} field.`);
            console.log(`${fieldName} is empty`); // Debugging log
            return false; // Stop the function if any field is empty
        }
    }
    return true; // All fields are filled, return true
}

// Function to create the job deal
async function createJob() {
    // Validate the form first
    if (!validateForm()) {
        return; // Stop if form validation fails
    }

    // Retrieve values from the form
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const jobType = document.getElementById("jobType").value;
    const jobSource = document.getElementById("jobSource").value;
    const jobDescription = document.getElementById("jobDescription").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zipCode = document.getElementById("code").value;
    const area = document.getElementById("area").value;
    const date = document.getElementById("date").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const technician = document.getElementById("technician").value;

    // Replace this with your actual Pipedrive API token
    const apiToken = '29ee31b9e46371fc678f508d4ac4efd23da765fc';

    // Prepare deal data object to be sent to Pipedrive
    const dealData = {
        title: `${firstName} ${lastName} - ${jobType}`,  // Deal title
        person_name: `${firstName} ${lastName}`,  // Client name
        phone: phone,
        email: email,
        job_source: jobSource,
        job_description: jobDescription,
        address: address,
        city: city,
        state: state,
        zip_code: zipCode,
        area: area,
        scheduled_date: date,
        start_time: startTime,
        end_time: endTime,
        technician: technician
    };

    try {
        // Send a request to Pipedrive API to create the deal
        const response = await fetch(`https://api.pipedrive.com/v1/deals?api_token=${apiToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dealData)  // Send data in JSON format
        });

        // Handle the response
        if (response.ok) {
            const result = await response.json();

            // Change the button text and color on success
            const createButton = document.querySelector('button[onclick="createJob()"]');
            createButton.textContent = "Request is sent";
            createButton.style.backgroundColor = "red";

            // Wait a moment before refreshing the page and showing success message
            setTimeout(() => {
                displaySuccessMessage(result.data.id);
            }, 1500);
        } else {
            alert('Error creating deal in Pipedrive');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error creating deal');1
    }
}

// Function to display the success message and link to the created deal
function displaySuccessMessage(dealId) {
    // Clear the page content
    document.body.innerHTML = `
        <div style="text-align: center; margin-top: 50px;">
            <h1>Data loaded successfully. Job was created.</h1>
            <a href="https://individualwork.pipedrive.com/deal/${dealId}" target="_blank" style="color: blue; text-decoration: underline;">View deal</a>
        </div>
    `;
}

// Function to save form data locally without sending it to Pipedrive
function saveInfo() {
    // Retrieve values from the form
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const jobType = document.getElementById("jobType").value;
    const jobSource = document.getElementById("jobSource").value;
    const jobDescription = document.getElementById("jobDescription").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zipCode = document.getElementById("code").value;
    const area = document.getElementById("area").value;
    const date = document.getElementById("date").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const technician = document.getElementById("technician").value;

    // Store the data locally (for example, in localStorage)
    const formData = {
        firstName,
        lastName,
        phone,
        email,
        jobType,
        jobSource,
        jobDescription,
        address,
        city,
        state,
        zipCode,
        area,
        date,
        startTime,
        endTime,
        technician
    };

    localStorage.setItem('formData', JSON.stringify(formData));  // Save to localStorage
    alert('Information saved locally');
}
