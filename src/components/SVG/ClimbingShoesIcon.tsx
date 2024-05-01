import cn from 'classnames';

const ClimbingShoesIcon = ({ shoesRental }: { shoesRental: boolean }) => {
	return (
		<svg
			className={cn('w-8 h-8 fill-gray-400 text-gray-400', {
				['!fill-blue-500  !text-blue-500']: shoesRental,
			})}
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			stroke="currentColor"
			version="1.1"
		>
			<g id="-복사본">
				<g id="group">
					<path
						id="경로"
						d="M86.676 67.899 C82.709 64.624 78.575 60.8 73.726 55.885 L73.956 55.805 C74.185 55.73 74.358 55.519 74.408 55.256 74.459 54.998 74.381 54.729 74.205 54.555 L69.489 49.64 C69.315 49.458 69.067 49.4 68.843 49.49 68.516 49.609 68.198 49.739 67.888 49.869 Q64.806 46.636 61.75 43.372 L60.628 42.161 60.946 42.071 C61.185 42.003 61.368 41.785 61.416 41.512 61.465 41.243 61.385 40.965 61.204 40.782 L53.21 33.233 C53.016 33.053 52.749 33.014 52.521 33.133 L52.193 33.292 52.096 33.202 51.584 32.662 C51.584 32.662 50.542 31.531 48.051 28.788 47.094 27.534 45.707 26.805 44.242 26.784 42.695 26.782 41.138 27.841 39.5 29.889 L38.747 30.888 C36.401 33.806 35.826 34.525 35.76 37.615 33.805 38.743 32.107 39.611 31.231 39.61 24.883 39.604 24.224 35.013 23.601 30.602 23.241 28.132 22.881 25.602 21.238 24.68 21.452 24.083 21.555 23.443 21.54 22.8 21.596 20.42 20.53 16.969 18.222 16.967 17.338 16.966 16.197 17.084 15.798 18.054 15.302 19.244 16.352 20.635 17.562 22.256 18.209 23.024 18.751 23.898 19.169 24.848 18.212 26.367 13.075 34.551 11.667 36.84 7.397 44.165 7.465 46.875 8.882 53.327 10.141 58.888 12.699 63.961 22.541 63.671 36.962 63.686 44.952 66.875 61.618 76.482 64.466 78.143 67.42 79.56 70.455 80.721 73.924 82.175 77.585 82.956 81.284 83.033 82.813 83.017 84.34 82.895 85.856 82.668 88.217 82.2 91.163 80.573 91.856 77.554 92.283 75.514 91.738 72.194 86.676 67.899 Z M74.554 58.706 C74.488 58.815 74.396 58.902 74.289 58.956 73.97 59.095 72.989 59.184 70.382 57.401 Q71.267 56.922 72.32 56.473 C73.079 57.244 73.821 58.025 74.554 58.706 Z M68.904 51.02 L72.543 54.814 C69.327 55.996 66.404 58.021 64.013 60.725 L60.047 56.311 C62.742 54.043 65.729 52.259 68.904 51.02 Z M63.754 62.664 C63.754 62.731 63.732 62.795 63.692 62.844 L63.152 63.444 C63.112 63.492 63.056 63.519 62.997 63.519 62.939 63.519 62.883 63.492 62.843 63.443 L57.544 57.438 C57.521 57.399 57.509 57.354 57.509 57.308 57.51 57.242 57.536 57.181 57.58 57.138 L58.12 56.539 C58.161 56.488 58.218 56.46 58.279 56.459 58.336 56.462 58.39 56.491 58.429 56.539 L63.728 62.484 C63.756 62.539 63.765 62.603 63.754 62.664 Z M60.864 44.471 C62.754 46.473 64.645 48.475 66.543 50.477 65.588 50.926 64.686 51.405 63.889 51.875 61.496 49.592 58.784 46.809 55.825 43.596 L59.16 42.6 Z M52.696 34.703 L59.4 41.01 41.269 46.351 36.303 43.156 Z M18.553 21.297 C17.98 20.526 16.911 19.085 16.982 18.685 16.982 18.685 17.159 18.445 18.22 18.447 19.281 18.448 20.296 20.769 20.294 22.749 20.296 23.086 20.26 23.422 20.187 23.749 19.713 22.874 19.166 22.053 18.553 21.297 Z M19.111 54.038 C19.01 54.207 18.828 54.29 18.651 54.247 15.798 53.655 13.063 52.48 10.582 50.779 L9.566 50.068 C9.004 46.447 9.325 44.137 11.345 40.249 11.659 40.231 11.959 40.402 12.131 40.7 L19.139 53.528 C19.215 53.69 19.204 53.887 19.111 54.038 Z M49.227 53.799 C46.837 51.197 43.358 50.328 40.22 51.55 L30.348 55.349 C29.928 55.515 29.462 55.338 29.217 54.918 L17.796 35.436 C17.312 34.596 16.54 34.023 15.667 33.854 15.496 33.839 15.324 33.839 15.154 33.853 L20.158 25.859 C21.599 26.08 21.924 27.861 22.363 30.861 22.986 35.192 23.829 41.133 31.283 41.14 32.742 41.142 35.166 39.704 38.227 37.888 42.58 35.322 48.526 31.788 50.716 33.901 L50.91 34.101 34.535 42.404 C34.312 42.519 34.165 42.766 34.154 43.043 34.143 43.321 34.269 43.583 34.481 43.724 L40.843 47.81 C40.94 47.872 41.049 47.907 41.161 47.911 L41.32 47.911 54.304 44.095 C57.342 47.408 60.133 50.291 62.615 52.673 61.379 53.45 60.195 54.331 59.076 55.31 58.475 54.854 57.675 54.937 57.157 55.508 L56.617 56.117 C56.328 56.438 56.165 56.878 56.165 57.336 56.16 57.647 56.233 57.952 56.376 58.217 L54.853 59.915 Z M58.227 63.579 L55.789 60.936 57.286 59.278 61.251 63.742 59.896 65.25 C59.322 64.71 58.766 64.159 58.227 63.579 Z M89.489 75.541 C89.266 75.89 88.913 76.104 88.533 76.12 81.618 76.422 74.747 74.761 68.546 71.289 L66.426 70.107 C64.485 69 62.645 67.682 60.93 66.171 L62.214 64.743 C62.447 64.907 62.716 64.994 62.991 64.994 63.391 64.995 63.775 64.82 64.062 64.505 L64.611 63.885 C64.902 63.565 65.065 63.125 65.063 62.666 65.064 62.367 64.994 62.073 64.86 61.816 66.102 60.396 67.511 59.176 69.046 58.19 71.167 59.742 72.749 60.504 73.898 60.505 74.2 60.511 74.5 60.454 74.783 60.336 75.087 60.193 75.352 59.962 75.553 59.667 79.315 63.361 82.681 66.404 85.932 69.078 87.172 70.107 88.296 71.304 89.279 72.641 L89.693 74.382 C89.785 74.783 89.71 75.21 89.489 75.541 Z"
						stroke="currentColor"
					/>
				</g>
			</g>
		</svg>
	);
};

export default ClimbingShoesIcon;
