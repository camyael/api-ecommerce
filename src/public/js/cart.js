const reduceCount = document.getElementById('reduceCount');
const spanBotton = document.getElementById('span-count');
const addToCount = document.querySelector('.addToCount');
const itemFormCount = document.getElementById('itemFormCount')

let contador = 1

reduceCount.addEventListener('click', () => {
    if (contador > 1) {
        contador = contador - 1
        spanBotton.innerHTML = contador
    }
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    console.log(urlParams)
})

addToCount.addEventListener('click', () => {
    contador++
    spanBotton.innerHTML = contador
})

itemFormCount.addEventListener('click', evt => {
    const button = evt.target;
    const item = button.closest('.itemDetail');
    const itemId = item.querySelector('.item-id').textContent;
    const quantify = contador;

    const obj = {
        itemId,
        quantify
    }

    fetch('/cart',{
        method:'POST',
        body: JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json()).then(json=>{
        console.log(json)
        if(json.status === "success") {
            setTimeout(window.location.replace('/cart'), 1000)
        }
    })
})
