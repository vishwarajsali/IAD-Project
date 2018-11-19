let products = [];
let selectIndex = -1;
let clickedBook;
let select;

let index;

function init() {
	document.getElementById('tableRow').innerHTML = '';
	//Add object if there is no sessionStorage 
	if (!sessionStorage.productsRecords) {
		data();
	}

	if (sessionStorage.productsRecords) {
		products = JSON.parse(sessionStorage.productsRecords);
		for (let i in products) {
			tablecell(
				i,
				products[i].title,
				products[i].author,
				products[i].isbn,
				products[i].description,
				products[i].rating,
				products[i].shipper,
				products[i].quantity
			);
		}
	}


}

//dummy object for product
function data() {
	var books = [{
		title: 'A Game of Thrones: A Song of Ice and Fire',
		author: 'George R.R. Martin',
		isbn: '0553593714',
		description: 'The most inventive and entertaining fantasy saga of our time—warrants one hell of an introduction. I loved this book!',
		rating: 4,
		shipper: 'vishwaraj',
		quantity: 50,
	}, {
		title: 'HTML for Babies',
		author: 'John C Vanden-Heuvel Sr',
		isbn: '0615487661',
		description: "It's never too early to be standards compliant! I taught my little one mark-up in under one hour!",
		rating: 5,
		shipper: 'vishwaraj',
		quantity: 50,
	}, {
		title: 'A is for Array',
		author: 'Brandon J Hansen',
		isbn: '1489522212',
		description: 'A is for Array is the ABC book for future programmers. Filled with fun illustrations and simple real-world examples, my children loved seeing my world intertwined with theirs!',
		rating: 4,
		shipper: 'vishwaraj',
		quantity: 50,
	}, {
		title: 'The Dragon Reborn',
		author: 'Robert Jordan',
		isbn: '0812513711',
		description: 'The Wheel weaves as the Wheel wills, and we are only the thread of the Pattern. Moiraine',
		rating: 4,
		shipper: 'vishwaraj',
		quantity: 50,
	}];

	sessionStorage.setItem('productsRecords', JSON.stringify(books));
}

// adding product to the sessionStorage
function addProduct() {

	//taking value from user
	title = document.getElementById('title').value;
	author = document.getElementById('author').value;
	isbn = document.getElementById('isbn').value;
	description = document.getElementById('description').value;
	rating = document.getElementById('rating').value;
	shipper = document.getElementById('shipper').value;
	quantity = document.getElementById('quantity').value;


	//validating value and storing to the sessionStorage
	if (title != "" && isbn != "" && description != "" && validateRating(rating)) {
		let bookobj = {
			title: title,
			author: author,
			isbn: isbn,
			description: description,
			rating: rating,
			shipper: shipper,
			quantity: quantity
		};

		if (selectIndex === -1) {
			products.push(bookobj);
		} else {
			products.slice(selectedIndex, 1, bookobj);
		}

		sessionStorage.productsRecords = JSON.stringify(products);
	}
	init();
	onclear();
}

//display value from sessionStorage to table
function tablecell(index, title, author, isbn, description, rating, shipper, quantity) {

	let table = document.getElementById('tableRow');
	let row = table.insertRow();


	let titlecell = row.insertCell(0);
	let authorcell = row.insertCell(1);
	let imgcell = row.insertCell(2);
	let descriptioncell = row.insertCell(3);
	let ratingcell = row.insertCell(4);
	let shippercell = row.insertCell(5);
	let quantitycell = row.insertCell(6);
	let deletecell = row.insertCell(7);
	let editcell = row.insertCell(7);
	let addCartcell = row.insertCell(7);


	titlecell.innerHTML = title;
	authorcell.innerHTML = author;
	imgcell.innerHTML = '<img src="http://images.amazon.com/images/P/' + isbn + '.01.ZTZZZZZZ.jpg" alt="..." class="img-thumbnail">';
	descriptioncell.innerHTML = description;
	ratingcell.innerHTML = rating + '/5';
	shippercell.innerHTML = shipper;
	quantitycell.innerHTML = quantity;
	deletecell.innerHTML = '<input type="submit" id="deletebtn" class="btn btn-danger deletebtnclass" onclick="onDelete(' + index + ')" value="Delete">';
	editcell.innerHTML = '<input type="submit" id="editbtn" class="btn editbtnclass" data-toggle="modal" data-target="#EditBookModal" onclick="onEdit(' + index + ')" value="Edit">';
	addCartcell.innerHTML = '<input type="submit" id="addtoCartbtn" class="btn btn-primary" data-toggle="modal" data-target="#AddtoCartModal" onclick="onAddCart(' + index + ')" value="Cart">';

}


