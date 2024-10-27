/************ HTML Elements ************/
const mainSections = $(".main-sections");

/*********************** App Variables ***********************/
const sideNavLinksOuterWidth = $(".side-nav-links").outerWidth();

// Global Variable to Check the Status of the Side Navbar
let sideNavOpen = true;

// Global Variable for Array of All Meals from API
let allMealsArray;

// Global Variable for Details of Each Meal from API
let mealDetails;

/* Regular Expressions (Regex) */
const usernameRegex = /^[a-zA-Z\s]{3,}$/;
const mailRegex =
	/^[a-zA-Z]{3,}[\.\_]?[a-zA-Z]*([1-9][0-9])?@[a-zA-Z]+\.[a-zA-Z]+$/;
const phoneRegex = /^01[0125][0-9]{8}$/;
const ageRegex = /^([1-9]?[0-9]|100)$/;
const passwordRegex = /^([0-9]+|[a-zA-Z]+){8,}$/;

/*********************** Functions ***********************/
/* Function to Show Loading Screen Until Data are Ready */
function showLoadingScreen() {
	$("body").css({ overflow: "hidden" });

	$(".loading").addClass("d-flex");
}

/* Function to Hide Loading Screen After Data are Ready */
function hideLoadingScreen() {
	$(".loading").fadeOut(2000, function () {
		$("body").css({ overflow: "auto" });
		$(".loading").removeClass("d-flex");
	});
}

/* Function to Close Side Navbar */
function closeSideNav() {
	$(".side-nav").animate({ left: `-${sideNavLinksOuterWidth}px` });

	$(".nav-icon i").removeClass("fa-xmark").addClass("fa-bars");

	$(".side-nav-links ul li").animate({ top: "100%" }, 300);

	sideNavOpen = false;
}

/* Function to Open Side Navbar */
function openSideNav() {
	$(".side-nav").animate({ left: "0px" });

	$(".nav-icon i").removeClass("fa-bars").addClass("fa-xmark");

	$(".side-nav-links ul li").animate({ top: "0%" }, 500);

	sideNavOpen = true;
}

/* Function to Display Search Section */
function displaySearchInputs() {
	// Clear Content in ( main-sections ) Element
	$(".main-sections").html("");

	// Add ( Search Form ) in ( main-sections ) Element
	$(".forms").html(
		`
		<!-- Search Section -->
		<form class="search w-100" autocomplete="off">

			<div class="row g-4">

				<div class="col col-12 col-md-6">

					<div class="inner search-input">

						<input type="text" name="SearchName" class="search-by-name form-control text-white"
							placeholder="Search By Name">

					</div>

				</div>

				<div class="col col-12 col-md-6">

					<div class="inner search-input">

						<input type="text" name="SearchLetter" class="search-by-letter form-control text-white"
							placeholder="Search By First Letter">

					</div>

				</div>

			</div>

		</form>
	`
	);

	searchByName = $(".search-by-name").on("input", function () {
		$(".main-sections").html(searchMealsByName($(this).val()));
	});

	searchByLetter = $(".search-by-letter").on("input", function () {
		$(".main-sections").html(searchMealsByFirstLetter($(this).val()));
	});

	closeSideNav();
}

