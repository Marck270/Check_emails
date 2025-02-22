document.getElementById("emailForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const to = document.getElementById("to").value;
    const subject = document.getElementById("subject").value;
    const text = document.getElementById("text").value;

    const response = await fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, text })
    });

    const result = await response.json();
    alert(result.message);
    fetchEmails();
});

async function fetchEmails() {
    const response = await fetch("/emails");
    const emails = await response.json();

    const tbody = document.getElementById("emailTableBody");
    tbody.innerHTML = "";

    emails.forEach(email => {
        const row = `<tr>
            <td>${email.from}</td>
            <td>${email.subject}</td>
            <td>${new Date(email.timestamp).toLocaleString()}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

document.getElementById("emailForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const to = document.getElementById("to").value;
    const subject = document.getElementById("subject").value;
    const text = document.getElementById("text").value;

    const response = await fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, text })
    });

    const result = await response.json();
    alert(result.message);
    fetchEmails(); // Recarga la tabla después de enviar el correo
});


fetchEmails();
