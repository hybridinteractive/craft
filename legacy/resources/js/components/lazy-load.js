//////////////////////////////////////////////
//
// Lazy Load Method
// usage: add lazy class to images and
// data-type="bg,img,img-resp,picture"
// to active lazy loading images
//
//////////////////////////////////////////////

// Lazy Load
document.addEventListener("DOMContentLoaded", function() {
	let lazyloadImages;

	let supportScroll = ('onscroll' in window) && !(/(gle|ing)bot/.test(navigator.userAgent));

	if (!supportScroll) {

	    lazyloadImages = document.querySelectorAll(".lazy");
		lazyloadImages.forEach(function(image) {
			let imageType = image.dataset.type;

			if (imageType == "img") {
				image.src = image.dataset.src;
				image.removeAttribute('data-src');
			} else if (imageType == "img-resp") {
				image.src = image.dataset.src;
				image.setAttribute('srcset', image.dataset.srcset);
				image.removeAttribute('data-src');
				image.removeAttribute('data-srcset');
			} else if (imageType == "img-bg") {
				image.style.backgroundImage = "url('" + image.dataset.src + "')";
				image.removeAttribute('data-src');
			} else if (imageType == "picture") {

				let defaultImage = image.getElementsByTagName('img')
				defaultImage[0].src = defaultImage[0].dataset.src;
				defaultImage[0].removeAttribute('data-src');

				let sourceImages = image.getElementsByTagName('source')
				// sources.forEach(source => console.log(source));
				for (let sourceImage of sourceImages) {
					sourceImage.setAttribute('srcset', sourceImage.dataset.srcset);
					sourceImage.setAttribute('media', sourceImage.dataset.media);

					sourceImage.removeAttribute('data-srcset');
					sourceImage.removeAttribute('data-media');

					if (sourceImage.dataset.sizes) {
						sourceImage.setAttribute('sizes', sourceImage.dataset.sizes);
						sourceImage.removeAttribute('data-sizes');
					}
				}
			}

			image.classList.remove("lazy");
			image.classList.add("lazy-loaded");

		});

	} else if ("IntersectionObserver" in window) {
	    lazyloadImages = document.querySelectorAll(".lazy");
	    let imageObserver = new IntersectionObserver(function(entries, observer) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					let image = entry.target;
					let imageType = image.dataset.type;

					if (imageType == "img") {
						image.src = image.dataset.src;
						image.removeAttribute('data-src');
					} else if (imageType == "img-resp") {
						image.src = image.dataset.src;
						image.setAttribute('srcset', image.dataset.srcset);
						image.removeAttribute('data-src');
						image.removeAttribute('data-srcset');
					} else if (imageType == "img-bg") {
						image.style.backgroundImage = "url('" + image.dataset.src + "')";
						image.removeAttribute('data-src');
					} else if (imageType == "picture") {

						let defaultImage = image.getElementsByTagName('img')
						defaultImage[0].src = defaultImage[0].dataset.src;
						defaultImage[0].removeAttribute('data-src');

						let sourceImages = image.getElementsByTagName('source')
						// sources.forEach(source => console.log(source));
						for (let sourceImage of sourceImages) {
							sourceImage.setAttribute('srcset', sourceImage.dataset.srcset);
							sourceImage.setAttribute('media', sourceImage.dataset.media);

							sourceImage.removeAttribute('data-srcset');
							sourceImage.removeAttribute('data-media');

							if (sourceImage.dataset.sizes) {
								sourceImage.setAttribute('sizes', sourceImage.dataset.sizes);
								sourceImage.removeAttribute('data-sizes');
							}
						}
					}

					image.classList.remove("lazy");
					image.classList.add("lazy-loaded");
					imageObserver.unobserve(image);
				}
			});
	    });

	    lazyloadImages.forEach(function(image) {
	        imageObserver.observe(image);
	    });

	} else {
	    let lazyloadThrottleTimeout;
	    lazyloadImages = document.querySelectorAll(".lazy");

	    function lazyload () {
		     if(lazyloadThrottleTimeout) {
		        clearTimeout(lazyloadThrottleTimeout);
		     }

		    lazyloadThrottleTimeout = setTimeout(function() {

		        let scrollTop = window.pageYOffset;

		        lazyloadImages.forEach(function(img) {

		            if (img.offsetTop < (window.innerHeight + scrollTop)) {

						let imgType = img.dataset.type;

						if (imgType == "img") {
							img.src = img.dataset.src;
							img.removeAttribute('data-src');
						} else if (imgType == "img-resp") {
							img.src = img.dataset.src;
							img.setAttribute('srcset', img.dataset.srcset);
							img.removeAttribute('data-src');
							img.removeAttribute('data-srcset');
						} else if (imgType == "img-bg") {
							img.style.backgroundImage = "url('" + img.dataset.src + "')";
							img.removeAttribute('data-src');
						} else if (imgType == "picture") {

							let defaultImg = img.getElementsByTagName('img')
							defaultImg[0].src = defaultImg[0].dataset.src;
							defaultImg[0].removeAttribute('data-src');

							let sourceImgs = img.getElementsByTagName('source')
							// sources.forEach(source => console.log(source));
							for (let sourceImg of sourceImgs) {
								sourceImg.setAttribute('srcset', sourceImg.dataset.srcset);
								sourceImg.setAttribute('media', sourceImg.dataset.media);

								sourceImg.removeAttribute('data-srcset');
								sourceImg.removeAttribute('data-media');

								if (sourceImg.dataset.sizes) {
									sourceImg.setAttribute('sizes', sourceImg.dataset.sizes);
									sourceImg.removeAttribute('data-sizes');
								}
							}
						}

		                img.classList.remove('lazy');
						img.classList.add("lazy-loaded");

		            }

		        });
		        if(lazyloadImages.length == 0) {
					document.removeEventListener("scroll", lazyload);
					window.removeEventListener("resize", lazyload);
					window.removeEventListener("orientationChange", lazyload);
		        }

		    }, 20);
	 	}

	    document.addEventListener("scroll", lazyload);
	    window.addEventListener("resize", lazyload);
	    window.addEventListener("orientationChange", lazyload);
	}
})