/* Function to Display Contact Section */
function displayContactInputs() {
	// Clear Content in ( main-sections ) Element
	$(".main-sections").html("");

	// Add ( Contact Form ) in ( main-sections ) Element
	$(".forms").html(
		`
		<!-- Contact Section -->
		<form class="contact" autocomplete="off">

			<div class="row g-4">

				<!-- Username Input -->
				<div class="col col-12 col-md-6">

					<div class="inner">

						<input type="text" name="Username" class="name-input form-control" placeholder="Enter By Name">

						<p class="p-3 my-2 rounded-2 text-center text-capitalize d-none">
							special characters and numbers are not allowed
						</p>

					</div>

				</div>

				<!-- E-mail Input -->
				<div class="col col-12 col-md-6">

					<div class="inner">

						<input type="email" name="Mail" class="mail-input form-control" placeholder="Enter By Email">

						<p class="p-3 my-2 rounded-2 text-center text-capitalize d-none">
							email not valid *exemple@yyy.zzz
						</p>

					</div>

				</div>

				<!-- Phone Number Input -->
				<div class="col col-12 col-md-6">

					<div class="inner">

						<input type="tel" name="Phone" class="phone-input form-control" placeholder="Enter By Phone">

						<p class="p-3 my-2 rounded-2 text-center text-capitalize d-none">
							enter valid phone number
						</p>

					</div>

				</div>

				<!-- Age Input -->
				<div class="col col-12 col-md-6">

					<div class="inner">

						<input type="number" name="Age" class="age-input form-control" placeholder="Enter By Age">

						<p class="p-3 my-2 rounded-2 text-center text-capitalize d-none">
							enter your age
						</p>

					</div>

				</div>

				<!-- Password Input -->
				<div class="col col-12 col-md-6">

					<div class="inner">

						<input type="password" name="Password" class="password-input form-control"
							placeholder="Enter By Password">

						<p class="p-3 my-2 rounded-2 text-center text-capitalize d-none">
							enter valid password * Minimum eight characters, at least one letter and one
							number
							*
						</p>

					</div>

				</div>

				<!-- Re-Password Input -->
				<div class="col col-12 col-md-6">

					<div class="inner">

						<input type="password" name="Re-Password" class="repassword-input form-control"
							placeholder="Repassword">

						<p class="p-3 my-2 rounded-2 text-center text-capitalize d-none">
							enter valid repassword
						</p>

					</div>

				</div>

			</div>

			<button type="button"
				class="btn-submit btn btn-outline-danger d-block mx-auto my-4 text-capitalize disabled">
				submit
			</button>

		</form>
`
	);

	$(".name-input").on("input", function () {
		validateValue($(this), usernameRegex);
	});
	$(".mail-input").on("input", function () {
		validateValue($(this), mailRegex);
	});
	$(".phone-input").on("input", function () {
		validateValue($(this), phoneRegex);
	});
	$(".age-input").on("input", function () {
		validateValue($(this), ageRegex);
	});
	$(".password-input").on("input", function () {
		validateValue($(this), passwordRegex);
	});
	$(".repassword-input").on("input", function () {
		console.log($(".password-input").val());

		if ($(this).val() === $(".password-input").val()) {
			console.log(true);
		}
	});

	if (
		validateValue($(".name-input"), usernameRegex) === true &&
		validateValue($(".mail-input"), mailRegex) === true &&
		validateValue($(".phone-input"), phoneRegex) === true &&
		validateValue($(".age-input"), ageRegex) === true &&
		validateValue($(".password-input"), passwordRegex) === true &&
		$(".password-input").val() === $(".repassword-input").val()
	) {
		$(".btn-submit").removeClass("disabled");
		console.log(true);
	} else {
		$(".btn-submit").addClass("disabled");
		console.log(false);
	}

	closeSideNav();
}

/* Function to Validate Input Values */
function validateValue(input, regexName) {
	if (regexName.test($(input).val()) === true) {
		$(input).next().addClass("d-none");
		// console.log(true);
	} else {
		$(input).next().removeClass("d-none");
		// console.log(false);
	}
}

