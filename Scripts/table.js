//#region VARIABLES
const szamElements = document.querySelectorAll("[data-szamok]");
const gyakorisagElements = document.querySelectorAll("[data-gyakorisagok]");
const medianText = document.getElementById("median-text");
const moduszText = document.getElementById("modusz-text");
const terjedelemText = document.getElementById("terjedelem-text");
const atlagText = document.getElementById("atlag-text");
const relGyakTexts = document.querySelectorAll("[data-rel-gyak-text]");
const szorasText = document.getElementById("szoras-text");
let szamok = new Array;
let gyakorisagok = new Array;
let atlag, szoras, median, terjedelem, modusz;
//#endregion

Start();

szamElements.forEach(szam => {
    szam.addEventListener("change", function() {
        Start();
    });
});
gyakorisagElements.forEach(gyakorisag => {
    gyakorisag.addEventListener("change", function() {
        Start();
    });
});

function Start() {
    for (let i = 0; i < szamElements.length; i++) {
        szamok[i] = parseFloat(szamElements[i].value);
    }
    for (let i = 0; i < gyakorisagElements.length; i++) {
        gyakorisagok[i] = parseInt(gyakorisagElements[i].value);
    }
    atlag = calcAtlag(szamok, gyakorisagok);
    szoras = calcSzoras(szamok, gyakorisagok, atlag);
    median = getMedian(szamok, gyakorisagok);
    terjedelem = calcTerjedelem(szamok, gyakorisagok);
    modusz = getModusz(szamok, gyakorisagok);
    display(atlag, szoras, gyakorisagok, median, terjedelem, modusz);
}

function calcAtlag(szamok, gyakorisagok)
{
    let atlagSzamok = new Array;
    let osztando = 0;
    let oszto = 0;
    for (let i = 0; i < szamok.length; i++) {
        atlagSzamok[i] = szamok[i] * gyakorisagok[i];
    }
    atlagSzamok.forEach(atlagSzam => {
        osztando += atlagSzam;
    });
    gyakorisagok.forEach(gyakorisag => {
        oszto += gyakorisag;
    });
    atlag = osztando / oszto;
    return atlag;
}

function calcSzoras(szamok, gyakorisagok, atlag)
{
    let toSqrt = 0;
    let gyakorisag = new Array;
    let oszto = 0;

    for (let i = 0; i < gyakorisagok.length; i++) {
        if (gyakorisagok[i] != (0 || null)) {
            gyakorisag[i] = gyakorisagok[i];
        } else return;
    }

    for (let i = 0; i < gyakorisag.length; i++) {
        toSqrt += gyakorisag[i] * Math.pow(szamok[i] - atlag, 2);
    }

    gyakorisag.forEach(osztoGyak => {
        oszto += osztoGyak;
    });
    toSqrt /= oszto;
    szoras = Math.sqrt(toSqrt);
    return szoras;
}

function getMedian(szamok, gyakorisagok)
{
    let sortedOsszSzam = new Array;
    let osszSzam = new Array;
    let localMedian;

    osszSzam = getOsszSzam(szamok, gyakorisagok);
    sortedOsszSzam = sortNumbers(osszSzam);
    if ((sortedOsszSzam.length / 2) % 1 === 0) {
        //paros a length
        let alsoSzam = sortedOsszSzam[Math.floor((sortedOsszSzam.length - 1) / 2)];
        let felsoSzam = sortedOsszSzam[Math.ceil((sortedOsszSzam.length - 1) / 2)];
        let parosKozep = (alsoSzam + felsoSzam) / 2;
        localMedian = parosKozep;
    } else {
        //Paratlan a length
        localMedian = sortedOsszSzam[(sortedOsszSzam.length - 1) / 2];
    }
    return localMedian;
}

function getModusz(szamok, gyakorisagok)
{
    let moduszList = [];
    let moduszListText = "";
    const legnagyobbGyak = Math.max(...gyakorisagok)
    for(let i = 0; i < gyakorisagok.length; i++) {
        if(gyakorisagok[i] == legnagyobbGyak) return szamok[i];
    }
}

function calcTerjedelem(szamok, gyakorisagok)
{
    const osszSzam = sortNumbers(getOsszSzam(szamok, gyakorisagok));
    let localTerjedelem = osszSzam[osszSzam.length - 1] - osszSzam[0];

    return localTerjedelem;
}

function display(atlag, szoras, gyakorisagok, median, terjedelem, modusz)
{
    let i = 0;
    let osszSzam = 0;
    gyakorisagok.forEach(osszGyak => {
        osszSzam += osszGyak;
    });
    relGyakTexts.forEach(relGyak => {
        relGyak.innerText = gyakorisagok[i] + " / " + osszSzam;
        i++;
    });
    medianText.innerText = median;
    moduszText.innerText = modusz;
    terjedelemText.innerText = terjedelem;
    atlagText.innerText = atlag;
    szorasText.innerText = szoras;
}

function sortNumbers(array)
{
    let temp;
    for (let i = array.length; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if(array[j] > array[j + 1]) {
                temp = array[j];
                array[j] = array [j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}

function getOsszSzam(szamok, gyakorisagok)
{
    let localOsszSzam = new Array;

    for(let i = 0; i < szamok.length; i++) {
        for(let y = 0; y < gyakorisagok[i]; y++) 
            localOsszSzam.push(szamok[i]);
    }

    return localOsszSzam;
}
function calculator()
{
    window.open("calculator.html", "_blank");
}