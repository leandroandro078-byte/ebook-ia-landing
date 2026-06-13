async function enviarComprovativo() {

    try {

        // Verificar ficheiro
        const file = document.getElementById("comprovativo").files[0];

        if (!file) {
            alert("Selecione um comprovativo.");
            return;
        }

        // Upload Cloudinary
        const formData = new FormData();

        formData.append("file", file);

        formData.append(
            "upload_preset",
            "ebook_comprovativos"
        );

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/drbnysxc2/auto/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        console.log("Resposta Cloudinary:", data);

        if (!data.secure_url) {
            throw new Error("Falha ao carregar comprovativo.");
        }

        const comprovativoUrl = data.secure_url;

        // Preparar dados para FormSubmit
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

        // Enviar para o Gmail
        await fetch(
            "https://formsubmit.co/ajax/leandroandro078@gmail.com",
            {
                method: "POST",
                body: emailData
            }
        );

        console.log("E-mail enviado com sucesso.");

        // Redirecionar para página de obrigado
        window.location.href =
            "../obrigado/obrigado.html";

    } catch (error) {

        console.error("ERRO COMPLETO:", error);

        alert(
            "Ocorreu um erro ao enviar o comprovativo. Tente novamente."
        );

    }

}