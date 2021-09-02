/*----------------  ---------------------------*/
const searchResult = document.getElementById('search-result');
const showResults = document.getElementById('show-results');
const noResults = document.getElementById('no-results');

// spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// search-result
const toggleSearchResult = displayStyle => {
    searchResult.style.display = displayStyle;
}


const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    
    searchResult.innerHTML = ''
   
    if(searchText == ''){
        showResults.innerText = 'Plese write something to display';
        noResults.innerText = '';
        searchResult.innerHTML = ''
    }
    else{
        showResults.innerText = '';
        noResults.innerText = '';
         // spinner
        toggleSpinner('block');
        toggleSearchResult('none');
        searchField.value = '';

        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data))

        .catch(error => console.log(error))

    }
}


const displaySearchResult = (books) => {
    document.getElementById('total-search-result').innerText = books.numFound;
    document.getElementById('search').style.display = 'block';

    if(books.numFound == 0){
        noResults.innerText = 'Show no more Result found';
    }
    else{
        searchResult.innerHTML = ''

         books.docs?.forEach(book => {
            // console.log(book);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100" style="box-shadow:0 10px 20px gray;">
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
    }
        toggleSpinner('none');
        toggleSearchResult('flex');
}
