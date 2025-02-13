<?php
	// This is a basic example of how to implement an SEO-optimized single-page application (SPA).
	// In this example, "data-it" attributes are used to assign variables, but you can define everything in a configuration file.

	// Instead, you can use your methods to get the required information from the database.
	$pages = [
		'/' => [
			'content' => '
				<div class="home-block">
					<h1 class="home-title">Create Differently!</h1>
					<div class="home-text">Everything is simpler than it looks.</div>
				</div>
			',
			'head' => '
				<meta charset="UTF-8">
				<meta http-equiv="x-ua-compatible" content="ie=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<title>Home</title>
			'
		],
		'/page-1' => [
			'content' => '<div class="second-block">Page 1</div>',
			'head' => '
				<meta charset="UTF-8">
				<meta http-equiv="x-ua-compatible" content="ie=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<title>Page 1</title>
			'
		],
		'/page-2' => [
			'content' => '<div class="second-block">Page 2</div>',
			'head' => '
				<meta charset="UTF-8">
				<meta http-equiv="x-ua-compatible" content="ie=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<title>Page 2</title>
			'
		],
	];
	$nonexistentPage = [
		'content' => '<div class="second-block">Page not found</div>',
		'head' => '
			<meta charset="UTF-8">
			<meta http-equiv="x-ua-compatible" content="ie=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>404</title>
		'
	];
	if (isset($_GET['method']) && $_GET['method'] === 'getPage') {

		// Waiting for a request is for illustrative purposes only.
		sleep(1);

		if (isset($pages[$_GET['path']])) {
			echo json_encode($pages[$_GET['path']]);
		} else {
			echo json_encode($nonexistentPage);
		}
		exit;
	}
	if (isset($pages[$_SERVER['REQUEST_URI']])) {
		$currentPage = $pages[$_SERVER['REQUEST_URI']];
	} else {
		$currentPage = $nonexistentPage;
		http_response_code(404);
	}
?>
<!DOCTYPE html>
<html lang="en">
<head data-it="head">
	<?= $currentPage['head'] ?>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700">
	<link rel="stylesheet" href="https://zune.dev/css/example.css">
</head>
<body aria-busy="true" data-it="preloader">
	<div class="loader"><span></span></div>
	<header>
		<a href="https://zune.dev" class="logo" target="_blank" rel="noopener noreferrer">
			<svg viewBox="218 110 360 360" width="25" height="25"><path fill="#444" d="m400.04 265.75-.04.71q-39.42 52.77-50.75 69.04-15.75 22.62-8.5 50.71c-.3.17-.54.36-.65.72-18.69 58.57-102.14 54.77-114.98-5.01q-1.37-6.4-1.37-18.58 0-77.67-.01-155.34c0-51.55 62.75-79.14 100.48-43.57q4.43 4.18 12.63 15.44 31.39 43.09 63.19 85.88Z"/><path fill="#808289" d="M459.29 386q7.37-28.93-10.58-53.45-23.71-32.42-47.42-64.83-.54-.73-1.29-1.26l.04-.71q34.36-46.3 68.28-92.93C501.17 127.64 572.9 149.2 575.77 205q.09 1.55.32 2.23.16.46.16.96v152.3q0 14.11-1.03 19.96c-6.7 37.92-48.36 59.43-83.57 43.06q-23.78-11.06-32.36-37.51Z"/><path fill="#414247" d="M400 266.46q.75.53 1.29 1.26 23.71 32.41 47.42 64.83 17.95 24.52 10.58 53.45c-18.67 57.52-99.52 57.47-118.54.21q-7.25-28.09 8.5-50.71 11.33-16.27 50.75-69.04Z"/></svg>
			<span>Zune</span>
		</a>
		<a href="https://github.com/artjul/zune" target="_blank" rel="noopener noreferrer">
			<svg width="25" height="25" viewBox="0 0 24 24" version="1.1"><path fill="#444" d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path></svg>
		</a>
	</header>
	<nav>
		<a href="/" data-spa-use="main">Home</a>
		<a href="/page-1" data-spa-use="main">Page 1</a>
		<a href="/page-2" data-spa-use="main">Page 2</a>
		<a href="/nonexistent" data-spa-use="main">Nonexistent page</a>
	</nav>
	<main data-it="loader:main">
		<div class="loader"><span></span></div>
		<div data-it="content">
			<?= $currentPage['content'] ?>
		</div>
	</main>
	<script src="/zune/app.js?cache=true" type="module"></script>
</body>
</html>