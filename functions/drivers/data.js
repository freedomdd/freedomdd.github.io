export async function onRequestGet(context) {
    const jsonUrl = "https://storybix.com/drivers/drivers.json"; // Your JSON file URL

    try {
        // Fetch JSON data
        const response = await fetch(jsonUrl);
        if (!response.ok) throw new Error("Failed to fetch data");

        const jsonData = await response.json();

        // Generate HTML table rows
        let tableRows = jsonData.map(driver => `
            <tr>
                <td>${driver.name}</td>
                <td>${driver.age}</td>
                <td>${driver.country}</td>
            </tr>
        `).join("");

        // Generate HTML content
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Drivers List</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
                    th { background-color: #f4f4f4; }
                </style>
            </head>
            <body>
                <h2>Drivers List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </body>
            </html>
        `;

        return new Response(htmlContent, {
            headers: { "Content-Type": "text/html" }
        });

    } catch (error) {
        return new Response(`Error: ${error.message}`, { status: 500 });
    }
}