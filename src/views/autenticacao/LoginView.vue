<template>
  <v-app>
    <v-main>
      <v-container
        fluid
        class="d-flex align-center justify-center"
        style="height: 100vh"
      >
        <v-card elevation="2" width="450">
          <v-card-text>
            <h2 class="text-h5 font-weight-bold text-center mb-2">Bem vindo</h2>
            <p class="text-body-2 text-center mb-6">
              Minha primeira tela em Vue 3 e Vuetify 3
            </p>

            <v-form
              ref="formRef"
              @submit.prevent="autenticar"
              v-model="formValid"
            >
              <v-text-field
                v-model="email"
                label="E-mail"
                placeholder="Digite seu e-mail"
                variant="outlined"
                density="comfortable"
                :rules="emailRules"
                hide-details="auto"
                class="mb-3"
              />

              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Senha"
                placeholder="Digite sua senha"
                variant="outlined"
                density="comfortable"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="toggleShowPassword"
                :rules="passwordRules"
                hide-details="auto"
                class="mb-3"
              />
              <v-row>
                <v-col cols="12" class="px-2 mt-1">
                  <v-checkbox
                    v-model="rememberMe"
                    label="Lembrar-me"
                    density="comfortable"
                    class="mb-4"
                    style="width: 100%"
                  />
                </v-col>
              </v-row>

              <v-btn :disabled="!formValid" color="primary" block type="submit">
                Entrar
              </v-btn>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="justify-end px-3 py-2" style="gap: 4px">
            <span class="text-body-2 text--secondary font-weight-medium">
              Esqueceu a senha?
            </span>
            <v-btn
              variant="text"
              size="small"
              class="text--secondary font-weight-medium"
            >
              Clique aqui
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // ← Importa o router

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);
const formValid = ref(false);
const formRef = ref(null);

const router = useRouter(); // ← Inicializa o router

const emailRules = [
  (v) => !!v || "Campo obrigatório",
  (v) => /^\S+@\S+\.\S+$/.test(v) || "E-mail inválido",
];

const passwordRules = [(v) => !!v || "Senha obrigatória"];

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

onMounted(() => {
  const savedEmail = localStorage.getItem("rememberedEmail");
  if (savedEmail) {
    email.value = savedEmail;
    rememberMe.value = true;
  }
});

const autenticar = async () => {
  const isValid = await formRef.value.validate();
  if (!isValid.valid) return;

  if (rememberMe.value) {
    localStorage.setItem("rememberedEmail", email.value);
  } else {
    localStorage.removeItem("rememberedEmail");
  }

  // Simula autenticação bem-sucedida
  alert("Autenticado com sucesso!");

  // Redireciona para a Home
  router.push("/");
};
</script>
