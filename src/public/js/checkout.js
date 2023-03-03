const finalizarCompra = document.getElementById('finalizarCompra')

finalizarCompra.addEventListener('click', e => {
    setTimeout(window.location.replace('/cart/checkout'), 1000)
})