import Sidebar from './sidebar';

export default function Support() {    
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <Sidebar />
            <div class="support-container">
                <h1>Customer Care</h1>
                <p>Welcome to our customer care page. We're here to help you with any questions or issues you may have. Please feel free to contact us using the information below or fill out the contact form.</p>

                <div class="contact-info">
                    <h2>Contact Information</h2>
                    <p><strong>Email:</strong> -----@-----.com</p>
                    <p><strong>Phone:</strong> +91 ----------</p>
                    <p><strong>Address:</strong> ----------</p>
                </div>

                <div class="contact-form">
                    <h2>Complaint Form</h2>
                    <form id="contactForm">
                        <textarea id="message" name="message" rows="4" required placeholder='Write your complaint here...'></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}