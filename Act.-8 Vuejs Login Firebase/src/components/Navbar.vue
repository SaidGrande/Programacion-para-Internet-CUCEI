<template>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Tarea VueJS</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="existeUsuario" class="nav-link" aria-current="page" to="/about">About</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2 search-input" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-primary me-2" type="submit">Buscar</button>
        </form>

        <!-- Iniciar sesión -->
        <button v-if="!existeUsuario" type="button" class="btn btn-outline-primary mx-2" data-bs-toggle="modal" data-bs-target="#login">
          Iniciar Sesion 
        </button>

        <!-- Cerrar sesión -->
        <button v-if="existeUsuario" class="btn btn-outline-danger me-2" @click="signout">
          Cerrar Sesion
        </button>

        <!-- Regístrate -->
        <button v-if="!existeUsuario" type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#registro">
          Regístrate
        </button>
      </div>
    </div>
  </nav>

  <!-- Modal - Registrarse -->
  <div class="modal fade" id="registro">
    <div class="modal-dialog">
      <div class="modal-content custom-modal">
        <div class="modal-header">
          <h5 class="modal-title">Regístrate</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="register(email, password)">
            <div class="mb-3">
              <label class="form-label">Correo</label>
              <input v-model="email" type="email" required class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input v-model="password" type="password" required class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label">Repite Password</label>
              <input v-model="repassword" type="password" required class="form-control">
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Registrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal - Iniciar sesión -->
  <div class="modal fade" id="login">
    <div class="modal-dialog">
      <div class="modal-content custom-modal">
        <div class="modal-header">
          <h5 class="modal-title">Inicia sesión</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="login(email, password)">
            <div class="mb-3">
              <label class="form-label">Correo</label>
              <input v-model="email" type="email" required class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input v-model="password" type="password" required class="form-control">
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Iniciar sesión</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { mapGetters } from 'vuex';

export default {
  name: 'Navbar',
  data() {
    return {
      email: '',
      password: '',
      repassword: '',
      errorMessage: ''
    };
  },
  methods: {
    register(email, password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          alert('¡Registrado!');
        })
        .catch(error => {
          this.errorMessage = error.message;
          alert(this.errorMessage);
        });
    },
    login(email, password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          alert('¡Sesión iniciada!');
        })
        .catch(error => {
          this.errorMessage = error.message;
          alert(this.errorMessage);
        });
    },
    signout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        alert('¡Sesión cerrada!');
      });
    }
  },
  computed: {
    ...mapGetters(['existeUsuario'])
  }
}
</script>

<style>
/* Navbar */
.custom-navbar {
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e0e0e0;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.nav-link {
  color: #555;
  font-weight: 500;
  margin-right: 15px;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #007bff;
}

.navbar-toggler {
  border: none;
  background: transparent;
}

.navbar-toggler-icon {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23333" viewBox="0 0 30 30"><path stroke="rgba(0, 0, 0, 0.5)" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"/></svg>');
}

/* Buttons */
.btn {
  border-radius: 30px;
  padding: 8px 20px;
  font-weight: 600;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-outline-primary {
  color: #007bff;
  border-color: #007bff;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: white;
}

/* Modal */
.custom-modal {
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Input fields */
.form-control {
  border-radius: 5px;
  border: 1px solid #e0e0e0;
}

.search-input {
  border-radius: 30px;
  padding: 8px 20px;
  border: 1px solid #e0e0e0;
}
</style>
