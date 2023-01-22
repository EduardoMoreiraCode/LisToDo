document.addEventListener('DOMContentLoaded', () => {
    const darkModeStorage = localStorage.getItem('dark-mode');
    const html = document.querySelector('html');
    const inputDarkMode = document.getElementById('input-dark-mode');
    
    // if(darkModeStorage){
    //     html.setAttribute("dark", "true");
    // }

    inputDarkMode.addEventListener('change', () => {
        if(inputDarkMode.checked){
            html.setAttribute("dark", "true");
            localStorage.setItem('dark-mode', true);
            document.querySelector(".img").src="sun-icon.png";
            
        }else{
            html.removeAttribute("dark");
            localStorage.removeItem('dark-mode');
            document.querySelector(".img").src="moon-icon.png";
        }
   })
})