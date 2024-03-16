//Ch. I
fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.message.forEach(x => {
            const img = document.createElement('img')
            img.src = x
            document.querySelector('#dog-image-container').appendChild(img)
        })
    })
    .catch(err => {
        console.log(`error ${err}`)
    })

//Ch. II
fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(data => {             // can be substituted for a function that takes in data.message e.g. getBreed(data.message), then wrap everything else into the function
        // console.log(data.message)
        const select = document.querySelector('#breed-dropdown') 
        const option = document.createElement('option')
        select.insertBefore(option, select.firstChild)      // Empty option reverts to the full list after any filter when clicking through a-d
        let breedlist = []
        Object.keys(data.message).forEach(x => breedlist.push(x)) // OR 
                                                                  // for(let x in data.message){breedlist.push(x)}
        console.log(breedlist)
        breedlist.forEach(x => {                          
            const li = document.createElement('li')
            const span = document.createElement('span')  // span allows for just the text content to change color, and not the whole list object (li)
            span.id = 'dog-Name'
            li.appendChild(span) 
            span.innerText = x                   
            document.querySelector('#dog-breeds').appendChild(li)
            
// Ch. III
            document.querySelectorAll('#dog-Name').forEach(name => {name.addEventListener('click', ()=> name.style.color = 'rgba(232, 119, 34)')})

// Ch. IV
            let droplist = document.querySelector('#breed-dropdown') 
            droplist.addEventListener('change', () => {
                var val = droplist.value
                const list = document.getElementById('dog-breeds')
                list.innerHTML = '' // clear the list before re-populating
        
                const filteredBreeds = breedlist.filter(breed => {
                    return breed.startsWith(val)
                })
                filteredBreeds.forEach(breed => {
                    const li = document.createElement('li')
                    const span = document.createElement('span')
                    span.id = 'dog-Name'
                    span.textContent = breed
                    li.appendChild(span) 
                    list.appendChild(li)
                })
                document.querySelectorAll('#dog-Name').forEach(name => {name.addEventListener('click', ()=> name.style.color = 'rgba(232, 119, 34)')})
            })
        })
    })
    .catch(err => {
        console.log(`error ${err}`)
    })