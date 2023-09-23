document.addEventListener("DOMContentLoaded", () => {
    let sortOrder = "id";

    const toggleSortOrder = () => {
        sortOrder = sortOrder === 'id' ? 'name' : 'id';
        sortAndDisplayData();
    }

    const sortAndDisplayData = () => {
        fetch("https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (sortOrder === 'id') {
                    data.sort((a, b) => a.id - b.id)
                } else {
                    data.sort((a, b) => {
                        const nameA = `${a.first_name} ${a.last_name}`;
                        const nameB = `${b.first_name} ${b.last_name}`;
                        return nameA.localeCompare(nameB);
                    })
                }
                // 
                const tableBody = document.querySelector("#studentTable tbody");

                tableBody.innerHTML = "";

                data.forEach(student => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.first_name} ${student.last_name}</td>
                <td>${student.gender}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
                <td>${student.passing}</td>
                <td>${student.email}</td>
                `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });

        sortAndDisplayData();

        const sortButton = document.querySelector("#sortButton");
        sortButton.addEventListener("click", toggleSortOrder);
    }

})