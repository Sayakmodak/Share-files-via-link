const dropZone = document.querySelector(".drop-zone");
const copyBtn = document.querySelector(".copy-btn");
const input = document.getElementById("input");
const browseBtn = document.getElementById("browseBtn");
const linkedPara = document.getElementById("linkedPara");

browseBtn.addEventListener("click", () => {
    input.click();
})

input.addEventListener("change", () => {
    // catch the inputted file, then append it to the formData() to send it to the server via post method
    // Then, API comes 
    // console.log("Changing");
    const file1 = input.files[0];
    uploadFile(file1);
})

dropZone.addEventListener("dragover", (e) => {
    // console.log(e);
    e.preventDefault();
    console.log("Dragging");
    if (!dropZone.classList.contains("active")) {
        dropZone.classList.add("active");
    }
})

dropZone.addEventListener("dragleave", () => {
    // console.log("leaving");
    dropZone.classList.remove("active");
})

dropZone.addEventListener("drop", (e) => {
    // console.log(e);
    e.preventDefault();
    dropZone.classList.remove("active");
    const file2 = e.dataTransfer.files[0];
    uploadFile(file2);
    // console.log("dropping");
})


const uploadFile = async (file) => {
    // creating new form object
    const formData = new FormData();
    // appending existing form or file to the new form object
    formData.append("file", file);
    linkedPara.innerHTML = "Sharing...";
    try {
        const response = await fetch("https://file.io/?expires=1d", {
            method: "POST",
            body: formData
        });
        const data = await response.json();

        if (response.ok) {

            linkedPara.innerHTML = `<p>Download link : </p>
            <input type="text" value="${data.link}" readonly id="copyInput" onclick="handleLink()" />  `

        }
        else {
            linkedPara.innerHTML = "URL Not Found";
        }
    } catch (error) {
        console.log(error.message);
        linkedPara.innerHTML = "URL Not Found";
    }
}

copyBtn.addEventListener("click", () => {
    copyURL();
})

const copyURL = () => {
    const text = document.getElementById("copyInput");
    console.log(text, typeof (text));

    // Select the text in the input element
    text.select();
    text.setSelectionRange(0, 100);


    navigator.clipboard.writeText(text.value);
}

const handleLink = () => {
    const text = document.getElementById("copyInput");
    // window.location.href = `${text.value}`;
    window.open(`${text.value}`, "_blank");
}