// Configurações iniciais
document.addEventListener('DOMContentLoaded', function() {
    // Credenciais de login fixas conforme solicitado
    const validEmail = "Rrinaldi1766@hotmail.com";
    const validPassword = "Intelibet@665";
    
    // Elementos DOM
    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const mainScreen = document.getElementById('main-screen');
    const vendasLink = document.getElementById('vendas-link');
    const defaultContent = document.getElementById('default-content');
    const vendasContent = document.getElementById('vendas-content');
    const logoutLink = document.getElementById('logout-link');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    // Função para alternar visibilidade da senha
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    // Manipulador de envio do formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Verificar credenciais
            if (email === validEmail && password === validPassword) {
                // Login bem-sucedido
                loginScreen.classList.add('d-none');
                mainScreen.classList.remove('d-none');
                
                // Salvar estado de login no localStorage
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                // Login falhou
                alert('Email ou senha incorretos. Por favor, tente novamente.');
            }
        });
    }
    
    // Verificar se o usuário já está logado
    if (localStorage.getItem('isLoggedIn') === 'true') {
        loginScreen.classList.add('d-none');
        mainScreen.classList.remove('d-none');
    }
    
    // Manipulador para o link de Vendas
    if (vendasLink) {
        vendasLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Mostrar conteúdo de vendas e ocultar conteúdo padrão
            defaultContent.classList.add('d-none');
            vendasContent.classList.remove('d-none');
            
            // Fechar o dropdown
            const dropdownMenu = bootstrap.Dropdown.getInstance(document.getElementById('profileDropdown'));
            if (dropdownMenu) {
                dropdownMenu.hide();
            }
        });
    }
    
    // Manipulador para o link de Logout
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover estado de login
            localStorage.removeItem('isLoggedIn');
            
            // Voltar para a tela de login
            mainScreen.classList.add('d-none');
            loginScreen.classList.remove('d-none');
            
            // Resetar formulário
            if (loginForm) {
                loginForm.reset();
            }
            
            // Resetar conteúdo
            defaultContent.classList.remove('d-none');
            vendasContent.classList.add('d-none');
        });
    }
    
    // Manipuladores para os links da navegação inferior
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover classe active de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Adicionar classe active ao link clicado
            this.classList.add('active');
            
            // Se não for o link de vendas, mostrar conteúdo padrão
            if (!this.classList.contains('vendas-link')) {
                defaultContent.classList.remove('d-none');
                vendasContent.classList.add('d-none');
            }
        });
    });
});
