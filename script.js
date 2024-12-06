//javascript

// DOM Elements
const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('sidebar-toggle');
const searchBox = document.getElementById('search-box');
const searchResults = document.getElementById('search-results');
const tabs = document.getElementById('tabs');
const contentArea = document.getElementById('document-content');
const loadingSpinner = document.getElementById('loading-spinner');
const progressBar = document.getElementById('progress-bar');
const breadcrumbs = document.getElementById('breadcrumbs');
const backToTop = document.getElementById('back-to-top');

// Mock document sections with HTML content
// Mock document sections with HTML content
const sections = [
    {
        id: 1,
        title: 'Dashboard',
        content: `
            <div class="section">
                <h2>Dashboard Overview</h2>
                <p>Welcome to the Dashboard. Here you will find an overview of all your key metrics.</p>
                <ul>
                    <li>Metric 1: Value</li>
                    <li>Metric 2: Value</li>
                    <li>Metric 3: Value</li>
                </ul>
            </div>
        `
    },
    {
        id: 2,
        title: 'Transactions',
        content: `
            <div class="section">
                <h2>Recent Transactions</h2>
                <p>Here are your recent transactions.</p>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Type</th>
                    </tr>
                    <tr>
                        <td>2024-12-01</td>
                        <td>$500.00</td>
                        <td>Credit</td>
                    </tr>
                    <tr>
                        <td>2024-12-02</td>
                        <td>$200.00</td>
                        <td>Debit</td>
                    </tr>
                </table>
            </div>
        `
    },
    {
        id: 3,
        title: 'Users',
        content: `
            <div class="section">
                <h2>User List</h2>
                <p>Here is a list of all registered users.</p>
                <ul>
                    <li>User 1</li>
                    <li>User 2</li>
                    <li>User 3</li>
                </ul>
            </div>
        `
    },
    {
        id: 4,
        title: 'Sales/Orders',
        content: `
            <div class="section">
                <h2>Sales and Orders</h2>
                <p>Overview of your recent sales and orders.</p>
                <ul>
                    <li>Order 1: $100.00</li>
                    <li>Order 2: $150.00</li>
                    <li>Order 3: $200.00</li>
                </ul>
            </div>
        `
    }
];

// Load tabs dynamically
sections.forEach(section => {
    const tab = document.createElement('li');
    tab.textContent = section.title;
    tab.dataset.sectionId = section.id;
    tab.classList.add('tab');
    tab.addEventListener('click', () => loadContent(section));
    tabs.appendChild(tab);
});

// Load content dynamically
const loadContent = async (section) => {
    loadingSpinner.style.display = 'block';
    contentArea.innerHTML = '';
    breadcrumbs.textContent = section.title;

    // Simulate dynamic loading
    setTimeout(() => {
        contentArea.innerHTML = section.content;
        loadingSpinner.style.display = 'none';
    }, 500);
};

// Sidebar toggle
toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// Search functionality
searchBox.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    searchResults.innerHTML = '';

    const filteredSections = sections.filter(section =>
        section.title.toLowerCase().includes(query)
    );

    filteredSections.forEach(section => {
        const li = document.createElement('li');
        li.textContent = section.title;
        li.addEventListener('click', () => {
            document.querySelector(`[data-section-id="${section.id}"]`).click();
        });
        searchResults.appendChild(li);
    });
});

// Progress bar
contentArea.addEventListener('scroll', () => {
    const contentHeight = contentArea.scrollHeight - contentArea.clientHeight;
    const scrollTop = contentArea.scrollTop;
    const progress = (scrollTop / contentHeight) * 100;
    progressBar.style.width = `${progress}%`;
});

// Back to Top
backToTop.addEventListener('click', () => {
    contentArea.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show/Hide Back to Top button
contentArea.addEventListener('scroll', () => {
    if (contentArea.scrollTop > 100) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});
