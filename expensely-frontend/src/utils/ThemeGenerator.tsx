const ThemeGenerator = () => {
    if (typeof window !== `undefined`) {
        const storedTheme = window.sessionStorage.getItem('theme')

        if (storedTheme) {
            return storedTheme
        }
    }

    // if (window.matchMedia('(prefers-color-scheme: dark)')) {
    // 	return 'dark'
    // }
    //
    // if (window.matchMedia('(prefers-color-scheme: light)')) {
    // 	return 'light'
    // }

    // const hour = new Date().getHours()
    // if (hour > 18 || hour < 7) {
    //     return 'dark'
    // }
    // return 'light'
    return 'light'
}

export default ThemeGenerator