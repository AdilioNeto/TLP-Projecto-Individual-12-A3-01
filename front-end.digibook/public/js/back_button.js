function changeBackPageLocation(location){
    sessionStorage.setItem('back_page', location)
}

function goToBackPage(){
    backPage = sessionStorage.getItem('back_page');

    if(backPage != null){
        window.location.href = backPage;
    }
}

const backButton = document.querySelector('#back_button');

if(backButton)
backButton.addEventListener('click', () => {
    goToBackPage()
})