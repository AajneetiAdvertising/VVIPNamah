async function handleFormSubmit(formId) {
    const form = document.getElementById(formId);
    if (!form) {
        console.error(`Form with ID ${formId} not found.`);
        return;
    }

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Show waiting indicator
        Swal.fire({
            title: 'Submitting...',
            text: 'Please wait while we process your request.',
            icon: 'info',
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            // Gather form data
            const name = form.querySelector('[name="name1"]') ? form.querySelector('[name="name1"]').value.trim() : '';
            const phone = form.querySelector('[name="phone"]') ? form.querySelector('[name="phone"]').value.trim() : '';
            const city = form.querySelector('[name="City"]') ? form.querySelector('[name="City"]').value.trim() : '';

            // Validation for missing fields
            let missingFields = [];
            if (!name) missingFields.push('Name');
            if (!phone) missingFields.push('Phone');
            if (!city) missingFields.push('City');

            if (missingFields.length > 0) {
                throw new Error(`Missing fields: ${missingFields.join(', ')}`);
            }

            // Validate phone number length
            if (!/^\d{10}$/.test(phone)) {
                throw new Error('Invalid phone number. Please enter a valid 10-digit mobile number.');
            }

            const payload = {
                page_url: "http://127.0.0.1:5501/index.html", // Replace with actual page URL if needed
                project_name: "VVIP Namah", // Replace with actual project name
                name: name,
                mobile: phone,
                city: city
            };

            const apiUrl = "https://api.aajneetiadvertising.com/lead/save";

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            };

            const response = await fetch(apiUrl, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response data:", data);

            // Show success popup
            Swal.fire({
                title: 'Thank You!',
                text: 'Your form has been submitted successfully.',
                icon: 'success',
                confirmButtonText: 'Close'
            });

            // Reset the form
            form.reset();

        } catch (error) {
            console.error("Error:", error);

            // Show error popup
            Swal.fire({
                title: 'Error',
                text: error.message || 'There was an error submitting the form. Please try again.',
                icon: 'error',
                confirmButtonText: 'Close'
            });
        } finally {
            // Ensure the loading spinner is closed
            Swal.close();
        }
    });
}

// Initialize forms
handleFormSubmit('ajax-header-contact'); // First form
handleFormSubmit('ajax-header-contact-2'); // Second form
// handleFormSubmit('ajax-header-contact-3'); // Third form
