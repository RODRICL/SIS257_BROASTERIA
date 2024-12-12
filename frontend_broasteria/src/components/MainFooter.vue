<script setup lang="ts"></script>

<template>
    <div class="page-container">
        <footer class="sub_footer">
            <div class="container">
                <div class="footer-content">
                    <p class="footer-text">
                        &copy; 2024 Broastería El Sabor del Pollo - Todos los derechos reservados.
                    </p>
                    <p class="footer-description">
                        Disfruta del mejor pollo frito con un sabor único. ¡Hecho con pasión y dedicación para ti!
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    /* Hace que la página ocupe el 100% de la altura de la ventana */
}

.sub_footer {
    margin-top: auto;
    /* Esto empuja el footer hacia abajo */
    background-color: #ff9f00;
    /* Color cálido como el pollo */
    color: white;
    padding: 20px;
    text-align: center;
}

.footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.footer-text {
    font-size: 1rem;
    font-weight: bold;
}

.footer-description {
    font-size: 0.9rem;
    font-style: italic;
    margin-top: 10px;
}
</style>