const modalElement = document.querySelector('#modal')
const defautUrl = location.protocol + '//' + location.host
const btnClose = document.querySelector('#modal .content .header .closeButton')
const btnDelete = document.querySelector('#modal .content .header .remove')
const titleOnModal = document.querySelector('#modal .content .header #title')
const imageOnModal = document.querySelector('#modal .content #content.image img')
const images = document.querySelectorAll('main .cards .card img')

const deleteImage = async(e) => {
    const item = {
        id: modalElement.dataset.id,
        name: modalElement.dataset.name,
        key: modalElement.dataset.key,
        delete: `${defautUrl}/posts/${modalElement.dataset.id}`
    }
    if (confirm(`Você deseja excluiar a imagem ${item.id} - ${item.name}`)) {
        await fetch(item.delete, { method: 'DELETE' }).then(response => {
            return response.json()
        }).then(data => {
            alert(`Item deletado ${data.id}`)
            return location.reload()
        })
    } else {
        return modalToggle()
    }
}

const modalToggle = (e) => {
    modalElement.classList.toggle('hide')
}
const modalImage = (e) => {
    const element = e.target
    const item = {
        id: element.dataset.id,
        name: element.dataset.name,
        key: element.dataset.key
    }
    console.log(item)
    titleOnModal.innerText = item.name
    modalElement.dataset.id = item.id
    modalElement.dataset.name = item.name
    modalElement.dataset.key = item.key
    imageOnModal.src = item.key
    imageOnModal.alt = item.name
    modalToggle()
}

btnDelete.addEventListener('click', deleteImage)

btnClose.addEventListener('click', modalToggle)
images.forEach(image => image.addEventListener('click', modalImage));