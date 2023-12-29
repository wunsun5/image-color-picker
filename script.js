const container = document.querySelector('.container'),
    openFile = container.querySelector('.upload-file'),
    imagePreview = container.querySelector('.preview-img img'),
    result = container.querySelectorAll('.color-detail span');

if(!window.EyeDropper){
    alert('Your browser does not support this feature');
}

const eyeDropper = new EyeDropper();

openFile.addEventListener('change', function(){
    const file = this.files[0]
    if(!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', function(){
        imagePreview.src = this.result;
    })
    reader.readAsDataURL(file);
})

const pickColor = () => {
    eyeDropper.open()
        .then(response => {
            let hex = response.sRGBHex;
            document.querySelector('.color').style.backgroundColor = hex;
            result[0].innerHTML = `RGB : ${hex.toUpperCase()} <i class='bx bx-copy'>`;
            result[1].innerHTML = `HEX : ${
                parseInt(hex.substring(1, 3), 16) + ', ' +
                parseInt(hex.substring(3, 5), 16) + ', ' +
                parseInt(hex.substring(5, 7), 16) + ''
            } <i class='bx bx-copy'>`;
        })
        .catch(err => console.log(err))
}

imagePreview.addEventListener('mouseenter', pickColor);

result.forEach((n, i) => {
    n.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(result[i].innerText.substring(5));
            alert('Copied');
        } catch (err) {
            console.error('Error :', err);
        }
    })
})