//Delete value from the sessionStorage with the index
function onDelete(index) {
	products.splice(index, 1);
	sessionStorage.productsRecords = JSON.stringify(products);
	init();
}

// getting value form sessionStorage to edit 
function onEdit(index) {
	let currentProduct = products[index];
	clickedBook = index;

	document.getElementById('hiddentValue').value = clickedBook;

	document.getElementById('editTitle').value = currentProduct.title;
	document.getElementById('editAuthor').value = currentProduct.author;
	document.getElementById('editIsbn').value = currentProduct.isbn;
	document.getElementById('editDescription').value = currentProduct.description;
	document.getElementById('editRating').value = currentProduct.rating;
	document.getElementById('editShipping').value = currentProduct.shipper;
	document.getElementById('editQuantity').value = currentProduct.quantity;

}

// saving the edit changes to sessionStorage
function onSaveEdit() {

	clickedBook = document.getElementById('hiddentValue').value;

	title = document.getElementById('editTitle').value;
	author = document.getElementById('editAuthor').value;
	isbn = document.getElementById('editIsbn').value;
	description = document.getElementById('editDescription').value;
	rating = document.getElementById('editRating').value;
	shipper = document.getElementById('editShipping').value;
	quantity = document.getElementById('editQuantity').value;

	products[clickedBook].title = title;
	products[clickedBook].author = author;
	products[clickedBook].isbn = isbn;
	products[clickedBook].description = description;
	products[clickedBook].rating = rating;
	products[clickedBook].shipper = shipper;
	products[clickedBook].quantity = quantity;

	sessionStorage.productsRecords = JSON.stringify(products);
	init();

}

function onclear() {

	document.getElementById('title').value = "";
	document.getElementById('author').value = "";
	document.getElementById('isbn').value = "";
	document.getElementById('description').value = "";
	document.getElementById('rating').value = "";
	document.getElementById('shipper').value = "";
	document.getElementById('quantity').value = "";
}


// adding product to cart 
function onAddCart(index) {
	alert(index);
}


//filter product by title 
function onSearch() {
	// Declare variables
	var input, filter, ul, li, a, i;
	input = document.getElementById('searchBox');
	filter = input.value.toUpperCase();
	table = document.getElementById('table');
	table_tr = table.getElementsByTagName('tr');

	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < table_tr.length; i++) {
		table_data = table_tr[i].getElementsByTagName('td')[0];
		if (table_data) {
			if (table_data.innerHTML.toUpperCase().indexOf(filter) > -1) {
				table_tr[i].style.display = "";
			} else {
				table_tr[i].style.display = 'none';
			}
		}
	}
}


//display roles
function onUserRole() {

	if (document.getElementById('user').checked) {

		document.getElementById("addBtn").style.visibility = 'hidden';

		var editbtnhd = document.getElementsByClassName("editbtnclass");
		var deletebtnhd = document.getElementsByClassName("deletebtnclass");
		for (let i in deletebtnhd) {
			deletebtnhd[i].style.visibility = 'hidden';
			editbtnhd[i].style.visibility = 'hidden';
		}

	} else if (document.getElementById('admin').checked) {
		document.getElementById("addBtn").style.visibility = 'visible';
		var editbtnhd = document.getElementsByClassName("editbtnclass");

		var deletebtnhd = document.getElementsByClassName("deletebtnclass");
		for (let i in deletebtnhd) {
			deletebtnhd[i].style.visibility = 'visible';
			editbtnhd[i].style.visibility = 'visible';
		}

	} else if (document.getElementById('vish').checked) {
		for (var j in products) {
			if (products[j].shipper != 'vishwaraj') {

				document.getElementsByClassName("deletebtnclass")[j].style.visibility = 'hidden';

				document.getElementsByClassName("editbtnclass")[j].style.visibility = 'hidden';
			}
		}
	} else {
		document.getElementById("addBtn").style.visibility = 'visible';
		var editbtnhd = document.getElementsByClassName("editbtnclass");

		var deletebtnhd = document.getElementsByClassName("deletebtnclass");
		for (let i in deletebtnhd) {
			deletebtnhd[i].style.visibility = 'visible';
			editbtnhd[i].style.visibility = 'visible';

		}
	}
}


//validating rating 
function validateRating(rating){
	{
		if (/^\d{1}$/.test(rating))
		{
		  return (true)
		}
		  alert("Rating should no more than 1 digit")
		  return (false)
	  }
	  
}