/* Function to Search Meals By Name from API */
async function searchMealsByName(mealName) {
	let mealsByNameResponse = await fetch(
		`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
	);

	let mealsByNameData = await mealsByNameResponse.json();

	console.log(mealsByNameData.meals);

	displayAllMeals(mealsByNameData.meals);
}

/* Function to Search Meals By First Letter from API */
async function searchMealsByFirstLetter(mealFirstLetter) {
	let mealsByFirstLetterResponse = await fetch(
		`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealFirstLetter}`
	);

	let mealsByFirstLetterData = await mealsByFirstLetterResponse.json();

	console.log(mealsByFirstLetterData.meals);

	displayAllMeals(mealsByFirstLetterData.meals);
}

/* Function to Get All Meals Data from API */
async function getAllMealsData() {
	let allMealsResponse = await fetch(
		"https://www.themealdb.com/api/json/v1/1/search.php?s="
	);

	let allMealsData = await allMealsResponse.json();

	allMealsArray = allMealsData.meals;
	// console.log(allMealsArray);

	displayAllMeals(allMealsArray);

	closeSideNav();
}

/* Function to Display All Meals Data */
function displayAllMeals(mealsArray) {
	// Clear Content in ( main-sections ) Element
	$(".main-sections").html("");

	// Add <row> element in ( main-sections ) Element
	$(".main-sections").html(
		`
		<!-- Main Meals Section -->
		<div class="row main-meals g-3"></div>
	`
	);

	// Add Each Meal column in ( main-meals ) Element
	for (i = 0; i < mealsArray.length; i++) {
		$(".main-meals").append(`
			<div class="col col-12 col-md-3">

				<div
					class="inner main-meal text-white d-flex flex-column justify-content-center align-items-center gap-2">

					<div
						class="main-meal-image w-100 rounded-2 cursor-pointer overflow-hidden position-relative">

						<img src="${mealsArray[i].strMealThumb}" class="w-100" alt="">

						<div class="layer p-2 text-black d-flex justify-content-center align-items-center">

							<h3>${mealsArray[i].strMeal}</h3>

						</div>

					</div>

				</div>

			</div>
		`);
	}

	// Event To Open a Certain Meal
	$(".main-sections .main-meal").on("click", function () {
		getMealInstructions($(this)[0].outerText);
	});
}

/* Function to Get Categories List from API */
async function getAllCategoriesData() {
	let categoriesResponse = await fetch(
		"https://www.themealdb.com/api/json/v1/1/categories.php"
	);

	let categoriesData = await categoriesResponse.json();

	let allCategoriesArray = categoriesData.categories;

	dispalyAllCategories(allCategoriesArray);
}

/* Function to Filter Meals By Category from API */
async function filterByCategory(mealCategory) {
	let categoryFilterResponse = await fetch(
		`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategory}`
	);

	let categoryFilterData = await categoryFilterResponse.json();
	// console.log(categoryFilterData.meals);

	displayAllMeals(categoryFilterData.meals);
}

/* Function to Display Categories List */
function dispalyAllCategories(categoriesArray) {
	// Clear Content in ( forms ) Element
	$(".forms").html("");

	// Add <row> element in ( main-sections ) Element
	$(".main-sections").html(`
			<!-- Main Categories Section -->
			<div class="row categories g-3"></div>
		`);

	// Add Each Category column in ( main-meals ) Element
	for (let i = 0; i < categoriesArray.length; i++) {
		$(".categories").append(
			`
      		<div class="col col-12 col-md-3">

				<div class="inner category rounded-2 overflow-hidden">

					<div class="category-image w-100 cursor-pointer position-relative">

						<img src="${categoriesArray[i].strCategoryThumb}" class="w-100" alt="${categoriesArray[i].strCategoryDescription}">

						<div class="layer p-2 text-black text-center">

							<h3>${categoriesArray[i].strCategory}</h3>

							<p class="category-description">
								${categoriesArray[i].strCategoryDescription}
							</p>

						</div>

					</div>

				</div>

			</div>
			`
		);
	}

	// Event To Open a Certain Category
	$(".main-sections .category").on("click", function () {
		let categoryName = $(this).find("h3")[0].innerText;

		filterByCategory(categoryName);
	});
}

/* Function to Get Areas Data from API */
async function getAreasData() {
	let areasResponse = await fetch(
		"https://www.themealdb.com/api/json/v1/1/list.php?a=list"
	);

	let areasData = await areasResponse.json();

	dispalyAllAreas(areasData.meals);
}

/* Function to Filter Meals By Areas from API */
async function filterByArea(mealsArea) {
	let areaFilterResponse = await fetch(
		`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealsArea}`
	);

	let areaFilterData = await areaFilterResponse.json();
	console.log(areaFilterData.meals);

	displayAllMeals(areaFilterData.meals);
}

/* Function to Display Areas List */
function dispalyAllAreas(areasArray) {
	// Clear Content in ( forms ) Element
	$(".forms").html("");

	// Add <row> element in ( main-sections ) Element
	$(".main-sections").html(
		`
		<!-- Main Areas Section -->
		<div class="row areas g-3"></div>
	`
	);

	// Add Each Area column in ( main-meals ) Element
	for (let i = 0; i < areasArray.length; i++) {
		$(".areas").append(
			`
			<div class="col col-12 col-md-3">

				<div
					class="inner area text-white cursor-pointer d-flex flex-column justify-content-center align-items-center gap-2">

					<i class="fa-solid fa-house-laptop"></i>

					<h3 class="text-capitalize">${areasArray[i].strArea}</h3>

				</div>

			</div>
			`
		);
	}

	// Event To Get Meals of a Certain Area
	$(".main-sections .area").on("click", function () {
		// console.log($(this)[0].innerText);

		filterByArea($(this)[0].innerText);
	});
}

/* Function to Get Ingredients Data from API */
async function getIngredientsData() {
	let ingredientsResponse = await fetch(
		"https://www.themealdb.com/api/json/v1/1/list.php?i=list"
	);

	let ingredientsData = await ingredientsResponse.json();

	// console.log(ingredientsData);

	dispalyAllIngredients(ingredientsData.meals);
}

/* Function to Filter Meals By Ingredients from API */
async function filterByIngredient(mealsIngredient) {
	let ingredientFilterResponse = await fetch(
		`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealsIngredient}`
	);

	let ingredientFilterData = await ingredientFilterResponse.json();
	console.log(ingredientFilterData.meals);

	displayAllMeals(ingredientFilterData.meals);
}

/* Function to Display Ingredients List */
function dispalyAllIngredients(ingredientsArray) {
	// Clear Content in ( forms ) Element
	$(".forms").html("");

	// Add ( Ingredients row ) element in ( main-sections ) Element
	$(".main-sections").html(
		`
		<!-- Main Ingredients Section -->
		<div class="row ingredients g-3"></div>
	`
	);

	// Add Each Item Ingredient column in ( main-meals ) Element
	for (let i = 0; i < 20; i++) {
		$(".ingredients").append(
			`
			<div class="col col-12 col-md-3">

				<div
					class="inner item-ingredient text-white cursor-pointer d-flex flex-column justify-content-center align-items-center gap-2">

					<i class="fa-solid fa-drumstick-bite"></i>

					<h3 class="text-center text-capitalize">${
						ingredientsArray[i].strIngredient
					}</h3>

					<p class="w-100 text-center">
						${ingredientsArray[i].strDescription.split(" ", 20).join(" ")}
					</p>

				</div>

			</div>
			`
		);
	}

	// Event To Get Meals of a Certain Ingredient
	$(".main-sections .item-ingredient").on("click", function () {
		let ingredientName = $(this).find("h3")[0].innerText;

		filterByIngredient(ingredientName);
	});
}

/* Function to Get Meal Instructions and Details from API */
async function getMealInstructions(mainMeal) {
	let mealInstructionsResponse = await fetch(
		`https://www.themealdb.com/api/json/v1/1/search.php?s=${mainMeal}`
	);

	let mealInstructionsData = await mealInstructionsResponse.json();

	// console.log(mealInstructionsData);

	mealDetails = mealInstructionsData.meals[0];

	console.log(mealDetails);

	dispalyMealInstructions(mealDetails);

	closeSideNav();
}

