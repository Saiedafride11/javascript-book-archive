/*----------------  ---------------------------*/

// spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// search-result
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}


const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // spinner
    toggleSpinner('block');
    toggleSearchResult('none');
    searchField.value = '';
   
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data.docs))
}


const displaySearchResult = (books) => {
    document.getElementById('total-search-result').innerText = 'Search results found: ' + books.length;

    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    
    books?.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        // div.style.boxShadow = '0 1px 1px gray';
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="" class="card h-100">
                <img height="300px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title text-primary">${book.title}</h4>
                    <p class="card-text">Author: <strong>${book.author_name ? book.author_name : '----------'}</strong></p>
                    <p class="card-text">Publisher: <strong>${book.publisher ? book.publisher : '----------'}</strong></p>
                    <p class="card-text">Published Year: <strong>${book.first_publish_year ? book.first_publish_year : '----------'}</strong></p>
                </div>
            </div>
        `
        searchResult.appendChild(div);
    })
    toggleSpinner('none');
    toggleSearchResult('flex');
}
