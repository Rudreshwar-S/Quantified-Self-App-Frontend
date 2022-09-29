<template>
  <div class="form-demo">
    <Dialog
      v-model:visible="showMessage"
      :breakpoints="{ '960px': '80vw' }"
      :style="{ width: '30vw' }"
      position="top"
    >
      <div class="flex align-items-center flex-column pt-6 px-3">
        <h5>Login Failed!</h5>
        <h5>Error: {{ errorMessage }}</h5>
      </div>
    </Dialog>
    <div class="login_div">
      <div class="card">
        <h3>Login</h3>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <InputText
                id="email"
                v-model="v$.email.$model"
                :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                aria-describedby="email-error"
              />
              <label
                for="email"
                :class="{ 'p-error': v$.email.$invalid && submitted }"
                >Email*</label
              >
            </div>
            <span v-if="v$.email.$error && submitted">
              <span
                id="email-error"
                v-for="(error, index) of v$.email.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.email.$invalid && submitted) || v$.email.$pending.$response
              "
              class="p-error"
              >{{ v$.email.required.$message.replace("Value", "Email") }}</small
            >
          </div>
          <div class="field">
            <div class="p-float-label">
              <Password
                id="password"
                :feedback="false"
                v-model="v$.password.$model"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                toggleMask
              >
              </Password>
              <label
                for="password"
                :class="{ 'p-error': v$.password.$invalid && submitted }"
                >Password*</label
              >
              <small
                v-if="
                  (v$.password.$invalid && submitted) ||
                  v$.password.$pending.$response
                "
                class="p-error"
                >{{
                  v$.password.required.$message.replace("Value", "Password")
                }}</small
              >
            </div>
          </div>
          <div class="padd">
            <Button type="submit" label="Login" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      email: "",
      password: "",
      accept: null,
      submitted: false,
      showMessage: false,
      errorMessage: "",
    };
  },
  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    };
  },
  methods: {
    handleSubmit(isFormValid) {
      console.log(isFormValid, this.submitted);
      this.submitted = true;

      if (!isFormValid) {
        return;
      }

      let data = {
        email: this.email,
        password: this.password,
      };

      fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      }).then(async (res) => {
        let data = await res.json();

        if (!res.ok) {
          console.log(data);
          this.errorMessage = (data && data.message) || res.status;
          this.toggleDialog();
        } else {
          let jwt = data.jwt;
          localStorage.setItem("Auth", jwt);
          this.$router.push("/dashboard");
        }
      });
    },
    toggleDialog() {
      this.showMessage = !this.showMessage;
      if (!this.showMessage) {
        this.resetForm();
      }
    },
    resetForm() {
      this.email = "";
      this.password = "";
      this.accept = null;
      this.submitted = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.login_div {
  display: flex;
  justify-content: center;
  margin-top: 10rem;
}
.form-demo {
  .card {
    min-width: 200px;

    form {
      margin-top: 2rem;
    }

    .field {
      margin-bottom: 1.5rem;
    }
  }
  .card {
    width: 20%;
  }
  .padd {
    padding-top: 10%;
  }
}
</style>
