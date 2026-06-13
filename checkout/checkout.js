async function enviarComprovativo() {

    try {

    const file =
        document.getElementById("comprovativo").files[0];

    if (!file) {
        alert("Selecione um comprovativo.");
        return;
    }

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
        "upload_preset",
        "ebook_comprovativos"
    );

    try {

        const response =
            await fetch(
                "https://api.cloudinary.com/v1_1/drbnysxc2/auto/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

        const data = await response.json();

        console.log(data);
        console.log(data.secure_url);

        console.log("Resposta Cloudinary:", data);

        const comprovativoUrl = data.secure_url;

        const emailData = new FormData();

        emailData.append(
            "Nome",
            document.getElementById("nome").value
        );

        emailData.append(
            "Email",
            document.getElementById("email").value
        );

        emailData.append(
            "WhatsApp",
            document.getElementById("whatsapp").value
        );

        emailData.append(
            "Comprovativo",
            comprovativoUrl
        );

        await fetch(
            "https://formsubmit.co/ajax/leandroandro078@gmail.com",
            {
                method: "POST",
                body: emailData
            }
        );

        window.location.href =
            "../obrigado/obrigado.html";

    catch (error) {
    console.error("ERRO COMPLETO:", error);
    alert("Erro: " + error.message);
    }

    
}