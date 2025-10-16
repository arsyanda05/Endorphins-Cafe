const form = document.getElementById('contactForm');

form.addEventListener('submit', function(event){
    event.preventDefault();
    alert('Form berhasil dikirim!');
    form.reset();
});