/*---------------- Global Code ---------------------------*/
const searchResult = document.getElementById('search-result');
const showResults = document.getElementById('show-results');
const noResults = document.getElementById('no-results');

/*---------------- toggleSpinner ---------------------------*/
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

/*---------------- toggleSearchResult ---------------------------*/
const toggleSearchResult = displayStyle => {
    searchResult.style.display = displayStyle;
}

/*---------------- searchBook ---------------------------*/
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    document.getElementById('search-text').innerText = searchText;
    
    searchResult.innerHTML = '';
   
    if(searchText === ''){
        showResults.innerText = 'Plese write something to display';
        showResults.style.display = 'block';

        noResults.innerText = '';
        searchResult.innerHTML = '';
        document.getElementById('search').style.display = 'none';
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

/*---------------- displaySearchResult ---------------------------*/
const displaySearchResult = (books) => {
    document.getElementById('total-show-result').innerText = books.docs.slice(0, 20).length;
    document.getElementById('total-search-result').innerText = books.numFound;
    document.getElementById('search').style.display = 'block';

    if(books.numFound === 0){
        noResults.innerText = 'Sorry, Show no more Result found';
        noResults.style.display = 'block';
    }
    else{
        searchResult.innerHTML = '';

         books.docs.slice(0, 20)?.forEach(book => {
            const div = document.createElement('div');
            div.style.marginBottom = '50px';
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100" style="box-shadow: 0 5px 14px rgba(0, 0, 0, .25)">
                    <div class="p-3">
                        <img height="300px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                    </div>
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
    // spinner
    toggleSpinner('none');
    toggleSearchResult('flex');
}
