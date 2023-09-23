document.addEventListener("DOMContentLoaded", () => {
    let sortOrder = "id"; // Default sort order is by ID

    const toggleSortOrder = () => {
        sortOrder = sortOrder === "id" ? "name" : "id";
        sortAndDisplayData();
    };

    const sortAndDisplayData = () => {
        // Fetch data from the API
        fetch("https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json  ")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (sortOrder === "id") {
                    // Sort by ID
                    data.sort((a, b) => a.id - b.id);
                } else {
                    // Sort by name (assuming first_name and last_name fields)
                    data.sort((a, b) => {
                        const nameA = `${a.first_name} ${a.last_name}`;
                        const nameB = `${b.first_name} ${b.last_name}`;
                        return nameA.localeCompare(nameB);
                    });
                }

                // Get the table body element
                const tableBody = document.querySelector("#studentTable tbody");

                // Clear existing table rows
                tableBody.innerHTML = "";

                // Populate the table with student data
                data.forEach(student => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${student.id}</td>
                        <td>${student.first_name} ${student.last_name}</td>
                        <td>${student.gender}</td>
                        <td>${student.class}</td>
                        <td>${student.email}</td>
                        <td>${student.email}</td>
                        <td>${student.email}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };

    // Initial data load and display
    sortAndDisplayData();

    // Add click event listener to the sorting button
    const sortButton = document.querySelector("#sortButton");
    sortButton.addEventListener("click", toggleSortOrder);
});
