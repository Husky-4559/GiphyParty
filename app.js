// console.log("Let's get this party started!");

const $gifArea = $("#gif-area");
const $searchInput = $("#SearchTerm");

/* use ajax result to add a gif */

function createGif(results) {
	let numResults = results.data.length;
	if (numResults) {
		let randomIndex = Math.floor(Math.random() * numResults);
		let $newCol = $("<div>", { class: "col-lg" });
		let $newGif = $("<img>", {
			src: results.data[randomIndex].images.original.url,
			class: "img-thumbnail",
		});
		$newCol.append($newGif);
		$gifArea.append($newCol);
	}
}

/* handle form submission: clear search box & make ajax call */

$("form").on("submit", async function (evt) {
	evt.preventDefault();

	let searchTerm = $searchInput.val();
	$searchInput.val("");

	const res = await axios.get("http://api.giphy.com/v1/gifs/search", {
		params: {
			q: searchTerm,
			api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
		},
	});
	createGif(res.data);
});

/* remove gif */

$("#btn-1").on("click", function () {
	$gifArea.empty();
});
