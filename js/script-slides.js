document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicator = document.querySelector('.slide-indicator');
    
    // Índice de diapositiva actual
    let currentSlide = 0;
    
    // Función para mostrar la diapositiva actual
    function showSlide(index) {
        // Quitar la clase active de todas las diapositivas
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.transform = 'translateX(100%)';
        });
        
        // Añadir la clase active a la diapositiva actual
        slides[index].classList.add('active');
        slides[index].style.transform = 'translateX(0)';
        
        // Actualizar el indicador
        indicator.textContent = `${index + 1}/${slides.length}`;
        
        // Actualizar los botones
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === slides.length - 1;
    }
    
    // Event listeners para los botones
    prevBtn.addEventListener('click', function() {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
            // Flecha derecha, espacio o enter: avanzar
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                showSlide(currentSlide);
            }
        } else if (e.key === 'ArrowLeft') {
            // Flecha izquierda: retroceder
            if (currentSlide > 0) {
                currentSlide--;
                showSlide(currentSlide);
            }
        }
    });
    
    // Inicializar la primera diapositiva
    showSlide(currentSlide);
    
    // Reiniciar las animaciones cuando cambia la diapositiva
    function resetAnimations(slideIndex) {
        const elements = slides[slideIndex].querySelectorAll('.animated');
        elements.forEach(element => {
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = null;
        });
    }
    
    // Añadir listener para reiniciar animaciones
    prevBtn.addEventListener('click', function() {
        resetAnimations(currentSlide);
    });
    
    nextBtn.addEventListener('click', function() {
        resetAnimations(currentSlide);
    });
    
    // Permitir navegación por swipe en dispositivos táctiles
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 100; // Umbral mínimo para detectar swipe
        
        if (touchEndX - touchStartX > threshold) {
            // Swipe derecha (retroceder)
            if (currentSlide > 0) {
                currentSlide--;
                showSlide(currentSlide);
                resetAnimations(currentSlide);
            }
        } else if (touchStartX - touchEndX > threshold) {
            // Swipe izquierda (avanzar)
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                showSlide(currentSlide);
                resetAnimations(currentSlide);
            }
        }
    }
});
