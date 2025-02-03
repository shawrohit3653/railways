var train_status = document.querySelector('.train-status');
var btn = document.querySelector('.btn');
var train_no = document.getElementById('trainNo');


async function getTrainDetails(train_no) {
    if (!train_no) {
        train_status.innerHTML = `<p style="color:red;">Please enter a train number.</p>`;
        return;
    }

    const proxyUrl = "https://corsproxy.io/?";
    const apiUrl = `https://rappid.in/apis/train.php?train_no=${train_no}`;
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        let globalDelay = 'N/A';
        if (data.data && data.data.length > 0) {
            globalDelay = data.data[0].delay || 'N/A';
        }

        train_status.innerHTML = '';
        train_status.innerHTML = `
            <p><strong>Train Name:</strong> ${data.train_name || 'N/A'}</p>
            <p><strong>Message:</strong> ${data.message || 'N/A'}</p>
            <p><strong>Updated Time:</strong> ${data.updated_time || 'N/A'}</p>
            <p><strong>Delay:</strong> ${globalDelay || 'N/A'}</p>
        `;
    } catch (error) {
        train_status.innerHTML = `<p style="color:red;">Error fetching data: ${error.message}</p>`;
    }
}

btn.addEventListener('click', () => {
    const trainNoValue = train_no.value.trim();
    getTrainDetails(trainNoValue);      
});
