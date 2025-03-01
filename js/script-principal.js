document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad del acordeón para los niveles
    const nivelTitles = document.querySelectorAll('.nivel-title');
    
    nivelTitles.forEach(title => {
        title.addEventListener('click', function() {
            // Toggle la clase active para el título
            this.classList.toggle('active');
            
            // Obtener el contenido asociado a este nivel
            const nivelId = this.getAttribute('data-nivel');
            const content = document.getElementById(`nivel-${nivelId}-content`);
            
            // Toggle la clase active para el contenido
            content.classList.toggle('active');
        });
    });
    
    // Funcionalidad para mostrar las presentaciones de forma dinámica
    const temaItems = document.querySelectorAll('.tema-item');
    const mainContent = document.getElementById('main-content');
    const emptyState = document.getElementById('empty-state');
    
    temaItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover la clase active de todos los temas
            temaItems.forEach(tema => tema.classList.remove('active'));
            
            // Añadir la clase active al tema seleccionado
            this.classList.add('active');
            
            // Obtener el ID de la presentación a mostrar
            const presentationId = this.getAttribute('data-presentation');
            
            // Limpiar el contenido principal
            mainContent.innerHTML = '';
            
            // Si tiene un ID de presentación, cargar la presentación correspondiente
            if (presentationId) {
                console.log(`Cargando presentación: ${presentationId}`);
                
                // Crear contenedor para el iframe
                const iframeContainer = document.createElement('div');
                iframeContainer.className = 'iframe-container';
                
                // Crear el iframe para la presentación
                const iframe = document.createElement('iframe');
                iframe.src = `slides/${presentationId}.html`;  // Ruta a la carpeta slides
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', 'true');
                
                // Añadir el iframe al contenedor
                iframeContainer.appendChild(iframe);
                
                // Añadir el contenedor al contenido principal
                mainContent.appendChild(iframeContainer);
            } else {
                // Si no hay ID, mostrar el estado vacío
                mainContent.appendChild(emptyState);
            }
        });
    });
    
    // Abrir el primer nivel por defecto
    if (nivelTitles.length > 0) {
        nivelTitles[0].classList.add('active');
        const firstNivelId = nivelTitles[0].getAttribute('data-nivel');
        const firstContent = document.getElementById(`nivel-${firstNivelId}-content`);
        if (firstContent) {
            firstContent.classList.add('active');
        }
    }
});
