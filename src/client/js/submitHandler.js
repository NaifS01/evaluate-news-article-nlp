function handleSubmit(event) {
    event.preventDefault()
    let formText = document.getElementById('name').value
    console.log(formText);
    //CHECK IF THE URL is valid 
    if (Client.checkForURL(formText)) {

        postData('/add', { data: formText })
            // after, edit the UI
            .then(function (res) {
                if (res.status.code == '0') {
                    document.getElementById('results').innerHTML = 'polarity: ' + res.score_tag;
                    document.getElementById("results1").innerHTML = `subjectivity: ${res.subjectivity}`;
                    document.getElementById("results2").innerHTML = `Irony: ${res.irony}`;
                } else {
                    document.getElementById('results').innerHTML = 'Message: ' + res.status.msg;
                    document.getElementById("results1").innerHTML = '';
                    document.getElementById("results2").innerHTML = '';
                }
            })

    } else {
        alert('invalid URL!');
    }
}

// 
const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const resData = await res.json();
        console.log(resData);
        return resData;
    } catch (error) {
        console.log('error', error);
    }
};

export { handleSubmit }
