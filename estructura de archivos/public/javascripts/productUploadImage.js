const inputs = document.querySelectorAll('[name="imagen"]');

inputs.forEach(input => {
    
    input.addEventListener('change', (e) => {

        const imagePreview = document.querySelector('#image-preview');

        const file = e.target.files[0];

        const image = new Image();

        image.src = URL.createObjectURL(file);

        imagePreview.appendChild(image);
    });
});