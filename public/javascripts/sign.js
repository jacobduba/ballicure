var canvas = document.getElementById('signature');

var signaturePad = new SignaturePad(canvas);

function submit() {
    if (signaturePad.isEmpty()) {
        console.log("Empty pad, cannot submit.")
    } else {
        fetch('/step/signature', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({
                signature: signaturePad.toDataURL()
            })
        }).then(function(res) {
            if (res.redirected) {
                window.location.href = "/step/verification";
            }
        });
    }
}