/* Function to Display Meal Instructions and Details */
function dispalyMealInstructions() {
	// Clear Content in ( forms ) Element
	$(".forms").html("");

	$(".main-sections").html(
		`
		<!-- Meal Instructions Section -->
		<div class="row meal-instructions py-2 text-white">

			<!-- Meal Image & Title -->
			<div class="col col-12 col-md-4">

				<div class="inner meal-details text-white d-flex flex-column gap-2">

					<img src="${mealDetails.strMealThumb}" class="w-100 rounded-2" alt="">

					<h2 class="title">${mealDetails.strMeal}</h2>

				</div>

			</div>

			<!-- Meal Instructions & Details -->
			<div class="col col-12 col-md-8">

				<div class="instructions">

					<h3 class="text-capitalize">instructions</h3>

					<p>
					${mealDetails.strInstructions}
					</p>

				</div>

				<h3 class="text-capitalize">area : ${mealDetails.strArea}</h3>

				<h3 class="text-capitalize">category : ${mealDetails.strCategory}</h3>

				<h3 class="text-capitalize">recips :</h3>

				<div class="meal-recips mb-3"></div>

				<h3 class="text-capitalize">tags :</h3>

				<div class="meal-tags mb-3"></div>

				<button type="button" class="source-btn btn btn-success text-capitalize">source</button>

				<button type="button" class="youtube-btn btn btn-danger text-capitalize">youtube</button>

			</div>

		</div>
	`
	);

	// Loop to Show Meals Recips
	for (let i = 1; i <= 20; i++) {
		$(".meal-recips").append(
			`
				<span class="px-2 m-1 bg-recips-color text-recips-color rounded-2">
					${mealDetails[`strMeasure${i}`] + " " + mealDetails[`strIngredient${i}`]}
				</span>
			`
		);
	}

	// Loop to Show Meals Tags

	if (mealDetails.strTags !== null) {
		tagsArray = mealDetails.strTags.split(",");
		// console.log(tagsArray);

		for (mealTag of tagsArray) {
			$(".meal-tags").append(`
					<span class="px-2 m-1 bg-tags-color text-tags-color rounded-2">${mealTag}</span>
				`);
		}
	}

	// Event To Open Source Website of a certain Meal
	$(".source-btn").on("click", function () {
		window.open(mealDetails.strSource, "_blank");
	});

	// Event To Open Youtube Website of a certain Meal
	$(".youtube-btn").on("click", function () {
		window.open(mealDetails.strYoutube, "_blank");
	});
}

/*********************** Events ***********************/
/* Event to Close and Open Side Navbar */
$(".nav-icon").on("click", function () {
	if (sideNavOpen) {
		closeSideNav();
	} else {
		openSideNav();
	}
});

/* Events On Side Navbar list items */
$(".side-nav-links .search-link").on("click", function () {
	displaySearchInputs();

	closeSideNav();
});
$(".side-nav-links .categories-link").on("click", function () {
	getAllCategoriesData();

	closeSideNav();
});
$(".side-nav-links .area-link").on("click", function () {
	getAreasData();

	closeSideNav();
});
$(".side-nav-links .ingredients-link").on("click", function () {
	getIngredientsData();

	closeSideNav();
});
$(".side-nav-links .contact-link").on("click", function () {
	displayContactInputs();

	closeSideNav();
});

/* Main Code */
showLoadingScreen();

// hideLoadingScreen();

getAllMealsData();
