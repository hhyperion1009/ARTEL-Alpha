function toggleSearch() {
    const wrapper = document.querySelector('.search-wrapper');
    const input = document.querySelector('.search-bar');
    
    if (window.innerWidth <= 650) {
        wrapper.classList.toggle('active');
        setTimeout(() => input.focus(), 300);
    } else {
        input.focus();
    }
}