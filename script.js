/**
 * Kalyan Jewellers Franchise Opportunity - Form Handling & UI Logic
 * Year: 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Form Submissions
    initFranchiseForm();

    // 2. Smooth Scrolling for Anchor Links (Applies to #enquiry-form, #benefits, etc.)
    initSmoothScrolling();
});

/**
 * Handles validation, state changes, and API submission hooks for the enquiry form
 */
function initFranchiseForm() {
    const form = document.getElementById('franchiseForm');
    const successMessage = document.getElementById('successMessage');

    // Guard clause if the elements don't exist on the page
    if (!form || !successMessage) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // 1. Grab form input values dynamically
        const formData = {
            fullName: form.querySelector('input[type="text"]').value.trim(),
            mobileNumber: form.querySelector('input[type="tel"]').value.trim(),
            emailAddress: form.querySelector('input[type="email"]').value.trim(),
            proposedState: form.querySelector('placeholder="e.g., Maharashtra"' ) ? form.querySelectorAll('input[type="text"]')[1].value.trim() : '',
            proposedCity: form.querySelector('placeholder="e.g., Mumbai"') ? form.querySelectorAll('input[type="text"]')[2].value.trim() : '',
            investmentCapacity: form.querySelector('select').value,
            propertyStatus: form.querySelector('input[name="property"]:checked')?.value || 'Not specified',
            timestamp: new Date().toISOString()
        };

        // Re-mapping explicit locations just in case order changes
        const textInputs = form.querySelectorAll('input[type="text"]');
        if (textInputs.length >= 3) {
            formData.fullName = textInputs[0].value.trim();
            formData.proposedState = textInputs[1].value.trim();
            formData.proposedCity = textInputs[2].value.trim();
        }

        // 2. Submit Button UI Feedback Loop (Disable to prevent double submissions)
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="animate-spin h-5 w-5 text-stone-950 inline mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style="border-radius:50%; border:3px solid transparent; border-top-color:currentColor; width:1.25rem; height:1.25rem; display:inline-block; vertical-align:middle; animation: spin 1s linear infinite;">
                <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
            </svg> Processing...
        `;

        try {
            // =================================================================
            // 🛑 PRODUCTION API INTEGRATION HOOK
            // Un-comment and modify this section to send data to your real database/webhook
            // =================================================================
            /*
            const response = await fetch('https://your-backend-api.com/v1/franchise-enquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Network submission failed.');
            */

            // Simulating a minor network latency (0.8 seconds) for premium UI feedback
            await new Promise(resolve => setTimeout(resolve, 800));

            // Log successfully captured payload internally
            console.log("Franchise application safely captured & validated:", formData);

            // 3. Smoothly switch UI visibility state
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');

            // Scroll smoothly down onto the success message box
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } catch (error) {
            console.error("Submission Error:", error);
            alert("Something went wrong with the transmission. Please check your connection or contact the corporate team directly.");
            
            // Re-enable button on error loop
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

/**
 * Ensures anchor links (#benefits, #enquiry-form) transition beautifully when clicked
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Offset calculation accounting for the sticky navigation header header height (~80px)
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
