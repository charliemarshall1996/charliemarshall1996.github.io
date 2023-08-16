// File Download Button
document
    .getElementById("downloadButton")
    .addEventListener("click", function () {
        fetch("../assets/documents/Charlie_Marshall_CV.pdf")
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "Charlie_Marshall_CV.pdf";
                a.type = 'application/pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
    });
