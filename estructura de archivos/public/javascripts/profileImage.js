//* Declaración de elementos HTML */
const imgDiv = document.querySelector('.body__form--profileImg');

const img = document.querySelector('#avatar');

const file = document.querySelector('#file');

const uploadBtn = document.querySelector('#uploadBtn');


//* Si el cursor pasa por encima del img div */
imgDiv.addEventListener('mouseenter', function(){
    uploadBtn.style.display = 'block';
})


//* Si el cursor sale del img div */
imgDiv.addEventListener('mouseleave', function(){
    uploadBtn.style.display = 'none';
});


//* Visualizar cuando elegimos un avatar para subir */
file.addEventListener('change', function(){
    const choosedFile = this.files[0]; //* Esto hace ref al archivo */

    if(choosedFile) {
        const reader = new FileReader(); //* FileReader es una función predeterminada de JS */
    
        reader.addEventListener('load', function(){
            img.setAttribute('src', reader.result);
        });

        reader.readAsDataURL(choosedFile);
    }
});