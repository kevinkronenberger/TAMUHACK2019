async function SendRequest() {
    let deptName = document.getElementById("deptName").value
    let courseNum = document.getElementById("courseNum").value
    const data = {
        deptName,
        courseNum
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/py', options);
    const resdata = await response.json();
    console.log(resdata)
}