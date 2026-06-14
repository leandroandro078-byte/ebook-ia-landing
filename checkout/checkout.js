async function enviarComprovativo() {

    const btn = document.getElementById("submitBtn");

    // MOSTRAR LOADING
    document
        .getElementById("loadingOverlay")
        .classList.add("show");

    btn.disabled = true;
    btn.innerHTML = "⏳ ENVIANDO...";

    console.log("BOTÃO ALTERADO");

    try {

        // VERIFICAR FICHEIRO
        const file =
            document.getElementById("comprovativo").files[0];

        if (!file) {

            document
                .getElementById("loadingOverlay")
                .classList.remove("show");

            alert("Selecione um comprovativo.");

            btn.disabled = false;
            btn.innerHTML = "ENVIAR COMPROVATIVO";

            return;
        }

        // ==========================
        // UPLOAD CLOUDINARY
        // ==========================

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

        console.log(
            "Resposta Cloudinary:",
            data
        );

        if (!data.secure_url) {

            throw new Error(
                "Falha ao carregar comprovativo."
            );

        }

        const comprovativoUrl =
            data.secure_url;

        // ==========================
        // FORMSUBMIT
        // ==========================

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

        // CONFIGURAÇÕES FORMSUBMIT

        emailData.append(
            "_subject",
            "Novo Comprovativo Recebido - E-book IA"
        );

        emailData.append(
            "_template",
            "table"
        );

        emailData.append(
            "_captcha",
            "false"
        );

        emailData.append(
            "_replyto",
            document.getElementById("email").value
        );

        emailData.append(
            "_autoresponse",
            "Recebemos o seu comprovativo com sucesso. O pagamento será validado e o e-book com todos os bónus será enviado para o seu e-mail ou WhatsApp. Obrigado pela sua compra."
        );

        const emailResponse =
            await fetch(
                "https://formsubmit.co/ajax/leandroandro078@gmail.com",
                {
                    method: "POST",
                    body: emailData
                }
            );

        const emailResult =
            await emailResponse.json();

        console.log(
            "Resposta FormSubmit:",
            emailResult
        );

        // ==========================
        // META PIXEL
        // ==========================

        if (typeof fbq !== "undefined") {

            fbq(
                "track",
                "Purchase",
                {
                    value: 12500,
                    currency: "AOA"
                }
            );

        }

        // ==========================
        // GOOGLE ANALYTICS
        // ==========================

        if (typeof gtag !== "undefined") {

            gtag(
                "event",
                "purchase",
                {
                    currency: "AOA",
                    value: 12500
                }
            );

        }

        btn.innerHTML =
            "✅ ENVIADO";

        // ESCONDER LOADING

        document
            .getElementById("loadingOverlay")
            .classList.remove("show");

        // REDIRECIONAR

        window.location.href =
            "../obrigado/obrigado.html";

    }

    catch (error) {

        document
            .getElementById("loadingOverlay")
            .classList.remove("show");

        btn.disabled = false;

        btn.innerHTML =
            "ENVIAR COMPROVATIVO";

        console.error(
            "ERRO COMPLETO:",
            error
        );

        alert(
            "Ocorreu um erro ao enviar o comprovativo. Tente novamente."
        );

    }

}