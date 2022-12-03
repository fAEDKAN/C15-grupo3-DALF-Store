const $ = (element) => document.getElementById(element);

const apiUrlBase = "https://apis.datos.gob.ar/georef/api";

const getProvinces = async () => {
    try {
        const response = await fetch(`${apiUrlBase}/provincias`);
        const result = await response.json();
        result.provincias.sort((a, b) =>
            a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0
        );
        return result.provincias;
    } catch (error) {
        console.error;
    }
};
const getCities = async (provincia) => {
    try {
        const response = await fetch(
            `${apiUrlBase}/localidades?provincia=${provincia}&max=4000`
        );
        const result = await response.json();
        result.localidades.sort((a, b) =>
            a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0
        );
        return result.localidades;
    } catch (error) {
        console.error;
    }
};
window.addEventListener("load", async () => {
    let provincias = await getProvinces();
    provincias.forEach((provincia) => {
        $("province-select").innerHTML += `<option value="${
            provincia.nombre
        }"  ${provincia.nombre === $("province").value && "selected"}>${
            provincia.nombre
        }</option>`;
    });
    $("province-select").addEventListener("change", async ({ target }) => {
        $(
            "city-select"
        ).innerHTML = `<option selected hidden>Cargando...</option>`;
        let localidades = await getCities(target.value);
        $(
            "city-select"
        ).innerHTML = `<option selected hidden>Seleccione...</option>`;
        localidades.forEach((localidad) => {
            $(
                "city-select"
            ).innerHTML += `<option value="${localidad.nombre}">${localidad.nombre}</option>`;
        });
    });
});
